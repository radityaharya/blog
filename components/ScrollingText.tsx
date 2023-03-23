import { useState, useEffect, useRef } from "react"

export const ScrollingText = ({ text, ...props }) => {
  const [offset, setOffset] = useState(0)
  const [direction, setDirection] = useState("left")
  const containerRef = useRef(null)

  useEffect(() => {
    const containerWidth = containerRef.current.offsetWidth
    const textWidth = text.length * 8
    if (textWidth <= containerWidth) {
      return
    }

    const intervalId = setInterval(() => {
      if (offset <= containerWidth - textWidth) {
        setDirection("right")
      } else if (offset >= 0) {
        setDirection("left")
      }
      setOffset(direction === "left" ? offset - 1 : offset + 1)
    }, 40)
    return () => clearInterval(intervalId)
  }, [offset, direction, text.length])

  // update containerRef width on resize
  useEffect(() => {
    const handleResize = () => {
      setOffset(0)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      style={{ overflow: "hidden", whiteSpace: "nowrap" }}
      ref={containerRef}
    >
      <div
        style={{ transform: `translateX(${offset}px)`, width: "min-content" }}
        {...props}
      >
        {text}
      </div>
    </div>
  )
}
