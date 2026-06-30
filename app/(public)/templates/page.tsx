"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Search,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Shirt,
  Smartphone,
  Heart,
  Home,
  Dumbbell,
  Laptop,
  Layout,
  Eye,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const allTemplates = [
  { name: "Fashion Boutique", industry: "Fashion", icon: Shirt, color: "from-pink-500 to-purple-600", description: "Elegant design for clothing and accessory stores with product showcases and lookbook layouts.", popular: true },
  { name: "Tech Store", industry: "Electronics", icon: Smartphone, color: "from-blue-600 to-cyan-500", description: "Modern layout for electronics and gadget stores with product specs and comparison tools." },
  { name: "Beauty & Cosmetics", industry: "Beauty", icon: Sparkles, color: "from-rose-400 to-pink-500", description: "Clean, aesthetic design for beauty brands with tutorial integration and before/after showcases." },
  { name: "Restaurant", industry: "Food & Beverage", icon: Heart, color: "from-orange-500 to-red-500", description: "Appetizing layout for restaurants, cafes, and food brands with menu display and online ordering." },
  { name: "Home & Living", industry: "Home & Garden", icon: Home, color: "from-amber-500 to-yellow-600", description: "Warm, inviting design for home decor stores with room galleries and style quizzes." },
  { name: "Sports & Fitness", industry: "Sports", icon: Dumbbell, color: "from-emerald-500 to-green-600", description: "Dynamic layout for sports and fitness brands with training guides and community features." },
  { name: "Service Provider", industry: "Services", icon: Laptop, color: "from-slate-600 to-slate-800", description: "Professional design for service-based businesses with booking systems and portfolios." },
  { name: "Digital Products", industry: "Digital", icon: Layout, color: "from-violet-500 to-indigo-600", description: "Clean layout for digital downloads with license options, preview mode, and instant delivery." },
  { name: "Jewelry Store", industry: "Fashion", icon: Sparkles, color: "from-yellow-500 to-amber-600", description: "Luxury design for jewelry and accessories with zoomable product images and size guides." },
  { name: "Bookstore", industry: "Digital", icon: Layout, color: "from-teal-500 to-emerald-600", description: "Cozy layout for book sellers with categories, reviews, and author sections." },
  { name: "Pet Supplies", industry: "Home & Garden", icon: Heart, color: "from-orange-400 to-red-500", description: "Fun, friendly design for pet stores with pet profiles and subscription boxes." },
  { name: "Health & Wellness", industry: "Beauty", icon: Sparkles, color: "from-green-500 to-teal-600", description: "Clean, trustworthy design for health products with ingredient lists and wellness guides." },
]

const categories = ["All", "Fashion", "Electronics", "Beauty", "Food & Beverage", "Home & Garden", "Sports", "Services", "Digital"]

export default function TemplatesPage() {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")

  const filtered = allTemplates.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === "All" || t.industry === category
    return matchesSearch && matchesCategory
  })

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-merchanx-50/50 via-white to-surface pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="gradient" size="lg" className="mb-4">
              <Layout size={14} className="mr-1" /> Template Marketplace
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-dark">
              Start with a template.
              <br />
              <span className="gradient-text">Finish with your brand.</span>
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Choose from professionally designed templates, each optimized for its industry. AI personalizes everything.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 border-y border-border bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search templates..."
                className="pl-9"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={cn(
                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                    category === cat
                      ? "gradient-brand text-white shadow-md"
                      : "bg-surface-secondary text-text-secondary hover:bg-surface-tertiary"
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-text-secondary">No templates found. Try a different search.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((template, i) => {
                const Icon = template.icon
                return (
                  <motion.div
                    key={template.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                      <div className={cn("h-32 bg-gradient-to-br flex items-center justify-center relative", template.color)}>
                        <Icon size={44} className="text-white/70 group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                        {template.popular && (
                          <Badge variant="gradient" size="sm" className="absolute top-3 right-3">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-base font-semibold text-text-primary">{template.name}</h3>
                          <Badge variant="neutral" size="sm">{template.industry}</Badge>
                        </div>
                        <p className="text-sm text-text-secondary mb-4">{template.description}</p>
                        <div className="flex items-center gap-2">
                          <Link href="/onboarding">
                            <Button size="sm" className="gap-1.5">
                              Try This Template <ChevronRight size={14} />
                            </Button>
                          </Link>
                          <Button variant="ghost" size="sm" className="gap-1.5">
                            <Eye size={14} /> Preview
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl gradient-brand p-8 sm:p-12 text-center"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Not sure which template?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto">
                Our AI will build a custom store tailored to your business. No template needed.
              </p>
              <Link href="/onboarding">
                <Button variant="secondary" size="xl" className="bg-white text-dark hover:bg-white/90 shadow-xl gap-2">
                  Start from Scratch <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
