import Page from "@layouts/Page"
import { getDatabase } from "@lib/notion"
import { generateRssFeed } from "@lib/rss"
import { PostProps } from "@lib/types"
import { GetStaticProps, NextPage } from "next"
import { PostList } from "../components/PostList"

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

  return {
    props: { posts },
    revalidate: 10,
  }
}

export default Home
