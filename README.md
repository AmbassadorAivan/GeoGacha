# 🌍 GeoGacha - Web3 Location-Based Gacha Game

**A revolutionary location-based gaming experience powered by Flow EVM and on-chain randomness**

![GeoGacha Banner](https://img.shields.io/badge/Built%20with-Flow%20EVM-blue?style=for-the-badge) ![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge) ![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge)

## 🎯 Project Overview

GeoGacha combines the excitement of gacha games with real-world exploration, creating a unique Web3 gaming experience where players discover virtual treasures at physical locations. Built on Flow EVM Testnet, the game uses true on-chain randomness to generate rewards, ensuring fair and verifiable gameplay.

### 🏆 Hackathon Submission

This project was built for **[Hackathon Name]** and showcases:
- **Flow EVM integration** with custom smart contracts
- **On-chain randomness** using Cadence Random Consumer
- **Location-based gameplay** with GPS validation
- **Modern Web3 UX** with seamless wallet integration

## ✨ Key Features

### 🎮 Core Gameplay
- **Location-Based Check-ins**: Discover Gacha Points in the real world
- **On-Chain Randomness**: True randomness powered by Flow's Cadence Random Consumer
- **Rarity System**: Common (75%), Rare (20%), Legendary (5%) rewards
- **Collection System**: Build your digital treasure collection
- **Real-Time GPS**: Proximity detection for nearby Gacha Points

### 🔗 Web3 Integration
- **Flow EVM Testnet**: Deployed smart contracts for randomness generation
- **MetaMask Support**: Seamless wallet connection and network switching
- **Gas Optimization**: Efficient contract calls with fallback mechanisms
- **Transaction Transparency**: Block explorer integration for verification

### 🎨 User Experience
- **Mobile-First Design**: Optimized for on-the-go exploration
- **Responsive UI**: Beautiful animations and gamified interactions
- **Real-Time Updates**: Live GPS and wallet status indicators
- **Accessibility**: Screen reader support and keyboard navigation

## 🛠 Technical Architecture

### Smart Contracts
```solidity
// RandomnessWTF Contract on Flow EVM Testnet
Contract Address: 0x59035F178a8029A9bd39883802a91B5523cfF53F
Network: Flow EVM Testnet (Chain ID: 545)
```

**Key Functions:**
- `getRandomNumber(uint64 min, uint64 max)`: Generate random numbers
- `selectRandomItem(string[] items)`: Select random items from arrays
- Uses Cadence Random Consumer for true on-chain randomness

### Frontend Stack
- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Ethers.js**: Web3 integration
- **Shadcn/UI**: Modern component library

### Web3 Integration
```typescript
// Flow EVM Testnet Configuration
const FLOW_EVM_TESTNET = {
  chainId: 545,
  name: "Flow EVM Testnet",
  rpcUrl: "https://testnet.evm.nodes.onflow.org",
  blockExplorer: "https://evm-testnet.flowscan.io"
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn
- MetaMask browser extension
- Flow EVM Testnet FLOW tokens ([Get from faucet](https://testnet-faucet.onflow.org/))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/geogacha.git
   cd geogacha
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000`

### MetaMask Setup

1. **Add Flow EVM Testnet**
   - Network Name: Flow EVM Testnet
   - RPC URL: `https://testnet.evm.nodes.onflow.org`
   - Chain ID: `545`
   - Currency: `FLOW`
   - Block Explorer: `https://evm-testnet.flowscan.io`

2. **Get Test Tokens**
   Visit the [Flow Testnet Faucet](https://testnet-faucet.onflow.org/) to get FLOW tokens for gas fees.

## 🎯 How to Play

1. **Connect Wallet**: Connect your MetaMask to Flow EVM Testnet
2. **Find Gacha Points**: Explore the map to find nearby treasure locations
3. **Check In**: When within range, tap to check in and generate rewards
4. **Collect Treasures**: Build your collection of common, rare, and legendary items
5. **Explore More**: Discover new locations and rare rewards

## 🔧 Smart Contract Details

### RandomnessWTF Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {CadenceRandomConsumer} from "@onflow/flow-sol-utils/src/random/CadenceRandomConsumer.sol";

contract RandomnessWTF is CadenceRandomConsumer {
    // Generate random numbers in range
    function getRandomNumber(uint64 min, uint64 max) public view returns (uint64)
    
    // Select random item from array
    function selectRandomItem(string[] calldata items) public view returns (string memory)
}
```

**Deployed Contract**: [View on Flow EVM Explorer](https://evm-testnet.flowscan.io/address/0x59035F178a8029A9bd39883802a91B5523cfF53F)

### Randomness Implementation

The game uses a two-step randomness process:
1. **Rarity Determination**: Call `getRandomNumber(1, 100)` for weighted rarity
2. **Item Selection**: Call `selectRandomItem(rewardPool)` for specific reward

## 📱 Demo & Screenshots

### Live Demo
🌐 **[Play GeoGacha](https://your-deployment-url.vercel.app)**

### Key Screenshots
- 🗺️ **Interactive Map**: Real-time GPS with Gacha Points
- 💰 **Wallet Integration**: Seamless Flow EVM connection
- 🎁 **Reward Reveal**: Animated gacha opening experience
- 🏆 **Collection View**: Organized by rarity tiers

## 🏗️ Project Structure

```
geogacha/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main game interface
├── components/            # Reusable UI components
│   └── ui/               # Shadcn/UI components
├── lib/                  # Utility libraries
│   └── web3.ts           # Web3 integration logic
├── hooks/                # Custom React hooks
├── public/               # Static assets
└── contracts/            # Smart contract source
    └── RandomnessWTF.sol # Main randomness contract
```

## 🌟 Innovation Highlights

### 🎲 True On-Chain Randomness
Unlike traditional games using client-side randomness, GeoGacha leverages Flow's Cadence Random Consumer for verifiable, tamper-proof randomness generation.

### 🌍 Real-World Integration
Combines physical exploration with digital rewards, encouraging outdoor activity and location discovery.

### ⚡ Optimized UX
Seamless Web3 integration with automatic network switching and graceful error handling for mainstream adoption.

### 🔗 Flow EVM Pioneer
Early adoption of Flow EVM, showcasing the potential for Ethereum-compatible dApps on Flow's high-performance blockchain.

## 🚧 Future Roadmap

### Phase 1: Core Features ✅
- [x] Basic gameplay mechanics
- [x] Flow EVM integration
- [x] On-chain randomness
- [x] Wallet connectivity

### Phase 2: Enhanced Features 🔄
- [ ] NFT minting for rare rewards
- [ ] GPS coordinate validation on-chain
- [ ] Social features and leaderboards
- [ ] Reward marketplace

### Phase 3: Ecosystem Growth 📈
- [ ] Mobile app development
- [ ] Partnership integrations
- [ ] Mainnet deployment
- [ ] Token economics

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Flow Team**: For the amazing Flow EVM and Cadence Random Consumer
- **Hackathon Organizers**: For the opportunity to build and innovate
- **Open Source Community**: For the tools and libraries that made this possible

## 📞 Contact & Links

- **Demo**: [https://your-deployment-url.vercel.app](https://your-deployment-url.vercel.app)
- **Contract**: [0x59035F178a8029A9bd39883802a91B5523cfF53F](https://evm-testnet.flowscan.io/address/0x59035F178a8029A9bd39883802a91B5523cfF53F)
- **GitHub**: [https://github.com/yourusername/geogacha](https://github.com/yourusername/geogacha)
- **Twitter**: [@YourTwitter](https://twitter.com/yourtwitter)

---

**Built with ❤️ for the Web3 gaming community**

*GeoGacha - Where exploration meets blockchain innovation*
```

This README provides a comprehensive overview of your hackathon project, highlighting:

🎯 **Key Strengths:**
- Clear project vision and innovation
- Technical implementation details
- Live demo and contract verification
- Professional presentation
- Future roadmap showing scalability

🏆 **Hackathon Appeal:**
- Emphasizes Flow EVM integration
- Showcases on-chain randomness innovation
- Demonstrates real-world utility
- Shows technical depth and execution

📱 **User-Friendly:**
- Easy setup instructions
- Clear gameplay explanation
- MetaMask configuration guide
- Live demo access

The README positions your project as a serious, innovative Web3 gaming solution that judges will appreciate for both its technical merit and practical application!
