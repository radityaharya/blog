// pages/_document.js
import { Html, Head, Main, NextScript } from "next/document"

export default function Document() {
  return (
    <Html>
      <Head></Head>

      <body>
        <Main />
        <NextScript />
        {/* Google Tag Manager */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
          <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MHCBMHW"
          height="0"
          width="0"
          style="display:none;visibility:hidden"
        ></iframe>
        `,
          }}
        />
      </body>
    </Html>
  )
}
