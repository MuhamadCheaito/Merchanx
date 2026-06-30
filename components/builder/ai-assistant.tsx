"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Sparkles,
  Send,
  Bot,
  User,
  Wand2,
  Palette,
  Type,
  Image as ImageIcon,
  Layout,
  Copy,
  Check,
  Loader2,
  X,
  TrendingUp,
  Search,
  ShoppingBag,
  Star,
  ChevronRight,
  Lightbulb,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  changes?: string[]
}

const quickActions = [
  { icon: Layout, text: "Improve my homepage", color: "from-merchanx-500 to-brand-400" },
  { icon: Palette, text: "Make store more premium", color: "from-brand-400 to-accent-500" },
  { icon: Type, text: "Create product description", color: "from-accent-500 to-cyan-500" },
  { icon: TrendingUp, text: "Suggest ways to increase sales", color: "from-emerald-500 to-green-600" },
  { icon: Search, text: "Optimize my store SEO", color: "from-brand-400 to-blue-600" },
  { icon: Star, text: "Improve hero section", color: "from-amber-400 to-orange-500" },
]

const contextualResponses: Record<string, { message: string; changes: string[] }> = {
  homepage: {
    message: "I've analyzed your homepage and here are the improvements I recommend:\n\n**1. Hero Section Redesign**\nMade your hero more impactful with a clearer value proposition and stronger call-to-action.\n\n**2. Visual Hierarchy**\nImproved spacing and typography to guide visitors naturally through the page.\n\n**3. Trust Signals**\nAdded customer testimonials and trust badges near the fold.\n\n**4. Performance Optimization**\nOptimized images and reduced load time by approximately 40%.",
    changes: ["Redesigned hero layout", "Updated typography scale", "Added social proof section", "Optimized image loading"],
  },
  premium: {
    message: "I'll transform your store with a premium aesthetic:\n\n**1. Luxury Color Palette**\nDeepened primary colors and added gold/amber accent tones.\n\n**2. Refined Typography**\nUsing elegant font weights, better letter-spacing, and improved line heights.\n\n**3. Sophisticated Layout**\nFull-width hero with gradient overlay, refined card designs, and premium spacing.\n\n**4. Premium Details**\nAdded subtle animations, glass morphism effects, and refined border treatments.",
    changes: ["Applied luxury color scheme", "Updated typography system", "Redesigned card components", "Added glass morphism effects"],
  },
  description: {
    message: "Here's an optimized product description:\n\n**Title:** Premium Quality Meets Exceptional Design\n\n**Description:**\nExperience unparalleled quality with our carefully crafted product. Designed for those who refuse to compromise, every detail has been thoughtfully considered to deliver an exceptional experience.\n\n**Key Features:**\n- Premium materials for lasting durability\n- Ergonomic design for maximum comfort\n- Versatile style that complements any aesthetic\n- Backed by our satisfaction guarantee\n\n**Perfect for:**\nCustomers who value quality, style, and functionality in every purchase.",
    changes: ["Generated compelling product title", "Created benefit-focused description", "Added key features section", "Defined target audience"],
  },
  sales: {
    message: "Here are my top recommendations to increase sales:\n\n**1. Add Urgency & Scarcity**\nImplement countdown timers for limited offers and low-stock indicators.\n\n**2. Improve Product Pages**\nAdd size guides, detailed specifications, and customer Q&A sections.\n\n**3. Social Proof**\nDisplay recent purchases, live visitor count, and customer reviews prominently.\n\n**4. Email Recovery**\nSet up abandoned cart emails and post-purchase follow-ups.\n\n**5. Bundle Deals**\nCreate product bundles with a discount to increase average order value.",
    changes: ["Added urgency indicators", "Enhanced product pages", "Added social proof widgets", "Setup email automation"],
  },
  seo: {
    message: "I've analyzed your store's SEO. Here's what needs improvement:\n\n**1. Meta Descriptions**\nAdded compelling meta descriptions to all product pages (under 160 characters).\n\n**2. Heading Structure**\nImproved H1-H3 hierarchy across all pages for better crawlability.\n\n**3. Image Alt Text**\nAdded descriptive alt text to all product images for image search optimization.\n\n**4. URL Structure**\nOptimized URLs to be clean, keyword-rich, and consistent.\n\n**5. Schema Markup**\nAdded Product schema for rich snippets in search results.",
    changes: ["Updated meta descriptions", "Fixed heading hierarchy", "Added image alt texts", "Optimized URL structure"],
  },
  hero: {
    message: "Here's how I'll improve your hero section:\n\n**1. Stronger Headline**\nRewrote your main headline to immediately communicate value.\n\n**2. Compelling Subtext**\nAdded supporting text that addresses customer pain points.\n\n**3. Improved CTA**\nMade the call-to-action more prominent and action-oriented.\n\n**4. Visual Enhancement**\nAdded a gradient overlay and refined the background treatment.",
    changes: ["Rewrote hero headline", "Updated supporting text", "Redesigned CTA button", "Enhanced visual effects"],
  },
}

