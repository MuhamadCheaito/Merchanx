"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Bot,
  Wand2,
  Palette,
  Type,
  TrendingUp,
  Search,
  BarChart3,
  Globe,
  ShoppingBag,
  Image,
  Sparkles,
  ArrowRight,
  CheckCircle,
  Layers,
  MessageSquare,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
}

const featureGroups = [
  {
    title: "AI Store Builder",
    description: "Generate a complete, professional online store from a simple description. AI handles layout, colors, content, and structure.",
    icon: Bot,
    gradient: "from-merchanx-500 to-brand-400",
    details: [
      "Describe your business in natural language",
      "AI generates complete store with branding",
      "Industry-optimized layouts and structure",
      "Smart color palette based on your brand",
      "Automatic product categorization",
    ],
  },
  {
    title: "Visual Store Editor",
    description: "Fine-tune every aspect of your store with a powerful drag-and-drop editor. No coding required.",
    icon: Wand2,
    gradient: "from-brand-400 to-accent-500",
    details: [
      "Drag-and-drop section management",
      "Real-time preview across devices",
      "Customizable colors, fonts, and spacing",
      "Section visibility toggles",
      "Undo/redo for safe experimentation",
    ],
  },
  {
    title: "AI Product Writer",
    description: "Create compelling product descriptions, titles, and features optimized for conversions in seconds.",
    icon: Type,
    gradient: "from-accent-500 to-cyan-500",
    details: [
      "Generate SEO-optimized descriptions",
      "Create benefit-focused feature lists",
      "Adjust tone and style to match brand",
      "Bulk generate for entire catalog",
      "Multi-language translation support",
    ],
  },
  {
    title: "AI Design Assistant",
    description: "Get professional design suggestions, color palettes, and layout improvements tailored to your industry.",
    icon: Palette,
    gradient: "from-amber-400 to-orange-500",
    details: [
      "Industry-specific style recommendations",
      "Multiple design variants per style",
      "Real-time color palette previews",
      "Typography pairing suggestions",
      "One-click design application",
    ],
  },
  {
    title: "AI Marketing Suite",
    description: "Generate social media posts, email campaigns, and ad copy that matches your brand voice perfectly.",
    icon: TrendingUp,
    gradient: "from-emerald-500 to-green-600",
    details: [
      "Social media content generation",
      "Email campaign copywriting",
      "Ad creative suggestions",
      "Brand voice consistency",
      "Schedule and automate posts",
    ],
  },
  {
    title: "AI SEO Optimizer",
    description: "Automatically optimize every page for search engines. Improve rankings without technical SEO knowledge.",
    icon: Search,
    gradient: "from-brand-400 to-blue-600",
    details: [
      "Auto-generated meta descriptions",
      "Optimized heading structure",
      "Image alt text generation",
      "Schema markup implementation",
      "Performance optimization suggestions",
    ],
  },
  {
    title: "Analytics Dashboard",
    description: "Track revenue, orders, visitors, and conversion rates with beautiful, real-time charts and insights.",
    icon: BarChart3,
    gradient: "from-merchanx-500 to-purple-600",
    details: [
      "Real-time revenue tracking",
      "Visitor behavior analytics",
      "Conversion rate optimization",
      "Sales trend forecasting",
      "Custom report generation",
    ],
  },
  {
    title: "Instant Publishing",
    description: "Publish your store on a custom domain or merchanx.app subdomain with SSL, CDN, and global hosting included.",
    icon: Globe,
    gradient: "from-accent-500 to-teal-500",
    details: [
      "One-click publishing workflow",
      "Custom domain support",
      "Free SSL certificate",
      "Global CDN distribution",
      "99.9% uptime guarantee",
    ],
  },
]

export default function FeaturesPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-merchanx-50/50 via-white to-surface pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
            <Badge variant="gradient" size="lg" className="mb-4">
              <Sparkles size={14} className="mr-1" /> All Features
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-dark">
              Everything you need to
              <br />
              <span className="gradient-text">sell online</span>
            </h1>
            <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
              From AI-powered store creation to marketing automation, analytics, and publishing — Merchanx is the complete e-commerce platform.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/onboarding">
                <Button size="xl" className="gap-2">
                  Start Free Trial <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/templates">
                <Button variant="secondary" size="xl">
                  Browse Templates
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {featureGroups.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6 sm:p-8">
                      <div className="flex items-start gap-5">
                        <div className={cn(
                          "h-14 w-14 rounded-2xl bg-gradient-to-br flex items-center justify-center flex-shrink-0 shadow-lg",
                          feature.gradient
                        )}>
                          <Icon size={26} className="text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-text-primary mb-2">{feature.title}</h3>
                          <p className="text-sm text-text-secondary leading-relaxed mb-4">{feature.description}</p>
                          <ul className="space-y-2">
                            {feature.details.map((detail) => (
                              <li key={detail} className="flex items-start gap-2 text-sm text-text-secondary">
                                <CheckCircle size={14} className="text-success mt-0.5 flex-shrink-0" />
                                {detail}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24">
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
                Ready to build your store?
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto">
                Join thousands of merchants using Merchanx to power their online business.
              </p>
              <Link href="/onboarding">
                <Button variant="secondary" size="xl" className="bg-white text-dark hover:bg-white/90 shadow-xl gap-2">
                  Start Free Trial <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
