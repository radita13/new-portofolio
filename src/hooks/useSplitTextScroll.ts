// src/hooks/useSplitTextScroll.ts
"use client"

import { useLayoutEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger" // Impor ScrollTrigger

// Daftarkan plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger)

interface SplitTextScrollRefs {
  triggerRef: React.RefObject<HTMLElement>
  text1Ref: React.RefObject<HTMLSpanElement>
  text2Ref: React.RefObject<HTMLSpanElement>
  text3Ref: React.RefObject<HTMLSpanElement>
  enabled: boolean
}

export function useSplitTextScroll({
  triggerRef,
  text1Ref,
  text2Ref,
  text3Ref,
  enabled,
}: SplitTextScrollRefs) {
  useLayoutEffect(() => {
    // Pastikan semua elemen sudah ada di DOM
    if (
      !enabled ||
      !triggerRef.current ||
      !text1Ref.current ||
      !text2Ref.current ||
      !text3Ref.current
    ) {
      return
    }

    // Buat timeline GSAP yang terhubung dengan ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerRef.current, // Elemen yang memicu animasi
        start: "top top", // Mulai saat bagian atas trigger bertemu bagian atas layar
        end: "+=70%", // Selesai saat bagian bawah trigger bertemu bagian atas layar
        scrub: 1, // Hubungkan progres animasi langsung ke scrollbar
      },
    })

    // Tambahkan animasi ke timeline
    tl.to(text1Ref.current, { xPercent: -50, opacity: 0 }, 0) // "I KOMANG" ke kiri
      .to(text2Ref.current, { xPercent: 50, opacity: 0 }, 0) // "RADITA" ke kanan
      .to(text3Ref.current, { xPercent: -50, opacity: 0 }, 0) // "SUARDHANA" ke kiri

    // Cleanup function untuk membereskan ScrollTrigger saat komponen dibongkar
    return () => {
      tl.kill() // Hentikan dan bersihkan timeline
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [triggerRef, text1Ref, text2Ref, text3Ref, enabled])
}
