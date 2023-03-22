import Link from "@components/Link"
import React from "react"
import { Moon, Sun } from "react-feather"
import { useTheme } from "next-themes"
import { useIsMounted } from "../hooks/useIsMounted"

const Footer: React.FC = () => {
  const { theme, setTheme } = useTheme()
  const isMounted = useIsMounted()

  return (
    <footer className="max-w-6xl mx-auto py-6 flex justify-between items-center border-b border-transparent">
      <div className="w-full flex relative max-w-size-maxwidth items-start pl-5 pr-5 flex-col">
        <div className="gap-5 w-full flex items-start pt-5 border-t border-gray-800 flex-col pb-5">
          <div className="gap-x-24 w-full flex items-start flex-row justify-start">
            <div className="gap-2 w-96 flex items-start flex-col">
              <h1 className="pt-2 font-mono text-lg">radityaharya</h1>
              <div className="gap-2 flex items-start flex-row">
                <FooterListLink href="https://github.com/radityaharya">github</FooterListLink>
                <FooterListLink href="mailto:contact@radityaharya.me">email</FooterListLink>
                <FooterListLink href="https://linkedin.com/in/radityaharya">linkedin</FooterListLink>
              </div>
            </div>
          </div>
          <div className="w-full flex items-center flex-row justify-between">
            <span className="text-gray-500 text-sm leading-5">
              <Copyright />
            </span>
            <div className="text-gray-600 flex items-center space-x-6">
              {isMounted && (
                <button
                  className="hover:text-pink-600"
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
                </button>
              )}
              <button className="flex pr-5 pl-5 pb-1 pt-1 flex-row items-center" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top">
                <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 20 20">
                  <path d="M10 0 L0 20 L20 20 Z" />
                </svg>
              </button>
            </div>
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
  <Link href={href} className="font-mono text-gray-500 hover:text-gray-800">
    {children}
  </Link>
)

const Copyright: React.FC = () => (
  <div className="text-xs text-gray-500 w-full">
    © {new Date().getFullYear()} radityaharya
  </div>
)
