"use client"

import { motion } from "framer-motion"
import { Cloud, CloudOff, Loader2, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { SaveStatus } from "@/hooks/use-autosave"

interface AutosaveIndicatorProps {
  status: SaveStatus
  lastSaved: Date
  className?: string
}

export function AutosaveIndicator({ status, lastSaved, className }: AutosaveIndicatorProps) {
  const config = {
    saved: {
      icon: Check,
      label: "Auto-saved",
      color: "text-success",
      bg: "bg-success/10",
    },
    unsaved: {
      icon: CloudOff,
      label: "Unsaved changes",
      color: "text-warning",
      bg: "bg-warning/10",
    },
    saving: {
      icon: Loader2,
      label: "Saving...",
      color: "text-brand-400",
      bg: "bg-brand-400/10",
    },
  }

  const { icon: Icon, label, color, bg } = config[status]

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors",
        bg,
        color,
        className
      )}
    >
      {status === "saving" ? (
        <Icon size={12} className="animate-spin" />
      ) : (
        <Icon size={12} />
      )}
      <span>{label}</span>
      {status === "saved" && (
        <span className="opacity-60">
          {lastSaved.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </span>
      )}
    </motion.div>
  )
}
