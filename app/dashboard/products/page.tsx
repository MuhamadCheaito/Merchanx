"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Package,
  Plus,
  Search,
  Edit3,
  Trash2,
  Sparkles,
  Copy,
  FileText,
  Globe,
  Share2,
  Languages,
  TrendingUp,
  X,
  Check,
  Loader2,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn, formatPrice } from "@/lib/utils"

const products = [
  { id: 1, name: "Premium Hoodie", price: 89.99, category: "Clothing", stock: 45, status: "active" as const, description: "Premium quality hoodie made from organic cotton.", seoTitle: "Premium Hoodie | Merchanx Store" },
  { id: 2, name: "Minimalist Watch", price: 249.00, category: "Accessories", stock: 12, status: "active" as const, description: "Clean, minimalist design watch.", seoTitle: "Minimalist Watch | Merchanx Store" },
  { id: 3, name: "Leather Bag", price: 199.00, category: "Bags", stock: 8, status: "active" as const, description: "Handcrafted leather bag.", seoTitle: "Leather Bag | Merchanx Store" },
  { id: 4, name: "Sunglasses", price: 129.00, category: "Accessories", stock: 0, status: "inactive" as const, description: "Stylish UV-protective sunglasses.", seoTitle: "Sunglasses | Merchanx Store" },
  { id: 5, name: "Canvas Sneakers", price: 159.00, category: "Shoes", stock: 23, status: "active" as const, description: "Comfortable canvas sneakers for everyday wear.", seoTitle: "Canvas Sneakers | Merchanx Store" },
  { id: 6, name: "Wool Scarf", price: 49.99, category: "Accessories", stock: 67, status: "draft" as const, description: "Soft merino wool scarf.", seoTitle: "Wool Scarf | Merchanx Store" },
]

type AIAction = "description" | "improve" | "seo" | "marketing" | "social" | "translate" | "highlights"

const aiActions: { id: AIAction; label: string; icon: typeof FileText; color: string }[] = [
  { id: "description", label: "Generate Description", icon: FileText, color: "from-merchanx-500 to-brand-400" },
  { id: "improve", label: "Improve Description", icon: Sparkles, color: "from-brand-400 to-accent-500" },
  { id: "seo", label: "SEO Generator", icon: Globe, color: "from-accent-500 to-cyan-500" },
  { id: "marketing", label: "Marketing Copy", icon: TrendingUp, color: "from-emerald-500 to-green-600" },
  { id: "social", label: "Social Media Post", icon: Share2, color: "from-pink-500 to-purple-600" },
  { id: "translate", label: "Translate", icon: Languages, color: "from-brand-400 to-blue-600" },
  { id: "highlights", label: "Product Highlights", icon: Star, color: "from-amber-400 to-orange-500" },
]

