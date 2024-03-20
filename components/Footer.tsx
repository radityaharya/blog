import siteMetadata from '@/data/siteMetadata'
import Link from 'next/link'
import { Suspense } from 'react'
import { AiFillLinkedin, AiFillMail } from 'react-icons/ai'
import { FaGithub, FaRss, FaSpotify } from 'react-icons/fa'
import NowPlaying from './Spotify/NowPlaying'

const SocialIcon = ({ href, ariaLabel, IconComponent }) => (
  <li>
    <a href={href} target="_blank" rel="noreferrer" aria-label={ariaLabel}>
      <IconComponent className="text-2xl sm:text-lg" />
    </a>
  </li>
)

const socialLinks = [
  { href: `mailto:${siteMetadata.email}`, ariaLabel: 'email', IconComponent: AiFillMail },
  { href: siteMetadata.linkedin, ariaLabel: 'linkedin', IconComponent: AiFillLinkedin },
  { href: siteMetadata.github, ariaLabel: 'github', IconComponent: FaGithub },
  { href: siteMetadata.spotify, ariaLabel: 'spotify', IconComponent: FaSpotify },
  { href: '/feed.xml', ariaLabel: 'rss', IconComponent: FaRss }
]

export default function Footer() {
  return (
    <footer className="flex items-center justify-between">
      <div className="mb-0 flex w-full flex-col justify-start space-x-0 space-y-3 py-10 text-gray-500 dark:text-gray-400 sm:space-y-1.5">
        <Suspense
          fallback={<div className="w-full flex items-center justify-center">Loading...</div>}
        >
          <NowPlaying />
        </Suspense>
        <div className="flex flex-col items-center space-y-3 text-sm sm:flex-row sm:justify-between sm:text-base">
          <ul className="flex space-x-2">
            <li>{`© ${new Date().getFullYear()}`}</li>
            <li>{` • `}</li>
            <li>
              <Link href="/">{siteMetadata.title}</Link>
            </li>
          </ul>
          <ul className="flex cursor-pointer items-center space-x-5">
            {socialLinks.map((link, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              <SocialIcon key={index} {...link} />
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
