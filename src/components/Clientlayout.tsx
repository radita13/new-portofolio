"use client"

import { ReactNode } from "react"
import { usePathname } from "next/navigation"
import Navbar from "./shared/Navbar"

export default function ClientLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const segments = pathname.split("/").filter(Boolean)
  const lastSegment = segments[segments.length - 1] || "home"

  return (
    <div key={lastSegment} className="flex min-h-screen flex-col">
      <Navbar />

      {/* Main Content */}
      <main className="flex w-full flex-1 items-center justify-center">
        {children}
      </main>
    </div>
  )
}
