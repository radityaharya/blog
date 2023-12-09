import "@styles/globals.css"
import { ThemeProvider } from "next-themes"
import type { AppProps } from "next/app"
import Head from "next/head"
import { useEffect, useMemo } from "react"
import { transformThemeToCustomProperties } from "theme-custom-properties"
import { colorThemes, defaultColorMode } from "../styles/theme"
import { Analytics } from "@vercel/analytics/react"
import TagManager from "react-gtm-module"
import { SpeedInsights } from "@vercel/speed-insights/next"

// TODO: wait till https://github.com/axiomhq/next-axiom/issues/115 is fixed
// export { reportWebVitals } from 'next-axiom';

const tagManagerArgs = {
  gtmId: "GTM-MHCBMHW",
}

const RailwayBlog = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    TagManager.initialize(tagManagerArgs)
  }, [])
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
      <SpeedInsights />
      <Component {...pageProps} />
      <Analytics />
    </ThemeProvider>
  )
}

export default RailwayBlog
