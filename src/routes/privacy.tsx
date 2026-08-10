import { createFileRoute, Link } from "@tanstack/react-router";
import { Shield } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Gamevault" },
      {
        name: "description",
        content: "Privacy Policy for Gamevault — how we collect, use, and protect your data.",
      },
      { property: "og:title", content: "Privacy Policy — Gamevault" },
      {
        property: "og:description",
        content: "How Gamevault handles your data. Read it before you build your vault.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute -top-52 left-1/2 h-[34rem] w-[64rem] -translate-x-1/2 rounded-full bg-neon/12 blur-[140px]" />

      <header className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-neon/15 neon-ring">
            <Shield className="text-neon" size={20} />
          </span>
          <span className="label-mono !text-neon">Gamevault</span>
        </Link>
        <Link
          to="/"
          className="rounded-full border border-border px-5 py-2.5 font-display text-xs font-bold uppercase tracking-widest transition-colors hover:border-neon/50 hover:text-neon"
        >
          Back to site
        </Link>
      </header>

      <main className="relative mx-auto max-w-3xl px-5 pb-24 sm:px-8">
        <div className="animate-fade-up">
          <span className="label-mono">Legal</span>
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">Privacy Policy</h1>
          <p className="mt-4 text-muted-foreground">Last updated: August 10, 2026</p>
        </div>

        <div className="mt-12 space-y-8">
          <section className="panel animate-fade-up p-6 sm:p-8">
            <h2 className="text-xl font-bold">1. Information We Collect</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We collect information you provide directly to us, such as your name, email address,
              and profile information when you create an account. We also collect usage data
              including games you add to your backlog, ratings, reviews, and interaction history to
              provide recommendations and improve the Service.
            </p>
          </section>

          <section className="panel animate-fade-up p-6 sm:p-8" style={{ animationDelay: "60ms" }}>
            <h2 className="text-xl font-bold">2. How We Use Your Information</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We use your information to operate, maintain, and improve the Service, personalize
              your experience, send you technical notices and support messages, and respond to your
              comments and questions. We also use aggregated, anonymized data for analytics and
              product development.
            </p>
          </section>

          <section className="panel animate-fade-up p-6 sm:p-8" style={{ animationDelay: "120ms" }}>
            <h2 className="text-xl font-bold">3. Data Sharing and Disclosure</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We do not sell your personal data. We may share information with service providers who
              assist us in operating the Service, or when required by law. Your public profile,
              ratings, and reviews are visible to other users of the Service.
            </p>
          </section>

          <section className="panel animate-fade-up p-6 sm:p-8" style={{ animationDelay: "180ms" }}>
            <h2 className="text-xl font-bold">4. Data Security</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We implement appropriate technical and organizational measures to protect your
              personal data against unauthorized access, alteration, disclosure, or destruction.
              However, no method of transmission over the Internet or electronic storage is 100%
              secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="panel animate-fade-up p-6 sm:p-8" style={{ animationDelay: "240ms" }}>
            <h2 className="text-xl font-bold">5. Your Rights and Choices</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              You can access, update, or delete your account information at any time through your
              account settings. You may also request deletion of your account and associated data by
              contacting us. You can opt out of non-essential communications using the unsubscribe
              link in any email we send.
            </p>
          </section>

          <section className="panel animate-fade-up p-6 sm:p-8" style={{ animationDelay: "300ms" }}>
            <h2 className="text-xl font-bold">6. Cookies and Tracking</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We use cookies and similar tracking technologies to enhance your experience, analyze
              usage patterns, and personalize content. You can control cookie preferences through
              your browser settings, though disabling certain cookies may affect the functionality
              of the Service.
            </p>
          </section>

          <section className="panel animate-fade-up p-6 sm:p-8" style={{ animationDelay: "360ms" }}>
            <h2 className="text-xl font-bold">7. Children&apos;s Privacy</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The Service is not intended for users under the age of 13. We do not knowingly collect
              personal information from children under 13. If you believe a child under 13 has
              provided us with personal data, please contact us and we will take steps to delete
              that information.
            </p>
          </section>

          <section className="panel animate-fade-up p-6 sm:p-8" style={{ animationDelay: "420ms" }}>
            <h2 className="text-xl font-bold">8. Changes to This Policy</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We may update this Privacy Policy from time to time. The most current version will
              always be posted on this page. If a revision is material, we will provide notice
              through the Service or via email. Your continued use of the Service after changes
              become effective constitutes your acceptance of the updated policy.
            </p>
          </section>

          <section className="panel animate-fade-up p-6 sm:p-8" style={{ animationDelay: "480ms" }}>
            <h2 className="text-xl font-bold">9. Contact Us</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              If you have any questions about this Privacy Policy, please reach out at{" "}
              <a
                href="mailto:privacy@gamevault.app"
                className="text-neon transition-colors hover:underline"
              >
                privacy@gamevault.app
              </a>
              .
            </p>
          </section>
        </div>

        <div className="animate-fade-up mt-12 flex flex-wrap items-center gap-4 border-t border-border pt-8">
          <Link
            to="/login"
            className="rounded-full bg-neon px-7 py-3.5 font-display text-xs font-bold uppercase tracking-widest text-primary-foreground transition-all hover:brightness-110 active:scale-95"
          >
            Sign in
          </Link>
          <Link
            to="/signup"
            className="rounded-full border border-border px-7 py-3.5 font-display text-xs font-bold uppercase tracking-widest transition-colors hover:border-neon/50 hover:text-neon"
          >
            Create your vault
          </Link>
        </div>
      </main>
    </div>
  );
}
