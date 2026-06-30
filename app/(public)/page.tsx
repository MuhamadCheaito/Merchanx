"use client"

import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import Link from "next/link"
import {
  Sparkles,
  Zap,
  Palette,
  Search,
  BarChart3,
  Globe,
  ShoppingBag,
  Wand2,
  ArrowRight,
  CheckCircle,
  Star,
  Bot,
  Shirt,
  Smartphone,
  Heart,
  Home,
  Rocket,
  Shield,
  Layers,
  Target,
  ChevronRight,
  MessageSquare,
  Quote,
  Image,
  Type,
  TrendingUp,
  DollarSign,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
}

const stagger = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1, duration: 0.5 },
}

const features = [
  {
    icon: Wand2,
    title: "AI Store Builder",
    description: "Describe your business and let AI create a complete, professional online store tailored to your brand.",
    gradient: "from-merchanx-500 to-brand-400",
  },
  {
    icon: Palette,
    title: "Smart Customization",
    description: "Every element is fully customizable. Change colors, fonts, layouts, and content with a visual editor.",
    gradient: "from-brand-400 to-accent-500",
  },
  {
    icon: Search,
    title: "SEO Optimized",
    description: "Built-in SEO tools analyze and optimize your store for search engines automatically.",
    gradient: "from-accent-500 to-cyan-500",
  },
  {
    icon: Sparkles,
    title: "AI Content Generator",
    description: "Generate product descriptions, marketing copy, and social media posts with one click.",
    gradient: "from-merchanx-500 to-purple-600",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description: "Track revenue, orders, visitors, and conversion rates with beautiful real-time charts.",
    gradient: "from-brand-400 to-blue-600",
  },
  {
    icon: Globe,
    title: "Instant Publishing",
    description: "Publish your store on a custom merchanx.app domain or connect your own domain.",
    gradient: "from-accent-500 to-teal-500",
  },
]

const aiFeatures = [
  {
    icon: Bot,
    title: "AI Store Builder",
    description: "Generate a complete store from a simple description. AI handles layout, colors, content, and structure.",
    benefit: "Launch in under 5 minutes",
    gradient: "from-merchanx-500 to-brand-400",
  },
  {
    icon: Type,
    title: "AI Product Writer",
    description: "Create compelling product descriptions, titles, and features optimized for conversions.",
    benefit: "Save hours on content creation",
    gradient: "from-brand-400 to-accent-500",
  },
  {
    icon: TrendingUp,
    title: "AI Marketing Assistant",
    description: "Generate social media posts, email campaigns, and ad copy tailored to your brand voice.",
    benefit: "Boost engagement by 3x",
    gradient: "from-accent-500 to-cyan-500",
  },
  {
    icon: Search,
    title: "AI SEO Optimizer",
    description: "Automatically optimize meta tags, headings, alt text, and schema markup for search engines.",
    benefit: "Improve search rankings",
    gradient: "from-emerald-500 to-green-600",
  },
  {
    icon: Palette,
    title: "AI Design Assistant",
    description: "Get design suggestions, color palettes, and layout improvements based on your industry.",
    benefit: "Professional design instantly",
    gradient: "from-amber-400 to-orange-500",
  },
]

const templates = [
  { name: "Fashion Boutique", industry: "Fashion", icon: Shirt, color: "from-pink-500 to-purple-600", description: "Elegant design for clothing and accessory stores" },
  { name: "Restaurant", industry: "Food & Beverage", icon: Heart, color: "from-orange-500 to-red-500", description: "Appetizing layout for cafes, restaurants, and food brands" },
  { name: "Tech Store", industry: "Electronics", icon: Smartphone, color: "from-blue-600 to-cyan-500", description: "Modern layout for electronics and gadget stores" },
  { name: "Beauty & Cosmetics", industry: "Beauty", icon: Sparkles, color: "from-rose-400 to-pink-500", description: "Clean aesthetic for beauty and skincare brands" },
  { name: "Home & Living", industry: "Home & Garden", icon: Home, color: "from-amber-500 to-yellow-600", description: "Warm, inviting design for home decor stores" },
  { name: "Service Provider", industry: "Services", icon: Target, color: "from-slate-600 to-slate-800", description: "Professional design for service-based businesses" },
]

