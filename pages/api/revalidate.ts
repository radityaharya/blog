import { NextApiRequest, NextApiResponse } from "next"
import { log } from "next-axiom"

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const QSTASH_CURRENT_SIGNING_KEY = req.headers["x-qstash-signing-key"]


  if (QSTASH_CURRENT_SIGNING_KEY == null) {
    res.status(400).json({ success: false, error: "Missing signing key" })
    return
  }

  if (QSTASH_CURRENT_SIGNING_KEY !== process.env.QSTASH_CURRENT_SIGNING_KEY) {
    res.status(401).json({ success: false, error: "Unauthorized" })
    return
  }

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
