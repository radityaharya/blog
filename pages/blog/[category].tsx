import Page from "@layouts/Page"
import { getDatabase } from "@lib/notion"
import { PostProps } from "@lib/types"
import { GetStaticPaths, GetStaticProps, NextPage } from "next"
import { PostList } from "../../components/PostList"
import { CATEGORIES } from "../../constants"
import { RichTextText } from "@notionhq/client/build/src/api-types"
import { getFeaturedImage } from "utils/getFeaturedImage"

export interface Props {
  posts: PostProps[]
  category: string
}

const CategoryPage: NextPage<Props> = ({ posts = [], category }) => {
  return (
    <Page
      seo={{
        title: `Blog - ${category}`,
        description: `Blog posts about ${category} on Raditya Harya's personal website.`,
      }}
    >
      <PostList posts={posts} category={category} />
    </Page>
  )
}

export const getStaticProps: GetStaticProps = async (props) => {
  if (process.env.POSTS_TABLE_ID == null) {
    return {
      notFound: true,
    }
  }

  if (props.params?.category == null) {
    return {
      notFound: true,
    }
  }

  if (!CATEGORIES.includes(props.params?.category as string)) {
    return {
      notFound: true,
    }
  }

  const category = props.params?.category as string

  const posts = (await getDatabase(process.env.POSTS_TABLE_ID)).filter(
    (p) =>
      p.properties.Category.select?.name?.toLowerCase() ===
      (category as string).toLowerCase()
  )

  for (const post of posts) {
    const featuredImageUrl = (await getFeaturedImage(
      post.properties.Slug.rich_text[0].plain_text
    )) as string

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
    props: { posts, category },
    revalidate: 600, // 10 minutes
  }
}

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: CATEGORIES.map((c) => `/blog/${c}`),
    fallback: true,
  }
}

export default CategoryPage
