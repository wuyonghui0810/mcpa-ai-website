import { promises as fs } from "fs";
import path from "path";

export interface Server {
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

export interface ServerIndex {
  generated_at: string;
  count: number;
  servers: Server[];
}

export async function getServers(): Promise<ServerIndex> {
  const filePath = path.join(process.cwd(), "public", "servers.json");
  const raw = await fs.readFile(filePath, "utf-8");
  return JSON.parse(raw) as ServerIndex;
}

export function getCategories(servers: Server[]): string[] {
  const categories = new Set(servers.map((s) => s.category));
  return ["All", ...Array.from(categories).sort()];
}
