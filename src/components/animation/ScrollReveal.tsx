"use client"

import React, { useEffect, useRef, ReactNode, RefObject } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

// ... interface tidak berubah ...
interface ScrollRevealProps {
  children: ReactNode
  scrollContainerRef?: RefObject<HTMLElement>
  enableBlur?: boolean
  baseOpacity?: number
  baseRotation?: number
  blurStrength?: number
  containerClassName?: string
  textClassName?: string
  rotationEnd?: string
  wordAnimationEnd?: string
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  scrollContainerRef,
  enableBlur = true,
  baseOpacity = 0.1,
  baseRotation = 3,
  blurStrength = 5,
  containerClassName = "",
  textClassName = "",
  rotationEnd = "bottom bottom",
  wordAnimationEnd = "bottom bottom",
}) => {
  const containerRef = useRef<HTMLDivElement>(null)

  const splitText = React.useMemo(() => {
    const nodes: ReactNode[] = []
    let keyCounter = 0
    React.Children.forEach(children, (child) => {
      if (typeof child === "string") {
        child.split(/(\s+)/).forEach((word) => {
          if (word) {
            nodes.push(
              <span className="word inline-block" key={`word-${keyCounter++}`}>
                {word.match(/^\s+$/) ? "\u00A0" : word}
              </span>
            )
          }
        })
      } else if (React.isValidElement(child)) {
        nodes.push(
          <span className="word inline-block" key={`element-${keyCounter++}`}>
            {child}
          </span>
        )
      }
    })
    return nodes
  }, [children])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const scroller = scrollContainerRef?.current ?? window

    const ctx = gsap.context(() => {
      // gsap.fromTo(
      //   el,
      //   { transformOrigin: "0% 50%", rotate: baseRotation },
      //   {
      //     rotate: 0,
      //     ease: "none",
      //     scrollTrigger: {
      //       trigger: el,
      //       scroller,
      //       start: "top bottom",
      //       end: rotationEnd,
      //       scrub: true,
      //     },
      //   }
      // )

      const wordElements = el.querySelectorAll<HTMLElement>(".word")
      if (wordElements.length === 0) return

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          scroller,
          start: "top bottom-=20%",
          end: wordAnimationEnd,
          scrub: true,
        },
      })

      tl.fromTo(
        wordElements,
        {
          opacity: baseOpacity,
          filter: enableBlur ? `blur(${blurStrength}px)` : "none",
          rotation: baseRotation,
          y: 20,
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          rotation: 0,
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.03,
        }
      )
    }, containerRef)

    return () => ctx.revert()
  }, [
    scrollContainerRef,
    enableBlur,
    baseRotation,
    baseOpacity,
    rotationEnd,
    wordAnimationEnd,
    blurStrength,
  ]) // Array dependensi sekarang memiliki ukuran yang konstan

  return (
    <div ref={containerRef} className={containerClassName}>
      <p className={textClassName}>{splitText}</p>
    </div>
  )
}

export default ScrollReveal
