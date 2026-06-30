"use client"

import { useState } from "react"
import { Sidebar, MobileSidebar } from "@/components/layout/sidebar"
import { DashboardHeader } from "@/components/layout/dashboard-header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [mobileSidebar, setMobileSidebar] = useState(false)

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <MobileSidebar open={mobileSidebar} onClose={() => setMobileSidebar(false)} />
      <div className="lg:pl-64">
        <DashboardHeader onMenuClick={() => setMobileSidebar(true)} />
        <main className="p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
