import type { Metadata } from "next"
import localFont from "next/font/local"
import "./globals.css"
// import Navbar from "@/components/shared/Navbar"
// import Template from "./template"
import ClientLayout from "@/components/Clientlayout"

const clashDisplay = localFont({
  src: "../fonts/ClashDisplay.woff2",
})

export const metadata: Metadata = {
  title: {
    template: "RaditzzZ | %s",
    default: "RaditzzZ | Portofolio",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${clashDisplay.className} box-sizing:border-box m-0 mx-auto min-h-screen items-center justify-center overflow-x-hidden p-0`}
      >
        {/* <Template key={pathname}> */}
        {/* <Navbar />
        <main className="flex w-full flex-1 items-center justify-center">
          {children}
        </main> */}

        <ClientLayout>{children}</ClientLayout>
        {/* </Template> */}
      </body>
    </html>
  )
}
