"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ProgressLine({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [elementTop, setElementTop] = useState(0)
  const [elementBottom, setElementBottom] = useState(0)
  const [height, setHeight] = useState(0)

  const { scrollY } = useScroll()

  useEffect(() => {
    if (!ref.current) return

    const setValues = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        const scrollTop = window.scrollY || document.documentElement.scrollTop
        const offsetTop = rect.top + scrollTop
        setElementTop(offsetTop)
        setElementBottom(offsetTop + rect.height)
        setHeight(window.innerHeight)
      }
    }

    // Set initial values
    setValues()

    // Update values on resize
    window.addEventListener("resize", setValues)
    return () => window.removeEventListener("resize", setValues)
  }, [])

  // Calculate progress based on scroll position
  const progress = useTransform(
    scrollY,
    [elementTop - height, elementBottom - height * 0.5],
    [0, 1],
    { clamp: false }
  )

  return (
    <div
      ref={ref}
      className={`relative h-0.5 w-full overflow-hidden rounded-full ${className}`}
    >
      <motion.div
        className="absolute left-0 top-0 h-full origin-left bg-black"
        style={{
          width: "100%",
          scaleX: progress,
        }}
      />
    </div>
  )
}
