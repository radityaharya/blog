import 'css/tailwind.css'
import 'pliny/search/algolia.css'

import { Open_Sans } from 'next/font/google'
import { Space_Mono } from 'next/font/google'
import { Analytics, type AnalyticsConfig } from 'pliny/analytics'
import { SearchProvider, type SearchConfig } from 'pliny/search'
import Header from '@/components/Header'
import SectionContainer from '@/components/SectionContainer'
import Footer from '@/components/Footer'
import siteMetadata from '@/data/siteMetadata'
import { ThemeProviders } from './theme-providers'
import type { Metadata } from 'next'
import { GoogleTagManager } from '@next/third-parties/google'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { ReactNode } from 'react'
import { genPageMetadata } from './seo'

const open_sans = Open_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-open-sans'
})

const space_mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono'
})

export const metadata: Metadata = genPageMetadata({})

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang={siteMetadata.language}
      className={`${open_sans.variable} ${space_mono.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <link rel="alternate" type="application/rss+xml" href="/feed.xml" />
      <body className="bg-background text-black antialiased dark:text-white">
        <ThemeProviders>
          <Analytics analyticsConfig={siteMetadata.analytics as AnalyticsConfig} />
          <GoogleTagManager gtmId="GTM-MHCBMHW" />
          <SectionContainer>
            <div className="flex min-h-[100dvh] flex-col font-sans">
              <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
                <Header />
                <main className="my-auto">{children}</main>
              </SearchProvider>
              <Footer />
            </div>
          </SectionContainer>
        </ThemeProviders>
        <SpeedInsights />
      </body>
    </html>
  )
}
