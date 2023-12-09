import { NextApiHandler } from "next"
import { GetNotionImageSrc } from "../../lib/notion"


// return a valid webfinger response
const handler: NextApiHandler = async (req, res) => {
  const url = "https://auth.radityaharya.com/.well-known/openid-configuration"
  const data = await fetch("https://auth.radityaharya.com/.well-known/openid-configuration")
  
  const json = await data.json()
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "GET")
  res.setHeader("Access-Control-Allow-Headers", "Authorization")
  res.setHeader("Content-Type", "application/jrd+json")

  res.status(200).json({
    subject: "acct:
}

export default handler
