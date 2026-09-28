import Link from "next/link";
import { 
  Shield, 
  ExternalLink, 
  Bot, 
  Cpu, 
  Terminal, 
  Scale, 
  Mail, 
  Globe2,
  CheckCircle2,
  Sparkles
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";

export const metadata = {
  title: "About | MCPA.ai - Open Model Context Protocol Directory",
  description:
    "About MCPA.ai: an independent automated directory and intelligence index for the open Model Context Protocol ecosystem.",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      <SiteHeader />

      {/* Hero Header Section */}
      <section className="bg-mi-gray border-b border-mi-border py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-mi-border text-xs font-semibold text-mi-text mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-mi-orange animate-pulse" />
              <span>Independent Ecosystem Hub</span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-mi-black tracking-tight mb-4">
              About MCPA.ai
            </h1>
            <p className="text-lg text-mi-text leading-relaxed">
              An independent, automated directory and weekly radar dedicated to mapping the open Model Context Protocol (MCP) ecosystem.
            </p>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            <div className="bg-white p-5 rounded-2xl border border-mi-border shadow-xs text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-mi-orange mb-1">
                <Cpu className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-mi-muted">Protocol</span>
              </div>
              <div className="text-2xl font-bold text-mi-black">Open MCP</div>
              <div className="text-xs text-mi-muted mt-0.5">Anthropic Standard</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-mi-border shadow-xs text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-mi-orange mb-1">
                <Bot className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-mi-muted">Indexed</span>
              </div>
              <div className="text-2xl font-bold text-mi-black">500+ Servers</div>
              <div className="text-xs text-mi-muted mt-0.5">Automated Daily Sync</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-mi-border shadow-xs text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-mi-orange mb-1">
                <Globe2 className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-mi-muted">Radar</span>
              </div>
              <div className="text-2xl font-bold text-mi-black">Weekly Trends</div>
              <div className="text-xs text-mi-muted mt-0.5">EN / 中文 Dual Radar</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-mi-border shadow-xs text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start gap-2 text-mi-orange mb-1">
                <Sparkles className="w-4 h-4" />
                <span className="text-xs font-semibold uppercase tracking-wider text-mi-muted">Access</span>
              </div>
              <div className="text-2xl font-bold text-mi-black">100% Free</div>
              <div className="text-xs text-mi-muted mt-0.5">Community Driven</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-10">
          {/* Prominent Independence Disclaimer Card */}
          <div className="bg-orange-50/60 border border-orange-200/90 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-mi-orange text-white flex items-center justify-center shrink-0 mt-0.5">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-mi-black mb-2">
                  Independent & Unaffiliated
                </h2>
                <p className="text-sm sm:text-base text-mi-text leading-relaxed">
                  MCPA.ai is a community-driven index. We are not affiliated with, endorsed by, or sponsored by Anthropic, the Linux Foundation, the Agentic AI Foundation, or the Model Context Protocol Associate (MCPA) certification program. Our mission is strictly to provide open discovery and cataloging infrastructure for developers and AI engineers.
                </p>
              </div>
            </div>
          </div>

          {/* 2-Column Grid Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1: What is MCP? */}
            <div className="bg-white rounded-2xl border border-mi-border p-6 sm:p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-mi-gray flex items-center justify-center text-mi-orange mb-4">
                  <Terminal className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-mi-black mb-2.5">What is MCP?</h3>
                <p className="text-sm text-mi-muted leading-relaxed mb-4">
                  The Model Context Protocol (MCP) is an open standard designed to enable AI assistants to interface securely with external data sources, developer tools, and operational environments. It acts as the universal USB-C cable for AI models.
                </p>
                <ul className="space-y-2 text-xs text-mi-text mb-6">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Secure client-host protocol architecture</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Language agnostic: TypeScript, Python, Go, Rust & Kotlin</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Adopted by Claude Desktop, Cursor, OpenCode, and IDEs</span>
                  </li>
                </ul>
              </div>
              <div>
                <a
                  href="https://modelcontextprotocol.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-mi-orange hover:text-mi-orange-hover"
                >
                  Read the official MCP specification
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Card 2: How MCPA.ai Works */}
            <div className="bg-white rounded-2xl border border-mi-border p-6 sm:p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-mi-gray flex items-center justify-center text-mi-orange mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-mi-black mb-2.5">How This Directory Works</h3>
                <p className="text-sm text-mi-muted leading-relaxed mb-4">
                  MCPA.ai automatically indexes verified open-source repositories across GitHub tagged with Model Context Protocol topics. All metadata is extracted without storing private code.
                </p>
                <div className="space-y-3 bg-mi-gray/70 p-4 rounded-xl text-xs text-mi-text border border-mi-border/60">
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-mi-black shrink-0">Automated Pipeline:</span>
                    <span>Daily GitHub API sync, deduplication, star velocity and license verification.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="font-semibold text-mi-black shrink-0">Zero Lock-In:</span>
                    <span>Direct links to original authors, creators, and public repositories.</span>
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-mi-orange hover:text-mi-orange-hover"
                >
                  Explore all indexed servers
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Card 3: Legal & Trademark */}
            <div className="bg-white rounded-2xl border border-mi-border p-6 sm:p-7 shadow-xs">
              <div className="w-9 h-9 rounded-lg bg-mi-gray flex items-center justify-center text-mi-orange mb-4">
                <Scale className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-mi-black mb-2.5">Legal Disclaimer & Trademark Notice</h3>
              <p className="text-sm text-mi-muted leading-relaxed mb-3">
                MCPA.ai does not offer, administer, or claim any rights to the Model Context Protocol Associate (MCPA) certification.
              </p>
              <p className="text-xs text-mi-muted leading-relaxed">
                The term &quot;MCP&quot; as used on this website refers solely to the open Model Context Protocol. All trademarks, service marks, company names, and logos displayed belong to their respective owners. Linux Foundation and Agentic AI Foundation references are nominative fair use.
              </p>
            </div>

            {/* Card 4: Contact & Inquiries */}
            <div className="bg-white rounded-2xl border border-mi-border p-6 sm:p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-lg bg-mi-gray flex items-center justify-center text-mi-orange mb-4">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-mi-black mb-2.5">Contact & Inquiries</h3>
                <p className="text-sm text-mi-muted leading-relaxed mb-4">
                  Whether you are a developer looking to feature a new MCP server, requesting a takedown, or interested in strategic domain asset acquisition:
                </p>
                <div className="bg-mi-gray p-4 rounded-xl border border-mi-border/70 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-mi-muted">Direct Email</div>
                    <a
                      href="mailto:hi@mcpa.ai"
                      className="text-base font-bold text-mi-black hover:text-mi-orange transition-colors"
                    >
                      hi@mcpa.ai
                    </a>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                    Monitored
                  </span>
                </div>
              </div>
              <div className="mt-6 text-xs text-mi-muted">
                Response SLA: 24–48 hours for verified inquiries.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-mi-border py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-mi-muted">
          <Link href="/" className="text-mi-orange hover:text-mi-orange-hover font-medium">
            ← Back to Server Index
          </Link>
          <p className="mt-4">
            © {new Date().getFullYear()} MCPA.ai. Independent directory for the Model Context Protocol ecosystem.
          </p>
        </div>
      </footer>
    </main>
  );
}
