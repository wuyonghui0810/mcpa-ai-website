import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MCPA.ai | MCP Server Index",
  description:
    "An auto-indexed directory of Model Context Protocol servers. Discover MCP servers, tools, and resources for building AI agents.",
  keywords: [
    "MCP",
    "Model Context Protocol",
    "MCP servers",
    "AI agents",
    "AI tools",
    "MCP directory",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
