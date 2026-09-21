"use client";

import { useState, useMemo, useEffect } from "react";
import { ExternalLink, Star, ArrowUpDown, TrendingUp, Clock, ArrowDown, ArrowUp, TypeOutline } from "lucide-react";
import { Server } from "@/lib/servers";
import { Pagination } from "@/components/pagination";

interface ServerListProps {
  servers: Server[];
  activeQuery?: string;
}

const PAGE_SIZE = 18;

type SortBase = "stars" | "updated" | "name";
type SortKey = `${SortBase}-desc` | `${SortBase}-asc`;

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

const SORT_CONFIG: { key: SortBase; label: string; icon: React.ReactNode; default: SortKey }[] = [
  { key: "stars", label: "Stars", icon: <TrendingUp className="w-3.5 h-3.5" />, default: "stars-desc" },
  { key: "updated", label: "Updated", icon: <Clock className="w-3.5 h-3.5" />, default: "updated-desc" },
  { key: "name", label: "A–Z", icon: <TypeOutline className="w-3.5 h-3.5" />, default: "name-asc" },
];

export function ServerList({ servers, activeQuery = "" }: ServerListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sort, setSort] = useState<SortKey>("stars-desc");

  const sorted = useMemo(() => {
    const list = [...servers];
    // Preserve Fuse relevance order when the user is actively searching.
    if (activeQuery.trim()) return list;
    const [base, direction] = sort.split("-") as [SortBase, "desc" | "asc"];
    const dir = direction === "asc" ? 1 : -1;
    switch (base) {
      case "stars":
        list.sort((a, b) => dir * (a.stars - b.stars));
        break;
      case "updated":
        list.sort((a, b) => dir * (new Date(a.updated_at).getTime() - new Date(b.updated_at).getTime()));
        break;
      case "name":
        list.sort((a, b) => dir * a.name.localeCompare(b.name));
        break;
    }
    return list;
  }, [servers, sort, activeQuery]);

  const totalPages = useMemo(() => Math.max(1, Math.ceil(sorted.length / PAGE_SIZE)), [sorted.length]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sorted.slice(start, start + PAGE_SIZE);
  }, [sorted, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [servers, sort, activeQuery]);

  const handleSortClick = (base: SortBase) => {
    setSort((current) => {
      const currentBase = current.split("-")[0] as SortBase;
      if (currentBase === base) {
        const currentDir = current.split("-")[1] as "desc" | "asc";
        return `${base}-${currentDir === "desc" ? "asc" : "desc"}` as SortKey;
      }
      return SORT_CONFIG.find((s) => s.key === base)!.default;
    });
  };

  const isActive = (base: SortBase) => sort.startsWith(base);
  const getDirection = (base: SortBase) => (sort === `${base}-asc` ? "asc" : "desc");

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-mi-muted">
          <ArrowUpDown className="w-4 h-4" />
          <span>Sort by:</span>
          <div className="flex items-center bg-white border border-mi-border rounded-lg p-1">
            {SORT_CONFIG.map((cfg) => {
              const active = isActive(cfg.key);
              const direction = getDirection(cfg.key);
              return (
                <button
                  key={cfg.key}
                  type="button"
                  onClick={() => handleSortClick(cfg.key)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                    active ? "bg-mi-orange text-white" : "text-mi-text hover:bg-mi-gray"
                  }`}
                  aria-pressed={active}
                >
                  {cfg.icon}
                  {cfg.label}
                  {active && (
                    direction === "asc" ? (
                      <ArrowUp className="w-3 h-3" />
                    ) : (
                      <ArrowDown className="w-3 h-3" />
                    )
                  )}
                </button>
              );
            })}
          </div>
        </div>
        <span className="text-sm text-mi-muted">
          {sorted.length} {sorted.length === 1 ? "server" : "servers"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {paginated.map((server) => (
          <a
            key={server.id}
            href={server.github_url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid="server-card"
            data-stars={server.stars}
            className="group block bg-white rounded-2xl border border-mi-border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-mi-gray flex items-center justify-center text-mi-black font-bold text-sm">
                  {server.owner.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-mi-black truncate pr-2">{server.name}</h3>
                  <p className="text-xs text-mi-muted truncate">{server.owner}</p>
                </div>
              </div>
              <ExternalLink className="w-4 h-4 text-mi-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
            </div>

            <p className="text-sm text-mi-text line-clamp-2 mb-4 min-h-[2.5rem]">
              {server.description || "No description provided."}
            </p>

            <div className="flex items-center justify-between text-xs text-mi-muted">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 bg-mi-gray px-2 py-1 rounded-md">
                  <Star className="w-3 h-3 fill-mi-orange text-mi-orange" />
                  {formatStars(server.stars)}
                </span>
                <span className="bg-mi-gray px-2 py-1 rounded-md">{server.language}</span>
              </div>
              <span className="bg-mi-orange/10 text-mi-orange px-2 py-1 rounded-md font-medium">
                {server.category}
              </span>
            </div>
          </a>
        ))}

        {servers.length === 0 && (
          <div className="col-span-full text-center py-20 text-mi-muted">
            <p className="text-lg mb-2">No servers found.</p>
            <p>Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
