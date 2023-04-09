import { useSendMail } from "@hooks/useSendMail"
import { NextApiRequest, NextApiResponse } from "next"
import { NewsletterWelcomeEmail } from "../../../mail_templates/newsletter_welcome"
import { supabase } from "@lib/supabaseClient"
import { log } from "next-axiom"


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const address = req.body.address
  const token = req.body.token
  const ip =
    (req.headers["CF-Connecting-IP"] as string) || req.socket.remoteAddress

  const formData = new FormData()
  formData.append("secret", process.env.TURNSTILE_SECRET_KEY)
  formData.append("response", token)
  formData.append("remoteip", ip)

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      body: formData,
    }
  )

  const data = await response.json()

  if (!data.success) {
    log.error("Invalid turnstile token", data)
    res.status(500).json({ success: false, error: "Invalid turnstile token" })
    return
  }

  try {
    const { data } = await supabase
      .from("mailing_list")
      .select("*")
      .eq("address", address)

    if (data.length > 0) {
      log.error("Already subscribed", data)
      throw new Error("You are already subscribed to my newsletter!")
    }

    const { error } = await supabase
      .from("mailing_list")
      .insert([{ address: address }])
      .single()

    if (error) {
      log.error("Failed to insert into database", error)
      throw new Error(error.message)
    }

    const mail = await useSendMail({
      from: "newsletter@radityaharya.com",
      to: address,
      subject: "Thank you for subscribing to my newsletter!",
      content: NewsletterWelcomeEmail({ address: address }),
    })

    if (mail.error) {
      log.error("Failed to send email", mail.error)
      throw new Error(mail.error)
    }

    log.info("Successfully subscribed", address)
    res.status(200).json({ success: true })
  } catch (error) {
    log.error("Failed to subscribe", error)
    res.status(500).json({ success: false, error: error.message })
  }
}
