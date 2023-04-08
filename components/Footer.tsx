import Link from "@components/Link"
import React from "react"
import { Moon, Sun } from "react-feather"
import { useTheme } from "next-themes"
import { useIsMounted } from "../hooks/useIsMounted"

export interface props {
  divider?: boolean
}

const Footer = ({ divider = true }: props) => {
  const dividerClass = divider
    ? "w-full flex items-start gap-5 pt-5 flex-col-reverse pb-5 mb-2 border-t border-gray justify-between sm:flex-row sm:items-end"
    : "w-full flex items-start gap-5 pt-5 flex-col-reverse pb-5 mb-2 justify-between sm:flex-row sm:items-end"

  return (
    <footer className="max-w-6xl mx-auto py-6 flex justify-between items-center border-b border-transparent sm:mb-10 select-none">
      <div className="w-full flex relative max-w-size-maxwidth items-start pl-5 pr-5 flex-col">
        <div className={dividerClass}>
          <div className="gap-x-24 flex items-start flex-row justify-start">
            <div className="gap-2 flex items-start flex-col">
              <span className="font-mono text-lg">radityaharya</span>
              <ul className="gap-2 flex items-start flex-row">
                <FooterListLink href="https://github.com/radityaharya">
                  github
                </FooterListLink>
                <FooterListLink href="mailto:contact@radityaharya.com">
                  email
                </FooterListLink>
                <FooterListLink href="https://linkedin.com/in/radityaharya">
                  linkedin
                </FooterListLink>
              </ul>
            </div>
          </div>
          <FooterButtons />
        </div>
      </div>
    </footer>
  )
}

export default Footer

const FooterButtons = () => {
  const { theme, setTheme } = useTheme()
  const isMounted = useIsMounted()

  return (
    <div className="text-gray-600 flex items-center gap-5 flex-row-reverse sm:flex-row">
      {isMounted && (
        <button
          className="hover:text-pink-600"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          aria-label="Toggle Theme"
        >
          {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
        </button>
      )}
      <button
        className="flex pb-1 pt-1 flex-row items-center"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <svg className="w-4 h-4 fill-current text-gray-500" viewBox="0 0 20 20">
          <path d="M10 0 L0 20 L20 20 Z" />
        </svg>
      </button>
    </div>
  )
}

const FooterListLink: React.FC<{
  href: string
  children?: React.ReactNode
}> = ({ children, href }) => (
  <li>
    <Link
      href={href}
      className="font-mono text-gray-500 hover:text-gray-800 no-tap-highlight"
    >
      {children}
    </Link>
  </li>
)
