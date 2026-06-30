"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Sparkles,
  BookOpen,
  Rocket,
  Bot,
  Palette,
  Globe,
  Search,
  ArrowRight,
  ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
}

const categories = [
  {
    title: "Getting Started",
    description: "Everything you need to create your first store",
    icon: Rocket,
    gradient: "from-merchanx-500 to-brand-400",
    articles: [
      "What is Merchanx?",
      "Creating your account",
      "Complete the onboarding wizard",
      "Understanding the dashboard",
    ],
  },
  {
    title: "Building Your Store",
    description: "Customize and manage your online store",
    icon: Palette,
    gradient: "from-brand-400 to-accent-500",
    articles: [
      "Using the Store Builder",
      "Managing sections and layout",
      "Customizing colors and fonts",
      "Adding products to your store",
    ],
  },
  {
    title: "AI Tools Guide",
    description: "Make the most of Merchanx AI capabilities",
    icon: Bot,
    gradient: "from-accent-500 to-cyan-500",
    articles: [
      "AI Store Builder overview",
      "Generating product descriptions",
      "Using the AI Design Assistant",
      "AI Marketing tools guide",
    ],
  },
  {
    title: "Publishing & Domain",
    description: "Launch your store and go live",
    icon: Globe,
    gradient: "from-emerald-500 to-green-600",
    articles: [
      "Publishing your store",
      "Connecting a custom domain",
      "Preview mode explained",
      "Store status management",
    ],
  },
  {
    title: "SEO & Marketing",
    description: "Drive traffic and grow sales",
    icon: Search,
    gradient: "from-amber-400 to-orange-500",
    articles: [
      "SEO optimization guide",
      "Social media marketing",
      "Analytics overview",
      "Conversion tips",
    ],
  },
  {
    title: "Account & Settings",
    description: "Manage your account and preferences",
    icon: BookOpen,
    gradient: "from-slate-500 to-slate-600",
    articles: [
      "Account settings",
      "Team management",
      "Billing and plans",
      "Security and privacy",
    ],
  },
]

export default function HelpPage() {
  return (
    <div className="pt-24 pb-16">
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-merchanx-50/50 via-white to-surface pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="gradient" size="lg" className="mb-4">
              <Sparkles size={14} className="mr-1" /> Help Center
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-dark">
              How can we help?
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Browse documentation, guides, and resources to get the most out of Merchanx.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((cat, i) => {
              const Icon = cat.icon
              return (
                <motion.div
                  key={cat.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                    <CardContent className="p-6">
                      <div className={cn("h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center mb-4 shadow-lg", cat.gradient)}>
                        <Icon size={22} className="text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary mb-1">{cat.title}</h3>
                      <p className="text-sm text-text-secondary mb-4">{cat.description}</p>
                      <ul className="space-y-2">
                        {cat.articles.map((article) => (
                          <li key={article}>
                            <a
                              href="#"
                              className="flex items-center gap-1.5 text-sm text-text-secondary hover:text-brand-400 transition-colors group"
                            >
                              <ChevronRight size={12} className="text-text-tertiary group-hover:translate-x-0.5 transition-transform" />
                              {article}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-gradient-to-br from-merchanx-50 to-brand-50 p-8 sm:p-12 text-center"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-dark mb-4">
              Still need help?
            </h2>
            <p className="text-text-secondary mb-6 max-w-md mx-auto">
              Can&apos;t find what you&apos;re looking for? Contact our support team and we&apos;ll get back to you.
            </p>
            <Link href="/contact">
              <Button className="gap-2">
                Contact Support <ArrowRight size={16} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
