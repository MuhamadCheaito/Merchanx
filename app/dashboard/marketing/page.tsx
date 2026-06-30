"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SocialGenerator } from "@/components/marketing/social-generator"
import { SEOAssistant } from "@/components/marketing/seo-assistant"
import { Megaphone, Search, Sparkles } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function MarketingPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Marketing AI</h1>
        <p className="text-text-secondary mt-1">Generate marketing content and optimize your SEO.</p>
      </div>

      <Tabs defaultValue="social" className="w-full">
        <TabsList>
          <TabsTrigger value="social" className="gap-2">
            <Megaphone size={16} />
            Social Media
          </TabsTrigger>
          <TabsTrigger value="seo" className="gap-2">
            <Search size={16} />
            SEO Assistant
          </TabsTrigger>
          <TabsTrigger value="content" className="gap-2">
            <Sparkles size={16} />
            AI Content
          </TabsTrigger>
        </TabsList>
        <TabsContent value="social" className="mt-6">
          <SocialGenerator />
        </TabsContent>
        <TabsContent value="seo" className="mt-6">
          <SEOAssistant />
        </TabsContent>
        <TabsContent value="content" className="mt-6">
          <div className="text-center py-16">
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-merchanx-100 to-brand-100 flex items-center justify-center mx-auto mb-4">
              <Sparkles size={28} className="text-merchanx-500" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">AI Content Generator</h3>
            <p className="text-sm text-text-secondary max-w-md mx-auto">
              Generate product descriptions, SEO titles, marketing copy, and more with AI.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
