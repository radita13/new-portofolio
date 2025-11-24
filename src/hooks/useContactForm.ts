import { useState } from "react"

interface FormData {
  name: string
  email: string
  message: string
}

interface Errors {
  name?: string
  email?: string
  message?: string
}

interface StatusMessage {
  text: string
  type: "success" | "error"
}

export default function useContactForm() {
  // Send Email
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })
  const [errors, setErrors] = useState<Errors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null)

  const validate = (fieldName: keyof FormData, value: string) => {
    const newErrors: Errors = { ...errors }

    switch (fieldName) {
      case "name":
        if (!value) {
          newErrors.name = "Please enter your name."
        } else {
          delete newErrors.name
        }
        break
      case "email":
        if (!value) {
          newErrors.email = "Please enter your email."
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          newErrors.email = "Email address is invalid."
        } else {
          delete newErrors.email
        }
        break
      case "message":
        if (!value) {
          newErrors.message = "Please enter your message."
        } else {
          delete newErrors.message
        }
        break
      default:
        break
    }
    setErrors(newErrors)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as { name: keyof FormData; value: string }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      validate(name, value)
    }
  }

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as { name: keyof FormData; value: string }
    validate(name, value)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatusMessage(null)

    // Lakukan validasi semua field sebelum submit
    const newErrors: Errors = {}
    if (!formData.name) newErrors.name = "Please enter your name."
    if (!formData.email) newErrors.email = "Please enter your email."
    if (!formData.message) newErrors.message = "Please enter your message."
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      setIsSubmitting(false)
      return
    }

    console.log("Simulating form submission with data:", formData)
    setStatusMessage({
      text: "Sending message... (This is a test)",
      type: "success",
    })
    setFormData({ name: "", email: "", message: "" })
    setIsSubmitting(false)

    // setTimeout(() => {
    //   setStatusMessage({
    //     text: "Message sent successfully! (This is a test)",
    //     type: "success",
    //   })
    //   setFormData({ name: "", email: "", message: "" })
    //   setIsSubmitting(false)

    //   // Set timeout lagi untuk menghilangkan alert setelah 5 detik
    //   setTimeout(() => {
    //     setStatusMessage(null)
    //   }, 5000) // 5000 milidetik = 5 detik
    // }, 1000) // Tiru jeda jaringan 1

    // Proces send email
    // try {
    //   const response = await fetch("/api/send-email", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   })

    //   if (!response.ok) {
    //     throw new Error("Failed to send message.")
    //   }

    //   setStatusMessage({
    //     text: "Message sent successfully! Thank you.",
    //     type: "success",
    //   })
    //   // Reset form
    //   setFormData({ name: "", email: "", message: "" })
    // } catch (error) {
    //   setStatusMessage({
    //     text: "Something went wrong. Please try again.",
    //     type: "error",
    //   })
    //   console.error(error)
    // } finally {
    //   setIsSubmitting(false)
    // }
  }

  // Kembalikan semua state dan fungsi yang dibutuhkan oleh komponen
  return {
    formData,
    errors,
    isSubmitting,
    statusMessage,
    handleChange,
    handleBlur,
    handleSubmit,
  }
}