const whyMerchanx = [
  { icon: Rocket, title: "10x Faster", description: "Build your store in minutes, not months. AI handles the heavy lifting so you can launch fast.", color: "text-merchanx-500" },
  { icon: Shield, title: "No Coding Required", description: "Zero technical skills needed. Everything is visual, intuitive, and guided by AI.", color: "text-brand-400" },
  { icon: Layers, title: "AI-Guided Setup", description: "Smart onboarding asks the right questions and builds a store that matches your vision.", color: "text-accent-500" },
  { icon: Palette, title: "Fully Customizable", description: "Every color, font, layout, and section can be tweaked. Your brand, your rules.", color: "text-emerald-500" },
  { icon: Target, title: "Built for Small Business", description: "Affordable, scalable, and designed specifically for entrepreneurs and small teams.", color: "text-amber-500" },
  { icon: Globe, title: "Publish Anywhere", description: "Launch on your own domain or a merchanx.app subdomain. Your store, your URL.", color: "text-cyan-500" },
]

const testimonials = [
  { name: "Sarah K.", role: "Fashion Boutique Owner", business: "Fashion", text: "Merchanx built my entire store in under 5 minutes. The AI understood my brand perfectly — the colors, the tone, everything. I've tripled my online sales.", rating: 5, initials: "SK" },
  { name: "James M.", role: "Electronics Retailer", business: "Electronics", text: "The AI product descriptions alone save me hours every week. What used to take a full day now takes 10 minutes. My conversion rate is up 40%.", rating: 5, initials: "JM" },
  { name: "Lisa R.", role: "Handmade Crafts Seller", business: "Handmade", text: "I had zero coding experience and built a beautiful, professional store. The AI assistant guided me through every step. Couldn't be happier.", rating: 5, initials: "LR" },
]

const pricingPlans = [
  {
    name: "Starter",
    price: "$19",
    description: "Perfect for testing the waters",
    features: ["1 active store", "AI store builder", "Basic analytics", "Community support", "Merchanx subdomain", "Up to 50 products"],
  },
  {
    name: "Business",
    price: "$49",
    description: "For growing businesses",
    popular: true,
    features: ["3 active stores", "Advanced AI tools", "Full analytics suite", "Priority support", "Custom domain", "AI marketing suite", "Up to 500 products", "Team member access"],
  },
  {
    name: "Pro",
    price: "$99",
    description: "For serious merchants",
    features: ["Unlimited stores", "All AI features", "Real-time analytics", "Dedicated support", "Multiple domains", "API access", "Unlimited products", "Team collaboration", "Priority feature access"],
  },
]

const faqItems = [
  {
    id: "1",
    title: "What is Merchanx?",
    content: "Merchanx is an AI-powered e-commerce platform that helps anyone create, customize, and launch a professional online store in minutes. You describe your business, and our AI builds a complete store with branding, layout, and content tailored to you.",
  },
  {
    id: "2",
    title: "Do I need coding or design experience?",
    content: "Not at all. Merchanx is designed for people with zero technical skills. The AI handles the design, layout, and content creation. You just describe your business and make simple choices along the way. Everything is visual and intuitive.",
  },
  {
    id: "3",
    title: "How does the AI help build my store?",
    content: "When you start, our AI asks about your business, products, style preferences, and target audience. It then generates a complete store with brand colors, typography, layout structure, product pages, and marketing content. You can refine everything with the AI assistant.",
  },
  {
    id: "4",
    title: "Can I customize my store after AI builds it?",
    content: "Yes! Every aspect of your store is fully customizable. You can change colors, fonts, layouts, add or remove sections, edit content, and more using the visual editor and AI assistant. Your store is never locked into a template.",
  },
  {
    id: "5",
    title: "Can I use my own domain name?",
    content: "Absolutely. On the Business plan and above, you can connect your own custom domain. All plans include a free merchanx.app subdomain to get started immediately.",
  },
  {
    id: "6",
    title: "Is there a free trial?",
    content: "Yes, we offer a 14-day free trial with full access to all features. No credit card required. You can build your complete store, test everything, and only subscribe when you're ready to publish.",
  },
]

