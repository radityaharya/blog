import Link from "@components/Link"
import { PostProps } from "@lib/types"
import dayjs from "dayjs"
import React, { Suspense, useMemo } from "react"
import { NotionText } from "./NotionText"
export interface Props {
  post: PostProps
}

const HomepagePostItem: React.FC<Props> = ({ post }) => {
  const formattedDate = useMemo(
    () =>
      dayjs(new Date(post.properties.Date.date.start)).format("MMM D, YYYY"),
    [post.properties.Date.date.start]
  )

  return (
    <Link
      href={`/blog/p/${post.properties.Slug.rich_text[0].plain_text}`}
      className="flex flex-col group no-tap-highlight"
    >
      <div className="flex-grow">
        <span className="font-mono text-lg mt-2 mb-1 group-hover:opacity-60 tracking-tight">
          <NotionText text={post.properties.Page.title} noLinks />
        </span>

        <p className="text-base font-mono text-gray-700 line-clamp-2">
          <NotionText text={post.properties.Description.rich_text} noLinks />
        </p>
      </div>

      <div className="flex font-mono items-center gap-3 mt-5 mb-5">
        <span className="font-medium text-sm text-gray-500">
          <time>
            <Suspense fallback={"..."}>{formattedDate}</Suspense>
          </time>
        </span>
      </div>
    </Link>
  )
}

export default HomepagePostItem
