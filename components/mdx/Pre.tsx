'use client'
import { Clipboard, ClipboardCheckIcon } from 'lucide-react'
import { useState, useRef } from 'react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

const Pre = (props) => {
  const textInput = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  const onEnter = () => {
    setHovered(true)
  }
  const onExit = () => {
    setHovered(false)
    setCopied(false)
  }
  const onCopy = () => {
    setCopied(true)
    if (textInput.current) {
      navigator.clipboard.writeText(textInput.current.textContent || '')
    }
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div ref={textInput} onMouseEnter={onEnter} onMouseLeave={onExit} className="relative">
      {hovered && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger
              aria-label="Copy code"
              type="button"
              className="absolute right-2 top-2 h-8 w-8"
              onClick={onCopy}
            >
              {copied ? (
                <ClipboardCheckIcon size={24} className="" />
              ) : (
                <Clipboard size={24} className="text-primary" />
              )}
            </TooltipTrigger>
            <TooltipContent>
              {copied ? 'Copied!' : 'Copy to clipboard'}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      <pre>{props.children}</pre>
    </div>
  )
}

export default Pre
