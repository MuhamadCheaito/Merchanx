import { cn } from "@/lib/utils"

export function BrandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-6 w-6", className)}
    >
      <defs>
        <linearGradient id="brand-icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#bf30ef" />
          <stop offset="100%" stopColor="#3e60f4" />
        </linearGradient>
      </defs>
      <path
        d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"
        stroke="url(#brand-icon-gradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function BrandLogoSmall({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-7 w-7", className)}
    >
      <rect width="28" height="28" rx="8" fill="url(#brand-icon-gradient)" />
      <path
        d="M8 14l4-4 4 4-4 4-4-4z"
        fill="white"
        opacity="0.9"
      />
      <path
        d="M12 10l4 4-4 4"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}
