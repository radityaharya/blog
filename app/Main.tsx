import siteMetadata from '@/data/siteMetadata'
import { Hello } from '@/components/Hello'
import { Suspense } from 'react'

// biome-ignore lint/correctness/noUnusedVariables: <explanation>
export default function Home({ posts }) {
  return (
    <div className="h-full">
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="flex flex-col items-center justify-center space-x-2 space-y-2 pb-8 pt-6 text-sm sm:text-base md:items-start md:justify-start md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            <Suspense fallback={<div>Loading...</div>}>
              <Hello />
            </Suspense>
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            {siteMetadata.description}
          </p>
        </div>
      </div>
    </div>
  )
}
