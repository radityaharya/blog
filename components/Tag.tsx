import Link from 'next/link'
import { slug } from 'github-slugger'
import { Badge } from './ui/badge'
interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${slug(text)}`}
      className="text-sm font-medium uppercase text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      <Badge variant="secondary" className="h-full">
        {text}
      </Badge>
    </Link>
  )
}

export default Tag
