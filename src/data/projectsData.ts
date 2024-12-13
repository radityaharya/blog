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

export async function getProjectsData(): Promise<Project[]> {
    try {
        const accessToken = getSecret('GITHUB_ACCESS_TOKEN');
        const githubUsername = 'radityaharya';

        const headers = accessToken ? { Authorization: `token ${accessToken}` } : undefined;
        const perPage = accessToken ? '100' : '30';

        const data = await fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=${perPage}`, {
            headers
        })
            .then((res) => {
                if (!res.ok) {
                    console.error('Error fetching repos:', res);
                    return [];
                }
                return res.json();
            })
            .catch((err: any) => {
                console.error('Error fetching repos:', err);
                return [];
            });

        if (!Array.isArray(data) || data.length === 0) {
            console.error('Invalid response from GitHub API');
            return [];
        }

        const projects: (RawProject | null)[] = await Promise.all(
            data.map(async (repo: any) => {
                try {
                    let fork_parent = null;
                    let languages: { [key: string]: number } | null = null;
                    let topics = repo.topics;

                    // Calculate if project is featured based on recent push
                    const thirtyDaysAgo = new Date();
                    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
                    const lastPushDate = new Date(repo.pushed_at);
                    const isFeatured = lastPushDate > thirtyDaysAgo;

                    if (repo.fork && accessToken) {
                        try {
                            const detailResponse = await fetch(`https://api.github.com/repos/${githubUsername}/${repo.name}`, { headers });
                            if (!detailResponse.ok) {
                                console.error(`Error fetching repo details for ${repo.name}`);
                                return null;
                            }
                            const detailData = await detailResponse.json();

                            const parentResponse = await fetch(detailData.parent.url, { headers });
                            if (!parentResponse.ok) {
                                return null;
                            }
                            const parentData = await parentResponse.json();
                            fork_parent = parentData.html_url;
                            languages = await fetch(parentData.languages_url, { headers })
                                .then((res) => res.json())
                                .catch((error) => {
                                    console.error('Error fetching parent languages:', error);
                                    return null;
                                });
                            topics = parentData.topics;
                        } catch (err) {
                            console.error(`Error processing fork for ${repo.name}:`, err);
                            return null;
                        }
                    } else {
                        languages = await fetch(repo.languages_url, { headers })
                            .then((res) => res.json())
                            .catch((error) => {
                                console.error('Error fetching languages:', error);
                                return null;
                            });
                    }

                    return {
                        title: repo.name,
                        description: repo.description,
                        href: repo.html_url,
                        imgSrc: '/static/images/github.png',
                        stargazers_count: repo.stargazers_count || 0,
                        language: languages ? Object.keys(languages)[0] || repo.language || 'Unknown' : repo.language || 'Unknown',
                        topics: topics || [],
                        fork: repo.fork,
                        fork_parent: fork_parent,
                        languages: languages ? Object.keys(languages).sort((a, b) => languages[b] - languages[a]) : [],
                        isFeatured: isFeatured,
                        archived: repo.archived
                    };
                } catch (err) {
                    console.error(`Error processing repo ${repo.name}:`, err);
                    return null;
                }
            })
        ).catch((err) => {
            console.error('Error in Promise.all:', err);
            return [];
        });

        if (!projects || projects.length === 0) {
            console.error('No valid projects found');
            return [];
        }

        const isValidProject = (project: RawProject | null): project is RawProject => {
            return project !== null && typeof project.title === 'string' && typeof project.stargazers_count === 'number';
        };

        const filteredProjects = projects.filter(isValidProject).map(
            (project): Project => ({
                ...project,
                description: project.description || '',
                href: project.href || '',
                imgSrc: project.imgSrc || '/static/images/github.png',
                language: project.language || 'Unknown',
                topics: project.topics || [],
                languages: project.languages || []
            })
        );

        filteredProjects.sort((a, b) => b.stargazers_count - a.stargazers_count);
        return filteredProjects;
    } catch (err) {
        console.error('Fatal error in getProjectsData:', err);
        return [];
    }
}
