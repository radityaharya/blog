import siteMetadata from '@/data/siteMetadata'
import Link from 'next/link'
import { Suspense } from 'react'
import { AiFillLinkedin, AiFillMail } from 'react-icons/ai'
import { FaGithub, FaRss, FaSpotify } from 'react-icons/fa'
import NowPlaying from './Spotify/NowPlaying'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const SocialIcon = ({ href, ariaLabel, IconComponent }) => (
  <li>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link href={href} rel="noreferrer" aria-label={ariaLabel}>
            <IconComponent className="text-2xl sm:text-lg" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{ariaLabel}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </li>
)
const socialLinks = [
  { href: `mailto:${siteMetadata.email}`, ariaLabel: 'Email', IconComponent: AiFillMail },
  { href: siteMetadata.linkedin, ariaLabel: 'Linkedin', IconComponent: AiFillLinkedin },
  { href: siteMetadata.github, ariaLabel: 'Github', IconComponent: FaGithub },
  { href: siteMetadata.spotify, ariaLabel: 'Spotify Profile', IconComponent: FaSpotify },
  { href: '/feed.xml', ariaLabel: 'Subscribe to rss', IconComponent: FaRss }
]

export default function Footer() {
  return (
    <footer className="flex items-center justify-between">
      <div className="mb-0 flex w-full flex-col justify-start space-x-0 space-y-3 py-10 text-gray-500 dark:text-gray-400 sm:space-y-1.5">
        <Suspense
          fallback={
            <div className="max-h-5 flex items-center justify-center space-x-2 sm:flex-row sm:justify-start sm:space-x-2" style={ { marginTop: '0px !important' } }>
              Loading...
            </div>
          }
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
