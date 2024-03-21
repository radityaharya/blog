import siteMetadata from '@/data/siteMetadata'

interface Project {
  title: string
  description: string
  href?: string
  imgSrc?: string
  stargazers_count: number
  language: string
  topics: string[]
  fork: boolean
  fork_parent?: string,
  languages: string[]
}

async function getProjectsData(): Promise<Project[]> {
  const accessToken = process.env.GITHUB_ACCESS_TOKEN
  const githubUsername = siteMetadata.github.split('/').pop()

  const headers = accessToken ? { Authorization: `token ${accessToken}` } : undefined;
  const perPage = accessToken ? '100' : '30';

  const response = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=${perPage}`, { headers, cache: 'force-cache' })
  const data = await response.json()

  // biome-ignore lint/suspicious/noExplicitAny: Todo later
  const projects = await Promise.all(data.map(async (repo: any) => {
    let fork_parent = null;
    let languages: { [key: string]: number } | null = null;
    if (repo.fork && repo.parent && accessToken) {
      const parentResponse = await fetch(`https://api.github.com/repos/${githubUsername}/${repo.name}`, { headers, cache: 'force-cache' })
      const parentData = await parentResponse.json()
      fork_parent = parentData.parent?.html_url
      languages = await fetch(parentData.languages_url, { headers }).then((res) => res.json())
    } else {
      languages = await fetch(repo.languages_url, { headers }).then((res) => res.json())
    }

    return {
      title: repo.name,
      description: repo.description,
      href: repo.html_url,
      imgSrc: '/static/images/github.png',
      stargazers_count: repo.stargazers_count || 0,
      language: languages ? Object.keys(languages)[0] || repo.language || 'Unknown' : repo.language || 'Unknown',
      topics: repo.topics,
      fork: repo.fork,
      fork_parent: fork_parent,
      languages: languages ? Object.keys(languages).sort((a, b) => (languages[b] - languages[a])) : [],
    }
  }))

  projects.sort((a: Project, b: Project) => b.stargazers_count - a.stargazers_count)

  return projects
}

export default getProjectsData
