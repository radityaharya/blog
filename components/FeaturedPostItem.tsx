import Link from "@components/Link"
import { PostProps } from "@lib/types"
import dayjs from "dayjs"
import React, { useMemo } from "react"
import { Divider } from "./Divider"
import { NotionText } from "./NotionText"
import { PostCategory } from "./PostCategory"
import Image from "next/image"
import { useState } from "react"

export const FeaturedPostItem: React.FC<{ post: PostProps }> = ({ post }) => {
  const formattedDate = useMemo(
    () =>
      dayjs(new Date(post.properties.Date.date.start)).format("MMM D, YYYY"),
    [post.properties.Date.date.start]
  )

  const author = post.properties.Authors.people[0]
  const category = post.properties.Category.select?.name
  const featuredImage = post.properties.FeaturedImage.files?.[0]

  // let featuredImageUrl =
  // featuredImage?.type === "file"
  //   ? featuredImage?.file?.url
  //   : featuredImage?.type === "external"
  //   ? featuredImage?.external?.url
  //   : null

  const [featuredImageUrl, setFeaturedImageUrl] = useState(
    featuredImage?.type === "file"
      ? featuredImage?.file?.url
      : featuredImage?.type === "external"
      ? featuredImage?.external?.url
      : null
  )

  const onError = async () => {
    fetch(
      `/api/featuredimage?slug=${post.properties.Slug.rich_text[0].plain_text}`
    )
      .then((data) => data.json())
      .then((data) => {
        setFeaturedImageUrl(data.featuredImageUrl)
      })
  }

  return (
    <Link
      href={`/blog/p/${post.properties.Slug.rich_text[0].plain_text}`}
      className="group no-tap-highlight"
    >
      {featuredImage != null ? (
        <div className="w-full aspect-[2.25/1] relative border border-black border-opacity-10 rounded-xl overflow-hidden">
          <Image
            src={featuredImageUrl}
            fill
            priority
            alt={post.properties.Page.title[0].plain_text}
            className="object-cover transition-transform group-hover:scale-[1.05]"
            onError={onError}
            onLoadingComplete={(result) => {
              if (result.naturalWidth === 0) {
                // Broken image
                onError()
              }
            }}
          />
        </div>
      ) : (
        <div className="w-full aspect-[2.25/1] bg-gray-100 rounded-xl" />
      )}

      <div className="mt-6">
        {category != null && <PostCategory category={category} />}

        <h3 className="font-bold text-2xl my-4 group-hover:opacity-60 tracking-tight">
          <NotionText text={post.properties.Page.title} noLinks />
        </h3>

        <p className="text-lg text-gray-800 line-clamp-2">
          <NotionText text={post.properties.Description.rich_text} noLinks />
        </p>

        <div className="flex items-center gap-3 mt-6">
          <img
            src={author.avatar_url}
            alt={`Avatar of ${author.name}`}
            className="w-6 h-6 rounded-full overflow-hidden"
          />
          <span className="font-medium text-sm text-gray-500">
            {author.name}
          </span>
          <Divider />
          <span className="font-medium text-sm text-gray-500">
            {formattedDate}
          </span>
        </div>
      </div>
    </Link>
  )
}
