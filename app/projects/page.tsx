import projectsData from '@/data/projectsData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const revalidate = 3600

export const metadata = genPageMetadata({ title: 'Projects' })

export default async function Projects() {
  const projects = await projectsData()

  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Projects
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            Side projects I have worked on in my free time.
          </p>
        </div>
        <div className="py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {projects.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                href={d.href}
                topics={d.topics}
                language={d.language}
                fork={d.fork}
                fork_parent={d.fork_parent}
                languages={d.languages}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
