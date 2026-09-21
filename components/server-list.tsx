"use client";

import { ExternalLink, Star } from "lucide-react";
import { Server } from "@/lib/servers";

interface ServerListProps {
  servers: Server[];
}

function formatStars(n: number): string {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return n.toString();
}

export function ServerList({ servers }: ServerListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {servers.map((server) => (
        <a
          key={server.id}
          href={server.github_url}
          target="_blank"
          rel="noopener noreferrer"
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
  );
}
