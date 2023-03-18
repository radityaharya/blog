import { useTheme } from "next-themes"

export const useOgImage = ({
  title,
  authorName,
  image,
  formatedDate,
  url
}: {
  title: string
  authorName: string
  image?: string
  formatedDate?: string
  url?: string
}): string => {
  const { theme } = useTheme()

  const encodedTitle = encodeURIComponent(title)
  const encodedAuthorName = encodeURIComponent(authorName)
  const encodedDate = encodeURIComponent(formatedDate ?? "")

  return (
    image ??
    `https://www.radityaharya.me/api/og-image?theme=${
      theme === "light" ? "Light" : "Dark"
    }&title=${encodedTitle}&author=${encodedAuthorName}&subtext=${encodedDate}&url=${url}`
  )
}