import Page from "@layouts/Page"
import { PostProps } from "@lib/types"
import { GetStaticProps, NextPage } from "next"
import Typewriter from "typewriter-effect"
import Link from "@components/Link"
import { NowPlaying } from "@components/NowPlaying"
import { useRef, useEffect } from "react"
import { HomepagePostList } from "../components/HomepagePostList"
import { getDatabase } from "@lib/notion"

export interface Props {
  posts: PostProps[]
  preview: boolean
  nowPlaying: string[]
}

const Home: NextPage<Props> = ({ posts = [] }) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        null
      })
    }
  }, [])

  return (
    <Page nav={false} footerDivider={false}>
      <div className="select-none">
        <div className="hero relative flex justify-center items-center w-full h-screen px-auto mb-12">
          <div className="video-container w-full h-full absolute top-0 left-0 z-0">
            <video
              className="video top-0 left-0 w-full h-full object-cover opacity-60"
              src="/assets/herovid-low.webm"
              loop
              muted
              preload="auto"
              autoPlay
              playsInline
              poster="/assets/herovid.jpg"
            ></video>
          </div>
          <div className="hero-content max-w-6xl z-10 w-full mt-10 sm:mt-0 flex flex-col items-start justify-center px-5">
            <div className="header-container flex flex-col gap-1.5 items-start justify-center">
              <div className="header flex flex-col">
                <div className="opacity-100">
                  <NowPlaying />
                </div>
                <h1 className="home-heading heading text-4xl md:text-6xl font-mono font-medium max-w-5xl leading-tight mb-4 min-h-[2.5rem]">
                  <span className="">
                    <Typewriter
                      onInit={(typewriter) => {
                        typewriter.typeString("Hi, I'm Raditya Harya").start()
                      }}
                      options={{
                        delay: 20,
                      }}
                    />
                  </span>
                </h1>
              </div>
              <ul className="slide-titles flex flex-wrap gap-5 sm:gap justify-start">
                <Links href="/blog">blog</Links>
                <Links href="mailto:contact@radityaharya.com">mail</Links>
                <Links href="https://linkedin.com/in/radityaharya" external>
                  linkedin
                </Links>
                <Links href="https://github.com/radityaharya" external>
                  github
                </Links>
                <Links
                  href="https://open.spotify.com/user/radityaharya"
                  external
                >
                  spotify
                </Links>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="relative flex justify-center items-center w-full px-auto mb-12">
        <div className="content max-w-6xl z-10 w-full flex flex-col items-start justify-center px-5">
          <HomepagePostList posts={posts} />
        </div>
      </div>
    </Page>
  )
}

const Links: React.FC<{
  href: string
  children?: React.ReactNode
  external?: boolean
}> = ({ children, href }) => (
  <li>
    <Link
      href={href}
      className="home-subtext slide-titles text text-foreground text-sm sm:text-lg font-mono font-light opacity-60 hover:underline hover:text-foreground hover:opacity-100"
    >
      {children}
    </Link>
  </li>
)

export const getStaticProps: GetStaticProps = async () => {
  if (process.env.POSTS_TABLE_ID == null) {
    return {
      notFound: true,
    }
  }

  const posts = await getDatabase(process.env.POSTS_TABLE_ID)
  posts.splice(3)

  return {
    props: { posts },
    revalidate: 900, // 15 minutes
  }
}

export default Home
