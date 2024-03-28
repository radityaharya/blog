import { sortPosts, allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'
import { genPageMetadata } from './seo'
import type { Metadata } from 'next'

export const metadata: Metadata = genPageMetadata({})

// biome-ignore lint/suspicious/useAwait: <explanation>
export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
