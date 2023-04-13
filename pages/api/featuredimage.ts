import { NextApiHandler } from "next"
import { notion } from "@lib/notion"
import { PostProps } from "@lib/types"
import { Redis } from "@upstash/redis"

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const handler: NextApiHandler = async (req, res) => {
  const slug = req.query.slug as string

  if (!slug) {
    res.status(400).json({ message: "Slug is required" })
    return
  }

  // Check if the response is cached
  const cachedResponse = (await redis.get(slug)) as unknown as PostProps
  if (cachedResponse) {
    const { properties } = cachedResponse
    const featuredImage = properties?.FeaturedImage?.files?.[0]
    const featuredImageUrl =
      featuredImage?.type === "file"
        ? featuredImage?.file?.url
        : featuredImage?.type === "external"
        ? featuredImage?.external?.url
        : null

    res.status(200).json({ featuredImageUrl })
    return
  }

  try {
    const response = await notion.databases.query({
      database_id: process.env.POSTS_TABLE_ID,
      filter: {
        property: "Slug",
        text: {
          equals: slug,
        },
      },
    })

    const results = response.results as unknown as PostProps[]

    if (results.length === 0) {
      res.status(404).json({ message: "Post not found" })
      return
    }

    const post = results[0]

    const featuredImage = post.properties?.FeaturedImage?.files?.[0]

    const featuredImageUrl =
      featuredImage?.type === "file"
        ? featuredImage?.file?.url
        : featuredImage?.type === "external"
        ? featuredImage?.external?.url
        : null

    if (!featuredImageUrl) {
      res.status(404).json({ message: "Featured image not found" })
      return
    }

    // Cache the response to
    redis.set(slug, post, { ex: 60 * 2 })

    res.status(200).json({ featuredImageUrl })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}

export default handler
