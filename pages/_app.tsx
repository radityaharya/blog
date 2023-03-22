import "@styles/globals.css"
import { ThemeProvider } from "next-themes"
import type { AppProps } from "next/app"
import Head from "next/head"
import Script from "next/script"
import { useMemo } from "react"
import { transformThemeToCustomProperties } from "theme-custom-properties"
import { colorThemes, defaultColorMode } from "../styles/theme"
import { Open_Sans } from "@next/font/google"
import { Analytics } from '@vercel/analytics/react';

const open_sans = Open_Sans({ subsets: ["latin"] })

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
        <style>{bodyCSS}</style>
        <style jsx global>{`
          html {
            font-family: ${open_sans.style.fontFamily};
          }
        `}</style>
      </Head>

      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  )
}

export default RailwayBlog
