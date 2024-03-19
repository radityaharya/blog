import siteMetadata from '@/data/siteMetadata'

interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  stargazers_count: number
  language: string
}

async function getProjectsData(): Promise<Project[]> {
  const githubUsername = siteMetadata.github.split('/').pop()
  const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`)
  const data = await response.json()

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const projects = data.map((repo: any) => ({
    title: repo.name,
    description: repo.description,
    href: repo.html_url,
    imgSrc: '/static/images/github.png',
    stargazers_count: repo.stargazers_count || 0,
    language: repo.language
  }))

  // Sort projects by stargazers_count in descending order
  projects.sort((a: Project, b: Project) => b.stargazers_count - a.stargazers_count)

  return projects
}

export default getProjectsData
