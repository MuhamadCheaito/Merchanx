import Link from "next/link"
import { Logo } from "@/components/brand/logo"

const footerLinks = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Templates", href: "/templates" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Integrations", href: "#" },
    { label: "Changelog", href: "#" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
  Resources: [
    { label: "Documentation", href: "/help" },
    { label: "API Reference", href: "#" },
    { label: "Status", href: "#" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
}

const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "GitHub", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "YouTube", href: "#" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          <div className="col-span-2 md:col-span-1">
            <Logo size="xl" />
            <p className="mt-4 text-sm text-text-secondary leading-relaxed max-w-xs">
              Create, customize, and launch your online store in minutes with the power of AI.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="h-9 w-9 rounded-lg bg-surface-secondary flex items-center justify-center text-text-secondary hover:bg-merchanx-100 hover:text-merchanx-600 transition-all duration-200"
                  aria-label={link.label}
                >
                  <span className="text-xs font-semibold">{link.label[0]}</span>
                </a>
              ))}
            </div>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-text-primary mb-4">{category}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 lg:mt-16 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-text-tertiary">
            &copy; {new Date().getFullYear()} Merchanx. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-text-tertiary hover:text-text-secondary transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-sm text-text-tertiary hover:text-text-secondary transition-colors">
              Terms
            </Link>
            <span className="text-sm text-text-tertiary">Powered by AI</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
