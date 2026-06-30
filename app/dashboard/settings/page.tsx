"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Store,
  Globe,
  Palette,
  Bell,
  CreditCard,
  Users,
  Shield,
  Save,
  Check,
  Eye,
  Share2,
  ExternalLink,
  Copy,
  Loader2,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

export default function SettingsPage() {
  const [saved, setSaved] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const [published, setPublished] = useState(false)
  const [copied, setCopied] = useState(false)
  const [storeStatus, setStoreStatus] = useState<"draft" | "preview" | "published">("draft")

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handlePublish = () => {
    setPublishing(true)
    setTimeout(() => {
      setPublishing(false)
      setPublished(true)
      setStoreStatus("published")
      setTimeout(() => setPublished(false), 3000)
    }, 2000)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText("mystore.merchanx.app")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const statusColors = {
    draft: "warning" as const,
    preview: "primary" as const,
    published: "success" as const,
  }

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Settings</h1>
        <p className="text-text-secondary mt-1">Manage your store settings, publishing, and preferences.</p>
      </div>

      {/* Publishing Card */}
      <Card className="overflow-hidden">
        <div className="gradient-brand p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <Badge variant="gradient" size="sm" className="bg-white/20 text-white border-0 mb-2">
                <Globe size={10} className="mr-1" /> Publishing
              </Badge>
              <h3 className="text-lg font-semibold">Your store is live at</h3>
              <p className="text-white/80 text-sm font-mono mt-1">mystore.merchanx.app</p>
            </div>
            <Badge variant={statusColors[storeStatus]} size="md" className="capitalize">
              {storeStatus}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <div className="flex flex-wrap gap-3">
            <Button size="sm" variant="secondary" className="gap-1.5">
              <Eye size={14} /> Preview
            </Button>
            <Button size="sm" variant="secondary" className="gap-1.5" onClick={handleCopy}>
              {copied ? <><Check size={14} /> Copied</> : <><Share2 size={14} /> Copy Link</>}
            </Button>
            <Button
              size="sm"
              onClick={handlePublish}
              disabled={publishing || storeStatus === "published"}
              className="gap-1.5"
            >
              {publishing ? (
                <><Loader2 size={14} className="animate-spin" /> Publishing...</>
              ) : published ? (
                <><Check size={14} /> Published!</>
              ) : storeStatus === "published" ? (
                <><Check size={14} /> Published</>
              ) : (
                <><Globe size={14} /> Publish Store</>
              )}
            </Button>
          </div>
          {storeStatus === "published" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="mt-4 p-3 rounded-lg bg-success/10 border border-success/20 flex items-center gap-2"
            >
              <Check size={16} className="text-success" />
              <span className="text-sm text-success font-medium">Your store is live and accessible to customers!</span>
            </motion.div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Store size={18} className="text-merchanx-500" />
            <CardTitle>Store Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Store Name</Label>
              <Input defaultValue="My Merchanx Store" className="mt-1.5" />
            </div>
            <div>
              <Label>Store Email</Label>
              <Input defaultValue="hello@mystore.com" className="mt-1.5" />
            </div>
          </div>
          <div>
            <Label>Store Description</Label>
            <Input defaultValue="Your store description goes here" className="mt-1.5" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Globe size={18} className="text-brand-400" />
            <CardTitle>Domain</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-surface-secondary">
            <div className="flex-1">
              <p className="text-sm font-medium text-text-primary">Merchanx subdomain</p>
              <p className="text-sm text-brand-400 font-mono">mystore.merchanx.app</p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1.5" onClick={handleCopy}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
            </Button>
            <ExternalLink size={14} className="text-text-tertiary" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label>Custom Domain</Label>
              <div className="flex gap-2 mt-1.5">
                <Input placeholder="yourstore.com" className="flex-1" />
                <Button variant="secondary" size="sm">Connect</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Palette size={18} className="text-accent-500" />
            <CardTitle>Brand Colors</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: "Primary", color: "#bf30ef" },
              { label: "Secondary", color: "#3e60f4" },
              { label: "Accent", color: "#14a8f4" },
              { label: "Background", color: "#ffffff" },
            ].map((c) => (
              <div key={c.label}>
                <Label className="text-xs">{c.label}</Label>
                <div className="flex items-center gap-2 mt-1">
                  <div
                    className="h-8 w-8 rounded-lg border border-border flex-shrink-0"
                    style={{ backgroundColor: c.color }}
                  />
                  <span className="text-xs font-mono text-text-secondary">{c.color}</span>
                </div>
              </div>
            ))}
          </div>
          <Button variant="secondary" size="sm" className="gap-1.5">
            <Sparkles size={14} /> AI Suggest Colors
          </Button>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3 pb-8">
        <Button variant="secondary">Cancel</Button>
        <Button onClick={handleSave} className="gap-2">
          {saved ? (
            <><Check size={16} className="text-white" /> Saved</>
          ) : (
            <><Save size={16} /> Save Changes</>
          )}
        </Button>
      </div>
    </div>
  )
}
