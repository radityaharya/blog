import TOCInline from 'pliny/ui/TOCInline'
// import Pre from 'pliny/ui/Pre'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import type { MDXComponents } from 'mdx/types'
import Image from "./mdx/Image"
import CustomLink from './Link'
import TableWrapper from './TableWrapper'
import Pre from './mdx/Pre'
import Code from './mdx/Code'

export const components: MDXComponents = {
  Image,
  TOCInline,
  a: CustomLink,
  code: Code,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm
}
