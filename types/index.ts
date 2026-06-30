export interface BusinessInfo {
  name: string
  product: string
  targetCustomer: string
  style: BrandStyle
  personality: BrandPersonality
}

export type BrandStyle = "luxury" | "minimal" | "modern" | "playful" | "professional"
export type BrandPersonality = "sophisticated" | "friendly" | "innovative" | "trustworthy" | "bold"

export interface Store {
  id: string
  name: string
  slug: string
  status: "draft" | "preview" | "published"
  businessInfo: BusinessInfo
  sections: StoreSection[]
  brandColors: BrandColors
  createdAt: Date
  updatedAt: Date
}

export interface BrandColors {
  primary: string
  secondary: string
  accent: string
  background: string
  text: string
}

export interface StoreSection {
  id: string
  type: SectionType
  title: string
  content: Record<string, unknown>
  order: number
  visible: boolean
}

export type SectionType =
  | "hero"
  | "products"
  | "categories"
  | "testimonials"
  | "faq"
  | "newsletter"
  | "contact"
  | "footer"

export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string
  seoTitle: string
  seoDescription: string
  createdAt: Date
}

export interface Order {
  id: string
  customer: string
  email: string
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  items: number
  createdAt: Date
}

export interface Analytics {
  revenue: number
  revenueChange: number
  orders: number
  ordersChange: number
  visitors: number
  visitorsChange: number
  conversionRate: number
  conversionChange: number
}

export interface AIRecommendation {
  id: string
  type: "seo" | "design" | "content" | "marketing"
  title: string
  description: string
  impact: "high" | "medium" | "low"
}
