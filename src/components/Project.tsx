"use client"

import { projectData } from "@/data/project"
import ProjectAll from "./shared/ProjectAll"
import Footer from "./shared/Footer"
import { Button } from "./ui/Button"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function Project() {
  const [selectedCategory, setSelectedCategory] = useState("ALL")
  const categories = ["ALL", "WEB", "MOBILE", "UI/UX DESIGN"]

  const filteredProjects = projectData.filter((project) => {
    if (selectedCategory === "ALL") {
      return true
    }
    return project.category === selectedCategory
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.3 } },
  }

  return (
    <>
      <section className="relative h-[60vh] w-full">
        <h2 className="absolute inset-0 flex items-center justify-center overflow-hidden text-center text-4xl font-semibold text-nowrap md:text-9xl">
          Projects
        </h2>
      </section>

      <div className="relative">
        <div className="absolute top-0 z-10 h-px w-full bg-black"></div>
        <div className="absolute top-24 z-10 h-px w-full bg-black"></div>
        <div className="px-5 md:px-20">
          <div className="relative h-24">
            <div className="absolute inset-y-0 left-0 h-full w-px bg-black"></div>
            <div className="absolute inset-y-0 right-0 h-full w-px bg-black"></div>

            <div className="absolute inset-0 flex flex-nowrap items-center gap-5 overflow-x-auto [mask-image:linear-gradient(to_right,transparent,black_5%,black_90%,transparent)] px-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex-1 flex-shrink-0"></div>

              {/* Tombol-tombol Anda */}
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={"interactive-dark"}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex-shrink-0 cursor-pointer rounded-full px-7 py-6 text-2xl transition-colors duration-200 ${selectedCategory === category ? "bg-[#121212] text-white" : "bg-white text-[#121212]"}`}
                >
                  {category}
                </Button>
              ))}

              <div className="flex-1 flex-shrink-0"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Card project */}
      <div className="mx-auto w-screen px-5 py-20 md:px-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="grid min-h-[40vh] w-full gap-8 md:grid-cols-2 lg:grid-cols-2"
          >
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project) => (
                <ProjectAll key={project.id} project={project} />
              ))
            ) : (
              <div className="col-span-full flex items-center justify-center">
                <p className="text-lg text-gray-500">COMING SOON...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="bg-[#121212]">
        <Footer className="mx-5 sm:mx-10 md:mx-20 lg:mx-30" />
      </div>
    </>
  )
}
