import Link from "next/link"
import { PostProps } from "../lib/types"
import HomepagePostItem from "./HomepagePostItem"

export const HomepagePostList: React.FC<{
  posts: PostProps[]
  category?: string
}> = ({ posts }) => {
  const featuredPosts = posts.filter((p) => p.properties.Featured.checkbox)
  return (
    <>
      <div className="w-full mx-auto select-none">
        <h2 className="font-mono text-2xl md:text-3xl font-medium leading-tight mb-10 sm:mb-20 min-h-[2rem]">
          systemd-journald
        </h2>
        <div className="max-w-6xl w-full mx-auto">
          {featuredPosts.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between mb-8 gap-4">
              {featuredPosts.map((p) => (
                <HomepagePostItem key={p.id} post={p} />
              ))}
            </div>
          )}
        </div>
        <div className="max-w-6xl w-full mx-auto">
          <Link
            href="/blog"
            className="font-mono text-sm mb-1 hover:opacity-60 tracking-tight no-tap-highlight"
          >
            See all posts;
          </Link>
        </div>
      </div>
    </>
  )
}
