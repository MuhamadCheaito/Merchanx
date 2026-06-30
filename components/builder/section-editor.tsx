"use client"

import { motion, Reorder } from "framer-motion"
import {
  GripVertical,
  Eye,
  EyeOff,
  Trash2,
  Plus,
  Layout,
  Star,
  Mail,
  Phone,
  FileQuestion,
  ShoppingBag,
  Grid3X3,
  Undo2,
  Redo2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { StoreSection, SectionType } from "@/types"

const sectionIcons: Record<SectionType, typeof Layout> = {
  hero: Layout,
  products: ShoppingBag,
  categories: Grid3X3,
  testimonials: Star,
  faq: FileQuestion,
  newsletter: Mail,
  contact: Phone,
  footer: Layout,
}

const sectionColors: Record<SectionType, string> = {
  hero: "from-merchanx-500 to-brand-400",
  products: "from-brand-400 to-accent-500",
  categories: "from-accent-500 to-cyan-500",
  testimonials: "from-amber-400 to-orange-500",
  faq: "from-brand-400 to-blue-600",
  newsletter: "from-merchanx-500 to-purple-600",
  contact: "from-accent-500 to-teal-500",
  footer: "from-slate-500 to-slate-600",
}

export function SectionEditor({
  sections,
  onSectionsChange,
  selectedSection,
  onSelectSection,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}: {
  sections: StoreSection[]
  onSectionsChange: (sections: StoreSection[]) => void
  selectedSection: string | null
  onSelectSection: (id: string | null) => void
  onUndo: () => void
  onRedo: () => void
  canUndo: boolean
  canRedo: boolean
}) {
  const toggleVisibility = (id: string) => {
    onSectionsChange(
      sections.map((s) => (s.id === id ? { ...s, visible: !s.visible } : s))
    )
  }

  const removeSection = (id: string) => {
    onSectionsChange(sections.filter((s) => s.id !== id))
  }

  const addSection = () => {
    const newSection: StoreSection = {
      id: Math.random().toString(36).substring(2, 10),
      type: "hero",
      title: "New Section",
      content: {},
      order: sections.length,
      visible: true,
    }
    onSectionsChange([...sections, newSection])
  }

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-white">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-semibold text-text-primary">Sections</h3>
          <Badge variant="neutral" size="sm">{sections.length}</Badge>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={onUndo}
            disabled={!canUndo}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              canUndo
                ? "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
                : "text-text-tertiary cursor-not-allowed"
            )}
          >
            <Undo2 size={14} />
          </button>
          <button
            onClick={onRedo}
            disabled={!canRedo}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              canRedo
                ? "text-text-secondary hover:text-text-primary hover:bg-surface-secondary"
                : "text-text-tertiary cursor-not-allowed"
            )}
          >
            <Redo2 size={14} />
          </button>
          <div className="w-px h-5 bg-border mx-1" />
          <Button size="sm" className="gap-1.5" onClick={addSection}>
            <Plus size={14} /> Add
          </Button>
        </div>
      </div>

      {/* Section List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-custom">
        <Reorder.Group axis="y" values={sections} onReorder={onSectionsChange}>
          {sections.map((section) => {
            const Icon = sectionIcons[section.type]
            const isSelected = selectedSection === section.id
            return (
              <Reorder.Item key={section.id} value={section}>
                <motion.div
                  layout
                  className={cn(
                    "group flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer",
                    isSelected
                      ? "border-merchanx-500 bg-merchanx-50 shadow-sm"
                      : "border-border bg-white hover:border-brand-400 hover:shadow-sm"
                  )}
                  onClick={() => onSelectSection(section.id)}
                >
                  <GripVertical
                    size={16}
                    className="text-text-tertiary cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity"
                  />

                  <div className={cn(
                    "h-8 w-8 rounded-lg bg-gradient-to-br flex items-center justify-center",
                    sectionColors[section.type]
                  )}>
                    <Icon size={14} className="text-white" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-text-primary">{section.title}</p>
                    <p className="text-xs text-text-tertiary capitalize">{section.type}</p>
                  </div>

                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleVisibility(section.id) }}
                      className="p-1.5 rounded-md text-text-tertiary hover:text-text-primary hover:bg-surface-secondary transition-colors"
                    >
                      {section.visible ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                    <button
                      onClick={(e) => { e.stopPropagation(); removeSection(section.id) }}
                      className="p-1.5 rounded-md text-text-tertiary hover:text-error hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </motion.div>
              </Reorder.Item>
            )
          })}
        </Reorder.Group>
      </div>

      {/* Store Status */}
      <div className="p-4 border-t border-border bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-amber-400" />
            <span className="text-xs text-text-secondary">Draft mode</span>
          </div>
          <Button size="sm" variant="secondary" className="gap-1.5">
            <Eye size={14} /> Preview
          </Button>
        </div>
      </div>
    </div>
  )
}
