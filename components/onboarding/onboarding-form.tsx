"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import {
  Building2,
  Package,
  Target,
  Sparkles,
  Heart,
  ArrowRight,
  ArrowLeft,
  Check,
  Wand2,
  Loader2,
  Eye,
  Store,
  Globe,
  ShoppingBag,
  Star,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const industries = [
  { value: "fashion", label: "Fashion & Apparel", emoji: "👗" },
  { value: "electronics", label: "Electronics", emoji: "📱" },
  { value: "beauty", label: "Beauty & Cosmetics", emoji: "💄" },
  { value: "food", label: "Food & Beverage", emoji: "🍽️" },
  { value: "home", label: "Home & Garden", emoji: "🏡" },
  { value: "sports", label: "Sports & Outdoors", emoji: "⚽" },
  { value: "health", label: "Health & Wellness", emoji: "💊" },
  { value: "services", label: "Services", emoji: "💼" },
  { value: "digital", label: "Digital Products", emoji: "💻" },
  { value: "other", label: "Other", emoji: "✨" },
]

const styles = [
  { value: "luxury", label: "Luxury", description: "Premium, elegant, high-end", emoji: "💎" },
  { value: "minimal", label: "Minimal", description: "Clean, simple, modern", emoji: "◻️" },
  { value: "modern", label: "Modern", description: "Bold, trendy, contemporary", emoji: "✨" },
  { value: "playful", label: "Playful", description: "Fun, colorful, friendly", emoji: "🎨" },
  { value: "professional", label: "Professional", description: "Trustworthy, corporate, clean", emoji: "💼" },
] as const

const tones = [
  { value: "sophisticated", label: "Sophisticated", description: "Refined and elegant", emoji: "🎩" },
  { value: "friendly", label: "Friendly", description: "Warm and approachable", emoji: "🤝" },
  { value: "innovative", label: "Innovative", description: "Cutting-edge and modern", emoji: "🚀" },
  { value: "trustworthy", label: "Trustworthy", description: "Reliable and honest", emoji: "🛡️" },
  { value: "bold", label: "Bold", description: "Confident and daring", emoji: "🔥" },
] as const

interface FormData {
  businessName: string
  industry: string
  product: string
  targetCustomer: string
  style: string
  tone: string
}

interface GeneratedStore {
  name: string
  tagline: string
  description: string
  seoTitle: string
  seoDescription: string
  categories: string[]
  marketingSuggestions: string[]
  brandColors: { primary: string; secondary: string; accent: string }
}

const steps = [
  { id: 1, title: "Business", icon: Building2, description: "Tell us about your business" },
  { id: 2, title: "Products", icon: Package, description: "What do you sell?" },
  { id: 3, title: "Audience", icon: Target, description: "Who are your customers?" },
  { id: 4, title: "Style", icon: Sparkles, description: "Choose your brand style" },
  { id: 5, title: "Preview", icon: Eye, description: "Review your AI-generated store" },
]

