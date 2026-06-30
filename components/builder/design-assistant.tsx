"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Palette,
  Sparkles,
  Layout,
  Type,
  Eye,
  RefreshCw,
  Check,
  X,
  Loader2,
  Wand2,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface DesignVariant {
  id: string
  name: string
  description: string
  styles: string[]
  preview: string
}

interface StyleOption {
  label: string
  value: string
  icon: typeof Palette
  colors: string[]
}

const styleOptions: StyleOption[] = [
  { label: "Luxury", value: "luxury", icon: Palette, colors: ["#bf30ef", "#d4a574", "#1a1a2e"] },
  { label: "Minimal", value: "minimal", icon: Layout, colors: ["#1e293b", "#f8f9fc", "#94a3b8"] },
  { label: "Modern", value: "modern", icon: Wand2, colors: ["#3e60f4", "#14a8f4", "#0c1a2d"] },
  { label: "Playful", value: "playful", icon: Sparkles, colors: ["#f43f5e", "#f97316", "#22c55e"] },
  { label: "Professional", value: "professional", icon: Eye, colors: ["#2563eb", "#475569", "#f1f5f9"] },
]

const designVariants: Record<string, DesignVariant[]> = {
  luxury: [
    { id: "l1", name: "Gold Accent", description: "Elegant gold accents on dark background", styles: ["Dark mode", "Serif fonts", "Gold accents"], preview: "Dark & Gold" },
    { id: "l2", name: "Velvet Touch", description: "Rich purple tones with smooth gradients", styles: ["Purple base", "Smooth gradients", "Glass effects"], preview: "Rich Purple" },
    { id: "l3", name: "Marble Premium", description: "Clean white with marble textures", styles: ["White base", "Texture overlays", "Minimal luxury"], preview: "White Marble" },
  ],
  minimal: [
    { id: "m1", name: "Pure White", description: "Maximum whitespace with subtle gray accents", styles: ["White space", "Thin borders", "Light gray"], preview: "Clean White" },
    { id: "m2", name: "Dark Elegance", description: "Dark mode with clean typography", styles: ["Dark theme", "White text", "Thin lines"], preview: "Dark Clean" },
    { id: "m3", name: "Soft Touch", description: "Warm minimal with soft shadows", styles: ["Warm tones", "Soft shadows", "Rounded corners"], preview: "Warm Minimal" },
  ],
  modern: [
    { id: "mod1", name: "Bold Blue", description: "Vibrant blue gradients with sharp typography", styles: ["Blue gradient", "Bold fonts", "Sharp edges"], preview: "Bold Blue" },
    { id: "mod2", name: "Cyber Purple", description: "Neon purple with dark backdrop", styles: ["Neon accents", "Dark base", "Glow effects"], preview: "Cyber" },
    { id: "mod3", name: "Glass Modern", description: "Frosted glass with vibrant overlays", styles: ["Glassmorphism", "Vibrant overlays", "Blur effects"], preview: "Glass" },
  ],
  playful: [
    { id: "p1", name: "Color Burst", description: "Bright multi-color gradient schemes", styles: ["Multi-color", "Round shapes", "Bouncy"], preview: "Colorful" },
    { id: "p2", name: "Pastel Dream", description: "Soft pastels with friendly typography", styles: ["Pastel colors", "Rounded UI", "Cute icons"], preview: "Pastel" },
    { id: "p3", name: "Fun Dark", description: "Dark mode with colorful accents", styles: ["Dark + color", "Playful fonts", "Emoji icons"], preview: "Fun Dark" },
  ],
  professional: [
    { id: "pr1", name: "Corporate Blue", description: "Trustworthy blue with clean layout", styles: ["Blue primary", "Grid layout", "Clean"], preview: "Corporate" },
    { id: "pr2", name: "Slate & White", description: "Professional slate tones", styles: ["Slate colors", "Structured", "Minimal"], preview: "Slate" },
    { id: "pr3", name: "Navy Prestige", description: "Deep navy with gold accents", styles: ["Navy base", "Gold accents", "Formal"], preview: "Navy" },
  ],
}

