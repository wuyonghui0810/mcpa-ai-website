import Link from "next/link";
import { Sparkles } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | MCPA.ai",
  description: "Privacy policy for MCPA.ai.",
};

export default function PrivacyPage() {
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

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h1 className="text-4xl font-bold text-mi-black mb-8">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none text-mi-text space-y-6">
          <p className="text-mi-muted">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>

          <div>
            <h2 className="text-xl font-bold text-mi-black mb-3">1. Information We Collect</h2>
            <p className="text-mi-muted leading-relaxed">
              MCPA.ai is a static informational website. We do not require user accounts and do not
              collect personal information directly. We may use third-party analytics tools (such as
              Vercel Analytics) to understand aggregate website traffic. These tools do not identify
              individual users.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mi-black mb-3">2. Use of Data</h2>
            <p className="text-mi-muted leading-relaxed">
              Any data collected is used solely to improve website performance and content relevance.
              We do not sell, rent, or share personal data with third parties.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mi-black mb-3">3. External Links</h2>
            <p className="text-mi-muted leading-relaxed">
              This site contains links to external websites, primarily GitHub repositories. We are not
              responsible for the privacy practices or content of those third-party sites.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mi-black mb-3">4. Changes to This Policy</h2>
            <p className="text-mi-muted leading-relaxed">
              We may update this privacy policy from time to time. Any changes will be posted on this
              page with an updated effective date.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-mi-black mb-3">5. Contact</h2>
            <p className="text-mi-muted leading-relaxed">
              If you have any questions about this privacy policy, please contact us at{" "}
              <a href="mailto:hi@mcpa.ai" className="text-mi-orange hover:text-mi-orange-hover font-medium">
                hi@mcpa.ai
              </a>
              .
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-white border-t border-mi-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-mi-muted">
          <Link href="/" className="text-mi-orange hover:text-mi-orange-hover font-medium">
            ← Back to Server Index
          </Link>
        </div>
      </footer>
    </main>
  );
}
