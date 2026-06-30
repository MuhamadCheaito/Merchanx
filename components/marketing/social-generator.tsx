"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Camera,
  Share2,
  Music2,
  Mail,
  Sparkles,
  Copy,
  Check,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const platforms = [
  { id: "instagram", label: "Instagram", icon: Camera, color: "from-pink-500 to-purple-600" },
  { id: "facebook", label: "Facebook Ads", icon: Share2, color: "from-blue-600 to-blue-700" },
  { id: "tiktok", label: "TikTok", icon: Music2, color: "from-black to-gray-800" },
  { id: "email", label: "Email Campaign", icon: Mail, color: "from-brand-400 to-brand-600" },
]

export function SocialGenerator() {
  const [product, setProduct] = useState("")
  const [platform, setPlatform] = useState("instagram")
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState("")
  const [copied, setCopied] = useState(false)

  const handleGenerate = () => {
    if (!product.trim()) return
    setGenerating(true)
    setTimeout(() => {
      const samples: Record<string, string> = {
        instagram: `✨ **Introducing ${product}** ✨\n\nElevate your everyday style with our latest must-have. Crafted with premium materials and designed for those who refuse to compromise.\n\n👉 Link in bio to shop now!\n\n#merchanx #${product.replace(/\s+/g, "").toLowerCase()} #newarrival #shopnow`,
        facebook: `🚀 **New Arrival: ${product}**\n\nDiscover the perfect addition to your collection. Limited stock available!\n\n✅ Premium Quality\n✅ Best Price Guarantee\n✅ Free Shipping\n\nShop now and get 10% off your first order!`,
        tiktok: `POV: You just found your new favorite ${product} 🔥\n\nWait for the unboxing 😍\n\n#merchanx #fyp #unboxing #${product.replace(/\s+/g, "").toLowerCase()}`,
        email: `**Subject:** Introducing ${product} - Your New Favorite\n\n**Preview:** Premium quality, unbeatable style\n\nHi there,\n\nWe're excited to introduce our latest addition: **${product}**.\n\nDesigned for those who appreciate quality and style.\n\n**Why you'll love it:**\n• Premium materials\n• Expert craftsmanship\n• Limited edition\n\nShop now and enjoy free shipping on your first order!\n\n[Shop Now]\n\nMerchanx Team`,
      }
      setResult(samples[platform] || "Generated content will appear here.")
      setGenerating(false)
    }, 1500)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Content Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="product">Product or topic</Label>
          <Input
            id="product"
            placeholder="e.g., Black leather wallet"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="mt-1.5"
          />
        </div>

        <div>
          <Label className="mb-3 block">Platform</Label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {platforms.map((p) => {
              const Icon = p.icon
              const isActive = platform === p.id
              return (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-200",
                    isActive
                      ? "border-merchanx-500 bg-merchanx-50 ring-2 ring-merchanx-500/20"
                      : "border-border bg-white hover:border-brand-400"
                  )}
                >
                  <div className={cn("h-10 w-10 rounded-lg bg-gradient-to-br flex items-center justify-center", p.color)}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <span className="text-xs font-medium text-text-primary">{p.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <Button
          onClick={handleGenerate}
          disabled={!product.trim() || generating}
          className="w-full gap-2"
        >
          {generating ? (
            <><Loader2 size={16} className="animate-spin" /> Generating...</>
          ) : (
            <><Sparkles size={16} /> Generate Content</>
          )}
        </Button>

        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="relative rounded-xl bg-surface-secondary p-4">
              <pre className="text-sm text-text-primary whitespace-pre-wrap font-sans">{result}</pre>
              <button
                onClick={handleCopy}
                className="absolute top-3 right-3 p-2 rounded-lg bg-white border border-border text-text-secondary hover:text-text-primary transition-colors shadow-sm"
              >
                {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
              </button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  )
}
