"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, ChevronDown } from "lucide-react"
import { Logo } from "@/components/brand/logo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/features", label: "Features" },
  { href: "/templates", label: "Templates" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/about", label: "About" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  const isHome = pathname === "/"

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled || !isHome
          ? "glass border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo size="lg" />

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-merchanx-600"
                    : "text-text-secondary hover:text-text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={isHome ? "#features" : "/#features"}
              className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
            >
              How It Works
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Link href="/onboarding">
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/onboarding">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-text-primary"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-border bg-white"
          >
            <div className="px-4 py-4 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-medium text-text-secondary hover:text-text-primary py-2"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href={isHome ? "#features" : "/#features"}
                onClick={() => setIsOpen(false)}
                className="block text-sm font-medium text-text-secondary hover:text-text-primary py-2"
              >
                How It Works
              </Link>
              <div className="pt-3 flex flex-col gap-2">
                <Link href="/onboarding" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/onboarding" onClick={() => setIsOpen(false)}>
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
