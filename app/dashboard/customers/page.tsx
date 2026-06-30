"use client"

import { motion } from "framer-motion"
import { Users, Search, Mail } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { formatPrice, formatDate } from "@/lib/utils"

const customers = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", orders: 12, spent: 1250.00, joined: "2026-01-15" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", orders: 8, spent: 890.00, joined: "2026-02-20" },
  { id: 3, name: "Carol White", email: "carol@example.com", orders: 15, spent: 2340.00, joined: "2025-11-03" },
  { id: 4, name: "David Brown", email: "david@example.com", orders: 3, spent: 210.00, joined: "2026-04-10" },
  { id: 5, name: "Eve Davis", email: "eve@example.com", orders: 7, spent: 1050.00, joined: "2026-03-22" },
]

export default function CustomersPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Customers</h1>
        <p className="text-text-secondary mt-1">View and manage your customer base.</p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" />
              <Input placeholder="Search customers..." className="pl-9" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4">
        {customers.map((customer, i) => (
          <motion.div
            key={customer.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <Card className="card-hover">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full gradient-brand flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                    {customer.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-text-primary">{customer.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Mail size={12} className="text-text-tertiary" />
                      <span className="text-xs text-text-secondary">{customer.email}</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6 text-right">
                    <div>
                      <p className="text-xs text-text-tertiary">Orders</p>
                      <p className="text-sm font-semibold text-text-primary">{customer.orders}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-tertiary">Spent</p>
                      <p className="text-sm font-semibold text-text-primary">{formatPrice(customer.spent)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-tertiary">Customer since</p>
                      <p className="text-sm text-text-secondary">{formatDate(customer.joined)}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
