import Portfolio from "@/components/portfolio";

const username = "vamsipoluru2";

async function getGitHubData() {
  const headers = { Accept: "application/vnd.github+json", "User-Agent": "portfolio-site" };
  try {
    const [profileResponse, reposResponse] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers, next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, { headers, next: { revalidate: 3600 } })
    ]);
    const profile = profileResponse.ok ? await profileResponse.json() : null;
    const repositories = reposResponse.ok ? await reposResponse.json() : [];
    return { profile, repositories: Array.isArray(repositories) ? repositories : [] };
  } catch {
    return { profile: null, repositories: [] };
  }
}

export default async function Home() {
  const { profile, repositories } = await getGitHubData();
  return <Portfolio username={username} profile={profile} repositories={repositories} />;
}
