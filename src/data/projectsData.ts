import { cachedFetch } from '../utils/cached-fetch';
import { getSecret } from 'astro:env/server';

export interface Project {
    title: string;
    description: string;
    href: string;
    imgSrc: string;
    stargazers_count: number;
    language: string;
    topics: string[];
    fork: boolean;
    fork_parent?: string;
    languages: string[];
    isFeatured?: boolean;
    archived: boolean;
}

export async function getProjectsData(env: Record<string, any>): Promise<Project[]> {
    try {
        const accessToken = getSecret('GITHUB_ACCESS_TOKEN');
        if (!accessToken) {
            throw new Error('GITHUB_ACCESS_TOKEN not set');
        }
        const githubUsername = 'radityaharya';
        const headers = {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        };
        const query = `
          query {
            user(login: "${githubUsername}") {
              repositories(first: 100, orderBy: { field: STARGAZERS, direction: DESC }) {
                nodes {
                  name
                  description
                  url
                  isFork
                  pushedAt
                  stargazerCount
                  primaryLanguage { name }
                  languages(first: 10) { nodes { name } }
                  repositoryTopics(first: 10) { nodes { topic { name } } }
                  isArchived
                  parent {
                    url
                    languages(first: 5) { nodes { name } }
                    repositoryTopics(first: 5) { nodes { topic { name } } }
                  }
                }
              }
            }
          }
        `;
        const response = await cachedFetch('https://api.github.com/graphql', {
            method: 'POST',
            headers,
            body: JSON.stringify({ query })
        }, env);
        console.log('GitHub API rate limit:', response.headers?.get ? response.headers.get('X-RateLimit-Remaining') : 'unknown');
        if (!response.data || !response.data.user) {
            throw new Error('Invalid GraphQL response: missing data.user');
        }
        const repos = response.data.user.repositories.nodes;
        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
        const projects = repos.map((repo: any) => {
            const isFeatured = new Date(repo.pushedAt) > thirtyDaysAgo;
            let languages: string[] = [];
            let topics: string[] = [];
            if (repo.isFork && repo.parent) {
                languages = repo.parent.languages.nodes.map((node: any) => node.name);
                topics = repo.parent.repositoryTopics.nodes.map((node: any) => node.topic.name);
            } else {
                languages = repo.languages.nodes.map((node: any) => node.name);
                if (repo.primaryLanguage && !languages.includes(repo.primaryLanguage.name)) {
                    languages.unshift(repo.primaryLanguage.name);
                }
                topics = repo.repositoryTopics.nodes.map((node: any) => node.topic.name);
            }
            return {
                title: repo.name,
                description: repo.description || '',
                href: repo.url,
                imgSrc: '/static/images/github.png',
                stargazers_count: repo.stargazerCount || 0,
                language: languages[0] || 'Unknown',
                topics,
                fork: repo.isFork,
                fork_parent: repo.isFork && repo.parent ? repo.parent.url : null,
                languages,
                isFeatured,
                archived: repo.isArchived
            };
        });
        return projects.filter((project: Project) => !project.archived);
    } catch (error) {
        console.error('Fatal error in getProjectsData:', error);
        return [];
    }
}
