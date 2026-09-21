#!/usr/bin/env python3
"""
Fetch MCP servers from GitHub and generate servers.json.
Run manually: python scripts/fetch_mcp_servers.py
Run via GitHub Actions daily.
"""

import json
import os
import re
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

# GitHub API endpoint for repositories with topic "model-context-protocol"
GITHUB_API = "https://api.github.com/search/repositories"
QUERY = "topic:model-context-protocol"
PER_PAGE = 100
MAX_PAGES = 5

# Optional GitHub token to avoid rate limits
GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")

CATEGORY_RULES = [
    ("Database", ["postgres", "mysql", "sqlite", "database", "sql", "db", "mongodb", "redis", "supabase", "dynamodb"]),
    ("Browser", ["browser", "puppeteer", "playwright", "chrome", "selenium"]),
    ("Filesystem", ["file", "filesystem", "fs"]),
    ("Productivity", ["slack", "notion", "github", "gitlab", "trello", "jira", "asana", "linear", "clickup"]),
    ("Search", ["brave", "tavily", "search", "serp", "bing", "google", "duckduckgo"]),
    ("Knowledge", ["memory", "knowledge", "rag", "embeddings", "vector"]),
    ("Cloud", ["aws", "gcp", "azure", "cloud", "s3", "lambda"]),
    ("Finance", ["finance", "stock", "crypto", "bitcoin", "trading", "market"]),
    ("DevTools", ["git", "docker", "kubernetes", "ci", "cd", "cli"]),
    ("Media", ["image", "video", "audio", "media", "ffmpeg", "ocr"]),
]


def fetch_repositories() -> list[dict]:
    repos = []
    headers = {"User-Agent": "mcpa-ai-indexer", "Accept": "application/vnd.github+json"}
    if GITHUB_TOKEN:
        headers["Authorization"] = f"Bearer {GITHUB_TOKEN}"

    for page in range(1, MAX_PAGES + 1):
        url = f"{GITHUB_API}?q={QUERY}&sort=stars&order=desc&per_page={PER_PAGE}&page={page}"
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=30) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            items = data.get("items", [])
            if not items:
                break
            repos.extend(items)
    return repos


def classify(description: str, topics: list[str]) -> str:
    text = " ".join([description or "", " ".join(topics or [])]).lower()
    for category, keywords in CATEGORY_RULES:
        if any(kw in text for kw in keywords):
            return category
    return "Other"


def normalize_repo(repo: dict) -> dict:
    desc = repo.get("description") or ""
    topics = repo.get("topics", [])
    return {
        "id": repo.get("id"),
        "name": repo.get("name"),
        "full_name": repo.get("full_name"),
        "owner": repo.get("owner", {}).get("login"),
        "description": desc,
        "stars": repo.get("stargazers_count", 0),
        "language": repo.get("language") or "Unknown",
        "license": (repo.get("license") or {}).get("spdx_id") or "Unknown",
        "topics": topics,
        "category": classify(desc, topics),
        "github_url": repo.get("html_url"),
        "updated_at": repo.get("updated_at"),
        "created_at": repo.get("created_at"),
    }


def main():
    repos = fetch_repositories()
    servers = [normalize_repo(r) for r in repos]
    servers.sort(key=lambda x: x["stars"], reverse=True)

    output = {
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "count": len(servers),
        "servers": servers,
    }

    out_path = Path(__file__).resolve().parent.parent / "public" / "servers.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        json.dump(output, f, indent=2, ensure_ascii=False)

    print(f"Wrote {len(servers)} servers to {out_path}")


if __name__ == "__main__":
    main()
