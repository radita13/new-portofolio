// "use client"

import Link from "next/link"
import { Button } from "../ui/Button"
import { FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa6"
import { cn } from "@/lib/utils"

type FooterProps = {
  className?: string
}

export default function Footer({ className }: FooterProps) {
  return (
    <footer className={cn("relative bg-[#121212]", className)}>
      <div className="mx-auto min-h-[200px]">
        <div className="flex flex-col justify-between gap-5 py-20 md:flex-row">
          <div className="flex w-full flex-col justify-center gap-5 md:w-[70%]">
            <h2 className="text-center text-4xl font-medium tracking-widest break-all text-white uppercase md:text-start md:text-6xl">
              Let{"'"}s connect with me now ! 🚀{" "}
            </h2>
            <div className="relative mx-auto flex w-full flex-col items-center gap-5 md:items-start">
              <Link href="/contact">
                <Button
                  variant="footer-button"
                  className="xs:inline-flex hidden rounded-full px-6 text-lg uppercase md:h-12 md:px-8 md:text-2xl"
                >
                  Contact Me
                </Button>
              </Link>
              <Link href="mailto:raditabussiness@gmail.com">
                <Button
                  variant="footer-button"
                  className="xs:inline-flex hidden rounded-full px-6 text-lg uppercase md:h-12 md:px-8 md:text-2xl"
                >
                  raditabussiness@gmail.com
                </Button>
              </Link>
            </div>
          </div>
          <div className="hidden max-w-[30%] flex-col gap-3 md:block">
            <h2 className="text-6xl font-medium text-white uppercase">Menu</h2>
            <div className="flex flex-col items-end gap-2">
              <Link
                href="/"
                className="group relative text-2xl font-light text-gray-400 uppercase"
              >
                Home
                <span className="absolute bottom-0 left-0 h-0.5 w-full origin-right scale-x-0 transform bg-white transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100"></span>
              </Link>
              <Link
                href="/about"
                className="group relative text-2xl font-light text-gray-400 uppercase"
              >
                About
                <span className="absolute bottom-0 left-0 h-0.5 w-full origin-right scale-x-0 transform bg-white transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100"></span>
              </Link>
              <Link
                href="/project"
                className="group relative text-2xl font-light text-gray-400 uppercase"
              >
                Project
                <span className="absolute bottom-0 left-0 h-0.5 w-full origin-right scale-x-0 transform bg-white transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100"></span>
              </Link>
              <Link
                href="/contact"
                className="group relative text-2xl font-light text-gray-400 uppercase"
              >
                Contact
                <span className="absolute bottom-0 left-0 h-0.5 w-full origin-right scale-x-0 transform bg-white transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100"></span>
              </Link>

              {/* Social Media */}
              <div className="mt-5 flex items-center gap-2">
                <Link href="https://github.com/raditzzz">
                  <FaGithub className="text-2xl text-white" />
                </Link>
                <Link href="https://github.com/raditzzz">
                  <FaLinkedin className="text-2xl text-white" />
                </Link>
                <Link href="https://github.com/raditzzz">
                  <FaInstagram className="text-2xl text-white" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-sm text-white md:text-lg">
          RaditzzZ © 2025
        </p>
      </div>
    </footer>
  )
}
