import useFathom from "@hooks/useFathom"
import "@styles/globals.css"
import { ThemeProvider } from "next-themes"
import type { AppProps } from "next/app"
import Head from "next/head"
import Script from "next/script"
import { useMemo } from "react"
import { transformThemeToCustomProperties } from "theme-custom-properties"
import { colorThemes, defaultColorMode } from "../styles/theme"
import { Open_Sans } from "@next/font/google"
import { GoogleAnalytics } from "nextjs-google-analytics";

const open_sans = Open_Sans({ subsets: ["latin"] })

const RailwayBlog = ({ Component, pageProps }: AppProps) => {
  useFathom(process.env.NEXT_PUBLIC_FATHOM_CODE ?? "", "radityaharya.me")

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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-YRE5ZKX5QG"></script>

        <Script>{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-YRE5ZKX5QG');
        `}</Script>
      </Head>

      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default RailwayBlog
