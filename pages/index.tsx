import Page from "@layouts/Page"
import { PostProps } from "@lib/types"
import { NextPage } from "next"
import Typewriter from 'typewriter-effect';

export interface Props {
  posts: PostProps[]
  preview: boolean
}

const Home: NextPage<Props> = () => {
  return (
    <Page nav={false}>
      <link rel="stylesheet" href="/home.css" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com"/>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet"></link>
      <div className="home-container">
        <section className="home-hero">
          <video
            src="https://r2.radityaharya.me/herovid.mp4"
            loop
            muted
            preload="auto"
            autoPlay
            playsInline
            className="home-video"
          ></video>
          <div className="home-hero-content">
            <div className="home-header-container">
              <div className="home-header">
                <h1 className="home-heading">
                  <span className="">
                    <Typewriter
                      options={{
                        strings: ['Hi, I\'m Raditya Harya'],
                        autoStart: true,
                        loop: true,
                      }}
                    />
                  </span>
                </h1>
              </div>
              <div className="home-slide-titles">
                <div className="slide-title">
                  <span className="home-subtext" onClick={() => window.open('/blog', '_self')}>
                    <span>blog</span>
                    <br></br>
                  </span>
                </div>
                <div className="slide-title">
                  <span className="home-subtext" onClick={() => window.open('mailto:contact@radityaharya.me', '_self')}>
                    <span>contact@radityaharya.me</span>
                    <br></br>
                  </span>
                </div>
                <div className="slide-title">
                  <span className="home-subtext" onClick={() => window.open('https://www.linkedin.com/in/radityaharya/', '_blank')
                  }>
                    <span>linkedin</span>
                    <br></br>
                  </span>
                </div>
                <div className="slide-title">
                  <span className="home-subtext" 
                    onClick={() => window.open('https://github.com/radityaharya', '_blank')}>
                    <span>github</span>
                    <br></br>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Page>
  )
}
export default Home
