"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users,
  Eye,
  BarChart3,
  Calendar,
  Sparkles,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StoreHealth } from "@/components/dashboard/store-health"
import { cn } from "@/lib/utils"

const stats = [
  { label: "Revenue", value: "$45,231", change: 12.5, icon: DollarSign, up: true },
  { label: "Orders", value: "1,247", change: 8.2, icon: ShoppingCart, up: true },
  { label: "Visitors", value: "48,291", change: -2.4, icon: Eye, up: false },
  { label: "Conversion", value: "3.24%", change: 1.1, icon: Users, up: true },
]

const chartMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
const chartData = [12, 19, 15, 25, 22, 30]

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Analytics</h1>
          <p className="text-text-secondary mt-1">Track your store&apos;s performance with AI insights.</p>
        </div>
        <Button variant="secondary" size="sm" className="gap-2">
          <Calendar size={14} /> Last 30 days
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview" className="gap-2">
            <BarChart3 size={16} /> Overview
          </TabsTrigger>
          <TabsTrigger value="health" className="gap-2">
            <Sparkles size={16} /> Store Health
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className="card-hover">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm text-text-secondary">{stat.label}</span>
                        <div className="h-9 w-9 rounded-lg gradient-brand flex items-center justify-center">
                          <Icon size={16} className="text-white" />
                        </div>
                      </div>
                      <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-text-primary">{stat.value}</span>
                        <span className={cn(
                          "flex items-center gap-0.5 text-xs font-medium",
                          stat.up ? "text-success" : "text-error"
                        )}>
                          {stat.up ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                          {Math.abs(stat.change)}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end gap-2 h-48">
                  {chartData.map((value, i) => {
                    const height = (value / Math.max(...chartData)) * 100
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2">
                        <span className="text-[10px] text-text-tertiary">{value}%</span>
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${height}%` }}
                          transition={{ delay: i * 0.1, duration: 0.5, ease: "easeOut" as const }}
                          className="w-full rounded-t-lg gradient-brand"
                          style={{ minHeight: 4 }}
                        />
                        <span className="text-[10px] text-text-tertiary">{chartMonths[i]}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { source: "Direct", percentage: 35, color: "bg-merchanx-500" },
                  { source: "Organic Search", percentage: 28, color: "bg-brand-400" },
                  { source: "Social Media", percentage: 20, color: "bg-accent-500" },
                  { source: "Referral", percentage: 12, color: "bg-success" },
                  { source: "Email", percentage: 5, color: "bg-warning" },
                ].map((item) => (
                  <div key={item.source}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-text-primary">{item.source}</span>
                      <span className="text-sm font-medium text-text-primary">{item.percentage}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" as const }}
                        className={`h-full rounded-full ${item.color}`}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: "New order received", detail: "#ORD-006 - $129.00", time: "2 min ago" },
                  { action: "Product viewed", detail: "Premium Hoodie - 45 views", time: "15 min ago" },
                  { action: "New customer registered", detail: "Frank Wilson", time: "1 hour ago" },
                  { action: "Order delivered", detail: "#ORD-003 - $199.00", time: "2 hours ago" },
                  { action: "AI suggestion applied", detail: "SEO titles optimized", time: "3 hours ago" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "h-2 w-2 rounded-full",
                        i === 0 ? "bg-merchanx-500" : "bg-surface-tertiary"
                      )} />
                      <div>
                        <p className="text-sm text-text-primary">{item.action}</p>
                        <p className="text-xs text-text-tertiary">{item.detail}</p>
                      </div>
                    </div>
                    <span className="text-xs text-text-tertiary">{item.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="health" className="mt-6">
          <StoreHealth />
        </TabsContent>
      </Tabs>
    </div>
  )
}
