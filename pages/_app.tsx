import "@styles/globals.css"
import { ThemeProvider } from "next-themes"
import type { AppProps } from "next/app"
import Head from "next/head"
import { useMemo } from "react"
import { transformThemeToCustomProperties } from "theme-custom-properties"
import { colorThemes, defaultColorMode } from "../styles/theme"
import { Analytics } from "@vercel/analytics/react"

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
      </Head>

      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  )
}

export default RailwayBlog
