import { verifySignature } from "@upstash/qstash/nextjs"
import { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "@lib/supabaseClient"
import { getDatabase } from "@lib/notion"
import { useSendMail } from "@hooks/useSendMail"
import { notion } from "@lib/notion"
import { NewsletterNewPostEmail } from "../../../mail_templates/newsletter_newpost"
import { log } from "next-axiom"

export default verifySignature(handler)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (process.env.POSTS_TABLE_ID == null) {
    return {
      notFound: true,
    }
  }

  const posts = await getDatabase(process.env.POSTS_TABLE_ID)
  const unMailedPosts = posts.filter(
    (post) => post.properties.Mailed.checkbox == false
  )

  if (unMailedPosts.length > 0) {
    const { data, error } = await supabase.from("mailing_list").select("*")

    if (error) {
      res.status(500).json({ success: false, error: error.message })
      return
    }

    const emails = data.map((address: any) => address.address)

    for (const email of emails) {
      await useSendMail({
        from: "newsletter@radityaharya.com",
        to: email,
        subject: "New blog post from Raditya Harya",
        content: NewsletterNewPostEmail({
          address: email,
          post: unMailedPosts[0],
        }),
      })
    }

    await notion.request({
      path: `pages/${unMailedPosts[0].id}`,
      method: "patch",
      body: {
        properties: {
          Mailed: {
            checkbox: true,
          },
        },
      },
    })

    log.info("Sent new posts to subscribers")
    res.status(200).json({ success: true })
  } else {
    log.info("No new posts to send")
    res.status(200).json({ success: true })
  }
}