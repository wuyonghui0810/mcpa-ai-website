"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Fuse from "fuse.js";
import { ExternalLink, Search, Sparkles } from "lucide-react";
import { ServerList } from "@/components/server-list";
import { CategoryCards } from "@/components/category-cards";
import { SiteHeader } from "@/components/site-header";
import rawData from "@/public/servers.json";

interface Server {
  id: number;
  name: string;
  full_name: string;
  owner: string;
  description: string;
  stars: number;
  language: string;
  license: string;
  topics: string[];
  category: string;
  github_url: string;
  updated_at: string;
  created_at: string;
}

const servers = rawData.servers as Server[];

export default function HomePage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const fuse = useMemo(
    () =>
      new Fuse(servers, {
        keys: ["name", "description", "topics", "category", "owner"],
        threshold: 0.3,
      }),
    []
  );

  const categoryCounts = useMemo(() => {
    return servers.reduce<Record<string, number>>((acc, s) => {
      acc[s.category] = (acc[s.category] ?? 0) + 1;
      return acc;
    }, {});
  }, []);

  const filtered = useMemo(() => {
    let list = servers;
    if (activeCategory !== "All") {
      list = list.filter((s) => s.category === activeCategory);
    }
    if (query.trim()) {
      const results = fuse.search(query.trim()).map((r) => r.item);
      list = activeCategory === "All" ? results : results.filter((s) => s.category === activeCategory);
    }
    return list;
  }, [query, activeCategory, fuse]);

  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden bg-mi-gray border-b border-mi-border">
        <div className="absolute inset-0">
          <Image
            src="/hero.jpg"
            alt="MCP network"
            fill
            className="object-cover object-center opacity-[0.18]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-mi-gray/60 via-mi-gray/80 to-mi-gray" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 border border-mi-border text-sm text-mi-text mb-8 backdrop-blur-sm shadow-sm">
            <span className="w-2 h-2 rounded-full bg-mi-orange animate-pulse" />
            Auto-indexed daily from GitHub
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-mi-black tracking-tight mb-6">
            MCP Server Index
          </h1>
          <p className="text-lg sm:text-xl text-mi-text max-w-2xl mx-auto mb-10">
            Discover every open-source Model Context Protocol server in one place.
            Curated, categorized, and always up to date.
          </p>

          {/* Hero Search */}
          <div className="max-w-2xl mx-auto mb-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                document.getElementById("servers")?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className="relative flex items-center"
            >
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-mi-muted" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search servers, tools, or categories..."
                className="w-full pl-14 pr-28 py-4 text-lg bg-white border border-mi-border rounded-full outline-none transition-shadow focus:ring-2 focus:ring-mi-orange/30 focus:border-mi-orange shadow-sm"
              />
              <button
                type="submit"
                data-testid="search-submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-mi-orange hover:bg-mi-orange-hover text-white text-sm font-medium px-5 py-2.5 rounded-full transition-colors"
              >
                Search
              </button>
            </form>
          </div>

          <p className="text-sm text-mi-muted">
            {rawData.count} servers indexed · Last updated{" "}
            {new Date(rawData.generated_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </section>

      {/* Category Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-mi-black mb-3">Browse by Category</h2>
          <p className="text-mi-muted">Click a category to filter the server index.</p>
        </div>
        <CategoryCards
          activeCategory={activeCategory}
          onSelect={(cat) => {
            setActiveCategory(cat);
            document.getElementById("servers")?.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          counts={categoryCounts}
        />
      </section>

      {/* Server List */}
      <section id="servers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-mi-black">
            {activeCategory === "All" ? "All Servers" : `${activeCategory} Servers`}
          </h2>
          <span className="text-sm text-mi-muted">
            {filtered.length} {filtered.length === 1 ? "server" : "servers"}
          </span>
        </div>
        <ServerList servers={filtered} activeQuery={query} />
      </section>

      {/* CTA */}
      <section className="bg-mi-black text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Build with MCP</h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            The Model Context Protocol is an open standard for connecting AI assistants to external
            systems. Find the right server for your next agent.
          </p>
          <a
            href="https://modelcontextprotocol.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-mi-orange hover:bg-mi-orange-hover text-white font-medium px-8 py-3.5 rounded-full transition-colors"
          >
            Read the MCP Spec
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-mi-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 bg-mi-orange rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-mi-black">MCPA.ai</span>
              </div>
              <p className="text-sm text-mi-muted">
                An independent index of open-source Model Context Protocol servers.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-mi-black mb-3">Resources</h4>
              <ul className="space-y-2 text-sm text-mi-muted">
                <li>
                  <Link
                    href="/trending"
                    className="hover:text-mi-black transition-colors flex items-center gap-1.5 text-mi-black font-medium"
                  >
                    <span>Weekly Trending Radar</span>
                    <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-mi-orange/10 text-mi-orange rounded-full">New</span>
                  </Link>
                </li>
                <li>
                  <a
                    href="https://modelcontextprotocol.io/"
                    className="hover:text-mi-black transition-colors"
                  >
                    MCP Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/modelcontextprotocol"
                    className="hover:text-mi-black transition-colors"
                  >
                    Official GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/modelcontextprotocol/servers"
                    className="hover:text-mi-black transition-colors"
                  >
                    Official Servers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-mi-black mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-mi-muted">
                <li>
                  <Link href="/about" className="hover:text-mi-black transition-colors">
                    About & Disclaimer
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-mi-black transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-mi-border text-xs text-mi-muted leading-relaxed">
            <p className="mb-2">
              <strong>Disclaimer:</strong> MCPA.ai is an independent, automated index of open-source
              MCP servers on GitHub. We are not affiliated with, endorsed by, or sponsored by the
              Linux Foundation, the Agentic AI Foundation, Anthropic, or the Model Context Protocol
              Associate (MCPA) certification program. &quot;MCP&quot; refers to the open Model Context
              Protocol. We do not offer, administer, or claim any rights to the MCPA certification.
            </p>
            <p>© {new Date().getFullYear()} MCPA.ai. All data sourced from public GitHub repositories.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
