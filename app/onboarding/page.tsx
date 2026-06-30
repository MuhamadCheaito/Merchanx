"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { OnboardingForm } from "@/components/onboarding/onboarding-form"

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <Logo size="lg" />
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-merchanx-100 text-merchanx-700 text-xs font-medium mb-4">
              <span className="h-1.5 w-1.5 rounded-full bg-merchanx-500 animate-pulse" />
              AI-Powered Setup
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-3">
              Let&apos;s build your store
            </h1>
            <p className="text-text-secondary text-lg">
              Answer a few questions and our AI will create a complete store tailored to your brand.
            </p>
          </div>

          <OnboardingForm />
        </motion.div>
      </div>
    </div>
  )
}
