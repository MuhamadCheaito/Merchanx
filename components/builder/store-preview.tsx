"use client"

import { motion } from "framer-motion"
import {
  Smartphone,
  Monitor,
  Tablet,
  ShoppingBag,
  ChevronRight,
  Star,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { AutosaveIndicator } from "@/components/builder/autosave-indicator"
import type { SaveStatus } from "@/hooks/use-autosave"

type Device = "desktop" | "tablet" | "mobile"

export function StorePreview({
  device,
  onDeviceChange,
  saveStatus,
  lastSaved,
}: {
  device: Device
  onDeviceChange: (device: Device) => void
  saveStatus: SaveStatus
  lastSaved: Date
}) {
  const deviceClasses = {
    desktop: "w-full max-w-5xl h-[600px]",
    tablet: "w-[768px] h-[600px]",
    mobile: "w-[375px] h-[600px]",
  }

  return (
    <div className="flex flex-col h-full">
      {/* Device Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-white">
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-border overflow-hidden">
            {[
              { value: "desktop" as const, icon: Monitor, label: "Desktop" },
              { value: "tablet" as const, icon: Tablet, label: "Tablet" },
              { value: "mobile" as const, icon: Smartphone, label: "Mobile" },
            ].map((d) => {
              const Icon = d.icon
              const isActive = device === d.value
              return (
                <button
                  key={d.value}
                  onClick={() => onDeviceChange(d.value)}
                  className={cn(
                    "p-2 transition-colors relative group",
                    isActive
                      ? "gradient-brand text-white"
                      : "text-text-secondary hover:text-text-primary bg-white"
                  )}
                  title={d.label}
                >
                  <Icon size={16} />
                </button>
              )
            })}
          </div>
        </div>
        <AutosaveIndicator status={saveStatus} lastSaved={lastSaved} />
      </div>

      {/* Preview Canvas */}
      <div className="flex-1 bg-[#f3f4f6] flex items-start justify-center p-4 sm:p-8 overflow-y-auto">
        <div
          className={cn(
            "bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-500",
            deviceClasses[device]
          )}
        >
          {/* Mock Store Content */}
          <div className="h-full overflow-y-auto">
            {/* Hero Section */}
            <div className="gradient-brand p-8 sm:p-12 text-center text-white">
              <Badge variant="gradient" size="sm" className="bg-white/20 text-white border-0 mb-4">
                Welcome
              </Badge>
              <h1 className="text-2xl sm:text-4xl font-bold mb-3">Your Store Name</h1>
              <p className="text-sm sm:text-base text-white/80 max-w-md mx-auto mb-6">
                Discover amazing products tailored just for you.
              </p>
              <Button variant="secondary" size="sm" className="bg-white text-dark hover:bg-white/90">
                Shop Now <ChevronRight size={16} />
              </Button>
            </div>

            {/* Products Section */}
            <div className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-dark mb-4">Featured Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-xl border border-border overflow-hidden group cursor-pointer">
                    <div className="aspect-square bg-gradient-to-br from-surface-secondary to-surface-tertiary flex items-center justify-center">
                      <ShoppingBag size={24} className="text-text-tertiary" />
                    </div>
                    <div className="p-3">
                      <p className="text-sm font-medium text-text-primary truncate">Product {i}</p>
                      <p className="text-sm font-semibold text-merchanx-600">$29.99</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-surface-secondary p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-dark mb-4 text-center">What Our Customers Say</h2>
              <div className="max-w-md mx-auto text-center">
                <div className="flex justify-center gap-1 mb-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-text-secondary italic">
                  &ldquo;Amazing quality and even better service. Highly recommend!&rdquo;
                </p>
                <p className="text-xs font-medium text-text-primary mt-2">- Happy Customer</p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-6 text-center text-xs text-text-tertiary">
              &copy; 2026 Your Store. Powered by Merchanx.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
