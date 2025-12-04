import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 neon-glow-blue",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        neon: "glass border-neon-blue/30 text-neon-blue hover:bg-neon-blue/10 hover:border-neon-blue/50 neon-glow-blue hover:shadow-[0_0_30px_hsla(var(--neon-blue),0.6)] transition-all duration-300",
        "neon-pink": "glass border-neon-pink/30 text-neon-pink hover:bg-neon-pink/10 hover:border-neon-pink/50 neon-glow-pink hover:shadow-[0_0_30px_hsla(var(--neon-pink),0.6)] transition-all duration-300",
        "neon-purple": "glass border-neon-purple/30 text-neon-purple hover:bg-neon-purple/10 hover:border-neon-purple/50 neon-glow-purple hover:shadow-[0_0_30px_hsla(var(--neon-purple),0.6)] transition-all duration-300",
        holographic: "holographic-border text-white hover:scale-105 transition-all duration-300 shimmer",
        "neon-solid": "bg-gradient-to-r from-neon-blue to-neon-purple text-white hover:from-neon-purple hover:to-neon-pink shadow-[0_0_20px_hsla(var(--neon-blue),0.5)] hover:shadow-[0_0_30px_hsla(var(--neon-purple),0.7)] transition-all duration-300",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
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
