import type { Metadata } from 'next'
import siteMetadata from '@/data/siteMetadata'

interface PageSEOProps {
  title?: string
  description?: string
  image?: string
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any
}

export function genPageMetadata({
  title = siteMetadata.title,
  description = siteMetadata.description,
  image = siteMetadata.socialBanner,
  ...rest
}: PageSEOProps): Metadata {
  return {
    metadataBase: new URL(siteMetadata.siteUrl),
    title: {
      default: title,
      template: `%s | ${title}`
    },
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: './',
      siteName: title,
      images: [image],
      locale: 'en_US',
      type: 'website'
    },
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${siteMetadata.siteUrl}/feed.xml`
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1
      }
    },
    twitter: {
      title: title,
      card: 'summary_large_image',
      images: [image]
    },
    icons: {
      icon: [
        {
          media: '(prefers-color-scheme: light)',
          url: '/static/favicons/favicon-32x32.png',
          href: '/static/favicons/favicon-32x32.png',
          sizes: '32x32'
        },
        {
          media: '(prefers-color-scheme: dark)',
          url: '/static/favicons/white/favicon-32x32.png',
          href: '/static/favicons/white/favicon-32x32.png',
          sizes: '32x32'
        },
        {
          media: '(prefers-color-scheme: light)',
          url: '/static/favicons/favicon-16x16.png',
          href: '/static/favicons/favicon-16x16.png',
          sizes: '16x16'
        },
        {
          media: '(prefers-color-scheme: dark)',
          url: '/static/favicons/white/favicon-16x16-dark.png',
          href: '/static/favicons/white/favicon-16x16-dark.png',
          sizes: '16x16'
        }
      ],
      other: [
        {
          rel: 'apple-touch-icon',
          url: '/static/favicons/apple-touch-icon.png'
        },
        {
          rel: 'mask-icon',
          url: '/static/favicons/safari-pinned-tab.svg',
          color: '#5bbad5'
        }
      ]
    },
    ...rest
  }
}
