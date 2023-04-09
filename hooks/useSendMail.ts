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

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT as unknown as number,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
})

export const useSendMail = async ({
  from,
  to,
  subject,
  content,
}: SendMailProps) => {
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

  try {
    const info = await new Promise((resolve, reject) => {
      transporter.sendMail(options, (error, info) => {
        if (error) {
          log.error(error.message)
          reject(error)
        } else {
          log.info(`Message sent: ${info}`)
          resolve(info)
        }
      })
    })

    log.info(`Message sent: ${info}`)
  } catch (error) {
    log.error(error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
