"use client";

import Link from "next/link";
import { useState } from "react";
import { Sparkles, Shield, ExternalLink, Bot, Menu, X } from "lucide-react";



export default function AboutPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-mi-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-mi-orange rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-mi-black">MCPA.ai</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-mi-text">
              <Link href="/" className="hover:text-mi-black transition-colors">Servers</Link>
              <Link href="/about" className="hover:text-mi-black transition-colors">About</Link>
              <a
                href="https://github.com/modelcontextprotocol"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-mi-black transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    clipRule="evenodd"
                  />
                </svg>
                GitHub
              </a>
            </nav>

            <button
              className="md:hidden p-2 text-mi-black"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-mi-border bg-white px-4 py-4 space-y-3">
            <Link href="/" className="block text-sm font-medium text-mi-text">Servers</Link>
            <Link href="/about" className="block text-sm font-medium text-mi-text">About</Link>
            <a
              href="https://github.com/modelcontextprotocol"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm font-medium text-mi-text"
            >
              GitHub
            </a>
          </div>
        )}
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
