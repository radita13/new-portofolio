"use client"

import Link from "next/link"
import { Button } from "./ui/Button"
import { motion } from "framer-motion"
import Scene from "./Scene"
import { useRef, useState } from "react"
import { useSplitTextScroll } from "@/hooks/useSplitTextScroll"
import ScrollReveal from "@/components/animation/ScrollReveal"
import { ProgressLine } from "./animation/ProgressLine"
import ScrollFloatText from "./animation/ScrollFloatText"
import FadeUpImage from "./animation/FadeUpImage"
import ProjectAll from "./shared/ProjectAll"
import { projectData } from "@/data/project"
import Footer from "./shared/Footer"
import AccordionSection from "./ui/Accordion"
// import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6"
// import { useGsapButtonAnimation } from "@/hooks/useButtonFadeAnimate"
import { usePathname } from "next/navigation"

const projectContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
}

const SectionWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => (
  <div className={`flex w-full justify-center ${className}`}>
    <div className="w-full px-5 sm:max-w-[80%] md:px-8">{children}</div>
  </div>
)

export default function Hero() {
  const sectionRef = useRef<HTMLElement>({} as HTMLElement)
  const text1Ref = useRef<HTMLSpanElement>({} as HTMLSpanElement)
  const text2Ref = useRef<HTMLSpanElement>({} as HTMLSpanElement)
  const text3Ref = useRef<HTMLSpanElement>({} as HTMLSpanElement)
  const [isIntroDone, setIsIntroDone] = useState(false)

  const pathName = usePathname()

  useSplitTextScroll({
    triggerRef: sectionRef,
    text1Ref: text1Ref,
    text2Ref: text2Ref,
    text3Ref: text3Ref,
    enabled: isIntroDone,
  })

  return (
    <div className="w-full overflow-x-hidden">
      <section
        ref={sectionRef}
        className="relative h-screen w-full bg-[#121212]"
      >
        <div className="absolute inset-0 z-0 h-full w-full">
          <Scene />
        </div>
        <div className="flex h-full flex-col items-center justify-center px-6 text-center md:px-0">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onAnimationComplete={() => setIsIntroDone(true)}
          >
            <motion.div variants={itemVariants}>
              <h1 className="mt-4 text-5xl leading-[1] font-semibold text-white sm:text-6xl md:text-[7rem]">
                <span ref={text1Ref} className="block">
                  I KOMANG
                </span>
                <span ref={text2Ref} className="block">
                  RADITA
                </span>
                <span ref={text3Ref} className="block">
                  SUARDHANA
                </span>
              </h1>
            </motion.div>
            <motion.p
              variants={itemVariants}
              className="pointer-events-none mt-3 text-3xl tracking-widest text-white"
            >
              I AM A JUNIOR FRONTEND DEVELOPER
            </motion.p>
            <motion.div
              variants={itemVariants}
              className="pointer-events-auto mt-8"
            >
              <Link href="/contact">
                <Button
                  variant="interactive-light"
                  className="h-12 rounded-full px-8 text-xl"
                >
                  CONTACT ME
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <main className="relative">
        {/* About summary */}
        <SectionWrapper className="my-20">
          <div className="grid grid-cols-1 gap-8">
            <ProgressLine className="mb-1"></ProgressLine>
            <ScrollFloatText
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
              containerClassName="max-md:text-center font-bold tracking-widest"
              textClassName="text-4xl sm:text-5xl"
            >
              WHO AM I?
            </ScrollFloatText>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_2fr]">
              <FadeUpImage
                src="/images/Profile.png"
                alt="I Komang Radita Suardhana"
                width={1000}
                height={1000}
                imageClassName="mx-auto w-[350px] rounded-[15px] grayscale transition-all duration-300 hover:grayscale-0 md:w-auto"
              />
              <div className="flex items-start">
                <div className="w-full space-y-5 overflow-hidden">
                  <ScrollReveal
                    key={`${pathName}-1`}
                    containerClassName="w-full"
                    textClassName="text-sm sm:text-lg md:text-xl break-words"
                    baseOpacity={0.2}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={5}
                  >
                    Hello! I&apos;m I Komang Radita Suardhana, a Junior Frontend
                    Developer passionate about building interactive and
                    user-friendly web applications using technologies{" "}
                    <strong>React</strong> and <strong>Next.js</strong>
                  </ScrollReveal>
                  <ScrollReveal
                    key={`${pathName}-2`}
                    containerClassName="w-full"
                    textClassName="text-sm sm:text-lg md:text-xl break-words"
                    baseOpacity={0.2}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={5}
                  >
                    I had the opportunity to join the MSIB Kampus Merdeka
                    program at Infinite Learning, focusing on{" "}
                    <strong>Web Development & UI/UX Design</strong>. During this
                    program, I worked on various projects at both micro and
                    massive scales.
                  </ScrollReveal>
                  <ScrollReveal
                    key={`${pathName}-3`}
                    containerClassName="w-full"
                    textClassName="text-sm sm:text-lg md:text-xl break-words"
                    baseOpacity={0.2}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={5}
                  >
                    I&apos;m continuously exploring the world of technology to
                    stay creative, think strategically, and take on new
                    challenges. With a strong eagerness to learn, I&apos;m
                    excited to discover new technologies, sharpen my skills, and
                    collaborate on impactful projects.
                  </ScrollReveal>
                  <ScrollReveal
                    key={`${pathName}-4`}
                    containerClassName="w-full"
                    textClassName="text-sm sm:text-lg md:text-xl break-words"
                    baseOpacity={0.2}
                    enableBlur={true}
                    baseRotation={5}
                    blurStrength={5}
                  >
                    I&apos;m open to new opportunities, collaborations, and
                    learning experiences. Let&apos;s create something meaningful
                    together! 🚀
                  </ScrollReveal>
                </div>
              </div>
            </div>
          </div>
        </SectionWrapper>

        {/* Project */}
        <SectionWrapper>
          <div className="flex w-full flex-col items-center overflow-hidden bg-white">
            <h2 className="text-6xl font-medium">Project</h2>
            <motion.div
              variants={projectContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2"
            >
              {projectData.slice(0, 4).map((project) => (
                <div key={project.id} className="h-full w-full px-1">
                  <ProjectAll key={project.id} project={project} />
                </div>
              ))}
            </motion.div>
            <Link href="/project">
              <Button
                variant="interactive-dark"
                className="my-10 cursor-pointer rounded-full px-16 py-7 text-3xl font-normal"
              >
                More
              </Button>
            </Link>
          </div>
        </SectionWrapper>

        {/* FAQ */}
        <SectionWrapper className="my-20 min-h-[500px] w-full">
          <AccordionSection />
        </SectionWrapper>
      </main>

      {/* Footer */}
      <div className="w-full bg-[#121212] px-5 sm:px-10 md:px-20 lg:px-30">
        <Footer />
      </div>
    </div>
  )
}
