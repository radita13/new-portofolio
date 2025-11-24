// File: components/animation/FadeUpImage.tsx (Versi Final)

"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image, { ImageProps } from "next/image"

gsap.registerPlugin(ScrollTrigger)

interface FadeUpImageProps extends Omit<ImageProps, "className"> {
  containerClassName?: string
  imageClassName?: string
  duration?: number
  yOffset?: number
  trigger?: string | Element | null
  start?: string
  end?: string
  alt: string
}

const FadeUpImage: React.FC<FadeUpImageProps> = ({
  containerClassName = "",
  imageClassName = "",
  duration = 0.8,
  yOffset = 50,
  trigger = null,
  start = "top 80%",
  end = "bottom 80%",
  alt,
  ...imageProps
}) => {
  const imageContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = imageContainerRef.current
    if (!element) return

    const ctx = gsap.context(() => {
      // 2. Gunakan autoAlpha: 0 untuk menyembunyikan elemen pada awalnya
      gsap.set(element, { autoAlpha: 0, y: yOffset })

      gsap.to(element, {
        // 3. Animasikan autoAlpha ke 1 untuk memunculkannya
        autoAlpha: 1,
        y: 0,
        duration: duration,
        ease: "power3.out",
        scrollTrigger: {
          trigger: trigger || element,
          start: start,
          end: end,
          scrub: 1,
        },
      })
    }, imageContainerRef)

    return () => ctx.revert()
  }, [duration, end, start, trigger, yOffset])

  return (
    // 1. HAPUS style={{ visibility: "hidden" }} dari sini
    <div ref={imageContainerRef} className={containerClassName}>
      <Image
        {...imageProps}
        alt={alt}
        className={`h-auto w-full ${imageClassName}`}
      />
    </div>
  )
}

export default FadeUpImage
