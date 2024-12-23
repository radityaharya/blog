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

interface RawProject {
    title: any;
    description: any;
    href: any;
    imgSrc: string;
    stargazers_count: any;
    language: any;
    topics: any;
    fork: any;
    fork_parent: any;
    languages: string[];
    isFeatured: boolean;
    archived: boolean;
}

const API_BASE_URL = 'https://api.github.com';

async function fetchWithCache(url: string, headers?: HeadersInit): Promise<any> {

    const response = await fetch(url, { headers });
    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
}

async function getRepoLanguages(url: string, headers?: HeadersInit): Promise<string[]> {
    try {
        const languages = await fetchWithCache(url, headers);
        return Object.keys(languages).sort((a, b) => languages[b] - languages[a]);
    } catch (error) {
        console.error('Error fetching languages:', error);
        return [];
    }
}

async function getForkDetails(username: string, repoName: string, headers?: HeadersInit) {
    try {
        const detailData = await fetchWithCache(`${API_BASE_URL}/repos/${username}/${repoName}`, headers);
        const parentData = await fetchWithCache(detailData.parent.url, headers);
        const languages = await getRepoLanguages(parentData.languages_url, headers);

        return {
            fork_parent: parentData.html_url,
            languages,
            topics: parentData.topics
        };
    } catch (error) {
        console.error(`Error processing fork details for ${repoName}:`, error);
        return null;
    }
}

function processRepo(repo: any, forkDetails: any | null, isFeatured: boolean): Project {
    return {
        title: repo.name,
        description: repo.description || '',
        href: repo.html_url,
        imgSrc: '/static/images/github.png',
        stargazers_count: repo.stargazers_count || 0,
        language: forkDetails?.languages[0] || repo.language || 'Unknown',
        topics: forkDetails?.topics || repo.topics || [],
        fork: repo.fork,
        fork_parent: forkDetails?.fork_parent || null,
        languages: forkDetails?.languages || [],
        isFeatured,
        archived: repo.archived
    };
}

export async function getProjectsData(): Promise<Project[]> {
    try {
        const accessToken = getSecret('GITHUB_ACCESS_TOKEN');
        const githubUsername = 'radityaharya';
        const headers = accessToken ? { Authorization: `token ${accessToken}` } : undefined;
        const perPage = accessToken ? '100' : '30';

        const repos = await fetchWithCache(
            `${API_BASE_URL}/users/${githubUsername}/repos?per_page=${perPage}`,
            headers
        );

        if (!Array.isArray(repos) || repos.length === 0) {
            throw new Error('Invalid response from GitHub API');
        }

        const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

        const projects = await Promise.all(
            repos.map(async (repo) => {
                try {
                    const isFeatured = new Date(repo.pushed_at) > thirtyDaysAgo;
                    const forkDetails = repo.fork && accessToken
                        ? await getForkDetails(githubUsername, repo.name, headers)
                        : { languages: await getRepoLanguages(repo.languages_url, headers) };

                    return processRepo(repo, forkDetails, isFeatured);
                } catch (error) {
                    console.error(`Error processing repo ${repo.name}:`, error);
                    return null;
                }
            })
        );

        return projects
            .filter((project): project is Project => project !== null)
            .sort((a, b) => b.stargazers_count - a.stargazers_count);

    } catch (error) {
        console.error('Fatal error in getProjectsData:', error);
        return [];
    }
}
