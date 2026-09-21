# MCPA.ai — MCP Server Index

An independent, auto-indexed directory of open-source [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) servers found on GitHub.

- **Live site:** https://mcpa.ai (after DNS setup)
- **Tech stack:** Next.js 14 + TypeScript + Tailwind CSS + Fuse.js
- **Data source:** GitHub Search API (`topic:model-context-protocol`)
- **Deployment:** Static export to Vercel
- **DNS/SSL:** Cloudflare (recommended)

## Important Disclaimer

MCPA.ai is an independent community resource. It is **not affiliated with, endorsed by, or sponsored by** the Linux Foundation, the Agentic AI Foundation, Anthropic, or the Model Context Protocol Associate (MCPA) certification program. We do not offer, administer, or claim any rights to the MCPA certification.

## Development

```bash
npm install
npm run dev
```

## Build for production

```bash
npm run build
```

This generates a static export in the `dist/` directory.

## Update server data manually

```bash
python3 scripts/fetch_mcp_servers.py
```

A GitHub token can be provided via the `GITHUB_TOKEN` environment variable to avoid rate limits.

## Automated updates

The `.github/workflows/update-data.yml` workflow runs daily at 02:00 UTC. It:

1. Fetches the latest MCP repositories from GitHub.
2. Regenerates `public/servers.json`.
3. Commits the updated data.
4. Triggers a Vercel deployment.

To enable this, add a `GITHUB_TOKEN` secret in the GitHub repository settings.

## Project structure

```
app/              Next.js App Router pages
components/       React components
lib/              Data loading utilities
public/           Static assets and generated servers.json
scripts/          Python data fetcher
```

## Deployment checklist

1. Push this project to a GitHub repository.
2. Import the repository in Vercel.
3. Set the framework preset to Next.js.
4. Configure the output directory as `dist` (already set in `next.config.mjs`).
5. Add `GITHUB_TOKEN` as an environment variable for automatic data updates.
6. Point `mcpa.ai` DNS to Cloudflare, then add a CNAME record to `cname.vercel-dns.com`.
7. Enable Cloudflare proxy (orange cloud) for DNS + SSL + CDN.
