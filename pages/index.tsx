import Page from "@layouts/Page"
import { PostProps } from "@lib/types"
import { NextPage } from "next"
import Typewriter from "typewriter-effect"
import Link from "@components/Link"
import { NowPlaying } from "@components/NowPlaying"

export interface Props {
  posts: PostProps[]
  preview: boolean
  nowPlaying: string[]
}

const Home: NextPage<Props> = () => {
  // const spNowPlaying = NowPlaying()

  return (
    <Page nav={false} seo={{ title: "Home" }}>
      <div className="select-none">
        <div className="hero relative flex justify-start items-center w-full h-screen px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 mb-12">
          <div className="video-container w-full h-full absolute top-0 left-0 z-0">
          <video
            className="video top-0 left-0 w-full h-full object-cover opacity-60"
            src="/assets/herovid.mp4"
            loop
            muted
            preload="auto"
            autoPlay
            playsInline
            poster="/assets/herovid.jpg"
          ></video>
          </div>
          <div className="hero-content z-10 max-w-screen-xl w-full flex flex-col items-start justify-center">
            <div className="header-container flex flex-col gap-1.5 items-start justify-center">
              <div className="header flex flex-col">
                <div className="opacity-100">
                <NowPlaying />
                </div>
                <h1
                  className="home-heading heading text-5xl md:text-6xl font-mono font-medium max-w-5xl leading-tight mb-4"
                  style={{ height: "min-content" }}
                >
                  <span className="">
                    <Typewriter
                      onInit={(typewriter) => {
                        typewriter
                          .typeString("Hi, I'm Raditya Harya")
                          .pauseFor(2500)
                          .start()
                      }}
                    />
                  </span>
                </h1>
              </div>
              <div className="slide-titles flex flex-wrap gap-6 justify-start">
                <Link
                  className="home-subtext slide-titles text text-foreground text-lg font-mono font-light opacity-60 hover:underline hover:text-foreground hover:opacity-100"
                  href="/blog"
                >
                  <span>blog</span>
                </Link>
                <Link
                  className="home-subtext slide-titles text text-foreground text-lg font-mono font-light opacity-60 hover:underline hover:text-foreground hover:opacity-100"
                  href="mailto:contact@radityaharya.me"
                >
                  <span>mail</span>
                </Link>
                <Link
                  className="home-subtext slide-titles text text-foreground text-lg font-mono font-light opacity-60 hover:underline hover:text-foreground hover:opacity-100"
                  href="https://linkedin.com/in/radityaharya"
                  external
                >
                  <span>linkedin</span>
                </Link>
                <Link
                  className="home-subtext slide-titles text text-foreground text-lg font-mono font-light opacity-60 hover:underline hover:text-foreground hover:opacity-100"
                  href="https://github.com/radityaharya"
                  external
                >
                  <span>github</span>
                </Link>
                <Link
                  className="home-subtext slide-titles text text-foreground text-lg font-mono font-light opacity-60 hover:underline hover:text-foreground hover:opacity-100"
                  href="https://open.spotify.com/user/radityaharya"
                  external
                >
                  <span>spotify</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Home
 

