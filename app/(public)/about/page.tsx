"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import {
  Sparkles,
  Bot,
  Rocket,
  Target,
  Heart,
  Globe,
  ArrowRight,
  Quote,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: "easeOut" as const },
}

const values = [
  { icon: Bot, title: "AI-First", description: "We believe AI should make complex tasks simple. Every feature is built with intelligence to save you time." },
  { icon: Target, title: "Accessibility", description: "E-commerce shouldn't require a technical degree. We make it possible for anyone to sell online." },
  { icon: Heart, title: "Merchant First", description: "Every decision we make starts with one question: does this help our merchants succeed?" },
  { icon: Globe, title: "Global Reach", description: "Your store should be able to reach customers anywhere. We build for a global, connected commerce ecosystem." },
]

export default function AboutPage() {
  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <section className="relative py-16 sm:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-merchanx-50/50 via-white to-surface pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
            <Badge variant="gradient" size="lg" className="mb-4">
              <Sparkles size={14} className="mr-1" /> About Merchanx
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-dark">
              We&apos;re on a mission to
              <br />
              <span className="gradient-text">democratize e-commerce</span>
            </h1>
            <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
              Merchanx was founded on a simple belief: anyone should be able to start an online store, regardless of technical skill or budget. We use AI to make that vision a reality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <Badge variant="secondary" size="lg" className="mb-4">
                Our Story
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-dark mb-6">
                Why we built Merchanx
              </h2>
              <div className="space-y-4 text-text-secondary leading-relaxed">
                <p>
                  In 2024, we noticed a gap in the market. Small businesses and entrepreneurs were being left behind by complex, expensive e-commerce platforms. Setting up an online store required hiring developers, designers, and marketers — a cost most small businesses couldn&apos;t afford.
                </p>
                <p>
                  We asked ourselves: what if AI could bridge this gap? What if a business owner could simply describe what they sell and have a complete, professional online store built for them in minutes?
                </p>
                <p>
                  That question became Merchanx. We built an AI-powered platform that handles the heavy lifting of store creation, design, content, and marketing — so entrepreneurs can focus on what matters most: their products and customers.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="rounded-2xl gradient-brand p-8 text-white">
                <Quote size={32} className="opacity-60 mb-4" />
                <p className="text-xl sm:text-2xl font-medium leading-relaxed mb-6">
                  Everyone deserves the opportunity to sell online. We&apos;re using AI to make that opportunity accessible to all.
                </p>
                <div>
                  <p className="font-semibold">The Merchanx Team</p>
                  <p className="text-sm text-white/70">Founded in 2024</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-merchanx-50/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <Badge variant="primary" size="lg" className="mb-4">
              <Heart size={14} className="mr-1" /> Our Values
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark">
              What drives us
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="h-full text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="h-12 w-12 rounded-xl gradient-brand flex items-center justify-center mx-auto mb-4">
                        <Icon size={22} className="text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-text-primary mb-2">{value.title}</h3>
                      <p className="text-sm text-text-secondary leading-relaxed">{value.description}</p>
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
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Join us in shaping the future of commerce
              </h2>
              <p className="text-lg text-white/80 mb-8 max-w-lg mx-auto">
                Start your journey today and see what AI-powered e-commerce can do for your business.
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
