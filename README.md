# Vamsi Poluru — Portfolio

A personal portfolio site for **vamsipoluru2**, featuring an interactive project directory populated from the GitHub API.

## Features

- Pulls public profile and repository data from GitHub automatically
- Search repositories by name, description, topic, or technology
- Filter projects by programming language
- Shows repository descriptions, topics, stars, last-updated date, and live-demo links
- Responsive layout with no database or GitHub token required for public repositories

## Run locally

Requires Node.js 18.17 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Personalize

- Update the `username` constant in `app/page.tsx` if your GitHub username changes.
- Your displayed name, bio, avatar, location, website, repository count, and followers come from your public GitHub profile. Add or edit these in GitHub **Settings → Public profile**.
- Project cards are generated from your public repositories. Add clear descriptions, topics, and a homepage URL to repositories you want to feature.
- Edit the text and visual styling in `components/portfolio.tsx` and `app/globals.css`.

The repository itself is named `portfolio`; `README.md` is the standard project documentation, while the Next.js app is the visitor-facing portfolio website.

## Deploy

Import this repository into [Vercel](https://vercel.com/) and deploy with the default Next.js settings. No environment variables are needed. GitHub's unauthenticated API has a rate limit; the app caches profile and repository data for one hour.
