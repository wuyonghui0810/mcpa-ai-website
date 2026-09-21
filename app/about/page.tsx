import Link from "next/link";
import { Sparkles, Shield, ExternalLink, Bot } from "lucide-react";

export const metadata = {
  title: "About | MCPA.ai",
  description:
    "About MCPA.ai, an independent automated index of Model Context Protocol servers.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-mi-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-mi-orange rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-mi-black">MCPA.ai</span>
            </Link>
            <nav className="flex items-center gap-6 text-sm font-medium text-mi-text">
              <Link href="/" className="hover:text-mi-black transition-colors">Servers</Link>
              <Link href="/about" className="hover:text-mi-black transition-colors">About</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* About Content */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-mi-orange/10 rounded-2xl mb-6">
            <Bot className="w-8 h-8 text-mi-orange" />
          </div>
          <h1 className="text-4xl font-bold text-mi-black mb-4">About MCPA.ai</h1>
          <p className="text-lg text-mi-muted">
            An independent, automated directory for the open Model Context Protocol ecosystem.
          </p>
        </div>

        <div className="prose prose-lg max-w-none text-mi-text space-y-8">
          <div className="bg-mi-gray rounded-2xl p-8">
            <h2 className="text-xl font-bold text-mi-black mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-mi-orange" />
              Independent & Unaffiliated
            </h2>
            <p className="text-mi-muted leading-relaxed">
              MCPA.ai is a community-driven index. We are not affiliated with, endorsed by, or
              sponsored by the Linux Foundation, the Agentic AI Foundation, Anthropic, or the Model
              Context Protocol Associate (MCPA) certification program.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mi-black mb-3">What is MCP?</h2>
            <p className="text-mi-muted leading-relaxed mb-4">
              The Model Context Protocol (MCP) is an open protocol that enables AI systems to connect
              securely to external data sources, tools, and services. It was originally introduced by
              Anthropic and is now maintained as an open standard.
            </p>
            <a
              href="https://modelcontextprotocol.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-mi-orange hover:text-mi-orange-hover font-medium"
            >
              Read the official MCP specification
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mi-black mb-3">How This Site Works</h2>
            <p className="text-mi-muted leading-relaxed">
              MCPA.ai automatically indexes public GitHub repositories tagged with the{" "}
              <code>model-context-protocol</code> topic. All data is sourced from the public GitHub
              API. We do not host, modify, or claim ownership of any listed projects.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mi-black mb-3">Legal Disclaimer</h2>
            <p className="text-mi-muted leading-relaxed">
              MCPA.ai does not offer, administer, or claim any rights to the Model Context Protocol
              Associate (MCPA) certification. The term &quot;MCP&quot; as used on this site refers solely to
              the open Model Context Protocol. All trademarks and logos displayed belong to their
              respective owners.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mi-black mb-3">Contact</h2>
            <p className="text-mi-muted leading-relaxed">
              For questions, suggestions, or takedown requests, please reach out via{" "}
              <a href="mailto:hi@mcpa.ai" className="text-mi-orange hover:text-mi-orange-hover font-medium">
                hi@mcpa.ai
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-mi-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-mi-muted">
          <Link href="/" className="text-mi-orange hover:text-mi-orange-hover font-medium">
            ← Back to Server Index
          </Link>
          <p className="mt-4">
            © {new Date().getFullYear()} MCPA.ai. Independent MCP server directory.
          </p>
        </div>
      </footer>
    </main>
  );
}
