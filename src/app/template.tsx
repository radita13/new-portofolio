"use client"

import { useRef, useLayoutEffect, useEffect, Suspense } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import gsap from "gsap"
import { projectData } from "@/data/project"

function TransitionTrigger({ onRouteChanged }: { onRouteChanged: () => void }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const isFirstMount = useRef(true)

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false
      return
    }
    onRouteChanged()
  }, [pathname, searchParams, onRouteChanged])
  return null
}

export default function Template({ children }: { children: React.ReactNode }) {
  const mainContentRef = useRef<HTMLDivElement>(null)
  const loaderContainerRef = useRef<HTMLDivElement>(null)
  const loaderPathRef = useRef<SVGPathElement>(null)
  const loaderTextRef = useRef<HTMLHeadingElement>(null)
  const pathname = usePathname()

  const segments = pathname.split("/").filter(Boolean)
  const lastSegment = segments[segments.length - 1]

  const project = projectData.find((p) => p.slug === lastSegment)
  const displayText = project ? project.title : lastSegment

  const isInitialLoad = useRef(true)

  const animatePageTransition = (onComplete?: () => void) => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (loaderContainerRef.current) {
          gsap.set(loaderContainerRef.current, { display: "none" })
        }
        onComplete?.()
      },
    })

    // Reset posisi awal
    gsap.set(".curtain", { y: "100%" })
    gsap.set(loaderContainerRef.current, { display: "flex" })
    gsap.set(mainContentRef.current, { opacity: 0 })

    // Animasi tirai ke atas
    tl.to(".curtain", {
      y: "0%",
      duration: 0.8,
      ease: "power3.inOut",
      stagger: 0.1,
    })

    // Tampilkan konten baru
    tl.to(mainContentRef.current, {
      opacity: 1,
      duration: 0.5,
    })

    // Animasi tirai kembali ke bawah
    tl.to(
      ".curtain",
      {
        y: "-100%",
        duration: 0.8,
        ease: "power3.inOut",
        stagger: 0.1,
      },
      "+=0.2"
    )
  }

  // Handle initial page load
  useLayoutEffect(() => {
    if (isInitialLoad.current) {
      const progress = { y: 100 }
      gsap.set(mainContentRef.current, { opacity: 1 })
      gsap.set(loaderContainerRef.current, { y: 0 })

      const tl = gsap.timeline({
        onComplete: () => {
          if (loaderContainerRef.current) {
            gsap.set(loaderContainerRef.current, { display: "none" })
          }
        },
      })

      tl.to(progress, {
        y: 0,
        duration: 1.4,
        ease: "power3.inOut",
        onUpdate: () => {
          if (loaderPathRef.current && loaderTextRef.current) {
            const bottomEdgeY = progress.y
            const animationProgress = (100 - bottomEdgeY) / 100
            const bulge = Math.sin(animationProgress * Math.PI) * 20
            const curveControlY = bottomEdgeY + bulge
            const path = `M 0 0 H 100 V ${bottomEdgeY} Q 50 ${curveControlY}, 0 ${bottomEdgeY} Z`
            loaderPathRef.current.setAttribute("d", path)

            const textOffset = gsap.utils.mapRange(100, 0, 0, -500, bottomEdgeY)
            gsap.set(loaderTextRef.current, {
              y: textOffset,
              opacity: gsap.utils.mapRange(20, 0, 1, 0, bottomEdgeY),
            })
          }
        },
      })
        .to(loaderContainerRef.current, {
          y: "-100%",
          duration: 1.4,
          ease: "power3.inOut",
        })
        .to(
          mainContentRef.current,
          {
            opacity: 1,
            duration: 1.0,
            ease: "power3.out",
          },
          "-=1.4"
        )

      isInitialLoad.current = false
    }
  }, [])

  return (
    <>
      <Suspense fallback={null}>
        <TransitionTrigger onRouteChanged={animatePageTransition} />
      </Suspense>

      <div ref={mainContentRef} style={{ opacity: 0 }}>
        {children}
      </div>

      {/* Loader/Transition Overlay */}
      <div
        ref={loaderContainerRef}
        className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center"
      >
        {/* Loader dengan animasi SVG tirai dari bawah ke atas*/}
        <div className="fixed inset-0 z-50">
          <div className="relative flex h-full w-full items-center justify-center text-white">
            <h1
              ref={loaderTextRef}
              className="z-20 text-6xl font-bold md:text-9xl"
            >
              {(displayText || "home").toUpperCase()}
            </h1>
            <svg
              className="absolute inset-0 z-10 h-full w-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <path
                ref={loaderPathRef}
                className="fill-black"
                d="M 0 0 H 100 V 100 H 0 Z"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}
