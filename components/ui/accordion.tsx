"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionItem {
  id: string
  title: string
  content: string
}

interface AccordionProps {
  items: AccordionItem[]
  className?: string
}

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <div className={cn("space-y-3", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id
        return (
          <div
            key={item.id}
            className={cn(
              "rounded-xl border border-border bg-white overflow-hidden transition-all duration-200",
              isOpen && "shadow-md border-brand-400/30"
            )}
          >
            <button
              onClick={() => setOpenId(isOpen ? null : item.id)}
              className="flex items-center justify-between w-full px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold text-text-primary">{item.title}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className={cn(
                  "h-6 w-6 rounded-lg flex items-center justify-center flex-shrink-0",
                  isOpen ? "bg-merchanx-100 text-merchanx-600" : "bg-surface-secondary text-text-tertiary"
                )}
              >
                <ChevronDown size={14} />
              </motion.div>
            </button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-5 pb-4">
                    <p className="text-sm text-text-secondary leading-relaxed">{item.content}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
