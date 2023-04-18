import { render } from "@react-email/render"
import * as React from "react"
import { log } from "next-axiom"
import { Client } from "@sendgrid/client"
import sgMail from "@sendgrid/mail"

sgMail.setClient(new Client())
sgMail.setApiKey(process.env.SENDGRID_API_KEY)
sgMail.setSubstitutionWrappers("{{", "}}")

export interface SendMailProps {
  from: string
  to: string | string[]
  subject: string
  content: React.ReactElement
  additionalHeaders?: Record<string, string>
}

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
    await sgMail.send(options)
  } catch (error) {
    log.error(error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
