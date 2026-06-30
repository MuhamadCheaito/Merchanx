"use client"

import { Menu, Bell, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface DashboardHeaderProps {
  onMenuClick: () => void
  title?: string
}

export function DashboardHeader({ onMenuClick, title }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-white/80 backdrop-blur-lg px-4 sm:px-6">
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 text-text-secondary hover:text-text-primary"
      >
        <Menu size={20} />
      </button>

      {title && (
        <h1 className="text-lg font-semibold text-text-primary hidden sm:block">
          {title}
        </h1>
      )}

      <div className="flex-1" />

      <div className="hidden md:flex relative max-w-xs w-full">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
        <Input placeholder="Search..." className="pl-9 h-9 text-sm" />
      </div>

      <button className="relative p-2 text-text-secondary hover:text-text-primary transition-colors">
        <Bell size={20} />
        <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-merchanx-500" />
      </button>

      <Avatar className="h-8 w-8 cursor-pointer">
        <AvatarImage src="" />
        <AvatarFallback>MX</AvatarFallback>
      </Avatar>
    </header>
  )
}
