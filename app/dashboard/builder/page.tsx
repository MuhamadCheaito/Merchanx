"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Sparkles,
  PanelRightOpen,
  PanelRightClose,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SectionEditor } from "@/components/builder/section-editor"
import { StorePreview } from "@/components/builder/store-preview"
import { AIAssistant } from "@/components/builder/ai-assistant"
import { DesignAssistant } from "@/components/builder/design-assistant"
import { TemplateMarketplace } from "@/components/builder/template-marketplace"
import { useUndoRedo } from "@/hooks/use-undo-redo"
import { useAutosave } from "@/hooks/use-autosave"
import type { StoreSection } from "@/types"

const defaultSections: StoreSection[] = [
  { id: "1", type: "hero", title: "Hero", content: {}, order: 0, visible: true },
  { id: "2", type: "categories", title: "Categories", content: {}, order: 1, visible: true },
  { id: "3", type: "products", title: "Products", content: {}, order: 2, visible: true },
  { id: "4", type: "testimonials", title: "Testimonials", content: {}, order: 3, visible: true },
  { id: "5", type: "faq", title: "FAQ", content: {}, order: 4, visible: true },
  { id: "6", type: "newsletter", title: "Newsletter", content: {}, order: 5, visible: true },
  { id: "7", type: "contact", title: "Contact", content: {}, order: 6, visible: true },
  { id: "8", type: "footer", title: "Footer", content: {}, order: 7, visible: true },
]

type Device = "desktop" | "tablet" | "mobile"

export default function BuilderPage() {
  const [showEditor, setShowEditor] = useState(true)
  const [selectedSection, setSelectedSection] = useState<string | null>(null)
  const [device, setDevice] = useState<Device>("desktop")

  const {
    state: sections,
    set: setSections,
    undo,
    redo,
    canUndo,
    canRedo,
  } = useUndoRedo<StoreSection[]>(defaultSections)

  const { status: saveStatus, lastSaved } = useAutosave(sections)

  return (
    <div className="h-[calc(100vh-4rem)] -m-4 sm:-m-6 lg:-m-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between px-4 h-12 border-b border-border bg-white">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-semibold text-text-primary">Store Builder</h2>
          <Badge variant="primary" size="sm">
            <Sparkles size={10} className="mr-1" />
            AI Powered
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowEditor(!showEditor)}
            className="gap-1.5"
          >
            {showEditor ? <PanelRightClose size={14} /> : <PanelRightOpen size={14} />}
            {showEditor ? "Hide Panel" : "Show Panel"}
          </Button>
          <Button size="sm" className="gap-1.5">
            <Sparkles size={14} />
            AI Optimize
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex h-[calc(100%-3rem)]">
        {/* Editor Panel */}
        <motion.div
          initial={false}
          animate={{
            width: showEditor ? 320 : 0,
            opacity: showEditor ? 1 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="border-r border-border bg-white overflow-hidden flex-shrink-0"
        >
          {showEditor && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="w-[320px] h-full"
            >
              <SectionEditor
                sections={sections}
                onSectionsChange={setSections}
                selectedSection={selectedSection}
                onSelectSection={setSelectedSection}
                onUndo={undo}
                onRedo={redo}
                canUndo={canUndo}
                canRedo={canRedo}
              />
            </motion.div>
          )}
        </motion.div>

        {/* Preview */}
        <div className="flex-1 min-w-0">
          <StorePreview
            device={device}
            onDeviceChange={setDevice}
            saveStatus={saveStatus}
            lastSaved={lastSaved}
          />
        </div>
      </div>

      {/* AI Assistants */}
      <AIAssistant />
      <DesignAssistant />
      <TemplateMarketplace />
    </div>
  )
}
