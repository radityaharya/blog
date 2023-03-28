import { Feed } from "feed"
import { writeFileSync } from "fs"

import { PostProps } from "@lib/types"

export const generateRssFeed = (posts: PostProps[]) => {
  const baseUrl = "https://radityaharya.com"
  const author = {
    name: "radityaharya",
    email: "contact@radityaharya.com",
  }

  const feed = new Feed({
    title: "Raditya's Blog",
    description:
      "A blog about my journey as a software engineer, and my thoughts about technology.",
    id: baseUrl,
    link: baseUrl,
    language: "en",
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    author,
    copyright: "Copyright © 2023 Raditya Harya.",
  })

  posts.forEach((post) => {
    const url =
      baseUrl + "/blog/p/" + post.properties.Slug.rich_text[0].plain_text
    feed.addItem({
      title: post.properties.Page.title[0].plain_text,
      description: post.properties.Description.rich_text[0].plain_text,
      id: url,
      link: url,
      date: new Date(post.properties.Date.date.start),
    })
  })

  writeFileSync(`public/rss.xml`, feed.rss2())
}
