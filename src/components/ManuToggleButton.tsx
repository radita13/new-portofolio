import * as React from "react"
import gsap from "gsap"
import { cn } from "@/lib/utils"
import { Button } from "./ui/Button"

interface MenuToggleButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isOpen: boolean
}

const MenuToggleButton = React.forwardRef<
  HTMLButtonElement,
  MenuToggleButtonProps
>(({ isOpen, className, ...props }, ref) => {
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const lineTopRef = React.useRef<HTMLSpanElement>(null)
  const lineBottomRef = React.useRef<HTMLSpanElement>(null)

  const [isHover, setIsHover] = React.useState(false)

  React.useImperativeHandle(ref, () => buttonRef.current!)

  React.useLayoutEffect(() => {
    const lineTop = lineTopRef.current
    const lineBottom = lineBottomRef.current

    if (!lineTop || !lineBottom) return

    // Animasi untuk kondisi isOpen
    if (isOpen) {
      gsap.to(lineTop, {
        rotation: 45,
        y: 10,
        width: "100%", // Pastikan lebar penuh saat terbuka
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(lineBottom, {
        rotation: 45,
        y: 10,
        width: "100%", // Pastikan lebar penuh saat terbuka
        duration: 0.3,
        ease: "power2.out",
      })
    } else {
      gsap.to(lineTop, {
        rotation: 0,
        y: 0,
        width: "100%",
        duration: 0.3,
        ease: "power2.out",
      })
      gsap.to(lineBottom, {
        rotation: 0,
        y: 0,
        width: isHover ? "100%" : "60%",
        duration: 0.3,
        ease: "power2.out",
      })
    }
  }, [isOpen, isHover])

  // Animasi hover
  React.useEffect(() => {
    const button = buttonRef.current
    const lineBottom = lineBottomRef.current

    if (!button || !lineBottom) return

    const handleMouseEnter = () => {
      setIsHover(true)
      if (!isOpen) {
        // Hanya aktifkan hover jika tidak terbuka
        gsap.to(lineBottom, {
          width: "100%",
          duration: 0.2,
          ease: "power1.out",
        })
      }
    }

    const handleMouseLeave = () => {
      setIsHover(false)
      if (!isOpen) {
        // Hanya aktifkan hover jika tidak terbuka
        gsap.to(lineBottom, { width: "60%", duration: 0.2, ease: "power1.out" })
      }
    }

    button.addEventListener("mouseenter", handleMouseEnter)
    button.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter)
      button.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [isOpen])

  return (
    <Button
      variant="interactive-light"
      ref={buttonRef}
      className={cn(
        "group relative flex size-12 items-center justify-center rounded-full border border-black p-10 hover:border-white",
        className
      )}
      {...props}
    >
      <div className="flex h-5 w-7 flex-col items-end justify-between">
        <span
          ref={lineTopRef}
          className={cn(
            "block h-0.5 w-full origin-right transition-colors duration-300",
            "bg-black group-hover:bg-white"
          )}
        />
        <span
          ref={lineBottomRef}
          className={cn(
            "block h-0.5 w-3/5 origin-right transition-colors duration-300",
            "bg-black group-hover:bg-white"
          )}
        />
      </div>
    </Button>
  )
})

MenuToggleButton.displayName = "MenuToggleButton"

export { MenuToggleButton }