const aiResults: Record<AIAction, (name: string) => { content: string; label: string }> = {
  description: (name) => ({
    label: "Generated Description",
    content: `Introducing our ${name} — where premium quality meets exceptional design. Crafted with meticulous attention to detail, this piece is designed for those who appreciate the finer things in life. Made from carefully selected materials, it offers unparalleled comfort and durability. Whether you're dressing up or keeping it casual, the ${name} seamlessly complements any style. Elevate your everyday with this essential addition to your collection.`,
  }),
  improve: (name) => ({
    label: "Improved Description",
    content: `Experience the perfect blend of style and functionality with our ${name}. Meticulously crafted from premium materials, this piece delivers exceptional quality and lasting comfort. The thoughtful design ensures versatility for any occasion, making it a must-have addition to your wardrobe.

✨ Key Benefits:
• Premium quality materials
• Exceptional comfort and fit
• Versatile styling options
• Long-lasting durability

Upgrade your collection today with the ${name} that sets the standard for excellence.`,
  }),
  seo: (name) => ({
    label: "SEO Metadata",
    content: `SEO Title: ${name} | Premium Quality | Free Shipping

Meta Description: Shop the best ${name.toLowerCase()} crafted from premium materials. ✓ Free shipping ✓ Easy returns ✓ Best price guarantee. Elevate your style today.

Focus Keywords: ${name.toLowerCase()}, premium ${name.toLowerCase()}, quality ${name.toLowerCase()}, buy ${name.toLowerCase()} online`,
  }),
  marketing: (name) => ({
    label: "Marketing Copy",
    content: `📣 **New Arrival Alert!** 📣

Introducing our latest must-have: the **${name}**!

Why you'll love it:
✅ Premium quality materials
✅ Designed for comfort and style
✅ Versatile for any occasion
✅ Limited stock available

🌟 **Special Offer:** Get 10% off your first purchase!

👉 Shop now and elevate your style game!

#NewArrival #MustHave #StyleUpgrade`,
  }),
  social: (name) => ({
    label: "Instagram Post",
    content: `✨ **The ${name} you've been waiting for** ✨

Elevate your everyday style with our newest essential. Crafted with premium materials and designed for those who refuse to compromise on quality.

👆 Tap to shop now!

#${name.replace(/\s+/g, "")} #NewArrival #ShopNow #MustHave`,
  }),
  translate: (name) => ({
    label: "Spanish Translation",
    content: `**${name}** — Donde la calidad premium se encuentra con el diseño excepcional.

Fabricado con materiales cuidadosamente seleccionados, ofrece una comodidad y durabilidad inigualables. Diseñado para quienes aprecian los detalles más finos.

Características principales:
• Materiales de primera calidad
• Diseño versátil y elegante
• Comodidad excepcional
• Durabilidad garantizada`,
  }),
  highlights: (name) => ({
    label: "Key Highlights",
    content: `**${name} — Key Highlights**

⭐ **Premium Quality**: Crafted from top-grade materials for lasting durability
⭐ **Exceptional Design**: Thoughtfully designed for maximum comfort and style
⭐ **Versatile Use**: Perfect for any occasion, from casual to formal
⭐ **Easy Care**: Low maintenance, high durability
⭐ **Satisfaction Guaranteed**: Backed by our 100% satisfaction promise`,
  }),
}