export function OnboardingForm() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<FormData>({
    businessName: "",
    industry: "",
    product: "",
    targetCustomer: "",
    style: "",
    tone: "",
  })
  const [generating, setGenerating] = useState(false)
  const [generatedStore, setGeneratedStore] = useState<GeneratedStore | null>(null)
  const [progressWidth, setProgressWidth] = useState(0)

  const update = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const canProceed = () => {
    switch (step) {
      case 1: return formData.businessName.length >= 2 && formData.industry !== ""
      case 2: return formData.product.length >= 2
      case 3: return formData.targetCustomer.length >= 2
      case 4: return formData.style !== "" && formData.tone !== ""
      case 5: return true
      default: return false
    }
  }

  const handleNext = () => {
    if (step === 4 && canProceed()) {
      setGenerating(true)
      setTimeout(() => {
        setGeneratedStore(generateMockStore(formData))
        setGenerating(false)
        setStep(5)
      }, 2500)
    } else if (canProceed()) {
      setStep(step + 1)
    }
  }

  const handlePublish = () => {
    router.push("/dashboard/builder")
  }

  const progressPercentage = ((step - 1) / (steps.length - 1)) * 100

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Compact Progress */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-text-tertiary">
            Step {step} of {steps.length}
          </span>
          <span className="text-xs font-medium text-text-tertiary">
            {Math.round(progressPercentage)}% complete
          </span>
        </div>
        <div className="h-1.5 rounded-full bg-surface-tertiary overflow-hidden">
          <motion.div
            className="h-full rounded-full gradient-brand"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
        <div className="flex items-center justify-between mt-3">
          {steps.map((s, i) => {
            const Icon = s.icon
            const isActive = s.id === step
            const isComplete = s.id < step
            return (
              <div key={s.id} className="flex flex-col items-center">
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300",
                    isActive && "gradient-brand text-white shadow-lg shadow-merchanx-500/25 scale-110",
                    isComplete && "bg-success text-white",
                    !isActive && !isComplete && "bg-surface-secondary text-text-tertiary"
                  )}
                >
                  {isComplete ? <Check size={12} /> : <Icon size={12} />}
                </div>
                <span className={cn(
                  "text-[10px] mt-1 font-medium hidden sm:block",
                  isActive ? "text-text-primary" : "text-text-tertiary"
                )}>
                  {s.title}
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
        >
          {step === 1 && (
            <div className="max-w-xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <div className="h-16 w-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-5 shadow-lg shadow-merchanx-500/25">
                  <Building2 size={28} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">Tell us about your business</h2>
                <p className="text-text-secondary">We&apos;ll use this to create a store that fits your brand.</p>
              </motion.div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    placeholder="e.g., Elegant Threads Boutique"
                    value={formData.businessName}
                    onChange={(e) => update("businessName", e.target.value)}
                    className="mt-1.5 text-lg h-12"
                    autoFocus
                  />
                </div>

                <div>
                  <Label className="mb-3 block">Industry</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {industries.map((ind) => (
                      <button
                        key={ind.value}
                        onClick={() => update("industry", ind.value)}
                        className={cn(
                          "flex flex-col items-center gap-1.5 p-3 rounded-xl border transition-all duration-200",
                          formData.industry === ind.value
                            ? "border-merchanx-500 bg-merchanx-50 ring-2 ring-merchanx-500/20"
                            : "border-border bg-white hover:border-brand-400 hover:shadow-sm"
                        )}
                      >
                        <span className="text-xl">{ind.emoji}</span>
                        <span className="text-[10px] font-medium text-text-primary text-center leading-tight">
                          {ind.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="max-w-xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <div className="h-16 w-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-5 shadow-lg shadow-merchanx-500/25">
                  <Package size={28} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">What do you sell?</h2>
                <p className="text-text-secondary">Describe your products or services in detail.</p>
              </motion.div>

              <div>
                <Label htmlFor="product">Products or Services</Label>
                <Input
                  id="product"
                  placeholder="e.g., Handmade jewelry, organic skincare products, premium candles"
                  value={formData.product}
                  onChange={(e) => update("product", e.target.value)}
                  className="mt-1.5 text-lg h-12"
                  autoFocus
                />
                <p className="text-xs text-text-tertiary mt-2">
                  Be specific about what you offer. This helps AI generate better product categories.
                </p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="max-w-xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <div className="h-16 w-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-5 shadow-lg shadow-merchanx-500/25">
                  <Target size={28} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">Who are your customers?</h2>
                <p className="text-text-secondary">Help us tailor your store to the right audience.</p>
              </motion.div>

              <div>
                <Label htmlFor="target">Target Customer</Label>
                <Input
                  id="target"
                  placeholder="e.g., Fashion-conscious women aged 25-45, young professionals"
                  value={formData.targetCustomer}
                  onChange={(e) => update("targetCustomer", e.target.value)}
                  className="mt-1.5 text-lg h-12"
                  autoFocus
                />
                <p className="text-xs text-text-tertiary mt-2">
                  Describe age, interests, location, or any defining characteristics.
                </p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="max-w-xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
              >
                <div className="h-16 w-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-5 shadow-lg shadow-merchanx-500/25">
                  <Sparkles size={28} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">Define your brand style</h2>
                <p className="text-text-secondary">Choose your visual style and brand tone.</p>
              </motion.div>

              <div className="space-y-6">
                <div>
                  <Label className="mb-3 block">Visual Style</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {styles.map((s) => (
                      <button
                        key={s.value}
                        onClick={() => update("style", s.value)}
                        className={cn(
                          "p-3 rounded-xl border text-center transition-all duration-200",
                          formData.style === s.value
                            ? "border-merchanx-500 bg-merchanx-50 ring-2 ring-merchanx-500/20"
                            : "border-border bg-white hover:border-brand-400 hover:shadow-sm"
                        )}
                      >
                        <span className="text-2xl block mb-1">{s.emoji}</span>
                        <span className="text-sm font-semibold text-text-primary block">{s.label}</span>
                        <span className="text-[10px] text-text-tertiary">{s.description}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Brand Tone</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                    {tones.map((t) => (
                      <button
                        key={t.value}
                        onClick={() => update("tone", t.value)}
                        className={cn(
                          "p-3 rounded-xl border text-center transition-all duration-200",
                          formData.tone === t.value
                            ? "border-merchanx-500 bg-merchanx-50 ring-2 ring-merchanx-500/20"
                            : "border-border bg-white hover:border-brand-400 hover:shadow-sm"
                        )}
                      >
                        <span className="text-2xl block mb-1">{t.emoji}</span>
                        <span className="text-sm font-semibold text-text-primary block">{t.label}</span>
                        <span className="text-[10px] text-text-tertiary">{t.description}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 5 && generatedStore && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center mb-6">
                <div className="h-16 w-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-5 shadow-lg shadow-merchanx-500/25">
                  <Check size={28} className="text-white" />
                </div>
                <h2 className="text-2xl font-bold text-text-primary mb-2">Your AI store is ready!</h2>
                <p className="text-text-secondary">Here&apos;s what we created for {formData.businessName}.</p>
              </div>

              {/* Store Identity Card */}
              <Card className="overflow-hidden">
                <div className="gradient-brand p-6 text-white">
                  <Badge variant="gradient" size="sm" className="bg-white/20 text-white border-0 mb-3">
                    <Store size={10} className="mr-1" /> Store Identity
                  </Badge>
                  <h3 className="text-2xl font-bold mb-1">{generatedStore.name}</h3>
                  <p className="text-white/80 text-sm">{generatedStore.tagline}</p>
                </div>
                <CardContent className="p-6 space-y-4">
                  <div>
                    <Label className="text-xs text-text-tertiary">Brand Description</Label>
                    <p className="text-sm text-text-primary mt-1">{generatedStore.description}</p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-text-tertiary">SEO Title</Label>
                      <p className="text-sm text-text-primary mt-1 font-mono">{generatedStore.seoTitle}</p>
                    </div>
                    <div>
                      <Label className="text-xs text-text-tertiary">SEO Description</Label>
                      <p className="text-sm text-text-primary mt-1">{generatedStore.seoDescription}</p>
                    </div>
                  </div>

                  <div>
                    <Label className="text-xs text-text-tertiary">Brand Colors</Label>
                    <div className="flex gap-2 mt-1.5">
                      {Object.entries(generatedStore.brandColors).map(([name, color]) => (
                        <div key={name} className="flex items-center gap-1.5">
                          <div className="h-6 w-6 rounded-md border border-border" style={{ backgroundColor: color }} />
                          <span className="text-xs text-text-secondary capitalize">{name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Product Categories */}
              <Card>
                <CardContent className="p-6">
                  <Label className="text-xs text-text-tertiary mb-3 block">Product Categories</Label>
                  <div className="flex flex-wrap gap-2">
                    {generatedStore.categories.map((cat) => (
                      <Badge key={cat} variant="secondary" size="md">
                        <ShoppingBag size={10} className="mr-1" /> {cat}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Marketing Suggestions */}
              <Card>
                <CardContent className="p-6">
                  <Label className="text-xs text-text-tertiary mb-3 block">
                    <Sparkles size={10} className="mr-1 inline" /> AI Marketing Suggestions
                  </Label>
                  <ul className="space-y-2">
                    {generatedStore.marketingSuggestions.map((suggestion, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-text-primary">
                        <Check size={14} className="text-success mt-0.5 flex-shrink-0" />
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Generating State */}
          {step === 5 && generating && (
            <div className="text-center py-16">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                className="h-16 w-16 rounded-2xl gradient-brand flex items-center justify-center mx-auto mb-6 shadow-lg"
              >
                <Wand2 size={28} className="text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-text-primary mb-2">AI is creating your store...</h3>
              <p className="text-text-secondary">Generating brand identity, layout, and content.</p>
              <div className="flex items-center justify-center gap-1.5 mt-6">
                {["Analyzing", "Designing", "Generating", "Optimizing"].map((phase, i) => (
                  <motion.div
                    key={phase}
                    initial={{ opacity: 0.3 }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ delay: i * 0.5, duration: 2, repeat: Infinity }}
                    className="px-3 py-1 rounded-full bg-merchanx-50 text-merchanx-700 text-xs font-medium"
                  >
                    {phase}
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="mt-10 flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => step > 1 ? setStep(step - 1) : router.push("/")}
          className="gap-2"
        >
          <ArrowLeft size={16} /> {step === 1 ? "Cancel" : "Back"}
        </Button>

        {step < 5 ? (
          <Button
            onClick={handleNext}
            disabled={!canProceed() || generating}
            className="gap-2"
          >
            {step === 4 ? (
              <><Wand2 size={16} /> Generate Store</>
            ) : (
              <><span>Continue</span> <ArrowRight size={16} /></>
            )}
          </Button>
        ) : (
          !generating && generatedStore && (
            <Button onClick={handlePublish} className="gap-2">
              <Store size={16} /> Start Building
              <ChevronRight size={16} />
            </Button>
          )
        )}
      </div>
    </div>
  )
}

function generateMockStore(data: FormData): GeneratedStore {
  const styleMap: Record<string, { adj: string; emoji: string }> = {
    luxury: { adj: "Premium", emoji: "💎" },
    minimal: { adj: "Clean", emoji: "◻️" },
    modern: { adj: "Contemporary", emoji: "✨" },
    playful: { adj: "Fun", emoji: "🎨" },
    professional: { adj: "Professional", emoji: "💼" },
  }
  const s = styleMap[data.style] || { adj: "Beautiful", emoji: "✨" }
  const shortName = data.businessName.length > 20
    ? data.businessName.split(" ").slice(0, 2).join(" ")
    : data.businessName

  return {
    name: data.businessName,
    tagline: `${s.adj} ${data.product.split(",")[0].trim()} for ${data.targetCustomer.split(",")[0].trim()}`,
    description: `${data.businessName} is a ${data.style} ${data.industry} brand offering carefully curated ${data.product}. We cater to ${data.targetCustomer} with a ${data.tone} approach that makes every shopping experience memorable.`,
    seoTitle: `${shortName} | ${s.adj} ${data.industry.charAt(0).toUpperCase() + data.industry.slice(1)} Online Store`,
    seoDescription: `Shop the best ${data.product} at ${data.businessName}. ${s.adj} quality, curated for ${data.targetCustomer}. Free shipping available.`,
    categories: data.product.split(",").map((p) => p.trim()).slice(0, 4),
    brandColors: {
      primary: data.style === "luxury" ? "#bf30ef" : data.style === "minimal" ? "#1e293b" : data.style === "playful" ? "#f43f5e" : "#3e60f4",
      secondary: data.style === "luxury" ? "#d4a574" : data.style === "minimal" ? "#64748b" : data.style === "playful" ? "#f97316" : "#14a8f4",
      accent: data.style === "luxury" ? "#fbbf24" : data.style === "playful" ? "#22c55e" : "#2a85ef",
    },
    marketingSuggestions: [
      `Launch Instagram campaign showcasing your ${data.product.split(",")[0].trim()}`,
      `Create email newsletter highlighting your brand's ${data.tone} approach`,
      `Optimize product pages with high-quality imagery and detailed descriptions`,
      `Build social proof with customer testimonials and reviews`,
      `Run Google Shopping ads for your top product categories`,
    ],
  }
}
