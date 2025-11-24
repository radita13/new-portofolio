"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
// import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { FiPlus, FiX } from "react-icons/fi"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-[#121212] last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 items-center justify-between gap-6 rounded-md py-10 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
        {/* <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" /> */}
        <div className="text-muted-foreground pointer-events-none flex size-7 shrink-0 items-center justify-center transition-transform duration-200 group-hover:translate-x-3 group-data-[state=open]:rotate-90">
          <FiPlus className="block text-[#121212] group-data-[state=open]:hidden" />
          <FiX className="hidden text-blue-500 group-data-[state=open]:block" />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
      {...props}
    >
      <div className={cn("pt-0 pb-4", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }

export default function AccordionSection() {
  return (
    <div>
      <h2 className="md:breka-normal border-b border-black pb-10 text-3xl font-medium tracking-wider break-all md:text-5xl lg:text-7xl">
        Any Questions?
      </h2>
      <Accordion
        type="single"
        collapsible
        className="w-full"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1" className="group">
          <AccordionTrigger className="cursor-pointer text-xl font-medium break-all hover:no-underline md:text-3xl">
            What technologies do I master?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p className="text-sm break-all transition-transform duration-300 group-hover:translate-x-3 md:text-lg md:break-normal">
              Here is the technology I use:
            </p>
            <ul className="list-inside list-disc text-sm transition-transform duration-300 group-hover:translate-x-3 md:text-lg">
              <li>
                <strong>Frontend :</strong> React, Next.js, Tailwind CSS, ...
              </li>
              <li>
                <strong>Backend :</strong> Supabase, MongoDB, MySQL, Node.js,
                ...
              </li>
              <li>
                <strong>Other :</strong> Figma, Adobe Photoshop, Git, ...
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2" className="group">
          <AccordionTrigger className="cursor-pointer text-xl font-medium break-all hover:no-underline md:text-3xl">
            What kind of projects are you most interested in?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p className="text-sm break-all transition-transform duration-300 group-hover:translate-x-3 md:text-lg md:break-normal">
              I'm most enthusiastic about projects that challenge{" "}
              <strong>my creativity</strong> and{" "}
              <strong>deliver real value to users </strong>. I enjoy the entire
              process of building clean, intuitive, and responsive user
              interfaces from the ground up.
            </p>
            <p className="text-sm break-all transition-transform duration-300 group-hover:translate-x-3 md:text-lg md:break-normal">
              Projects that allow me to learn new technologies or integrate with
              complex APIs are also particularly exciting to me, as I'm always
              eager to grow my skill set.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3" className="group">
          <AccordionTrigger className="cursor-pointer text-xl font-medium break-all hover:no-underline md:text-3xl">
            Are you open to new opportunities or collaborations?
          </AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p className="text-sm break-all transition-transform duration-300 group-hover:translate-x-3 md:text-lg md:break-normal">
              Absolutely! I am always open to new opportunities, whether it's a
              <strong> full-time position</strong>,{" "}
              <strong> freelance work </strong>, or an interesting project
              <strong> collaboration</strong>. I'm eager to continue learning
              and contributing to impactful projects.
            </p>
            <p className="text-sm break-all transition-transform duration-300 group-hover:translate-x-3 md:text-lg md:break-normal">
              Please feel free to reach out via my contact page or email me
              directly at <strong>raditabussiness@gmail.com</strong>. Let's
              create something amazing together!
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
