import Page from "@layouts/Page"
import { PostProps } from "@lib/types"
import { NextPage } from "next"
import Typewriter from "typewriter-effect"
import Link from "@components/Link"
import { NowPlaying } from "@components/NowPlaying"
import { useFullScreen } from "@hooks/useFullScreen"
export interface Props {
  posts: PostProps[]
  preview: boolean
  nowPlaying: string[]
}

const Home: NextPage<Props> = () => {
  const ref = useFullScreen()
  return (
    <Page nav={false} seo={{ title: "Home" }} footerDivider={false}>
      <div className="select-none">
        <div
          className="hero relative flex justify-center items-center w-full h-screen px-5 md:px-8 lg:px-12 xl:px-16 2xl:px-20 mb-12"
          ref={ref}
        >
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
          <div className="hero-content max-w-6xl z-10 w-full mt-10 sm:mt-0 flex flex-col items-start justify-center">
            <div className="header-container flex flex-col gap-1.5 items-start justify-center">
              <div className="header flex flex-col">
                <div className="opacity-100">
                  <NowPlaying />
                </div>
                <h1
                  className="home-heading heading text-4xl md:text-6xl font-mono font-medium max-w-5xl leading-tight mb-4"
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
                      options={{
                        delay: 50,
                      }}
                    />
                  </span>
                </h1>
              </div>
              <div className="slide-titles flex flex-wrap gap-5 sm:gap justify-start">
                <Links href="/blog">blog</Links>
                <Links href="mailto:contact@radityaharya.me">mail</Links>
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
              </div>
            </div>
          </div>
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
  <Link
    href={href}
    className="home-subtext slide-titles text text-foreground text-sm sm:text-lg font-mono font-light opacity-60 hover:underline hover:text-foreground hover:opacity-100"
  >
    {children}
  </Link>
)

export default Home
