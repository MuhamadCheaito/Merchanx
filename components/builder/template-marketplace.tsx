"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Layout,
  Eye,
  Check,
  X,
  Loader2,
  Sparkles,
  Shirt,
  Smartphone,
  Dumbbell,
  Sparkles as SparklesIcon,
  Heart,
  Home,
  Laptop,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface Template {
  id: string
  name: string
  industry: string
  description: string
  icon: typeof Layout
  color: string
  features: string[]
  popular?: boolean
}

const templates: Template[] = [
  { id: "fashion", name: "Fashion Boutique", industry: "Fashion", description: "Elegant design for clothing and accessory stores", icon: Shirt, color: "from-pink-500 to-purple-600", features: ["Product showcase", "Size guide", "Lookbook layout", "Color swatches"], popular: true },
  { id: "electronics", name: "Tech Store", industry: "Electronics", description: "Modern layout for electronics and gadgets", icon: Smartphone, color: "from-blue-600 to-cyan-500", features: ["Product specs", "Compare tool", "Review sections", "Video showcases"] },
  { id: "beauty", name: "Beauty & Cosmetics", industry: "Beauty", description: "Clean, aesthetic design for beauty brands", icon: SparklesIcon, color: "from-rose-400 to-pink-500", features: ["Tutorial integration", "Before/After", "Ingredient lists", "Skin type quiz"] },
  { id: "food", name: "Restaurant", industry: "Food & Beverage", description: "Appetizing layout for food businesses", icon: Heart, color: "from-orange-500 to-red-500", features: ["Menu display", "Online ordering", "Reservation system", "Gallery grid"] },
  { id: "home", name: "Home & Living", industry: "Home & Garden", description: "Warm, inviting design for home decor", icon: Home, color: "from-amber-500 to-yellow-600", features: ["Room galleries", "Category browsing", "Style quiz", "Wishlist"] },
  { id: "sports", name: "Sports & Fitness", industry: "Sports", description: "Dynamic layout for active lifestyles", icon: Dumbbell, color: "from-emerald-500 to-green-600", features: ["Size charts", "Training guides", "Community feed", "Shop by activity"] },
  { id: "services", name: "Service Provider", industry: "Services", description: "Professional design for service businesses", icon: Laptop, color: "from-slate-600 to-slate-800", features: ["Booking system", "Portfolio", "Testimonials", "Service packages"] },
  { id: "digital", name: "Digital Products", industry: "Digital Products", description: "Clean layout for digital downloads", icon: Layout, color: "from-violet-500 to-indigo-600", features: ["Download system", "License options", "Preview mode", "Instant delivery"] },
]

export function TemplateMarketplace() {
  const [isOpen, setIsOpen] = useState(false)
  const [selected, setSelected] = useState<string | null>(null)
  const [applying, setApplying] = useState(false)
  const [applied, setApplied] = useState(false)

  const handleApply = () => {
    setApplying(true)
    setTimeout(() => {
      setApplying(false)
      setApplied(true)
      setTimeout(() => {
        setApplied(false)
        setIsOpen(false)
      }, 2000)
    }, 1500)
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-44 right-6 z-50 h-12 w-12 rounded-full bg-white border border-border text-text-secondary shadow-lg flex items-center justify-center transition-all duration-300 hover:shadow-xl hover:text-text-primary hover:border-brand-400"
      >
        <Layout size={20} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark/40 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-4 sm:inset-x-20 sm:inset-y-12 z-50 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 h-16 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg gradient-brand flex items-center justify-center">
                    <Layout size={16} className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-text-primary">Template Marketplace</h2>
                    <p className="text-xs text-text-secondary">Choose a template to start building your store</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Grid */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {templates.map((template, i) => {
                    const Icon = template.icon
                    const isSelected = selected === template.id
                    return (
                      <motion.div
                        key={template.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Card
                          className={cn(
                            "cursor-pointer transition-all h-full",
                            isSelected && "ring-2 ring-merchanx-500",
                            "hover:shadow-lg"
                          )}
                          onClick={() => setSelected(template.id)}
                        >
                          <div className={cn("h-24 rounded-t-xl bg-gradient-to-br flex items-center justify-center", template.color)}>
                            <Icon size={36} className="text-white/80" />
                            {template.popular && (
                              <Badge variant="gradient" size="sm" className="absolute top-2 right-2">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="text-sm font-semibold text-text-primary">{template.name}</h3>
                              <Badge variant="neutral" size="sm">{template.industry}</Badge>
                            </div>
                            <p className="text-xs text-text-secondary mb-3">{template.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {template.features.map((f) => (
                                <Badge key={f} variant="neutral" size="sm">{f}</Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between px-6 h-16 border-t border-border">
                <p className="text-xs text-text-secondary">
                  {selected ? "Template selected" : "Click a template to preview"}
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                  <Button
                    onClick={handleApply}
                    disabled={!selected || applying}
                    className="gap-2"
                  >
                    {applying ? (
                      <><Loader2 size={16} className="animate-spin" /> Applying...</>
                    ) : applied ? (
                      <><Check size={16} /> Applied!</>
                    ) : (
                      <><Sparkles size={16} /> Apply Template</>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
