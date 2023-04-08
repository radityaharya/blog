import Link from "@components/Link"
import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Text,
  Section,
  Row,
  Heading,
  Column,
  Img,
} from "@react-email/components"
import * as React from "react"
import { PostProps } from "@lib/types"
import { Tailwind } from "@react-email/components"
import { PostCategory } from "@components/PostCategory"
import { NotionText } from "@components/NotionText"
import { Divider } from "@components/Divider"
import dayjs from "dayjs"

interface NewsletterNewPostEmailProps {
  address: string | string[]
  post: PostProps
}

const baseUrl = "https://radityaharya.com"

export const NewsletterNewPostEmail = ({
  address = " ",
  post,
}: NewsletterNewPostEmailProps) => {
  const formattedDate = dayjs(post.properties.Date.date.start).format(
    "MMMM D, YYYY"
  )

  const author = post.properties.Authors.people[0]
  const category = post.properties.Category.select?.name
  const featuredImage = post.properties.FeaturedImage.files?.[0]
  const featuredImageUrl =
    featuredImage?.type === "file"
      ? featuredImage?.file?.url
      : featuredImage?.type === "external"
      ? featuredImage?.external?.url
      : null

  return (
    <Html>
      <Head />
      <Preview>New post on my blog!</Preview>

      <Body>
        <Container>
          <Section>
            <Row>
              <Column>
                <Heading className="font-mono text-2xl text-gray-900">
                  {" "}
                  Hi there!{" "}
                </Heading>
                <Text className="font-mono text-sm text-gray-500">
                  I just published a new post on my blog. I hope you enjoy it!
                </Text>
                <Tailwind>
                  <Link
                    href={`${baseUrl}/blog/p/${post.properties.Slug.rich_text[0].plain_text}`}
                    className="group no-tap-highlight text-gray-900 visited:text-gray-900 underline-none"
                  >
                    {featuredImage != null ? (
                      <div className="w-full aspect-[2.25/1] relative border border-black border-opacity-10 rounded-xl overflow-hidden">
                        <Img
                          src={featuredImageUrl}
                          alt={post.properties.Page.title[0].plain_text}
                          className="object-cover transition-transform group-hover:scale-[1.05]"
                          width="100%"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-[2/1] bg-gray-100 rounded-xl" />
                    )}

                    <div className="mt-6">
                      {category != null && <PostCategory category={category} />}

                      <h3 className="font-bold text-2xl my-4 group-hover:opacity-60 tracking-tight">
                        <NotionText text={post.properties.Page.title} noLinks />
                      </h3>

                      <p className="text-lg text-gray-800 line-clamp-2">
                        <NotionText
                          text={post.properties.Description.rich_text}
                          noLinks
                        />
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
                </Tailwind>
                <Hr style={hr} />
                <Text style={footer}>
                  {" "}
                  don&apos;t want to receive these emails?{" "}
                  <Link
                    href={`https://radityaharya.com/api/newsletter/unsubscribe?address=${address}`}
                  >
                    unsubscribe
                  </Link>
                  .
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
}

const footer = {
  color: "#8898aa",
  fontSize: "12px",
}

export default NewsletterNewPostEmail
