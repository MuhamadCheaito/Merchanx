import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  showText?: boolean
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  link?: boolean
}

const sizes: Record<string, { img: number; text?: string }> = {
  sm: { img: 28 },
  md: { img: 36 },
  lg: { img: 100 },
  xl: { img: 150 },
}

export function Logo({ size = "md", className, link = true }: LogoProps) {
  const { img } = sizes[size]

  const content = (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative flex-shrink-0">
        <Image
          src="/logo2.png"
          alt="Merchanx"
          width={img}
          height={img}
          className="object-contain"
          priority
        />
      </div>
    </div>
  )

  if (link) {
    return <Link href="/">{content}</Link>
  }

  return content
}
