"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import gsap from "gsap"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        "interactive-light":
          "border-2 border-white bg-white text-black hover:bg-transparent hover:text-white [--blob-color:black] hover:cursor-pointer",
        "interactive-dark":
          "border-2 border-black bg-black text-white hover:bg-transparent hover:text-black [--blob-color:white] hover:cursor-pointer",
        "footer-button":
          "border-2 border-white text-white hover:bg-transparent hover:text-black [--blob-color:white] hover:cursor-pointer",
        "btn-primary":
          "border-2 border-[#121212] text-black hover:bg-transparent hover:text-white [--blob-color:#121212] hover:cursor-pointer",
        githubUrl:
          "border-1 border-[#121212] bg-[#121212] text-white hover:bg-transparent hover:text-[#121212] [--blob-color:white] hover:cursor-pointer",
        viewUrl:
          "border-1 border-[#121212] text-black hover:bg-transparent hover:text-white [--blob-color:#121212] hover:cursor-pointer",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        xl: "h-12 rounded-full px-8 has-[>svg]:px-5",
        icon: "size-9",
        btnProject: "h-9 py-2 px-3 xs:px-4",
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
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    const buttonRef = React.useRef<HTMLButtonElement>(null)
    const textRef = React.useRef<HTMLSpanElement>(null)

    React.useImperativeHandle(ref, () => buttonRef.current!)

    React.useLayoutEffect(() => {
      const button = buttonRef.current
      const text = textRef.current
      if (!button || !text) return

      const onMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const { left, top, width, height } = button.getBoundingClientRect()

        const x = clientX - left
        const y = clientY - top

        // effect button magnet
        gsap.to(button, {
          x: (clientX - (left + width / 2)) * 0.3,
          y: (clientY - (top + height / 2)) * 0.9,
          duration: 0.5,
          ease: "power2.out",
        })

        // effect text magnet
        gsap.to(text, {
          x: (clientX - (left + width / 2)) * 0.2,
          y: (clientY - (top + height / 2)) * 0.2,
          duration: 0.5,
          ease: "power2.out",
        })

        // posisi blob wipe
        button.style.setProperty("--x", `${x}px`)
        button.style.setProperty("--y", `${y}px`)
      }

      const onMouseLeave = () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.6)",
        })

        gsap.to(text, {
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.6)",
        })
      }

      button.addEventListener("mousemove", onMouseMove)
      button.addEventListener("mouseleave", onMouseLeave)

      return () => {
        button.removeEventListener("mousemove", onMouseMove)
        button.removeEventListener("mouseleave", onMouseLeave)
      }
    }, [])

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          "interactive-button isolate overflow-hidden"
        )}
        ref={buttonRef}
        {...props}
      >
        <span
          ref={textRef}
          className="pointer-events-none relative z-10 inline-flex items-center"
        >
          {children}
        </span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
