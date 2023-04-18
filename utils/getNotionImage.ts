import { supabase } from "@lib/supabaseClient"
import { log } from "next-axiom"

export const getNotionImage = async (blockId: string, src: string) => {
  // check if the featured image is cached in supabase

  const { data, error } = await supabase.storage.from("public").list("blog", {
    limit: 1,
    offset: 0,
    search: `content-${blockId}.png`,
  })

  
  if (error) {
    throw new Error(error.message)
  }

  if (data.length > 0) {
    const { data: image } = supabase.storage
      .from("public")
      .getPublicUrl(`blog/content-${blockId}.png`)
    return image.publicUrl
  }

  const image = await fetch(src)
  if (!image.ok) {
    throw new Error("Image not found")
  }

  const imageBlob = await image.blob()
  log.info("Uploading image to supabase")
  const { error: uploadError } = await supabase.storage
    .from("public")
    .upload(`blog/content-${blockId}.png`, imageBlob, {
      contentType: "image/png",
      cacheControl: "3600",
    })

  if (uploadError) {
    log.error(uploadError.message)
    throw new Error(uploadError.message)
  }

  const { data: image2 } = await supabase.storage
    .from("public")
    .getPublicUrl(`blog/content-${blockId}.png`)
  return image2.publicUrl
}
