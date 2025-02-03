import { getSecret } from 'astro:env/server';
import { cachedFetch } from '../utils/cached-fetch';

interface LanguageStats {
	[language: string]: number;
}

interface TimeStats {
    [timeSlot: string]: number;
}

interface RepoStats {
    [repo: string]: number;
}

interface StreakStats {
    currentStreak: number;
    longestStreak: number;
    totalCommits: number;
    avgPerDay: number;
}

export async function getLanguageCommitStats(username: string, env: Record<string, any>): Promise<LanguageStats> {
  const accessToken = getSecret('GITHUB_ACCESS_TOKEN');
  if (!accessToken) throw new Error('GITHUB_ACCESS_TOKEN not set');

  const to = new Date().toISOString();
  const from = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();

  const query = `
  query($username: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $username) {
      contributionsCollection(from: $from, to: $to) {
        commitContributionsByRepository {
          repository {
            primaryLanguage { name }
            languages(first: 5) { nodes { name } }
          }
          contributions { totalCount }
        }
      }
    }
  }`;

  const variables = { username, from, to };

  const response = await cachedFetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query, variables })
  }, env, 'github-language-stats');
  const json = response;
  if (!json) {
    throw new Error('Invalid GraphQL response');
  }
  const items = json.data.user.contributionsCollection.commitContributionsByRepository;

  const stats: LanguageStats = {};
  for (const item of items) {
    const commitCount = item.contributions.totalCount;
    const languages = (item.repository.languages.nodes.length > 0)
      ? item.repository.languages.nodes.map((node: any) => node.name)
      : item.repository.primaryLanguage 
        ? [item.repository.primaryLanguage.name]
        : ['Unknown'];
          
    for (const lang of new Set(languages)) {
      if (typeof lang === 'string') {
        stats[lang] = (stats[lang] || 0) + commitCount;
      }
    }
  }
  return stats;
}

export async function getCommitTimeStats(username: string, env: Record<string, any>): Promise<TimeStats> {
    const accessToken = getSecret('GITHUB_ACCESS_TOKEN');
    if (!accessToken) throw new Error('GITHUB_ACCESS_TOKEN not set');

    const query = `
    query($username: String!) {
        user(login: $username) {
            contributionsCollection {
                commitContributionsByRepository {
                    contributions {
                        occurredAt
                    }
                }
            }
        }
    }`;

    const response = await cachedFetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, variables: { username } })
    }, env, 'github-time-stats');

    const commits = response.data.user.contributionsCollection.commitContributionsByRepository
        .flatMap((repo: any) => repo.contributions)
        .map((commit: any) => new Date(commit.occurredAt));

    const timeStats: TimeStats = {
        "Morning (6-12)": 0,
        "Afternoon (12-18)": 0,
        "Evening (18-24)": 0,
        "Night (0-6)": 0
    };

    commits.forEach((date: Date) => {
        const hour = date.getHours();
        if (hour >= 6 && hour < 12) timeStats["Morning (6-12)"]++;
        else if (hour >= 12 && hour < 18) timeStats["Afternoon (12-18)"]++;
        else if (hour >= 18) timeStats["Evening (18-24)"]++;
        else timeStats["Night (0-6)"]++;
    });

    return timeStats;
}

export async function getTopRepos(username: string, env: Record<string, any>): Promise<RepoStats> {
    const accessToken = getSecret('GITHUB_ACCESS_TOKEN');
    if (!accessToken) throw new Error('GITHUB_ACCESS_TOKEN not set');

    const query = `
    query($username: String!) {
        user(login: $username) {
            repositories(first: 10, orderBy: {field: PUSHED_AT, direction: DESC}) {
                nodes {
                    name
                    defaultBranchRef {
                        target {
                            ... on Commit {
                                history {
                                    totalCount
                                }
                            }
                        }
                    }
                }
            }
        }
    }`;

    const response = await cachedFetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query, variables: { username } })
    }, env, 'github-top-repos');

    const json = response;
    if (!json?.data?.user) {
        throw new Error('Invalid GraphQL response');
    }

    const repos = json.data.user.repositories.nodes;
    const repoStats: RepoStats = {};

    repos.forEach((repo: any) => {
        if (repo.defaultBranchRef?.target?.history) {
            repoStats[repo.name] = repo.defaultBranchRef.target.history.totalCount;
        }
    });

    return repoStats;
}