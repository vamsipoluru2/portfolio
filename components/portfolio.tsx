"use client";

import { useMemo, useState } from "react";

type Repository = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  topics?: string[];
};

type Profile = {
  name?: string | null;
  bio?: string | null;
  avatar_url?: string;
  html_url?: string;
  blog?: string | null;
  location?: string | null;
  public_repos?: number;
  followers?: number;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(new Date(value));
}

export default function Portfolio({ username, profile, repositories }: { username: string; profile: Profile | null; repositories: Repository[] }) {
  const [query, setQuery] = useState("");
  const [language, setLanguage] = useState("All");
  const ownRepositories = repositories.filter((repository) => !repository.fork);
  const languages = ["All", ...Array.from(new Set(ownRepositories.map((repo) => repo.language).filter((value): value is string => Boolean(value)))).sort()];
  const filteredRepositories = useMemo(() => ownRepositories.filter((repo) => {
    const searchText = `${repo.name} ${repo.description ?? ""} ${(repo.topics ?? []).join(" ")} ${repo.language ?? ""}`.toLowerCase();
    return searchText.includes(query.toLowerCase()) && (language === "All" || repo.language === language);
  }), [ownRepositories, query, language]);

  const displayName = profile?.name || "Vamsi Poluru";
  const bio = profile?.bio || "Welcome to my corner of the internet. Explore what I’m building, the tools I use, and the ideas I’m curious about.";

  return (
    <main className="min-h-screen overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <header className="flex items-center justify-between border-b border-white/10 py-6">
          <a href="#home" className="font-mono text-sm tracking-tight"><span className="text-lime">vamsi</span><span className="text-white/40">.dev</span></a>
          <nav aria-label="Main navigation" className="flex items-center gap-6 text-sm text-white/60">
            <a className="transition hover:text-white" href="#work">Work</a>
            <a className="transition hover:text-white" href="#about">About</a>
            <a className="transition hover:text-white" href={`https://github.com/${username}`} target="_blank" rel="noreferrer">GitHub ↗</a>
          </nav>
        </header>

        <section id="home" className="grid min-h-[570px] items-center gap-12 py-20 md:grid-cols-[1.2fr_.8fr] md:py-28">
          <div>
            <p className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 font-mono text-xs text-white/60"><span className="h-2 w-2 rounded-full bg-lime shadow-[0_0_12px_#b7f36b]" /> AVAILABLE FOR WHAT&apos;S NEXT</p>
            <h1 className="max-w-3xl text-5xl font-semibold leading-[1.05] tracking-[-.055em] sm:text-7xl">Building things<br />for the <span className="text-lime">curious.</span></h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-white/55">Hey, I&apos;m <span className="text-white">{displayName}</span>. {bio}</p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#work" className="rounded-full bg-lime px-6 py-3 text-sm font-semibold text-black transition hover:bg-white">Explore my work ↓</a>
              <a href={`https://github.com/${username}`} target="_blank" rel="noreferrer" className="rounded-full border border-white/15 px-6 py-3 text-sm text-white transition hover:border-white/50">GitHub profile ↗</a>
            </div>
          </div>
          <div className="relative mx-auto flex aspect-square w-full max-w-[330px] items-center justify-center">
            <div className="absolute inset-4 rounded-full border border-white/10" />
            <div className="absolute inset-10 rounded-full border border-dashed border-lime/25" />
            <div className="absolute h-56 w-56 rounded-full bg-lime/10 blur-3xl" />
            {profile?.avatar_url ? <img src={profile.avatar_url} alt={`${displayName} GitHub avatar`} className="relative h-40 w-40 rounded-full border border-white/20 object-cover shadow-[0_0_70px_rgba(183,243,107,.13)]" /> : <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-white/15 bg-[#17191d] font-mono text-5xl text-lime">VP</div>}
            <span className="absolute right-2 top-14 rounded-full border border-white/10 bg-[#15171b] px-4 py-2 font-mono text-xs text-white/60">{profile?.public_repos ?? ownRepositories.length} repositories</span>
            <span className="absolute bottom-12 left-0 rounded-full border border-white/10 bg-[#15171b] px-4 py-2 font-mono text-xs text-white/60">{profile?.followers ?? 0} followers</span>
          </div>
        </section>

        <section id="work" className="scroll-mt-8 py-20">
          <div className="mb-10 flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div><p className="mb-3 font-mono text-xs uppercase tracking-[.25em] text-lime">A selection of my work</p><h2 className="text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Projects<span className="text-white/30"> ({ownRepositories.length})</span></h2></div>
            <a href={`https://github.com/${username}?tab=repositories`} target="_blank" rel="noreferrer" className="text-sm text-white/55 transition hover:text-lime">All repositories on GitHub ↗</a>
          </div>

          <div className="mb-7 flex flex-col gap-3 sm:flex-row">
            <label className="flex flex-1 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 focus-within:border-lime/60"><span aria-hidden="true" className="text-white/40">⌕</span><input aria-label="Search projects" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search projects, topics, technologies..." className="w-full bg-transparent py-3 text-sm outline-none placeholder:text-white/30" /></label>
            <label className="sr-only" htmlFor="language-filter">Filter by language</label><select id="language-filter" value={language} onChange={(event) => setLanguage(event.target.value)} className="rounded-xl border border-white/10 bg-[#111318] px-4 py-3 text-sm text-white/70 outline-none focus:border-lime/60">{languages.map((item) => <option key={item} value={item}>{item === "All" ? "All languages" : item}</option>)}</select>
          </div>

          {filteredRepositories.length ? <div className="grid gap-4 md:grid-cols-2">
            {filteredRepositories.map((repo) => <article key={repo.id} className="group flex min-h-[230px] flex-col rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition duration-300 hover:-translate-y-1 hover:border-lime/40 hover:bg-white/[0.045]">
              <div className="flex items-start justify-between gap-4"><div><p className="mb-2 font-mono text-xs text-white/35">PROJECT / {String(repo.id).slice(-4)}</p><h3 className="text-xl font-medium tracking-tight transition group-hover:text-lime">{repo.name}</h3></div><a href={repo.html_url} target="_blank" rel="noreferrer" aria-label={`View ${repo.name} on GitHub`} className="rounded-full border border-white/10 px-3 py-2 text-sm text-white/60 transition hover:border-lime hover:text-lime">↗</a></div>
              <p className="mt-4 flex-1 text-sm leading-6 text-white/50">{repo.description || "A project from my GitHub. Open the repository to learn more."}</p>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-xs text-white/40">
                {repo.language && <span className="rounded-full border border-white/10 px-3 py-1.5 text-white/60">{repo.language}</span>}
                {(repo.topics ?? []).slice(0, 3).map((topic) => <span key={topic} className="rounded-full bg-white/[0.05] px-3 py-1.5">{topic}</span>)}
                <span className="ml-auto">★ {repo.stargazers_count}</span><span>Updated {formatDate(repo.updated_at)}</span>
              </div>
              {repo.homepage && <a className="mt-4 text-xs text-lime hover:underline" href={repo.homepage.startsWith("http") ? repo.homepage : `https://${repo.homepage}`} target="_blank" rel="noreferrer">Visit live project ↗</a>}
            </article>)}
          </div> : <div className="rounded-2xl border border-dashed border-white/15 px-6 py-16 text-center"><p className="text-lg">{ownRepositories.length ? "No projects match that search." : "Your GitHub projects will show up here."}</p><p className="mt-2 text-sm text-white/45">{ownRepositories.length ? "Try a different search or language." : `Add public repositories to github.com/${username} and they’ll appear automatically.`}</p></div>}
        </section>

        <section id="about" className="grid gap-10 border-t border-white/10 py-20 md:grid-cols-2">
          <div><p className="mb-3 font-mono text-xs uppercase tracking-[.25em] text-lime">A little about me</p><h2 className="text-4xl font-semibold tracking-[-.04em]">Always learning.<br />Always building.</h2></div>
          <div className="text-sm leading-7 text-white/55"><p>{bio}</p><p className="mt-4">This portfolio is connected to GitHub and refreshes its project list automatically. The best way to learn about a project is to explore its code and README.</p><div className="mt-6 flex flex-wrap gap-3">{profile?.location && <span className="rounded-full border border-white/10 px-4 py-2">⌖ {profile.location}</span>}{profile?.blog && <a className="rounded-full border border-white/10 px-4 py-2 hover:border-lime" href={profile.blog.startsWith("http") ? profile.blog : `https://${profile.blog}`} target="_blank" rel="noreferrer">Personal site ↗</a>}<a className="rounded-full border border-white/10 px-4 py-2 hover:border-lime" href={`https://github.com/${username}`} target="_blank" rel="noreferrer">GitHub ↗</a></div></div>
        </section>

        <footer className="flex flex-col justify-between gap-3 border-t border-white/10 py-7 text-xs text-white/35 sm:flex-row"><span>© {new Date().getFullYear()} {displayName}. Built with curiosity.</span><span>Powered by GitHub API · <a className="hover:text-white" href={`https://github.com/${username}/portfolio`}>Source ↗</a></span></footer>
      </div>
    </main>
  );
}
