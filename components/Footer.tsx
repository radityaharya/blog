import Link from "@components/Link"
import React from "react"


const Footer: React.FC = () => {
  return (
    <footer className="max-w-6xl mx-auto py-6 flex justify-between items-center border-b border-transparent">
      <div className="w-full flex relative max-w-size-maxwidth items-start pl-5 pr-5 flex-col">
        <div className="gap-5 w-full flex items-start pt-5 border-t border-gray-800 flex-col pb-5">
          <div className="gap-x-24 w-full flex items-start flex-row justify-start">
            <div className="gap-2 w-96 flex items-start flex-col">
              <h1 className="pt-2 font-mono text-lg">radityaharya</h1>
              <div className="gap-2 flex items-start flex-row">
                <Link href="https://github.com/radityaharya" className="hover:text-foreground font-mono">
                  github
                </Link>
                <Link href="mailto:contact@radityaharya.me" className="hover:text-foreground font-mono">
                  email
                </Link>
                <Link href="https://linkedin.com/in/radityaharya" className="hover:text-foreground font-mono">
                  linkedin
                </Link>

              </div>
            </div>
          </div>
          <div className="w-full flex items-center flex-row justify-between">
            <span className="text-gray-500 text-sm leading-5">
              <Copyright />
            </span>
            <button className="flex pr-5 pl-5 pb-1 pt-1 flex-row items-center" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" fill="currentColor"/></svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

const FooterListLink: React.FC<{
  href: string
  children?: React.ReactNode
}> = ({ children, href }) => (
  <li>
    <Link href={href} className="hover:text-foreground">
      {children}
    </Link>
  </li>
)

const Copyright: React.FC = () => (
  <div className="text-xs text-gray-500 w-full">
    © {new Date().getFullYear()} radityaharya
  </div>
)
