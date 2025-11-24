"use client"

import useContactForm from "@/hooks/useContactForm"
import { Button } from "./ui/Button"
import { Input } from "./ui/Input"
import { Textarea } from "./ui/Textarea"
import { cn } from "@/lib/utils"
import Footer from "./shared/Footer"
import { Alert, AlertDescription, AlertTitle } from "./ui/Alert"
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6"

export default function Contact() {
  const {
    formData,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isSubmitting,
    statusMessage,
  } = useContactForm()

  return (
    <>
      <section className="relative mx-auto w-screen px-5 py-15 md:px-20">
        {statusMessage && (
          <Alert
            className="absolute top-20 left-1/2 w-full max-w-lg -translate-x-1/2"
            variant={statusMessage.type === "error" ? "destructive" : "default"}
          >
            {statusMessage.type === "success" && (
              <FaCircleCheck className="text-green-500" />
            )}
            {statusMessage.type === "error" && <FaCircleXmark />}

            <AlertTitle
              className={cn(
                statusMessage.type === "success" && "text-green-500"
              )}
            >
              {statusMessage.type === "error" ? "Error" : "Success"}
            </AlertTitle>
            <AlertDescription>{statusMessage.text}</AlertDescription>
            <div
              className={cn(
                "progress-bar absolute bottom-0 left-0 h-px rounded-b-lg",
                statusMessage.type === "success" ? "bg-green-500" : "bg-red-500"
              )}
            ></div>
          </Alert>
        )}

        <div className="flex min-h-screen w-full flex-col justify-center gap-16">
          <h1 className="w-full pt-10 text-center text-4xl font-semibold sm:text-5xl md:text-8xl">
            Let&apos;s start a new project 🚀
          </h1>
          <form
            onSubmit={handleSubmit}
            className="relative flex flex-col items-center justify-center gap-16"
          >
            <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2">
              <div className="relative flex w-full flex-col gap-2">
                <label htmlFor="name" className="text-2xl font-medium">
                  What&apos;s your name ?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.name}
                  placeholder="Radita"
                  className={cn(
                    "input-padding-transition w-full rounded-none rounded-t-md border-0 border-b border-[#121212] bg-transparent p-0 py-3 pl-0 placeholder-transparent shadow-none duration-300 focus:bg-slate-50 focus:pl-2 focus:outline-none focus-visible:ring-0",
                    errors.name
                      ? "border-red-500 focus-visible:border-b-red-500"
                      : "border-[#121212] focus-visible:border-b-[#121212]"
                  )}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>
              <div className="relative flex w-full flex-col gap-2">
                <label htmlFor="email" className="text-2xl font-medium">
                  What&apos;s your email ?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="text"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={formData.email}
                  placeholder="Your Email"
                  className={cn(
                    "input-padding-transition w-full rounded-none rounded-t-md border-0 border-b border-[#121212] bg-transparent p-0 py-3 pl-0 placeholder-transparent shadow-none duration-300 focus:bg-slate-50 focus:pl-2 focus:outline-none focus-visible:ring-0",
                    errors.email
                      ? "border-red-500 focus-visible:border-b-red-500"
                      : "border-[#121212] focus-visible:border-b-[#121212]"
                  )}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="flex w-full flex-col gap-2">
              <label htmlFor="message" className="text-2xl font-medium">
                What&apos;s your message ?{" "}
                <span className="text-red-500">*</span>
              </label>
              <Textarea
                id="message"
                name="message"
                onChange={handleChange}
                onBlur={handleBlur}
                value={formData.message}
                placeholder="I would like to discuss a project with you...."
                className={cn(
                  "input-padding-transition resize-none rounded-none border-0 border-b border-[#121212] p-0 py-3 shadow-none duration-300 focus:rounded-t-md focus:bg-slate-50 focus:pl-2 focus:outline-none focus-visible:border-b-[#121212] focus-visible:ring-0",
                  errors.message
                    ? "border-red-500 focus-visible:border-b-red-500"
                    : "border-[#121212] focus-visible:border-b-[#121212]"
                )}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            <Button
              variant="interactive-dark"
              className="z-10 w-1/12 rounded-full px-20 py-7 text-2xl"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send"}
            </Button>
          </form>
        </div>
      </section>

      <section className="bg-[#121212]">
        <Footer className="mx-5 sm:mx-10 md:mx-20 lg:mx-30" />
      </section>
    </>
  )
}
