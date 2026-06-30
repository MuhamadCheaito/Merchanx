import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const Input = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-merchanx-500/50 focus-visible:border-merchanx-500",
          "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-secondary",
          "transition-all duration-200",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
