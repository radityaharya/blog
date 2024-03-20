import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    <section className="mx-auto min-h-[100dvh] max-w-3xl px-3 sm:px-6 xl:max-w-5xl xl:px-0">
      {children}
    </section>
  )
}
