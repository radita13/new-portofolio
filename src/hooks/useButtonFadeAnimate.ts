import { useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export const useGsapButtonAnimation = (
  elementRef: React.RefObject<HTMLDivElement>
) => {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (elementRef.current) {
        gsap.from(elementRef.current.children, {
          opacity: 0,
          y: 30,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: elementRef.current,
            start: "top 90%",
            end: "+=150",
            toggleActions: "play none none reverse",
          },
        })
      }
    }, elementRef) // Scope context ke elemen ref

    return () => ctx.revert()
  }, [elementRef])
}
