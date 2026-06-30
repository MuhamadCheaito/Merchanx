"use client"

import { forwardRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-merchanx-500/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary: "gradient-brand text-white shadow-md hover:shadow-lg hover:shadow-merchanx-500/25 active:shadow-sm",
        secondary: "bg-white text-dark border border-border hover:bg-surface-secondary hover:border-border shadow-sm",
        ghost: "text-text-secondary hover:text-text-primary hover:bg-surface-secondary",
        danger: "bg-error text-white hover:bg-red-600 shadow-sm",
        outline: "border-2 border-merchanx-500 text-merchanx-600 hover:bg-merchanx-50",
        link: "text-merchanx-600 underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-xs gap-1.5",
        md: "h-10 px-4 text-sm gap-2",
        lg: "h-12 px-6 text-base gap-2.5",
        xl: "h-14 px-8 text-lg gap-3",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
