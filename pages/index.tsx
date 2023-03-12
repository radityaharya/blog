import Page from "@layouts/Page"
import { PostProps } from "@lib/types"
import { NextPage } from "next"
import Typewriter from 'typewriter-effect';
import Link from "@components/Link"

export interface Props {
  posts: PostProps[]
  preview: boolean
}

const Home: NextPage<Props> = () => {
  return (
    <Page nav={false}>
      <link rel="stylesheet" href="/home.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"></link>


      <div className="">
        <div className="hero relative flex justify-start items-center w-full h-screen px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 mb-12">
          <video className="video absolute top-0 left-0 w-full h-full object-cover opacity-60" src="https://r2.radityaharya.me/herovid.mp4"
            loop
            muted
            preload="auto"
            autoPlay
            playsInline></video>
          <div className="hero-content z-10 max-w-screen-xl w-full flex flex-col items-start justify-center">
            <div className="header-container flex flex-col gap-1.5 items-start justify-center">
              <div className="header flex flex-col">
                <h1 className="home-heading heading text-white text-5xl md:text-6xl font-mono font-medium max-w-5xl leading-tight mb-4">
                  <span className="">
                    <Typewriter
                      options={{
                        strings: ['Hi, I\'m Raditya Harya'],
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </span></h1>
              </div>
              <div className="slide-titles flex flex-wrap gap-3 justify-start">
                <Link className="home-subtext slide-titles text text-white text-lg font-mono font-normal hover:underline" href="/blog">
                  <span>blog</span></Link>
                <Link className="home-subtext text text-white text-lg font-mono font-normal hover:underline" href="mailto:contact@radityaharya.me">
                  <span>mail</span></Link>
                <Link className="home-subtext text text-white text-lg font-mono font-normal hover:underline" href="https://linkedin.com/in/radityaharya" external>
                  <span>linkedin</span>
                </Link>
                <Link className="home-subtext text text-white text-lg font-mono font-normal hover:underline" href="https://github.com/radityaharya" external>
                  <span>github</span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}
export default Home
