"use client"

import { useEffect, useState } from "react"
import Lanyard from "@/components/Lanyard/Lanyard"
import Image from "next/image"
import Footer from "./shared/Footer"
import AccordionSection from "./ui/Accordion"
import {
  SiCss3,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si"
import { RiNextjsFill } from "react-icons/ri"
import AnimatedContent from "./animation/AnimatedContent"
import { certificate } from "@/data/certificate"
import { journeyData } from "@/data/timeline"
import TimelineItem from "./shared/TimelineItem"
import GithubContributions from "./GithubContributions"
import Masonry from "./animation/Mansonry"

const techStack = [
  { name: "HTML", icon: <SiHtml5 className="size-7 flex-shrink-0" /> },
  { name: "CSS", icon: <SiCss3 className="size-7 flex-shrink-0" /> },
  {
    name: "JavaScript",
    icon: <SiJavascript className="size-7 flex-shrink-0" />,
  },
  {
    name: "TypeScript",
    icon: <SiTypescript className="size-7 flex-shrink-0" />,
  },
  { name: "React", icon: <SiReact className="size-7 flex-shrink-0" /> },
  {
    name: "Tailwind",
    icon: <SiTailwindcss className="size-7 flex-shrink-0" />,
  },
  { name: "MySQL", icon: <SiMysql className="size-7 flex-shrink-0" /> },
  { name: "MongoDB", icon: <SiMongodb className="size-7 flex-shrink-0" /> },
  { name: "Supabase", icon: <SiSupabase className="size-7 flex-shrink-0" /> },
  { name: "Next.js", icon: <RiNextjsFill className="size-7 flex-shrink-0" /> },
]

const masonryItems = certificate.map((cert) => ({
  id: cert.id.toString(),
  img: cert.image,
  url: cert.credentialUrl || cert.image,
  height: cert.height,
  width: cert.width,
}))

export default function About() {
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768)
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <section className="min-h-screen w-full">
      <div className="relative mx-auto h-screen w-screen">
        {!isSmallScreen && (
          <div className="absolute inset-0 left-0 z-10 flex w-full items-center justify-center md:top-28 md:justify-center md:text-left">
            <div className="flex w-11/12 flex-col justify-end gap-6 md:w-2/3">
              <div className="flex max-w-5xl items-center justify-end">
                <h2 className="text-8xl font-semibold">About Me</h2>
              </div>
            </div>
          </div>
        )}
        <div className="absolute inset-0 z-20 w-full">
          <Lanyard
            position={[0, 0, 15]}
            gravity={[0, -40, 0]}
            offsetX={isSmallScreen ? 0 : -2}
            isSmall={isSmallScreen}
          />
        </div>
      </div>

      {/*  */}
      <div className="relative mx-auto w-full max-w-[1730px] px-5 sm:px-10 md:px-20 lg:px-30">
        {/* Vertikal line left and right */}
        <div className="absolute inset-y-0 left-5 z-10 w-px bg-black sm:left-10 md:left-20 lg:left-30"></div>
        <div className="absolute inset-y-0 right-5 z-10 w-px bg-black sm:right-10 md:right-20 lg:right-30"></div>

        {/* <div className="relative mx-auto flex min-h-screen flex-col items-center px-5 sm:px-10 md:px-20 lg:px-30"> */}
        <div className="relative h-24">
          <div className="absolute top-24 left-1/2 z-10 h-px w-screen -translate-x-1/2 bg-black"></div>
          <div className="absolute top-0 left-1/2 z-10 h-px w-screen -translate-x-1/2 bg-black"></div>
        </div>

        <div className="relative h-auto w-full overflow-hidden md:h-[70vh]">
          <Image
            className="h-full w-full object-cover grayscale transition-all duration-300 hover:grayscale-0 md:h-[350px] md:object-[65%_35%]"
            src="/images/Profile.png"
            alt="Profile"
            width={1500}
            height={350}
          />
        </div>

        {/* Intro */}
        <div className="relative">
          <div className="absolute top-0 left-1/2 h-px w-screen -translate-x-1/2 bg-black"></div>

          <div className="relative px-5 pt-10 md:px-15">
            <h2 className="pb-6 text-4xl font-semibold break-all md:text-6xl">
              Let me introduce myself 👋
            </h2>
            <div className="w-full space-y-5">
              <p className="text-sm break-all md:text-lg md:break-normal">
                Hello! I&apos;m I Komang Radita Suardhana, a Junior Frontend
                Developer passionate about building interactive and
                user-friendly web applications using technologies
                <strong> React</strong> and <strong>Next.js</strong>.
                <br />
                <br />I had the opportunity to join the MSIB Kampus Merdeka
                program at Infinite Learning, focusing on
                <strong> Web Development & UI/UX Design</strong>. During this
                program, I worked on various projects at both micro and massive
                scales.
                <br />
                <br />
                I&apos;m continuously exploring the world of technology to stay
                creative, think strategically, and take on new challenges. With
                a strong eagerness to learn, I&apos;m excited to discover new
                technologies, sharpen my skills, and collaborate on impactful
                projects.
                <br />
                <br />
                I&apos;m open to new opportunities, collaborations, and learning
                experiences. Let&apos;s create something meaningful together! 🚀
              </p>
            </div>
          </div>
        </div>

        <div className="relative h-10 w-full py-10">
          <div className="absolute left-1/2 h-px w-screen -translate-x-1/2 bg-black"></div>
        </div>

        {/* Tech stack */}
        <div className="w-full px-5 md:px-15">
          <h2 className="text-4xl font-semibold md:text-6xl">Tech Stack 🛠️</h2>
          <div className="mx-auto w-full">
            <div className="xs:grid-cols-2 grid w-full grid-cols-1 gap-5 pt-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {techStack.map((tech) => (
                <AnimatedContent
                  key={tech.name}
                  distance={50}
                  direction="vertical"
                  reverse={false}
                  duration={0.5}
                  ease="power3.out"
                  initialOpacity={0.2}
                  animateOpacity
                  scale={1}
                  threshold={0.1}
                  delay={0.3}
                >
                  <div className="flex cursor-pointer items-center gap-4 border border-black px-7 py-4 text-lg font-medium">
                    {tech.icon}
                    <span className="min-w-0 break-words">{tech.name}</span>
                  </div>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </div>

        <div className="relative h-10 w-full py-10">
          <div className="absolute left-1/2 h-px w-screen -translate-x-1/2 bg-black"></div>
        </div>

        <div className="w-full">
          <GithubContributions />
        </div>

        <div className="relative h-24">
          <div className="absolute top-0 left-1/2 z-10 h-px w-screen -translate-x-1/2 bg-black"></div>
        </div>
      </div>

      {/* Sertifikat */}
      <div className="relative mx-auto w-full px-5 py-10 sm:px-10 md:px-20 lg:px-30">
        <div className="relative">
          <div className="relative h-24">
            <div className="absolute top-0 left-1/2 h-px w-screen -translate-x-1/2 bg-black"></div>
            <div className="flex h-full items-center justify-center">
              <h2 className="text-center text-4xl font-semibold md:text-6xl">
                Certificates & Achievements 🎖️
              </h2>
            </div>
            <div className="absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 bg-black"></div>
          </div>
          <div className="absolute inset-y-0 left-0 w-px bg-black"></div>
          <div className="absolute inset-y-0 right-0 w-px bg-black"></div>

          <div className="relative max-h-[100vh] overflow-y-auto p-8 after:pointer-events-none after:absolute after:bottom-0 after:left-0 after:h-24 after:w-full after:bg-gradient-to-t after:from-white after:to-transparent after:content-[''] md:p-10">
            <Masonry
              items={masonryItems}
              stagger={0.02}
              animateFrom="bottom"
              blurToFocus={false}
            />
          </div>
        </div>
      </div>

      {/* My journey */}
      <div className="relative w-full px-5 sm:px-10 md:px-20 lg:px-30">
        <div className="mx-auto w-full">
          <h2 className="sm:ext-5xl w-full py-10 text-center text-lg font-medium break-all md:py-20 md:text-7xl">
            My Journey
          </h2>

          <div className="relative flex flex-col gap-y-15 pb-15">
            <div className="absolute left-0 h-full w-px bg-black md:left-25"></div>

            {journeyData.map((item) => (
              <TimelineItem key={item.id} item={item} />
            ))}

            <div className="absolute bottom-0 left-0 h-px w-full bg-black"></div>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="justify-cente my-20 flex min-h-[500px] flex-col items-center">
        <div className="flex h-full w-full flex-col px-5 sm:px-10 md:px-20 lg:px-30">
          <AccordionSection />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-[#121212]">
        <Footer className="px-5 sm:px-10 md:px-20 lg:px-30" />
      </div>
    </section>
  )
}
