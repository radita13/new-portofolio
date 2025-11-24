"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"

interface ProjectImageTVProps {
  imageUrl: string
  title: string
}

export default function ProjectImageTV({
  imageUrl,
  title,
}: ProjectImageTVProps) {
  const imageRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  })

  // Gerakan TV scroll
  const yPosition = useTransform(
    scrollYProgress,
    [0, 0.25, 0.75, 1],
    [0, 0, 10, 10]
  )

  return (
    <div ref={imageRef} className="aspect-[3/2] w-full overflow-hidden">
      <motion.div
        style={{ y: yPosition, height: "100%" }}
        className="w-full transition-transform duration-500"
      >
        <Image
          src={imageUrl}
          alt={title}
          width={1200}
          height={500}
          className="h-full w-full object-cover grayscale transition-all duration-300 hover:grayscale-0"
        />
      </motion.div>
    </div>
  )
}
