import { NextApiHandler } from "next"
import { GetNotionImageSrc } from "../../lib/notion"

const handler: NextApiHandler = async (req, res) => {
  const blockId = req.query.blockId as string

  if (blockId == null) {
    res.status(404).json({ message: "Block ID is not defined" })
    return
  }
  const imageSrc = await GetNotionImageSrc(blockId)
  res.json({ imageSrc })
}

export default handler