export function DesignAssistant() {
  const [selectedStyle, setSelectedStyle] = useState("modern")
  const [selectedVariant, setSelectedVariant] = useState<string | null>(null)
  const [isApplying, setIsApplying] = useState(false)
  const [applied, setApplied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const variants = designVariants[selectedStyle] || []

  const handleApply = () => {
    setIsApplying(true)
    setTimeout(() => {
      setIsApplying(false)
      setApplied(true)
      setTimeout(() => setApplied(false), 3000)
    }, 1500)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 z-50 h-12 w-12 rounded-full bg-white border border-border text-text-secondary shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:text-text-primary hover:border-brand-400"
      >
        <Palette size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark/20 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[440px] bg-white border-l border-border shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-4 h-16 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center">
                    <Palette size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary">Design Assistant</h3>
                    <p className="text-xs text-text-secondary">AI-powered design suggestions</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-custom">
                {/* Style Selection */}
                <div>
                  <label className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3 block">
                    Choose a Style
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {styleOptions.map((style) => {
                      const Icon = style.icon
                      const isActive = selectedStyle === style.value
                      return (
                        <button
                          key={style.value}
                          onClick={() => { setSelectedStyle(style.value); setSelectedVariant(null) }}
                          className={cn(
                            "flex flex-col items-center gap-1.5 p-2.5 rounded-xl border transition-all duration-200",
                            isActive
                              ? "border-merchanx-500 bg-merchanx-50 ring-2 ring-merchanx-500/20"
                              : "border-border bg-white hover:border-brand-400"
                          )}
                        >
                          <Icon size={16} className={isActive ? "text-merchanx-500" : "text-text-secondary"} />
                          <span className="text-[10px] font-medium text-text-primary">{style.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Color Preview */}
                <div>
                  <label className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3 block">
                    Color Palette
                  </label>
                  <div className="flex gap-2">
                    {styleOptions.find(s => s.value === selectedStyle)?.colors.map((color, i) => (
                      <div key={i} className="flex-1">
                        <div className="h-12 rounded-lg border border-border" style={{ backgroundColor: color }} />
                        <span className="text-[10px] text-text-tertiary mt-1 block">{color}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Design Variants */}
                <div>
                  <label className="text-xs font-medium text-text-tertiary uppercase tracking-wider mb-3 block">
                    Design Variations
                  </label>
                  <div className="space-y-2">
                    {variants.map((variant) => {
                      const isSelected = selectedVariant === variant.id
                      return (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant.id)}
                          className={cn(
                            "w-full text-left p-4 rounded-xl border transition-all duration-200",
                            isSelected
                              ? "border-merchanx-500 bg-merchanx-50 ring-2 ring-merchanx-500/20"
                              : "border-border bg-white hover:border-brand-400 hover:shadow-sm"
                          )}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-semibold text-text-primary">{variant.name}</span>
                            <Badge variant="neutral" size="sm">{variant.preview}</Badge>
                          </div>
                          <p className="text-xs text-text-secondary">{variant.description}</p>
                          <div className="flex gap-1.5 mt-2">
                            {variant.styles.map((style) => (
                              <Badge key={style} variant="neutral" size="sm">{style}</Badge>
                            ))}
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Apply Button */}
              <div className="p-4 border-t border-border">
                <Button
                  onClick={handleApply}
                  disabled={!selectedVariant || isApplying}
                  className="w-full gap-2"
                >
                  {isApplying ? (
                    <><Loader2 size={16} className="animate-spin" /> Applying Design...</>
                  ) : applied ? (
                    <><Check size={16} /> Design Applied!</>
                  ) : (
                    <><Wand2 size={16} /> Apply Design</>
                  )}
                </Button>
                <p className="text-[10px] text-text-tertiary text-center mt-2">
                  This will update your store&apos;s color scheme, typography, and layout styles.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
