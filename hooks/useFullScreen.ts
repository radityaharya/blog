import { useEffect, useRef } from "react"

export const useFullScreen = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const resize = () => {
      const vh = window.innerHeight * 0.01
      element.style.setProperty("--vh", `${vh}px`)
    }

    resize()

    window.addEventListener("resize", resize)

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return ref
}
