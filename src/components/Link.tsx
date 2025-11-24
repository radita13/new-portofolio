"use client"

import Link from "next/link"
import { motion, useAnimationControls } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Button } from "./ui/Button"

interface ProjectLinkProps {
  href: string
}

const ICON_SIZE = 16

const MotionLink = motion(Link)

export default function ProjectLink({ href }: ProjectLinkProps) {
  const firstArrowControls = useAnimationControls()
  const secondArrowControls = useAnimationControls()

  const variants = {
    initial: { x: 0, y: 0 },
    hover: {
      x: 50,
      y: -50,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        repeat: 0,
      },
    },
    initial_second: { x: -50, y: 50 },
    hover_second: {
      x: 0,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
        repeat: 0,
      },
    },
  }

  return (
    <MotionLink
      onHoverStart={() => {
        firstArrowControls.start("hover")
        secondArrowControls.start("hover_second")
      }}
      onHoverEnd={() => {
        firstArrowControls.start("initial")
        secondArrowControls.start("initial_second")
      }}
      href={href}
      className="group flex items-center gap-2 px-0 py-1 transition-transform duration-300 hover:scale-105"
    >
      <Button
        variant="interactive-dark"
        size={"btnProject"}
        className="group relative w-full overflow-hidden rounded-none"
      >
        <div className="relative z-10 flex items-center justify-center">
          <span>VIEW</span>
          <div
            className="relative overflow-hidden"
            style={{ height: `${ICON_SIZE}px`, width: `${ICON_SIZE}px` }}
          >
            <motion.div
              variants={variants}
              animate={firstArrowControls}
              initial="initial"
              className="absolute h-4 w-4"
            >
              <ArrowUpRight size={ICON_SIZE} />
            </motion.div>
            <motion.div
              variants={variants}
              animate={secondArrowControls}
              initial="initial_second"
              className="absolute h-4 w-4"
            >
              <ArrowUpRight size={ICON_SIZE} />
            </motion.div>
          </div>
        </div>
      </Button>
    </MotionLink>
  )
}
