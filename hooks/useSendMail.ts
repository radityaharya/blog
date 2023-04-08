import { render } from "@react-email/render"
import nodemailer from "nodemailer"
import * as React from "react"

export interface SendMailProps {
  from: string
  to: string | string[]
  subject: string
  content: React.ReactElement
  additionalHeaders?: Record<string, string>
}

export const useSendMail = ({ from, to, subject, content }: SendMailProps) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT as unknown as number,
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })

  const unsubscribeHeaders = {
    "List-Unsubscribe": `https://radityaharya.com/api/newsletter/unsubscribe?address=${to}`,
  }

  const options = {
    from: from,
    to: to,
    subject: subject,
    html: render(content),
    headers: unsubscribeHeaders,
  }

  transporter.sendMail(options)
  // eslint-disable-next-line no-console
  console.log(`Email sent to ${to}`)
}
