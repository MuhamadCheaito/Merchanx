"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import {
  Sparkles,
  Mail,
  MessageSquare,
  MapPin,
  ArrowRight,
  CheckCircle,
  Send,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const contactMethods = [
  { icon: Mail, label: "Email", value: "hello@merchanx.app", href: "mailto:hello@merchanx.app" },
  { icon: MessageSquare, label: "Live Chat", value: "Available 9AM-5PM EST", href: "#" },
  { icon: MapPin, label: "Location", value: "San Francisco, CA", href: "#" },
]

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    setTimeout(() => {
      setSending(false)
      setSubmitted(true)
    }, 1200)
  }

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
              <Sparkles size={14} className="mr-1" /> Get in Touch
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-dark">
              We&apos;d love to hear from you
            </h1>
            <p className="mt-4 text-lg text-text-secondary">
              Have a question, suggestion, or need help? Reach out to our team.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method) => {
                const Icon = method.icon
                return (
                  <motion.div
                    key={method.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <a href={method.href}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardContent className="p-5 flex items-center gap-4">
                          <div className="h-10 w-10 rounded-xl gradient-brand flex items-center justify-center flex-shrink-0">
                            <Icon size={18} className="text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-text-primary">{method.label}</p>
                            <p className="text-sm text-text-secondary">{method.value}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  </motion.div>
                )
              })}
            </div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardContent className="p-6 sm:p-8">
                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="h-16 w-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle size={32} className="text-success" />
                      </div>
                      <h3 className="text-xl font-semibold text-text-primary mb-2">Message sent!</h3>
                      <p className="text-sm text-text-secondary mb-6">
                        We&apos;ll get back to you within 24 hours.
                      </p>
                      <Button onClick={() => setSubmitted(false)} variant="secondary">
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-1.5">Name</label>
                          <Input placeholder="Your name" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-text-primary mb-1.5">Email</label>
                          <Input type="email" placeholder="you@example.com" required />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1.5">Subject</label>
                        <Input placeholder="How can we help?" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-1.5">Message</label>
                        <textarea
                          className="w-full min-h-[140px] px-3 py-2 rounded-lg border border-border bg-white text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:ring-2 focus:ring-merchanx-500/20 focus:border-merchanx-500 transition-all resize-y"
                          placeholder="Tell us more about your inquiry..."
                          required
                        />
                      </div>
                      <Button type="submit" disabled={sending} className="gap-2">
                        {sending ? (
                          <><Loader2 size={16} className="animate-spin" /> Sending...</>
                        ) : (
                          <><Send size={16} /> Send Message</>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <p className="text-sm text-text-secondary">
              Looking for help getting started? Visit our <Link href="/help" className="text-brand-400 hover:text-brand-600 font-medium">documentation</Link> or check the <Link href="/#faq" className="text-brand-400 hover:text-brand-600 font-medium">FAQ</Link>.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
