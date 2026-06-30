"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import {
  LayoutDashboard,
  Store,
  Package,
  ShoppingCart,
  Users,
  Megaphone,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { cn } from "@/lib/utils"

const sidebarLinks = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/builder", label: "Store Builder", icon: Store },
  { href: "/dashboard/products", label: "Products", icon: Package },
  { href: "/dashboard/orders", label: "Orders", icon: ShoppingCart },
  { href: "/dashboard/customers", label: "Customers", icon: Users },
  { href: "/dashboard/marketing", label: "Marketing AI", icon: Megaphone },
  { href: "/dashboard/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
]

export { sidebarLinks }

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-white transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className={cn(
        "flex h-16 items-center border-b border-border",
        collapsed ? "justify-center px-0" : "px-4"
      )}>
        {collapsed ? (
          <div className="flex items-center justify-center w-full">
            <img src="/logo2.png" alt="M" className="h-8 w-8 object-contain" />
          </div>
        ) : (
          <Logo size="lg" link={false} />
        )}
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1 scrollbar-custom">
        {sidebarLinks.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 group relative",
                isActive
                  ? "gradient-brand text-white shadow-md"
                  : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
              )}
            >
              <Icon size={20} className="flex-shrink-0" />
              {!collapsed && <span>{item.label}</span>}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg gradient-brand -z-10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          )
        })}
      </div>

      <div className="border-t border-border p-2">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center rounded-lg px-3 py-2.5 text-sm text-text-secondary hover:text-text-primary hover:bg-surface-secondary transition-colors"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
    </aside>
  )
}

export function MobileSidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname()

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-dark/50 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-border bg-white"
          >
            <div className="flex h-16 items-center px-4 border-b border-border">
              <Logo size="sm" link={false} />
            </div>
            <div className="flex-1 overflow-y-auto py-4 px-2 space-y-1">
              {sidebarLinks.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                      isActive
                        ? "gradient-brand text-white shadow-md"
                        : "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
                    )}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                )
              })}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
