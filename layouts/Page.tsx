import React from "react"
import Footer from "@components/Footer"
import Nav from "@components/Nav"
import SEO, { Props as SEOProps } from "@components/Seo"

export interface Props {
  seo?: SEOProps
  children?: React.ReactNode
  nav?: boolean // show nav or not (default: true)
  navFloat?: boolean // float nav or not (default: false)
}

const Page: React.FC<Props> = (props) => {
  return (
    <>
      <SEO {...props.seo} />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css" crossOrigin="anonymous"></link>
      
      {props.nav !== false && <Nav float={props.navFloat} />}

      <div className="min-h-screen overflow-x-hidden relative">
        {props.children}
      </div>

      <Footer />
    </>
  ) 
}

export default Page
