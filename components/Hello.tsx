'use client'

import Typewriter from 'typewriter-effect'
import { useState, useEffect } from 'react'

const hello_strings = [
  { language: 'English', greeting: 'Hello' },
  { language: 'Spanish', greeting: 'Hola' },
  { language: 'French', greeting: 'Bonjour' },
  { language: 'German', greeting: 'Guten Tag' },
  { language: 'Italian', greeting: 'Ciao' },
  { language: 'Russian', greeting: 'Привет' },
  { language: 'Chinese (Mandarin)', greeting: '你好' },
  { language: 'Japanese', greeting: 'こんにちは' },
  { language: 'Arabic', greeting: 'مرحبا' },
  { language: 'Hindi', greeting: 'नमस्ते' },
  { language: 'Indonesian', greeting: 'Halo' },
  { language: 'Portuguese', greeting: 'Olá' },
  { language: 'Dutch', greeting: 'Hallo' },
  { language: 'Swedish', greeting: 'Hej' },
  { language: 'Korean', greeting: '안녕하세요' },
  { language: 'Greek', greeting: 'Γεια σας' },
  { language: 'Turkish', greeting: 'Merhaba' },
  { language: 'Thai', greeting: 'สวัสดี' },
  { language: 'Vietnamese', greeting: 'Xin chào' },
  { language: 'Polish', greeting: 'Cześć' },
  { language: 'Czech', greeting: 'Ahoj' },
  { language: 'Finnish', greeting: 'Hei' },
  { language: 'Hungarian', greeting: 'Szia' },
  { language: 'Romanian', greeting: 'Salut' },
  { language: 'Hebrew', greeting: 'שלום' },
  { language: 'Danish', greeting: 'Hej' },
  { language: 'Norwegian', greeting: 'Hei' },
  { language: 'Ukrainian', greeting: 'Привіт' },
  { language: 'Bengali', greeting: 'হ্যালো' },
  { language: 'Tagalog', greeting: 'Kamusta' }
]

export const Hello = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return isMounted ? (
    <Typewriter
      options={{
        strings: hello_strings.map((greeting) => `${greeting.greeting}`),
        autoStart: true,
        loop: true
      }}
    />
  ) : (
    <div>Hello</div>
  )
}
