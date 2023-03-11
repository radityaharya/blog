import Link from "@components/Link"
import Logo from "@components/Logo"
import React from "react"

const Footer: React.FC = () => {
  return (
    <footer className="px-5 md:px-8 py-12 border-t border-gray-100">
      <div className="grid grid-cols-2 sm:grid-cols-12 gap-8 sm:gap-4 lg:gap-16 max-w-6xl mx-auto">
        <div className="hidden sm:flex col-span-3 lg:col-span-4 flex-col justify-between">
          <Link href="https://railway.app">
            <h1 className="text-2xl font-bold pb-4">
              radityaharya
            </h1>
          </Link>
          <Copyright />
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
    © {new Date().getFullYear()} radityaharya. <br />
    All rights reserved.
  </div>
)
