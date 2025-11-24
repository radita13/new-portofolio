"use client"

import Image from "next/image"
import {
  motion,
  useAnimationControls,
  useScroll,
  useTransform,
} from "framer-motion"
import { useRef } from "react"
import { Project } from "@/types/Project"
import ProjectLink from "../Link"

interface ProjectCardProps {
  project: Project
}

const cardVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
  exit: { y: 50, opacity: 0, transition: { duration: 0.4, ease: "easeOut" } },
}

const DIGIT_HEIGHT = 16

export default function ProjectAll({ project }: ProjectCardProps) {
  const digits = project.devId.split("")
  const controls = useAnimationControls()

  // Handle image scroll TV
  const imageRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  })

  const yPosition = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 0, 10, 10]
  )
  // End Handle image scroll TV

  return (
    <motion.div
      variants={cardVariants}
      onHoverStart={() => controls.start("hover")}
      onHoverEnd={() => controls.start("visible")}
      className="group flex h-full w-full flex-col"
    >
      <div className="flex items-center justify-center border border-black p-5">
        <h3 className="xs:text-lg text-center text-sm font-semibold tracking-wider break-all text-black md:text-xl">
          {project.title}
        </h3>
      </div>

      <div
        ref={imageRef}
        className="aspect-[3/2] flex-grow overflow-hidden border-x border-black"
      >
        <motion.div
          style={{ y: yPosition, height: "100%" }}
          className="transition-transform duration-500 group-hover:scale-105"
        >
          <Image
            src={project.imageUrl}
            alt={project.title}
            width={1200}
            height={1200}
            className="h-full w-full object-cover grayscale transition-all duration-300 hover:grayscale-0 md:w-96 lg:w-screen"
          />
        </motion.div>
      </div>

      <div className="xs:justify-between xs:flex-row xs:border-x flex flex-col items-center gap-3 border-x-0 border-y border-black p-2 sm:p-4">
        <div className="flex items-center text-sm font-medium text-black">
          <span className="xs:text-lg text-sm">DEV.</span>
          <div
            style={{ height: `${DIGIT_HEIGHT}px` }}
            className="flex overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] leading-none text-blue-500"
          >
            {digits.map((digit, i) => {
              const num = parseInt(digit, 10)

              const variants = {
                visible: { y: 0, transition: { duration: 0 } },
                hover: {
                  y: `-${DIGIT_HEIGHT}px`,
                  transition: {
                    delay: i * 0.1,
                    duration: 0.4,
                    ease: "easeInOut",
                    repeat: 1,
                    repeatType: "loop",
                    repeatDelay: 0.2,
                  } as const,
                },
              }

              return (
                <div
                  key={i}
                  style={{ height: `${DIGIT_HEIGHT}px` }}
                  className="relative"
                >
                  <motion.div
                    variants={variants}
                    animate={controls}
                    initial="visible"
                    className="flex flex-col"
                  >
                    <span
                      style={{ height: `${DIGIT_HEIGHT}px` }}
                      className="xs:text-lg flex items-center justify-center text-sm"
                    >
                      {num}
                    </span>
                    <span
                      style={{ height: `${DIGIT_HEIGHT}px` }}
                      className="xs:text-lg flex items-center justify-center text-sm"
                    >
                      {num}
                    </span>
                  </motion.div>
                </div>
              )
            })}
          </div>
        </div>
        <ProjectLink href={`/project/${project.slug}`} />
      </div>
    </motion.div>
  )
}
