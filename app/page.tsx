"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { MapPin, Wallet, Satellite, Settings, HelpCircle, Star, Sparkles, Trophy, Gift } from "lucide-react"

// Mock data for Gacha Points
const gachaPoints = [
  { id: 1, x: 45, y: 30, name: "Central Park Fountain", distance: 0.1 },
  { id: 2, x: 70, y: 60, name: "Hidden Grove", distance: 0.3 },
  { id: 3, x: 25, y: 75, name: "Mountain Overlook", distance: 0.8 },
  { id: 4, x: 80, y: 25, name: "Secret Beach", distance: 1.2 },
]

// Mock collection data
const userCollection = [
  {
    id: 1,
    name: "Trailblazer Badge",
    rarity: "common",
    image: "/placeholder.svg?height=80&width=80",
    description: "Awarded for your first successful check-in",
  },
  {
    id: 2,
    name: "Hidden Grove NFT",
    rarity: "rare",
    image: "/placeholder.svg?height=80&width=80",
    description: "A mystical forest scene captured in digital form",
  },
  {
    id: 3,
    name: "Glitched Token Fragment",
    rarity: "legendary",
    image: "/placeholder.svg?height=80&width=80",
    description: "A corrupted piece of the blockchain itself",
  },
]

const rarityColors = {
  common: "bg-gray-500",
  rare: "bg-blue-500",
  legendary: "bg-purple-500",
}

const rarityBorders = {
  common: "border-gray-300",
  rare: "border-blue-300",
  legendary: "border-purple-300",
}

