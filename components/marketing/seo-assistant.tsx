"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Search,
  Globe,
  TrendingUp,
  AlertCircle,
  CheckCircle2,
  Sparkles,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface SEOIssue {
  type: "error" | "warning" | "suggestion"
  message: string
  fix: string
}

export function SEOAssistant() {
  const [url, setUrl] = useState("")
  const [analyzing, setAnalyzing] = useState(false)
  const [results, setResults] = useState<SEOIssue[] | null>(null)

  const handleAnalyze = () => {
    if (!url.trim()) return
    setAnalyzing(true)
    setTimeout(() => {
      setResults([
        { type: "error", message: "Missing meta description on homepage", fix: "Add a compelling meta description under 160 characters" },
        { type: "warning", message: "Product images missing alt text", fix: "Add descriptive alt text to all product images" },
        { type: "suggestion", message: "Page title could be more descriptive", fix: "Include primary keywords in your page title" },
        { type: "error", message: "Slow page load time detected", fix: "Optimize image sizes and leverage browser caching" },
        { type: "suggestion", message: "Missing social media meta tags", fix: "Add Open Graph and Twitter Card meta tags" },
        { type: "warning", message: "URL structure could be improved", fix: "Use clean, keyword-rich URLs instead of parameters" },
      ])
      setAnalyzing(false)
    }, 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Analysis</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="url">Page URL</Label>
          <div className="flex gap-2 mt-1.5">
            <Input
              id="url"
              placeholder="your-store.merchanx.app"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleAnalyze}
              disabled={!url.trim() || analyzing}
              className="gap-2"
            >
              {analyzing ? (
                <><Loader2 size={14} className="animate-spin" /> Analyzing</>
              ) : (
                <><Search size={14} /> Analyze</>
              )}
            </Button>
          </div>
        </div>

        {results && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2 mb-4">
              <Globe size={16} className="text-brand-400" />
              <span className="text-sm font-medium text-text-primary">Analysis Results</span>
              <Badge variant="neutral" size="sm">{results.length} issues found</Badge>
            </div>

            {results.map((issue, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl bg-white border border-border"
              >
                <div className="flex items-start gap-3">
                  {issue.type === "error" ? (
                    <AlertCircle size={16} className="text-error mt-0.5 flex-shrink-0" />
                  ) : issue.type === "warning" ? (
                    <AlertCircle size={16} className="text-warning mt-0.5 flex-shrink-0" />
                  ) : (
                    <TrendingUp size={16} className="text-brand-400 mt-0.5 flex-shrink-0" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="text-sm font-medium text-text-primary">{issue.message}</p>
                      <Badge
                        variant={issue.type === "error" ? "danger" : issue.type === "warning" ? "warning" : "primary"}
                        size="sm"
                      >
                        {issue.type}
                      </Badge>
                    </div>
                    <div className="flex items-start gap-1.5">
                      <Sparkles size={12} className="text-merchanx-500 mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-text-secondary">{issue.fix}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        {!results && (
          <div className="text-center py-12">
            <div className="h-16 w-16 rounded-2xl bg-surface-secondary flex items-center justify-center mx-auto mb-4">
              <Search size={28} className="text-text-tertiary" />
            </div>
            <h3 className="text-sm font-medium text-text-primary mb-1">Analyze your SEO</h3>
            <p className="text-xs text-text-secondary">Enter a URL to get SEO improvement suggestions.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