function AnimatedAIDemo() {
  return (
    <div className="rounded-2xl border border-border bg-white/80 backdrop-blur-sm shadow-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-secondary/50">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-amber-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <span className="text-xs font-medium text-text-tertiary ml-2">AI Store Builder</span>
      </div>
      <div className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="h-8 w-8 rounded-lg gradient-brand flex items-center justify-center flex-shrink-0">
            <Bot size={16} className="text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-text-secondary mb-2">What kind of store would you like to build?</p>
            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-brand-400/30 bg-brand-50 text-sm font-medium text-brand-600">
              <span>I sell handmade products</span>
              <ChevronRight size={14} />
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          {[
            { label: "Analyzing your business...", icon: CheckCircle, done: true },
            { label: "Generating store structure...", icon: CheckCircle, done: true },
            { label: "Creating brand identity...", icon: CheckCircle, done: true },
            { label: "Building product pages...", icon: CheckCircle, done: true },
            { label: "Store ready! ✨", icon: Sparkles, done: true },
          ].map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-text-tertiary"
              >
                <div className="h-6 w-6 rounded-md bg-success/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={12} className="text-success" />
                </div>
                <span className="text-sm">{s.label}</span>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4 p-4 rounded-xl bg-gradient-to-br from-merchanx-50 to-brand-50 border border-brand-200"
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-text-tertiary">Generated Store</p>
              <p className="text-sm font-bold gradient-text">Artisan&apos;s Haven</p>
            </div>
            <Badge variant="gradient" size="sm">AI Generated</Badge>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {["Handmade Jewelry", "Home Decor", "Gifts"].map((cat) => (
              <div key={cat} className="text-center p-2 rounded-lg bg-white/80 text-xs font-medium text-text-secondary border border-border/50">
                {cat}
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-3 pt-3 border-t border-brand-200/50">
            <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
              <Palette size={12} /> Brand identity created
            </div>
            <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
              <ShoppingBag size={12} /> 12 products added
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function LandingPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05])

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-merchanx-50/60 via-white to-surface pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-merchanx-500/15 via-brand-400/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-accent-500/10 via-brand-400/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-merchanx-500/5 to-accent-500/5 blur-3xl pointer-events-none" />

        <motion.div style={{ opacity, scale }} className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6"
              >
                <Badge variant="gradient" size="lg">
                  <Sparkles size={14} className="mr-1" />
                  AI-Powered E-Commerce Platform
                </Badge>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-dark leading-[1.08]"
              >
                Build your online store
                <br />
                <span className="gradient-text">with AI</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="mt-6 text-lg sm:text-xl text-text-secondary leading-relaxed max-w-xl"
              >
                From idea to professional e-commerce store in minutes. Describe your business, and let our AI build, design, and optimize everything for you.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-8 flex flex-col sm:flex-row items-start gap-4"
              >
                <Link href="/onboarding">
                  <Button size="xl" className="gap-2 text-base shadow-lg shadow-merchanx-500/20">
                    Start Free Trial <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link href="#how-it-works">
                  <Button variant="secondary" size="xl" className="text-base">
                    See How It Works
                  </Button>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="mt-10 flex flex-wrap items-center gap-6 text-sm text-text-secondary"
              >
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={16} className="text-success" /> No credit card
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={16} className="text-success" /> 14-day free trial
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={16} className="text-success" /> Cancel anytime
                </span>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="hidden lg:block"
            >
              <AnimatedAIDemo />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative py-24 sm:py-32 bg-gradient-to-b from-white to-merchanx-50/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="secondary" size="lg" className="mb-4">
              <Zap size={14} className="mr-1" /> How It Works
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark">
              From idea to store in 3 simple steps
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              No technical skills needed. Just tell us about your business and let AI do the rest.
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:block absolute top-1/3 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-merchanx-500 via-brand-400 to-accent-500" />
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              {[
                { number: "01", icon: MessageSquare, title: "Describe your business", description: "Tell us about what you sell, your style preferences, and target audience. Our AI asks the right questions to understand your brand.", gradient: "from-merchanx-500 to-brand-400" },
                { number: "02", icon: Bot, title: "AI builds your store", description: "Our AI generates a complete store with brand colors, typography, layout, and product pages tailored to your business.", gradient: "from-brand-400 to-accent-500" },
                { number: "03", icon: Rocket, title: "Customize & publish", description: "Refine everything with the visual editor and AI assistant. Preview, tweak, and publish when you're ready.", gradient: "from-accent-500 to-cyan-500" },
              ].map((step, i) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="relative text-center"
                  >
                    <div className={cn(
                      "relative inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br text-white text-xl font-bold shadow-lg mb-6",
                      step.gradient
                    )}>
                      <Icon size={22} />
                    </div>
                    <div className="absolute -top-1 -right-1 lg:right-auto lg:top-0 lg:-left-1 h-7 w-7 rounded-full gradient-brand text-white text-xs font-bold flex items-center justify-center shadow-lg">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-3">{step.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed max-w-sm mx-auto">{step.description}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section id="ai-features" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="gradient" size="lg" className="mb-4">
              <Bot size={14} className="mr-1" /> AI-Powered Capabilities
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark">
              Five AI engines, one platform
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Specialized AI models work together to build, write, design, market, and optimize your store.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {aiFeatures.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-merchanx-500/[0.03] to-brand-400/[0.03] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <Card className="relative h-full border-border/60 hover:border-merchanx-200/50 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className={cn(
                        "h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-5 shadow-lg",
                        feature.gradient
                      )}>
                        <Icon size={22} className="text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary mb-2">{feature.title}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed mb-4">{feature.description}</p>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-merchanx-600">
                        <CheckCircle size={12} />
                        {feature.benefit}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Store Templates */}
      <section id="templates" className="relative py-24 sm:py-32 bg-gradient-to-b from-white to-brand-50/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="secondary" size="lg" className="mb-4">
              <Layers size={14} className="mr-1" /> Store Templates
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark">
              Start with a template, finish with your brand
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Each template is AI-optimized for its industry. Pick one and make it yours.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {templates.map((template, i) => {
              const Icon = template.icon
              return (
                <motion.div
                  key={template.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                    <div className={cn("h-28 bg-gradient-to-br flex items-center justify-center relative", template.color)}>
                      <Icon size={40} className="text-white/70 group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-base font-semibold text-text-primary">{template.name}</h3>
                        <Badge variant="neutral" size="sm">{template.industry}</Badge>
                      </div>
                      <p className="text-sm text-text-secondary mb-4">{template.description}</p>
                      <Link href="/onboarding">
                        <Button variant="ghost" size="sm" className="gap-1.5 group/btn p-0 h-auto text-brand-400 hover:text-brand-600">
                          Try this template <ChevronRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <motion.div {...fadeUp} className="text-center mt-10">
            <Link href="/templates">
              <Button variant="secondary" size="lg" className="gap-2">
                View All Templates <ChevronRight size={16} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Why Merchanx */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="primary" size="lg" className="mb-4">
              <Rocket size={14} className="mr-1" /> Why Merchanx
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark">
              The smarter way to launch online
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Traditional e-commerce takes months. Merchanx does it in minutes — with AI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyMerchanx.map((item, i) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-4 p-5 rounded-xl border border-border bg-white hover:border-brand-200/50 hover:shadow-md transition-all duration-300"
                >
                  <div className={cn("h-10 w-10 rounded-lg bg-surface-secondary flex items-center justify-center flex-shrink-0", item.color)}>
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary mb-1">{item.title}</h3>
                    <p className="text-sm text-text-secondary leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.div {...fadeUp} className="mt-16 max-w-3xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl border border-border bg-gradient-to-br from-merchanx-50 to-brand-50 p-8">
              <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-merchanx-500/10 to-transparent rounded-full blur-2xl" />
              <div className="relative grid sm:grid-cols-3 gap-8 text-center">
                {[
                  { value: "10x", label: "Faster setup" },
                  { value: "0", label: "Coding needed" },
                  { value: "99%", label: "Satisfaction rate" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                    <p className="text-sm text-text-secondary mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Demo */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-merchanx-50/30 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="gradient" size="lg" className="mb-4">
              <Wand2 size={14} className="mr-1" /> See AI in Action
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark">
              Type what you sell. Watch AI build it.
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              No forms, no templates, no guesswork. Just describe your business and let AI create everything.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <div className="rounded-2xl border border-border bg-white shadow-xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-surface-secondary/50">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-400" />
                  <div className="h-3 w-3 rounded-full bg-amber-400" />
                  <div className="h-3 w-3 rounded-full bg-green-400" />
                </div>
                <span className="text-xs font-medium text-text-tertiary ml-2">AI Store Generator</span>
              </div>

              <div className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="h-10 w-10 rounded-xl bg-surface-secondary flex items-center justify-center flex-shrink-0">
                    <MessageSquare size={18} className="text-text-secondary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-text-tertiary mb-1.5 font-medium">Your Input</p>
                    <div className="px-4 py-3 rounded-xl border border-brand-400/40 bg-brand-50/50">
                      <p className="text-sm font-medium text-dark">
                        &ldquo;I sell handmade candles and home fragrances. My style is minimal, eco-friendly.&rdquo;
                      </p>
                    </div>
                  </div>
                </div>

                <div className="relative mb-6">
                  <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-merchanx-500/30 via-brand-400/30 to-transparent" />
                  {[
                    { time: "0.4s", text: "Analyzing your business description...", done: true },
                    { time: "1.2s", text: "Selecting optimal industry template...", done: true },
                    { time: "2.1s", text: "Generating brand identity & color palette...", done: true },
                    { time: "3.0s", text: "Building store structure and pages...", done: true },
                    { time: "3.8s", text: "Creating product catalog & descriptions...", done: true },
                    { time: "4.5s", text: "Optimizing for SEO & performance...", done: true },
                  ].map((line, i) => (
                    <motion.div
                      key={line.text}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      className="flex items-start gap-3 pl-5 pb-4 last:pb-0"
                    >
                      <div className="h-5 w-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <CheckCircle size={12} className="text-success" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-text-secondary">{line.text}</p>
                        <p className="text-[10px] text-text-tertiary">{line.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 1.2 }}
                  className="p-5 rounded-xl bg-gradient-to-br from-merchanx-50 via-brand-50 to-white border border-brand-200/50"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-[10px] text-text-tertiary uppercase tracking-wider font-medium">AI Generated Store</p>
                      <p className="text-lg font-bold gradient-text mt-0.5">Scent & Co.</p>
                    </div>
                    <Badge variant="gradient" size="sm">
                      <Sparkles size={10} className="mr-1" /> Ready in 4.5s
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    {["Candles", "Diffusers", "Soaps", "Gift Sets"].map((cat) => (
                      <div key={cat} className="text-center p-2.5 rounded-lg bg-white/80 border border-border/50 text-xs font-medium text-text-secondary">
                        {cat}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-text-tertiary pt-3 border-t border-brand-200/30">
                    <span className="flex items-center gap-1"><Palette size={12} /> Brand identity created</span>
                    <span className="flex items-center gap-1"><ShoppingBag size={12} /> 24 products added</span>
                    <span className="flex items-center gap-1"><Image size={12} /> SEO meta generated</span>
                  </div>
                </motion.div>

                <div className="mt-6 text-center">
                  <Link href="/onboarding">
                    <Button size="lg" className="gap-2 shadow-lg shadow-merchanx-500/20">
                      Try It With Your Business <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="primary" size="lg" className="mb-4">
              <Star size={14} className="mr-1" /> Trusted by Merchants
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark">
              Loved by thousands of businesses
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              From fashion to electronics, merchants love how easy it is to build with Merchanx.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full gradient-brand flex items-center justify-center text-sm font-bold text-white">
                        {t.initials}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-text-primary">{t.name}</p>
                        <p className="text-xs text-text-tertiary">{t.role}</p>
                      </div>
                      <Badge variant="neutral" size="sm">{t.business}</Badge>
                    </div>
                    <div className="flex gap-0.5 mb-4">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative py-24 sm:py-32 bg-gradient-to-b from-merchanx-50/30 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="secondary" size="lg" className="mb-4">
              <DollarSign size={14} className="mr-1" /> Simple Pricing
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark">
              Start for free, scale as you grow
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              No hidden fees. Upgrade anytime. All plans include a 14-day free trial.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <Badge variant="gradient" size="md">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <Card className={cn(
                  "h-full",
                  plan.popular && "ring-2 ring-merchanx-500 shadow-xl shadow-merchanx-500/10"
                )}>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-text-primary mb-1">{plan.name}</h3>
                    <p className="text-sm text-text-secondary mb-4">{plan.description}</p>
                    <div className="mb-6">
                      <span className="text-4xl font-bold text-text-primary">{plan.price}</span>
                      <span className="text-sm text-text-secondary">/month</span>
                    </div>
                    <Link href="/onboarding">
                      <Button
                        variant={plan.popular ? "primary" : "secondary"}
                        className="w-full mb-6"
                      >
                        Get Started
                      </Button>
                    </Link>
                    <ul className="space-y-3">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-text-secondary">
                          <CheckCircle size={16} className="text-success mt-0.5 flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="relative py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="neutral" size="lg" className="mb-4">
              <Quote size={14} className="mr-1" /> FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-lg text-text-secondary">
              Everything you need to know about Merchanx.
            </p>
          </motion.div>

          <motion.div {...fadeUp} className="max-w-2xl mx-auto">
            <Accordion items={faqItems} />
          </motion.div>

          <motion.div {...fadeUp} className="text-center mt-10">
            <p className="text-sm text-text-secondary">
              Still have questions? <Link href="/contact" className="text-brand-400 hover:text-brand-600 font-medium">Contact our team</Link>
            </p>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-b from-white to-merchanx-50/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl gradient-brand p-8 sm:p-12 lg:p-16 text-center"
          >
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAyNHYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <Badge variant="gradient" size="lg" className="bg-white/20 text-white border-0 mb-4">
                  <Rocket size={14} className="mr-1" /> Get Started Today
                </Badge>
              </motion.div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Ready to launch your store?
              </h2>
              <p className="text-lg sm:text-xl text-white/80 mb-8 max-w-xl mx-auto">
                Join thousands of merchants using AI to build and grow their online business.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/onboarding">
                  <Button
                    variant="secondary"
                    size="xl"
                    className="bg-white text-dark hover:bg-white/90 shadow-xl text-base gap-2"
                  >
                    Start Free Trial <ArrowRight size={18} />
                  </Button>
                </Link>
                <Link href="/features">
                  <Button
                    variant="ghost"
                    size="xl"
                    className="text-white hover:bg-white/10 text-base"
                  >
                    View Features
                  </Button>
                </Link>
              </div>
              <p className="mt-4 text-sm text-white/60">No credit card required. 14-day free trial.</p>
            </div>
          </motion.div>
        </div>
      </section>

    </>
  )
}
