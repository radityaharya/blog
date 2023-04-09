import { render } from "@react-email/render"
import nodemailer from "nodemailer"
import * as React from "react"
import { log } from "next-axiom"

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

  const mail = transporter.sendMail(options, (error, info) => {
    if (error) {
      log.error(error.message)
    } else {
      log.info(`Email sent: ${info.response}`)
    }
  })

  return { mail }
}
