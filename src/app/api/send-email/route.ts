import { NextResponse } from "next/server"
import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "raditabussiness@gmail.com",
      subject: `New message from ${name} via Portofolio`,
      html: `
        <h1>New Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ message: "Email sent successfully!", data })
  } catch (error) {
    console.error("Error sending email:", error)

    return NextResponse.json(
      { message: "Something went wrong." },
      { status: 500 }
    )
  }
}