export default function GeoGachaApp() {
  const [isCollectionOpen, setIsCollectionOpen] = useState(false)
  const [isCheckInOpen, setIsCheckInOpen] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [revealedReward, setRevealedReward] = useState(null)
  const [nearbyPoint, setNearbyPoint] = useState(null)
  const [gpsStatus, setGpsStatus] = useState("connected")
  const [walletStatus, setWalletStatus] = useState("connected")
  const [showConfetti, setShowConfetti] = useState(false)

  // Simulate GPS proximity detection
  useEffect(() => {
    const nearby = gachaPoints.find((point) => point.distance <= 0.2)
    setNearbyPoint(nearby)
  }, [])

  const handleCheckIn = async () => {
    if (!nearbyPoint) return

    setIsCheckInOpen(true)
    setIsRevealing(true)

    // Simulate Chainlink VRF call and reward generation
    setTimeout(() => {
      const rewards = [
        { name: "Explorer's Compass", rarity: "common", isNew: true },
        { name: "Mystic Crystal", rarity: "rare", isNew: true },
        { name: "Dragon Scale Fragment", rarity: "legendary", isNew: true },
      ]

      const randomReward = rewards[Math.floor(Math.random() * rewards.length)]
      setRevealedReward(randomReward)
      setIsRevealing(false)

      if (randomReward.rarity !== "common") {
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 3000)
      }
    }, 2000)
  }

  const closeCheckInModal = () => {
    setIsCheckInOpen(false)
    setRevealedReward(null)
    setIsRevealing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-green-50 relative overflow-hidden">
      {/* Confetti Effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${1 + Math.random() * 2}s`,
              }}
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
            </div>
          ))}
        </div>
      )}

      {/* Top Navigation */}
      <nav className="flex items-center justify-between p-4 bg-white/90 backdrop-blur-sm border-b border-white/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            GeoGacha
          </span>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full">
            <HelpCircle className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </nav>

      {/* Status Indicators */}
      <div className="flex justify-between p-4 gap-4">
        <Card className="flex-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="flex items-center gap-2 p-3">
            <Satellite className={`w-4 h-4 ${gpsStatus === "connected" ? "text-green-500" : "text-red-500"}`} />
            <span className="text-sm font-medium">GPS: {gpsStatus === "connected" ? "Connected" : "Searching..."}</span>
          </CardContent>
        </Card>

        <Card className="flex-1 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
          <CardContent className="flex items-center gap-2 p-3">
            <Wallet className={`w-4 h-4 ${walletStatus === "connected" ? "text-green-500" : "text-red-500"}`} />
            <span className="text-sm font-medium">
              Wallet: {walletStatus === "connected" ? "Connected" : "Disconnected"}
            </span>
          </CardContent>
        </Card>
      </div>

      {/* Map View */}
      <div className="mx-4 mb-4 relative">
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-96 bg-gradient-to-br from-green-100 to-blue-100">
              {/* Map Background Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="grid grid-cols-8 grid-rows-8 h-full">
                  {[...Array(64)].map((_, i) => (
                    <div key={i} className="border border-gray-300/50" />
                  ))}
                </div>
              </div>

              {/* User Location (Center) */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg animate-pulse" />
                <div className="absolute inset-0 w-4 h-4 bg-blue-500/30 rounded-full animate-ping" />
              </div>

              {/* Gacha Points */}
              {gachaPoints.map((point) => (
                <div
                  key={point.id}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                >
                  <div className={`relative ${point.distance <= 0.2 ? "animate-bounce" : ""}`}>
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 ${
                        point.distance <= 0.2 ? "bg-green-500" : "bg-purple-500"
                      }`}
                    >
                      <Gift className="w-4 h-4 text-white" />
                    </div>
                    {point.distance <= 0.2 && (
                      <div className="absolute inset-0 w-8 h-8 bg-green-500/30 rounded-full animate-ping" />
                    )}
                  </div>

                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                      {point.name}
                      <br />
                      {point.distance}km away
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Check In Button */}
      <div className="px-4 mb-6">
        <Button
          onClick={handleCheckIn}
          disabled={!nearbyPoint}
          className={`w-full h-14 text-lg font-bold rounded-2xl shadow-xl transition-all ${
            nearbyPoint
              ? "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 animate-pulse"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          {nearbyPoint ? (
            <>
              <MapPin className="w-6 h-6 mr-2" />
              Check In at {nearbyPoint.name}
            </>
          ) : (
            <>
              <MapPin className="w-6 h-6 mr-2" />
              Move closer to a Gacha Point
            </>
          )}
        </Button>
      </div>

      {/* Floating Action Button - My Collection */}
      <Button
        onClick={() => setIsCollectionOpen(true)}
        className="fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-2xl"
        size="icon"
      >
        <Trophy className="w-8 h-8" />
      </Button>

      {/* Collection Modal */}
      <Dialog open={isCollectionOpen} onOpenChange={setIsCollectionOpen}>
        <DialogContent className="max-w-md mx-auto max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-purple-500" />
              My Collection
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {["legendary", "rare", "common"].map((rarity) => {
              const items = userCollection.filter((item) => item.rarity === rarity)
              if (items.length === 0) return null

              return (
                <div key={rarity}>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge className={`${rarityColors[rarity]} text-white capitalize`}>{rarity}</Badge>
                    <span className="text-sm text-gray-500">({items.length})</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {items.map((item) => (
                      <Card
                        key={item.id}
                        className={`border-2 ${rarityBorders[item.rarity]} hover:shadow-lg transition-shadow`}
                      >
                        <CardContent className="p-3">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-20 object-cover rounded-lg mb-2"
                          />
                          <h4 className="font-semibold text-sm mb-1">{item.name}</h4>
                          <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </DialogContent>
      </Dialog>

      {/* Check In / Reward Reveal Modal */}
      <Dialog open={isCheckInOpen} onOpenChange={closeCheckInModal}>
        <DialogContent className="max-w-sm mx-auto">
          <DialogHeader>
            <DialogTitle className="text-center">{isRevealing ? "Opening Gacha..." : "Reward Unlocked!"}</DialogTitle>
          </DialogHeader>

          <div className="text-center py-8">
            {isRevealing ? (
              <div className="space-y-4">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center animate-spin">
                  <Gift className="w-12 h-12 text-white" />
                </div>
                <p className="text-gray-600">Chainlink VRF is generating your random reward...</p>
                <div className="text-xs text-gray-400 space-y-1">
                  <p>• Validating GPS coordinates</p>
                  <p>• Requesting randomness from Chainlink</p>
                  <p>• Minting reward on-chain</p>
                </div>
              </div>
            ) : revealedReward ? (
              <div className="space-y-4">
                <div
                  className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${rarityColors[revealedReward.rarity]}`}
                >
                  <Star className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{revealedReward.name}</h3>
                  <Badge className={`${rarityColors[revealedReward.rarity]} text-white capitalize`}>
                    {revealedReward.rarity}
                  </Badge>
                </div>
                {revealedReward.rarity !== "common" && (
                  <p className="text-sm text-purple-600 font-medium">
                    🎉 Rare drop! This will be added to your collection.
                  </p>
                )}
                <Button onClick={closeCheckInModal} className="w-full">
                  Awesome!
                </Button>
              </div>
            ) : null}
          </div>
        </DialogContent>
      </Dialog>

      {/* Integration Comments */}
      <div className="hidden">
        {/* 
        TODO: Integration placeholders
        
        Chainlink VRF Integration:
        - Import @chainlink/contracts for VRF functionality
        - Implement requestRandomWords() for reward generation
        - Handle fulfillRandomWords() callback for reward distribution
        
        GPS Validation Logic:
        - Use navigator.geolocation.getCurrentPosition()
        - Implement haversine formula for distance calculation
        - Add geofencing validation for check-in radius
        - Store validated coordinates on-chain for proof
        
        Web3 Integration:
        - Connect to MetaMask/WalletConnect
        - Deploy ERC-721 contract for NFT rewards
        - Implement minting functions with rarity weights
        - Add transaction confirmation flows
        */}
      </div>
    </div>
  )
}
