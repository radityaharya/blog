import { NextApiRequest, NextApiResponse } from "next"
import { verifySignature } from "@upstash/qstash/nextjs"
import { log } from "next-axiom"

export const config = {
  api: {
    bodyParser: false,
  },
}

export default verifySignature(handler)

async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    log.info("Revalidating...")
    await res.revalidate("/blog")
    log.info("Revalidation complete")
    return res.json({ revalidated: true })
  } catch (err) {
    log.error("Error revalidating", err)
    return res.status(500).send("Error revalidating")
  }
}
