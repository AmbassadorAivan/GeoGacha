import { ethers } from "ethers"

// Flow EVM Testnet configuration
export const FLOW_EVM_TESTNET = {
  chainId: 545,
  name: "Flow EVM Testnet",
  currency: "FLOW",
  rpcUrl: "https://testnet.evm.nodes.onflow.org",
  blockExplorer: "https://evm-testnet.flowscan.io",
}

// Your deployed contract details
export const RANDOMNESS_CONTRACT = {
  address: "0x59035F178a8029A9bd39883802a91B5523cfF53F",
  abi: [
    {
      inputs: [
        { internalType: "uint64", name: "min", type: "uint64" },
        { internalType: "uint64", name: "max", type: "uint64" },
      ],
      name: "getRandomNumber",
      outputs: [{ internalType: "uint64", name: "", type: "uint64" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "string[]", name: "items", type: "string[]" }],
      name: "selectRandomItem",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, internalType: "uint64", name: "randomNumber", type: "uint64" },
        { indexed: false, internalType: "uint64", name: "min", type: "uint64" },
        { indexed: false, internalType: "uint64", name: "max", type: "uint64" },
      ],
      name: "RandomNumberGenerated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        { indexed: false, internalType: "string", name: "item", type: "string" },
        { indexed: false, internalType: "uint256", name: "index", type: "uint256" },
      ],
      name: "RandomItemSelected",
      type: "event",
    },
  ],
}

// Reward pools for different rarities
export const REWARD_POOLS = {
  common: [
    "Explorer's Compass",
    "Trail Map Fragment",
    "Basic Hiking Badge",
    "Nature's Whisper Token",
    "Wanderer's Coin",
  ],
  rare: ["Mystic Crystal", "Ancient Rune Stone", "Enchanted Leaf", "Starlight Shard", "Phoenix Feather"],
  legendary: ["Dragon Scale Fragment", "Celestial Orb", "Time Rift Key", "Void Walker's Essence", "Genesis Stone"],
}

// Get Web3 provider
export async function getProvider() {
  if (typeof window !== "undefined" && window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum)
    return provider
  }

  // Fallback to read-only provider
  return new ethers.JsonRpcProvider(FLOW_EVM_TESTNET.rpcUrl)
}

// Get contract instance
export async function getRandomnessContract() {
  const provider = await getProvider()
  return new ethers.Contract(RANDOMNESS_CONTRACT.address, RANDOMNESS_CONTRACT.abi, provider)
}

// Connect wallet and switch to Flow EVM Testnet
export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("MetaMask not found")
  }

  try {
    // Request account access
    await window.ethereum.request({ method: "eth_requestAccounts" })

    // Check if we're on the correct network
    const chainId = await window.ethereum.request({ method: "eth_chainId" })

    if (Number.parseInt(chainId, 16) !== FLOW_EVM_TESTNET.chainId) {
      // Switch to Flow EVM Testnet
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: `0x${FLOW_EVM_TESTNET.chainId.toString(16)}` }],
        })
      } catch (switchError: any) {
        // Network doesn't exist, add it
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${FLOW_EVM_TESTNET.chainId.toString(16)}`,
                chainName: FLOW_EVM_TESTNET.name,
                nativeCurrency: {
                  name: FLOW_EVM_TESTNET.currency,
                  symbol: FLOW_EVM_TESTNET.currency,
                  decimals: 18,
                },
                rpcUrls: [FLOW_EVM_TESTNET.rpcUrl],
                blockExplorerUrls: [FLOW_EVM_TESTNET.blockExplorer],
              },
            ],
          })
        } else {
          throw switchError
        }
      }
    }

    const provider = new ethers.BrowserProvider(window.ethereum)
    const signer = await provider.getSigner()
    const address = await signer.getAddress()

    return { provider, signer, address }
  } catch (error) {
    console.error("Failed to connect wallet:", error)
    throw error
  }
}

// Generate random reward using your contract
export async function generateRandomReward() {
  try {
    const contract = await getRandomnessContract()

    // First, determine rarity (weighted random)
    const rarityRoll = await contract.getRandomNumber(1, 100)
    let rarity: keyof typeof REWARD_POOLS

    if (rarityRoll <= 5) {
      // 5% chance
      rarity = "legendary"
    } else if (rarityRoll <= 25) {
      // 20% chance
      rarity = "rare"
    } else {
      // 75% chance
      rarity = "common"
    }

    // Then select random item from the rarity pool
    const rewardPool = REWARD_POOLS[rarity]
    const selectedReward = await contract.selectRandomItem(rewardPool)

    return {
      name: selectedReward,
      rarity,
      isNew: true,
      contractCall: true,
    }
  } catch (error) {
    console.error("Failed to generate random reward:", error)

    // Fallback to local random if contract call fails
    const rarities = ["common", "rare", "legendary"] as const
    const weights = [75, 20, 5] // Percentages

    const random = Math.random() * 100
    let rarity: keyof typeof REWARD_POOLS = "common"

    if (random <= 5) rarity = "legendary"
    else if (random <= 25) rarity = "rare"

    const rewardPool = REWARD_POOLS[rarity]
    const randomIndex = Math.floor(Math.random() * rewardPool.length)

    return {
      name: rewardPool[randomIndex],
      rarity,
      isNew: true,
      contractCall: false,
    }
  }
}

// Check if user has sufficient FLOW for gas
export async function checkBalance() {
  try {
    const provider = await getProvider()
    const signer = await provider.getSigner()
    const address = await signer.getAddress()
    const balance = await provider.getBalance(address)

    return {
      balance: ethers.formatEther(balance),
      hasEnoughForGas: Number.parseFloat(ethers.formatEther(balance)) > 0.001, // Minimum for gas
    }
  } catch (error) {
    console.error("Failed to check balance:", error)
    return { balance: "0", hasEnoughForGas: false }
  }
}

// Validate GPS coordinates on-chain (future implementation)
export async function validateGPSOnChain(latitude: number, longitude: number, gachaPointId: number) {
  // This would be implemented when you add GPS validation to your contract
  // For now, we'll just return true
  console.log(`Validating GPS: ${latitude}, ${longitude} for point ${gachaPointId}`)
  return true
}

// Get transaction receipt and events
export async function getTransactionEvents(txHash: string) {
  try {
    const provider = await getProvider()
    const receipt = await provider.getTransactionReceipt(txHash)

    if (receipt) {
      const contract = await getRandomnessContract()
      const events = receipt.logs
        .map((log) => {
          try {
            return contract.interface.parseLog(log)
          } catch {
            return null
          }
        })
        .filter(Boolean)

      return { receipt, events }
    }

    return null
  } catch (error) {
    console.error("Failed to get transaction events:", error)
    return null
  }
}
