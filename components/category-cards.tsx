"use client";

import { Database, Globe, FolderOpen, Search, Brain, Zap } from "lucide-react";

export interface Category {
  key: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
  count?: number;
}

export const CATEGORIES: Category[] = [
  {
    key: "Database",
    label: "Database",
    description: "PostgreSQL, MySQL, SQLite, and more.",
    icon: <Database className="w-7 h-7" />,
    accent: "text-orange-500 bg-orange-50",
  },
  {
    key: "Browser",
    label: "Browser",
    description: "Web browsing, scraping, and testing.",
    icon: <Globe className="w-7 h-7" />,
    accent: "text-blue-500 bg-blue-50",
  },
  {
    key: "Filesystem",
    label: "Filesystem",
    description: "Local and cloud file management.",
    icon: <FolderOpen className="w-7 h-7" />,
    accent: "text-emerald-500 bg-emerald-50",
  },
  {
    key: "Search",
    label: "Search",
    description: "Web, semantic, and retrieval search.",
    icon: <Search className="w-7 h-7" />,
    accent: "text-violet-500 bg-violet-50",
  },
  {
    key: "Knowledge",
    label: "Knowledge",
    description: "Memory, graphs, and RAG pipelines.",
    icon: <Brain className="w-7 h-7" />,
    accent: "text-amber-500 bg-amber-50",
  },
  {
    key: "Productivity",
    label: "Productivity",
    description: "Slack, Notion, GitHub, and daily tools.",
    icon: <Zap className="w-7 h-7" />,
    accent: "text-rose-500 bg-rose-50",
  },
];

interface CategoryCardsProps {
  activeCategory: string;
  onSelect: (category: string) => void;
  counts?: Record<string, number>;
}

export function CategoryCards({ activeCategory, onSelect, counts }: CategoryCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {CATEGORIES.map((cat) => {
        const isActive = activeCategory === cat.key;
        const count = counts?.[cat.key] ?? 0;
        return (
          <button
            key={cat.key}
            onClick={() => onSelect(isActive ? "All" : cat.key)}
            aria-pressed={isActive}
            className={`group relative overflow-hidden rounded-3xl bg-white text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-mi-orange/30 focus:ring-offset-2 ${
              isActive
                ? "border border-mi-orange shadow-md ring-1 ring-mi-orange/20"
                : "border border-transparent shadow-sm hover:border-mi-border"
            }`}
          >
            <div className="relative p-7">
              <div className="flex items-start justify-between mb-5">
                <div
                  className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${cat.accent}`}
                >
                  {cat.icon}
                </div>
                {count > 0 && (
                  <span className="text-xs font-medium text-mi-muted bg-mi-gray px-2.5 py-1 rounded-full">
                    {count}
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-mi-black mb-2">{cat.label}</h3>
              <p className="text-sm text-mi-text leading-relaxed">{cat.description}</p>
              <div className="mt-5 flex items-center text-sm font-medium text-mi-orange opacity-0 group-hover:opacity-100 transition-opacity">
                {isActive ? "Reset filter" : `Browse ${cat.label.toLowerCase()}`}
                <svg
                  className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
