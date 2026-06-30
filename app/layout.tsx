import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Merchanx - AI-Powered E-Commerce Platform",
  description:
    "Create, customize, and launch your online store in minutes with AI. Describe your business and let Merchanx build a professional e-commerce store with branding, products, and marketing.",
  keywords: [
    "e-commerce",
    "AI store builder",
    "online store",
    "ecommerce platform",
    "AI ecommerce",
    "small business",
    "sell online",
  ],
  openGraph: {
    title: "Merchanx - AI-Powered E-Commerce Platform",
    description:
      "Create, customize, and launch your online store in minutes with AI. No coding required.",
    type: "website",
    siteName: "Merchanx",
  },
  twitter: {
    card: "summary_large_image",
    title: "Merchanx - AI-Powered E-Commerce Platform",
    description:
      "Create, customize, and launch your online store in minutes with AI. No coding required.",
  },
  icons: { icon: "/favicon/favicon.ico" },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased min-h-screen bg-surface text-text-primary font-sans">
        {children}
      </body>
    </html>
  )
}
