"use client"

import { motion } from "framer-motion"
import {
  TrendingUp,
  TrendingDown,
  ShoppingCart,
  DollarSign,
  Users,
  Eye,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn, formatPrice, formatNumber } from "@/lib/utils"

const stats = [
  {
    label: "Total Revenue",
    value: 45231.89,
    change: 12.5,
    icon: DollarSign,
    prefix: "$",
  },
  {
    label: "Orders",
    value: 1247,
    change: 8.2,
    icon: ShoppingCart,
  },
  {
    label: "Visitors",
    value: 48291,
    change: -2.4,
    icon: Eye,
  },
  {
    label: "Conversion Rate",
    value: 3.24,
    change: 1.1,
    icon: Users,
    suffix: "%",
  },
]

const recentOrders = [
  { id: "#ORD-001", customer: "Alice Johnson", product: "Premium Hoodie", amount: 89.99, status: "delivered" as const },
  { id: "#ORD-002", customer: "Bob Smith", product: "Minimalist Watch", amount: 249.00, status: "processing" as const },
  { id: "#ORD-003", customer: "Carol White", product: "Leather Bag", amount: 199.00, status: "pending" as const },
  { id: "#ORD-004", customer: "David Brown", product: "Sunglasses", amount: 129.00, status: "shipped" as const },
  { id: "#ORD-005", customer: "Eve Davis", product: "Sneakers", amount: 159.00, status: "delivered" as const },
]

const recommendations = [
  {
    title: "Optimize SEO Titles",
    description: "Your product pages could rank higher with better meta titles.",
    impact: "high" as const,
    type: "seo" as const,
  },
  {
    title: "Add Testimonials Section",
    description: "Stores with testimonials see 23% higher conversion rates.",
    impact: "high" as const,
    type: "design" as const,
  },
  {
    title: "Improve Hero Copy",
    description: "Your hero section could better communicate your value proposition.",
    impact: "medium" as const,
    type: "content" as const,
  },
]

const statusColors = {
  pending: "warning" as const,
  processing: "primary" as const,
  shipped: "accent" as const,
  delivered: "success" as const,
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Dashboard</h1>
          <p className="text-text-secondary mt-1">
            Welcome back! Here&apos;s your store overview.
          </p>
        </div>
        <Button className="hidden sm:flex gap-2">
          <Sparkles size={16} />
          AI Insights
        </Button>
      </div>

      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          const isPositive = stat.change >= 0
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
                    <span className="text-2xl font-bold text-text-primary">
                      {stat.prefix || ""}
                      {stat.value.toLocaleString()}
                      {stat.suffix || ""}
                    </span>
                    <span className={cn(
                      "flex items-center gap-0.5 text-xs font-medium",
                      isPositive ? "text-success" : "text-error"
                    )}>
                      {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                      {Math.abs(stat.change)}%
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Orders</CardTitle>
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ArrowRight size={14} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between py-2 border-b border-border last:border-0"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-lg bg-surface-secondary flex items-center justify-center">
                        <ShoppingCart size={14} className="text-text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{order.customer}</p>
                        <p className="text-xs text-text-tertiary">{order.product}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={statusColors[order.status]}>
                        {order.status}
                      </Badge>
                      <span className="text-sm font-medium text-text-primary">
                        {formatPrice(order.amount)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>AI Recommendations</CardTitle>
                <Sparkles size={16} className="text-merchanx-500" />
              </div>
              <p className="text-sm text-text-secondary">
                Smart suggestions to grow your store
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendations.map((rec) => (
                <div
                  key={rec.title}
                  className="p-3 rounded-lg bg-surface-secondary/50 hover:bg-surface-secondary transition-colors cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "h-2 w-2 rounded-full mt-1.5 flex-shrink-0",
                      rec.impact === "high" ? "bg-merchanx-500" : "bg-brand-400"
                    )} />
                    <div>
                      <p className="text-sm font-medium text-text-primary">{rec.title}</p>
                      <p className="text-xs text-text-secondary mt-0.5">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


