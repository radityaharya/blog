import React, { useRef, useEffect, useState } from "react"

interface Props {
  children: React.ReactNode
}

export const ShowOnVisible: React.FC<Props> = ({ children }) => {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      {
        threshold: 0.5,
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return <div ref={ref}>{isInView && children}</div>
}
