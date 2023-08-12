import { DefaultSeo, NextSeo, NextSeoProps } from "next-seo"
import Head from "next/head"
import { DefaultSeoProps } from "next-seo"

export interface Props extends NextSeoProps {
  title?: string
  description?: string
  image?: string
  author?: string
  keywords: string
}

const title = "Raditya Harya"
export const url = "https://radityaharya.com"
const description = "Blog posts by Raditya Harya"
const image = ""

const config: DefaultSeoProps = {
  title,
  description,
  openGraph: {
    type: "website",
    url,
    site_name: title,
    images: [{ url: image }],
    article: {
      authors: [],
    },
  },
  twitter: {
    cardType: "summary_large_image",
  },
}

const SEO: React.FC<Props> = ({ image, author, ...props }) => {
  const title = props.title ?? config.title

  return (
    <>
      <DefaultSeo {...config} />

      <NextSeo
        {...props}
        additionalMetaTags={[
          {
            name: "keywords",
            content:
              props.keywords ?? "Blog, raditya, harya, radityaharya, tech blog",
          },
        ]}
        {...(image == null
          ? {}
          : {
              openGraph: {
                images: [{ url: image }],
                article: {
                  authors: [author],
                },
              },
            })}
      />

      <Head>
        <title>{title}</title>
      </Head>
    </>
  )
}

export default SEO
