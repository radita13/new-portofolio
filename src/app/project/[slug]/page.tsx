import { projectData } from "@/data/project"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import ProjectImageTV from "@/components/animation/ProjectImageTV"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { ArrowUpRight } from "lucide-react"
import Footer from "@/components/shared/Footer"
import ReactMarkdown from "react-markdown"

type PageProps = {
  params: {
    slug: string
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  // 1. Ambil nilai slug terlebih dahulu
  const { slug } = await params

  // 2. Baru gunakan variabel 'slug' untuk mencari
  const project = projectData.find(
    (p) => p.slug.toLowerCase().trim() === slug.toLowerCase().trim()
  )

  if (!project) {
    return { title: "Project Not Found" }
  }
  return {
    title: project.title,
    description: `Detail for the project: ${project.title}`,
  }
}

export default async function SingleProjectPage({ params }: PageProps) {
  // 1. Ambil nilai slug terlebih dahulu
  const { slug } = await params

  // 2. Baru gunakan variabel 'slug' untuk mencari
  const project = projectData.find(
    (p) => p.slug.toLowerCase().trim() === slug.toLowerCase().trim()
  )

  if (!project) {
    notFound()
  }

  return (
    <>
      <div className="h-[20vh]"></div>

      <section className="relative w-screen">
        <div className="absolute top-0 z-10 h-px w-full bg-black"></div>
        <div className="absolute top-24 z-10 h-px w-full bg-black"></div>
        <div className="px-5 sm:px-10 md:px-20 lg:px-30">
          <div className="relative">
            <div className="absolute inset-y-0 top-0 left-0 z-10 w-px bg-black"></div>
            <div className="absolute inset-y-0 top-0 right-0 z-10 w-px bg-black"></div>
            <div className="h-24">
              <div className="relative z-0 flex h-full w-full items-center justify-center">
                <h1 className="text-3xl font-bold md:text-5xl">
                  {project.title}
                </h1>
              </div>
            </div>

            <div className="relative">
              <ProjectImageTV
                imageUrl={project.imageUrl}
                title={project.title}
              />
              <div className="absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 border-b border-black"></div>
            </div>

            <div className="relative px-5 py-5 text-start md:px-20 md:py-20">
              <h2 className="text-3xl font-semibold md:text-6xl">
                About Project
              </h2>

              <div className="prose mt-4 font-normal text-gray-700">
                <ReactMarkdown>{project.description}</ReactMarkdown>
              </div>
              <div className="absolute bottom-0 left-1/2 h-px w-screen -translate-x-1/2 border-b border-black"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 mb-20 w-full">
        <div className="flex flex-col items-center justify-center gap-5 px-5 sm:flex-row sm:justify-between sm:gap-0 sm:px-10 md:px-20 lg:px-30">
          <div className="order-1 flex flex-col gap-5 sm:gap-0">
            <div className="flex flex-row items-center justify-center gap-2 sm:justify-start">
              <h2 className="text-lg font-medium text-sky-500">
                {project.category}
              </h2>{" "}
              |
              <h2 className="text-lg font-medium text-sky-500">
                {project.devId}
              </h2>
            </div>
            <p className="text-center text-lg sm:text-left">
              Developer
              <strong className="font-medium"> by {project.author}</strong>
            </p>
          </div>

          <div className="relative order-2 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Link href={project.viewUrl}>
              <Button
                variant={"viewUrl"}
                className="rounded-full text-sm font-normal md:text-lg"
                size={"lg"}
              >
                VIEW PROJECT
                <ArrowUpRight className="ml-2 size-6" />
              </Button>
            </Link>

            <Link href={project.githubUrl}>
              <Button
                variant={"githubUrl"}
                className="rounded-full text-sm font-normal md:text-lg"
                size={"lg"}
              >
                VIEW GITHUB
                <ArrowUpRight className="ml-2 size-6" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#121212] px-5 sm:px-10 md:px-20 lg:px-30">
        <Footer />
      </section>
    </>
  )
}