export default function ProductsPage() {
  const [search, setSearch] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null)
  const [aiPanelOpen, setAiPanelOpen] = useState(false)
  const [aiLoading, setAiLoading] = useState<AIAction | null>(null)
  const [aiResult, setAiResult] = useState<{ action: AIAction; content: string; label: string } | null>(null)
  const [copied, setCopied] = useState(false)

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  )

  const handleAIAction = (action: AIAction) => {
    if (!selectedProduct) return
    setAiLoading(action)
    setAiResult(null)

    setTimeout(() => {
      const result = aiResults[action](selectedProduct.name)
      setAiResult({ action, ...result })
      setAiLoading(null)
    }, 1200)
  }

  const handleCopy = () => {
    if (!aiResult) return
    navigator.clipboard.writeText(aiResult.content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Products</h1>
          <p className="text-text-secondary mt-1">Manage your product catalog with AI-powered tools.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" size="sm" className="gap-1.5">
            <Sparkles size={14} /> Bulk AI Generate
          </Button>
          <Button size="sm" className="gap-1.5">
            <Plus size={14} /> Add Product
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <Input
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="ghost" size="sm">All Categories</Button>
            <Button variant="ghost" size="sm">All Status</Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {filtered.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card
              className={cn(
                "card-hover cursor-pointer transition-all",
                selectedProduct?.id === product.id && "ring-2 ring-merchanx-500"
              )}
              onClick={() => { setSelectedProduct(product); setAiPanelOpen(true); setAiResult(null) }}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-merchanx-100 to-brand-100 flex items-center justify-center flex-shrink-0">
                    <Package size={22} className="text-merchanx-600/60" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-semibold text-text-primary">{product.name}</h3>
                      <Badge
                        variant={product.status === "active" ? "success" : product.status === "draft" ? "neutral" : "warning"}
                        size="sm"
                      >
                        {product.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-sm text-text-secondary">{product.category}</span>
                      <span className="text-text-tertiary">|</span>
                      <span className="text-sm text-text-secondary">{product.stock} in stock</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <p className="text-sm font-semibold text-text-primary">{formatPrice(product.price)}</p>
                    <Button variant="ghost" size="icon-sm" onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); setAiPanelOpen(true) }}>
                      <Sparkles size={14} className="text-merchanx-500" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI Product Tools Panel */}
      <AnimatePresence>
        {aiPanelOpen && selectedProduct && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark/20 backdrop-blur-sm z-40"
              onClick={() => setAiPanelOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[480px] bg-white border-l border-border shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 h-16 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-merchanx-100 to-brand-100 flex items-center justify-center">
                    <Package size={18} className="text-merchanx-600" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary">{selectedProduct.name}</h3>
                    <p className="text-xs text-text-secondary">{formatPrice(selectedProduct.price)} • {selectedProduct.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setAiPanelOpen(false)}
                  className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <ScrollArea className="flex-1 p-4">
                {/* Current Info */}
                <Card className="mb-6">
                  <CardContent className="p-4 space-y-2">
                    <div>
                      <span className="text-[10px] text-text-tertiary uppercase tracking-wider font-medium">Description</span>
                      <p className="text-sm text-text-primary mt-0.5">{selectedProduct.description}</p>
                    </div>
                    <div>
                      <span className="text-[10px] text-text-tertiary uppercase tracking-wider font-medium">SEO Title</span>
                      <p className="text-sm text-text-primary mt-0.5 font-mono">{selectedProduct.seoTitle}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* AI Actions */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Sparkles size={14} className="text-merchanx-500" />
                    <span className="text-sm font-semibold text-text-primary">AI Tools</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {aiActions.map((action) => {
                      const Icon = action.icon
                      const isLoading = aiLoading === action.id
                      return (
                        <button
                          key={action.id}
                          onClick={() => handleAIAction(action.id)}
                          disabled={isLoading}
                          className={cn(
                            "flex items-center gap-2.5 p-3 rounded-xl border transition-all duration-200 text-left",
                            aiResult?.action === action.id
                              ? "border-merchanx-500 bg-merchanx-50 ring-2 ring-merchanx-500/20"
                              : "border-border bg-white hover:border-brand-400 hover:shadow-sm"
                          )}
                        >
                          <div className={cn("h-8 w-8 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0", action.color)}>
                            <Icon size={14} className="text-white" />
                          </div>
                          <span className="text-xs font-medium text-text-primary">{action.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Result */}
                {aiLoading && (
                  <div className="mt-4 p-6 rounded-xl bg-surface-secondary text-center">
                    <Loader2 size={20} className="animate-spin text-merchanx-500 mx-auto mb-2" />
                    <p className="text-sm text-text-secondary">Generating...</p>
                  </div>
                )}

                {aiResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-text-tertiary uppercase tracking-wider">{aiResult.label}</span>
                      <div className="flex gap-1">
                        <button
                          onClick={handleCopy}
                          className="p-1.5 rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface-secondary transition-colors"
                        >
                          {copied ? <Check size={14} className="text-success" /> : <Copy size={14} />}
                        </button>
                      </div>
                    </div>
                    <div className="p-4 rounded-xl bg-surface-secondary">
                      <pre className="text-sm text-text-primary whitespace-pre-wrap font-sans leading-relaxed">{aiResult.content}</pre>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <Button size="sm" variant="secondary" className="gap-1.5">
                        <Check size={14} /> Apply
                      </Button>
                      <Button size="sm" variant="ghost" className="gap-1.5" onClick={handleCopy}>
                        {copied ? <><Check size={14} /> Copied</> : <><Copy size={14} /> Copy</>}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </ScrollArea>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
