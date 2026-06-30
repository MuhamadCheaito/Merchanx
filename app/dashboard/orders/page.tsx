"use client"

import { motion } from "framer-motion"
import {
  ShoppingCart,
  Search,
  ArrowRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { formatPrice, formatDate } from "@/lib/utils"

const orders = [
  { id: "#ORD-001", customer: "Alice Johnson", email: "alice@example.com", total: 89.99, items: 2, status: "delivered" as const, date: "2026-06-28" },
  { id: "#ORD-002", customer: "Bob Smith", email: "bob@example.com", total: 249.00, items: 1, status: "processing" as const, date: "2026-06-27" },
  { id: "#ORD-003", customer: "Carol White", email: "carol@example.com", total: 199.00, items: 3, status: "pending" as const, date: "2026-06-26" },
  { id: "#ORD-004", customer: "David Brown", email: "david@example.com", total: 129.00, items: 1, status: "shipped" as const, date: "2026-06-25" },
  { id: "#ORD-005", customer: "Eve Davis", email: "eve@example.com", total: 318.00, items: 4, status: "delivered" as const, date: "2026-06-24" },
]

const statusColors = {
  pending: "warning" as const,
  processing: "primary" as const,
  shipped: "accent" as const,
  delivered: "success" as const,
}

export default function OrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Orders</h1>
          <p className="text-text-secondary mt-1">Track and manage customer orders.</p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative max-w-xs">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
            <Input placeholder="Search orders..." className="pl-9" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-xs font-medium text-text-tertiary uppercase tracking-wider px-4 py-3">Order</th>
                  <th className="text-left text-xs font-medium text-text-tertiary uppercase tracking-wider px-4 py-3">Customer</th>
                  <th className="text-left text-xs font-medium text-text-tertiary uppercase tracking-wider px-4 py-3">Date</th>
                  <th className="text-left text-xs font-medium text-text-tertiary uppercase tracking-wider px-4 py-3">Status</th>
                  <th className="text-right text-xs font-medium text-text-tertiary uppercase tracking-wider px-4 py-3">Total</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, i) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-border last:border-0 hover:bg-surface-secondary/50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-text-primary">{order.id}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div>
                        <p className="text-sm font-medium text-text-primary">{order.customer}</p>
                        <p className="text-xs text-text-tertiary">{order.email}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-text-secondary">{formatDate(order.date)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant={statusColors[order.status]} size="sm">{order.status}</Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span className="text-sm font-semibold text-text-primary">{formatPrice(order.total)}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm">
                        View <ArrowRight size={14} />
                      </Button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
