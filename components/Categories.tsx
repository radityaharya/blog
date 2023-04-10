import { useRouter } from "next/router"
import { CATEGORIES } from "../constants"
import Link from "./Link"

export const Categories: React.FC = () => {
  return (
    <ul className="font-mono flex flex-wrap gap-4 md:gap-8 mt-4 mb-8">
      <CategoryItem
        item="Everything"
        slug="/blog"
        className="hidden md:block"
      />

      {CATEGORIES.map((c) => (
        <CategoryItem key={c} item={c} slug={`/blog/${c.toLowerCase()}`} />
      ))}
    </ul>
  )
}

const CategoryItem: React.FC<{
  item: string
  slug: string
  className?: string
}> = ({ item, slug, className }) => {
  const { asPath } = useRouter()
  const isActive = asPath === slug

  return (
    <li className={className}>
      <Link
        className={`text-base font-medium no-tap-highlight ${
          isActive ? "text-foreground" : "text-gray-500"
        } hover:text-foreground`}
        href={`${slug}`}
      >
        {item}
      </Link>
    </li>
  )
}
