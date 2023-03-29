import "@styles/globals.css"
import { ThemeProvider } from "next-themes"
import type { AppProps } from "next/app"
import Head from "next/head"
import { useMemo } from "react"
import { transformThemeToCustomProperties } from "theme-custom-properties"
import { colorThemes, defaultColorMode } from "../styles/theme"
import { Analytics } from "@vercel/analytics/react"
import Script from "next/script"

const RailwayBlog = ({ Component, pageProps }: AppProps) => {
  const { bodyCSS } = useMemo(
    () =>
      transformThemeToCustomProperties(colorThemes, {
        defaultTheme: defaultColorMode,
        attribute: "class",
      }),
    []
  )

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange={true}
      enableSystem
    >
      <Head>
        <Script
          dangerouslySetInnerHTML={{
            __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-2X3FM6B0RW', {
            page_path: window.location.pathname,
            debug_mode: ${
              process.env.NODE_ENV === "development" ? "true" : "false"
            },
          });
        `,
          }}
        />
        <style>{bodyCSS}</style>
      </Head>

      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=$G-2X3FM6B0RW`}
      />
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  )
}

export default RailwayBlog
