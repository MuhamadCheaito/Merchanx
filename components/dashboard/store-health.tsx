"use client"

import { motion } from "framer-motion"
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  TrendingUp,
  Eye,
  Search,
  ShoppingBag,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface HealthMetric {
  label: string
  score: number
  icon: typeof Sparkles
  color: string
  issues: { type: "error" | "warning" | "suggestion"; text: string }[]
}

const healthMetrics: HealthMetric[] = [
  {
    label: "Design Quality",
    score: 78,
    icon: Eye,
    color: "from-merchanx-500 to-brand-400",
    issues: [
      { type: "suggestion", text: "Add more visual hierarchy to product pages" },
      { type: "warning", text: "Hero section could be more engaging" },
    ],
  },
  {
    label: "Product Information",
    score: 65,
    icon: ShoppingBag,
    color: "from-brand-400 to-accent-500",
    issues: [
      { type: "error", text: "3 products missing descriptions" },
      { type: "warning", text: "Product images missing alt text" },
      { type: "suggestion", text: "Add size guides for clothing items" },
    ],
  },
  {
    label: "SEO Performance",
    score: 72,
    icon: Search,
    color: "from-accent-500 to-cyan-500",
    issues: [
      { type: "warning", text: "Meta descriptions too short on 5 pages" },
      { type: "suggestion", text: "Add more internal links between products" },
    ],
  },
  {
    label: "Customer Experience",
    score: 85,
    icon: TrendingUp,
    color: "from-emerald-500 to-green-600",
    issues: [
      { type: "suggestion", text: "Add live chat support for better engagement" },
    ],
  },
]

const aiRecommendations = [
  {
    icon: Sparkles,
    title: "Boost your conversion rate",
    description: "Your product pages have a 2.1% conversion rate. Adding customer reviews could increase it to 3.5%.",
    impact: "high" as const,
    action: "Add Reviews Section",
  },
  {
    icon: Search,
    title: "Optimize for search engines",
    description: "5 of your products are missing meta descriptions. Fixing this could improve organic traffic by 23%.",
    impact: "high" as const,
    action: "Fix SEO Issues",
  },
  {
    icon: Eye,
    title: "Improve homepage design",
    description: "Your homepage bounce rate is 65%. A more engaging hero section could reduce this significantly.",
    impact: "medium" as const,
    action: "Redesign Hero",
  },
  {
    icon: ShoppingBag,
    title: "Complete product information",
    description: "3 products have incomplete descriptions. Complete products are 40% more likely to convert.",
    impact: "medium" as const,
    action: "Update Products",
  },
]

export function StoreHealth() {
  const overallScore = Math.round(
    healthMetrics.reduce((acc, m) => acc + m.score, 0) / healthMetrics.length
  )

  return (
    <div className="space-y-6">
      {/* Overall Health Score */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="42" fill="none" stroke="var(--color-surface-tertiary)" strokeWidth="8" />
                <motion.circle
                  cx="50" cy="50" r="42" fill="none"
                  stroke="url(#health-gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 42}`}
                  initial={{ strokeDashoffset: 2 * Math.PI * 42 }}
                  animate={{ strokeDashoffset: 2 * Math.PI * 42 * (1 - overallScore / 100) }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="health-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#bf30ef" />
                    <stop offset="100%" stopColor="#3e60f4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-text-primary">{overallScore}</span>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary">Store Health Score</h3>
              <p className="text-sm text-text-secondary mt-1">
                {overallScore >= 80 ? "Your store is performing well!" :
                 overallScore >= 60 ? "Some areas need improvement." :
                 "Several areas need attention."}
              </p>
              <Badge
                variant={overallScore >= 80 ? "success" : overallScore >= 60 ? "warning" : "danger"}
                size="sm"
                className="mt-2"
              >
                {overallScore >= 80 ? "Great" : overallScore >= 60 ? "Needs Work" : "Critical"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Metrics */}
      <div className="grid gap-4 sm:grid-cols-2">
        {healthMetrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className={cn("h-8 w-8 rounded-lg bg-gradient-to-br flex items-center justify-center", metric.color)}>
                      <metric.icon size={14} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-text-primary">{metric.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-20 rounded-full bg-surface-tertiary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.score}%` }}
                        transition={{ duration: 1, delay: i * 0.1 + 0.3 }}
                        className={cn("h-full rounded-full", metric.score >= 80 ? "bg-success" : metric.score >= 60 ? "bg-warning" : "bg-error")}
                      />
                    </div>
                    <span className="text-xs font-semibold text-text-primary">{metric.score}%</span>
                  </div>
                </div>
                <div className="space-y-1.5">
                  {metric.issues.map((issue, j) => (
                    <div key={j} className="flex items-start gap-1.5">
                      {issue.type === "error" ? (
                        <AlertCircle size={12} className="text-error mt-0.5 flex-shrink-0" />
                      ) : issue.type === "warning" ? (
                        <AlertTriangle size={12} className="text-warning mt-0.5 flex-shrink-0" />
                      ) : (
                        <Sparkles size={12} className="text-brand-400 mt-0.5 flex-shrink-0" />
                      )}
                      <span className="text-xs text-text-secondary">{issue.text}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-merchanx-500" />
            <CardTitle>AI Recommendations</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {aiRecommendations.map((rec, i) => {
            const Icon = rec.icon
            return (
              <motion.div
                key={rec.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-xl bg-surface-secondary/50 hover:bg-surface-secondary transition-colors cursor-pointer group"
              >
                <div className={cn(
                  "h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0",
                  rec.impact === "high" ? "gradient-brand" : "bg-brand-100"
                )}>
                  <Icon size={14} className={rec.impact === "high" ? "text-white" : "text-brand-600"} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-text-primary">{rec.title}</span>
                    <Badge variant={rec.impact === "high" ? "danger" : "warning"} size="sm">
                      {rec.impact} impact
                    </Badge>
                  </div>
                  <p className="text-xs text-text-secondary">{rec.description}</p>
                </div>
                <button className="text-xs font-medium text-merchanx-600 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {rec.action} →
                </button>
              </motion.div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
