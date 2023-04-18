import Page from "@layouts/Page"
import { getDatabase } from "@lib/notion"
import { generateRssFeed } from "@lib/rss"
import { PostProps } from "@lib/types"
import { GetStaticProps, NextPage } from "next"
import { PostList } from "@components/PostList"
import { getFeaturedImage } from "utils/getFeaturedImage"
import { RichTextText } from "@notionhq/client/build/src/api-types"
export interface Props {
  posts: PostProps[]
  preview: boolean
}

const Home: NextPage<Props> = ({ posts = [] }) => {
  return (
    <Page
      seo={{
        title: "Blog",
        description: "Blog posts on Raditya Harya's personal website.",
      }}
    >
      <PostList posts={posts} />
    </Page>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  if (process.env.POSTS_TABLE_ID == null) {
    return {
      notFound: true,
    }
  }

  const posts = await getDatabase(process.env.POSTS_TABLE_ID)

  generateRssFeed(posts)

  for (const post of posts) {
    const featuredImageUrl = (await getFeaturedImage(
      post.properties.Slug.rich_text[0].plain_text
    )) as string

    // update the FeaturedImageUrl property of type rich_text
    post.properties.FeaturedImageUrl = {
      type: "rich_text",
      id: "FeaturedImageUrl",
      rich_text: [
        {
          type: "text",
          text: {
            content: featuredImageUrl,
          },
          plain_text: featuredImageUrl,
          annotations: {
            bold: false,
            italic: false,
            strikethrough: false,
            underline: false,
            code: false,
            color: "default",
          },
          href: null,
        },
      ] as RichTextText[],
    }
  }

  return {
    props: { posts },
    revalidate: 600, // 10 minutes
  }
}

export default Home
