"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { pageConfig, type RoutePath } from "@/config/pages"
import { MenuToggleButton } from "../ManuToggleButton"
import { AnimatePresence, motion } from "framer-motion"
import { FaInstagram, FaLinkedin, FaTiktok } from "react-icons/fa6"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/project", label: "Project" },
  { href: "/contact", label: "Contact" },
] satisfies { href: RoutePath; label: string }[]

const menuVariants = {
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren", // Animasi keluar setelah anak-anaknya selesai
      staggerChildren: 0.1,
      staggerDirection: -1,
    },
  },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren", // Animasi masuk sebelum anak-anaknya
      staggerChildren: 0.1,
    },
  },
}

// Varian animasi untuk setiap item menu
const menuItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3 } },
}

export default function Navbar() {
  const pathname = usePathname() as RoutePath
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAtTop, setIsAtTop] = useState(false)

  const isPageSlug = pathname.startsWith("/project/")

  const isLightPage = isPageSlug
    ? true
    : (pageConfig[pathname]?.isLight ?? false)

  // Logika scroll baru yang lebih sederhana
  useEffect(() => {
    setIsAtTop(window.scrollY === 0)

    const handleScroll = () => {
      // Set state menjadi true jika di paling atas, false jika tidak
      setIsAtTop(window.scrollY === 0)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Menutup menu saat klik di luar area menu (tidak ada perubahan)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [isMenuOpen])

  // Variabel untuk styling (tidak ada perubahan)
  const textColor = isLightPage
    ? { active: "text-black", inactive: "text-gray-700 hover:text-black" }
    : { active: "text-white", inactive: "text-gray-300 hover:text-white" }

  const borderColor = isLightPage ? "bg-black" : "bg-white"

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-40 w-full bg-transparent transition-transform duration-300 ${isLightPage ? "bg-transparant" : "bg-transparant"} ${isAtTop ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="container mx-auto flex items-center justify-center p-5">
          {/* Mobile menu */}
          <div className="md:hidden"></div>

          <ul className="hidden items-center space-x-8 text-xl md:flex">
            {navItems.map(({ href, label }) => {
              const isActive = pathname === href
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`group relative py-2 uppercase ${
                      isActive ? textColor.active : textColor.inactive
                    }`}
                  >
                    {label}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] w-full origin-right transform transition-transform duration-300 ease-out group-hover:origin-left ${
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      } ${borderColor}`}
                    />
                  </Link>
                </li>
              )
            })}
          </ul>
        </div>
      </nav>

      {/* Floating Menu Button - Tampil saat 'isAtTop' bernilai false */}
      <MenuToggleButton
        isOpen={isMenuOpen}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        isLight={isLightPage && !isMenuOpen}
        className={`fixed top-5 right-5 z-50 transition-opacity duration-300 sm:top-10 sm:right-10 ${isAtTop ? "pointer-events-none opacity-0" : "opacity-100"}`}
        aria-label="Toggle menu"
      />

      {/* Floating Menu (tidak ada perubahan signifikan) */}

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="fixed inset-0 z-40 flex h-screen w-screen flex-col items-center justify-center bg-[#121212]"
          >
            <motion.div
              variants={menuItemVariants}
              className="absolute top-5 left-5 text-2xl font-semibold text-white sm:top-10 sm:left-10"
            >
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                ID
              </Link>
            </motion.div>

            <ul className="flex flex-col items-center gap-6 text-center">
              {navItems.map(({ href, label }) => (
                <motion.li key={href} variants={menuItemVariants}>
                  <Link
                    href={href}
                    className={`text-5xl font-semibold uppercase transition-colors duration-300 md:text-6xl ${
                      pathname === href
                        ? "text-white"
                        : "text-gray-500 hover:text-white"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Ikon Social Media di Bawah */}
            <motion.div
              variants={menuItemVariants}
              className="absolute bottom-10 flex gap-6 text-white"
            >
              <Link
                href="https://linkedin.com"
                aria-label="LinkedIn"
                className="transition-transform hover:scale-110"
              >
                <FaLinkedin size={24} />
              </Link>
              <Link
                href="https://instagram.com"
                aria-label="Instagram"
                className="transition-transform hover:scale-110"
              >
                <FaInstagram size={24} />
              </Link>
              <Link
                href="https://tiktok.com"
                aria-label="TikTok"
                className="transition-transform hover:scale-110"
              >
                <FaTiktok size={24} />
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
