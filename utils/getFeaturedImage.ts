import { supabase } from "@lib/supabaseClient"
import { notion } from "@lib/notion"
import { PostProps } from "@lib/types"

export const getFeaturedImage = async (slug: string) => {
  // check if the featured image is cached

  const pages = await notion.databases.query({
    database_id: process.env.POSTS_TABLE_ID,
    filter: {
      property: "Slug",
      text: {
        equals: slug,
      },
    },
  })

  const results = pages.results as unknown as PostProps[]

  if (results[0].properties?.FeaturedImageUrl?.rich_text?.[0]?.plain_text) {
    const featuredImageUrl =
      results[0].properties?.FeaturedImageUrl.rich_text[0].plain_text

    if (featuredImageUrl) {
      return featuredImageUrl
    }
  }

  const featuredImage = results[0].properties?.FeaturedImage?.files?.[0]

  const featuredImageFileUrl =
    featuredImage?.type === "file"
      ? featuredImage?.file?.url
      : featuredImage?.type === "external"
      ? featuredImage?.external?.url
      : null

  if (!featuredImageFileUrl) {
    return null
  }

  const featuredImageFile = await fetch(featuredImageFileUrl)

  if (!featuredImageFile.ok) {
    return null
  }

  const featuredImageBlob = await featuredImageFile.blob()

  const { error } = await supabase.storage
    .from("public")
    .upload(`featured-image-${slug}.png`, featuredImageBlob, {
      contentType: "image/png",
      cacheControl: "3600",
      upsert: true,
    })

  if (error) {
    throw new Error(error.message)
  }

  const { data: publicData } = supabase.storage
    .from("public")
    .getPublicUrl(`featured-image-${slug}.png`)

  if (!publicData) {
    throw new Error("Featured image not found")
  }

  //   update link to notion
  await notion.request({
    path: `pages/${results[0].id}`,
    method: "patch",
    body: {
      properties: {
        FeaturedImageUrl: {
          rich_text: [
            {
              type: "text",
              text: {
                content: publicData.publicUrl,
              },
            },
          ],
        },
      },
    },
  })

  return publicData.publicUrl
}