export function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "👋 Hi! I'm your Merchanx AI assistant. I can help you improve your store's design, content, and performance. Try one of the suggestions below or ask me anything!",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isThinking, setIsThinking] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [showActions, setShowActions] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSend = async (text?: string) => {
    const messageText = text || input
    if (!messageText.trim() || isThinking) return

    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsThinking(true)
    setShowActions(false)

    setTimeout(() => {
      let response: { message: string; changes: string[] } = {
        message: "I've analyzed your request. Here's what I recommend:\n\n- **Design Update**: Refining the visual layout for better appeal\n- **Content Optimization**: Enhancing copy to be more engaging\n- **Style Improvements**: Adjusting colors and typography\n\nWould you like me to apply these changes?",
        changes: ["Design refinements applied", "Content optimized", "Styles updated"],
      }

      const lower = messageText.toLowerCase()
      for (const [key, val] of Object.entries(contextualResponses)) {
        if (lower.includes(key)) {
          response = val
          break
        }
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.message,
        changes: response.changes,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMsg])
      setIsThinking(false)
    }, 1800)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full gradient-brand text-white shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-glow-purple",
          isOpen && "scale-0 opacity-0"
        )}
      >
        <Bot size={24} />
      </button>

      {/* Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-dark/20 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-[420px] bg-white border-l border-border shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 h-16 border-b border-border">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg gradient-brand flex items-center justify-center">
                    <Sparkles size={16} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-text-primary">AI Assistant</h3>
                    <p className="text-xs text-text-secondary">Merchanx AI • Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1" ref={scrollRef}>
                <div className="p-4 space-y-4">
                  {messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex gap-3",
                        msg.role === "user" ? "flex-row-reverse" : ""
                      )}
                    >
                      <div
                        className={cn(
                          "h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-1",
                          msg.role === "assistant"
                            ? "gradient-brand"
                            : "bg-surface-secondary"
                        )}
                      >
                        {msg.role === "assistant" ? (
                          <Bot size={16} className="text-white" />
                        ) : (
                          <User size={16} className="text-text-secondary" />
                        )}
                      </div>
                      <div className={cn(
                        "rounded-xl px-4 py-2.5 max-w-[85%]",
                        msg.role === "assistant"
                          ? "bg-surface-secondary text-text-primary"
                          : "gradient-brand text-white"
                      )}>
                        <div className="text-sm whitespace-pre-wrap leading-relaxed">
                          {msg.content}
                        </div>

                        {msg.changes && msg.changes.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-border/50">
                            <p className="text-xs font-medium text-text-secondary mb-2">Changes applied:</p>
                            <div className="flex flex-wrap gap-1.5">
                              {msg.changes.map((change, i) => (
                                <Badge key={i} variant="success" size="sm">
                                  <Check size={10} className="mr-1" />
                                  {change}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}

                        <p className={cn(
                          "text-[10px] mt-2",
                          msg.role === "assistant" ? "text-text-tertiary" : "text-white/60"
                        )}>
                          {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {isThinking && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <div className="h-8 w-8 rounded-lg gradient-brand flex items-center justify-center flex-shrink-0">
                        <Bot size={16} className="text-white" />
                      </div>
                      <div className="rounded-xl px-4 py-3 bg-surface-secondary">
                        <div className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                          >
                            <Sparkles size={14} className="text-merchanx-500" />
                          </motion.div>
                          <span className="text-sm text-text-secondary">Analyzing your store...</span>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Quick Actions */}
                  {showActions && messages.length === 1 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="pt-2"
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb size={14} className="text-amber-500" />
                        <span className="text-xs font-medium text-text-secondary">Suggested actions</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {quickActions.map((action) => {
                          const Icon = action.icon
                          return (
                            <button
                              key={action.text}
                              onClick={() => handleSend(action.text)}
                              className="flex items-start gap-2 p-3 rounded-xl border border-border bg-white hover:border-brand-400 hover:shadow-sm transition-all duration-200 text-left group"
                            >
                              <div className={cn(
                                "h-7 w-7 rounded-lg bg-gradient-to-br flex items-center justify-center flex-shrink-0 mt-0.5",
                                action.color
                              )}>
                                <Icon size={12} className="text-white" />
                              </div>
                              <span className="text-xs text-text-primary font-medium group-hover:text-brand-400 transition-colors">
                                {action.text}
                              </span>
                            </button>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Input */}
              <div className="p-4 border-t border-border">
                <div className="flex gap-2">
                  <Input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSend()
                      }
                    }}
                    placeholder="Ask me anything..."
                    className="flex-1"
                  />
                  <Button
                    onClick={() => handleSend()}
                    disabled={!input.trim() || isThinking}
                    size="icon"
                  >
                    <Send size={16} />
                  </Button>
                </div>
                <p className="text-[10px] text-text-tertiary text-center mt-2">
                  AI can make mistakes. Review changes before applying.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
