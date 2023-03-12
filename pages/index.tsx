import Page from "@layouts/Page"
import { PostProps } from "@lib/types"
import { NextPage, } from "next"
import Typewriter from 'typewriter-effect';
import Link from "@components/Link"
import { useEffect, useState } from "react";

export interface Props {
  posts: PostProps[]
  preview: boolean
  nowPlaying: string[]
}


const Home: NextPage<Props> = () => {
  const [nowPlaying, setNowPlaying] = useState<string[] | null>(null);

  useEffect(() => {
    fetch('/api/now-playing')
      .then(res => res.json())
      .then(data => {
        if (data && data.title) {
          const np = [
            data.title,
            data.artists.name[0],
            data.url,
          ];
          setNowPlaying(np);
        } else {
          setNowPlaying(null);
        }
      })
      .catch(() => {
        setNowPlaying(null);
      });
  }, []);

  const nowPlayingText = nowPlaying ? `${nowPlaying[0]} - ${nowPlaying[1]}` : null;
  const spNowPlaying = nowPlaying ? (
    <div className="now-playing flex flex-row gap-2 items-center mb-4">
      <div className="now-playing-icon">
        <i className="fab fa-spotify text-white"></i>
      </div>
      <Link className="now-playing-text" href={nowPlaying[2]}>
        <span className="text-white text-sm font-mono font-normal">{nowPlayingText}</span>
      </Link>
    </div>
  ) : null;

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
            playsInline
            poster="https://r2.radityaharya.me/herovid.jpg"
            ></video>
          <div className="hero-content z-10 max-w-screen-xl w-full flex flex-col items-start justify-center">
            <div className="header-container flex flex-col gap-1.5 items-start justify-center">
              <div className="header flex flex-col">
                {spNowPlaying}
                <h1 className="home-heading heading text-white text-5xl md:text-6xl font-mono font-medium max-w-5xl leading-tight mb-4">
                  <span className="">
                    <Typewriter
                      onInit={(typewriter) => {
                        typewriter.typeString('Hi, I\'m Raditya Harya')
                          .pauseFor(2500)
                          .start();
                      }}
                    />
                  </span></h1>
              </div>
              <div className="slide-titles flex flex-wrap gap-6 justify-start">
                <Link className="home-subtext slide-titles text text-white/60 text-lg font-mono font-light hover:underline hover:text-white" href="/blog">
                  <span>blog</span></Link>
                <Link className="home-subtext text text-white/60 text-lg font-mono font-light hover:underline hover:text-white" href="mailto:contact@radityaharya.me">
                  <span>mail</span></Link>
                <Link className="home-subtext text text-white/60 text-lg font-mono font-light hover:underline hover:text-white" href="https://linkedin.com/in/radityaharya" external>
                  <span>linkedin</span>
                </Link>
                <Link className="home-subtext text text-white/60 text-lg font-mono font-lighter hover:underline hover:text-white" href="https://github.com/radityaharya" external>
                  <span>github</span></Link>
                <Link className="home-subtext text text-white/60 text-lg font-mono font-light hover:underline hover:text-white" href="https://open.spotify.com/user/radityaharya" external>
                  <span>spotify</span></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default Home

