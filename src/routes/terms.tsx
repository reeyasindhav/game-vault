import { createFileRoute, Link } from "@tanstack/react-router";
import { FileText } from "lucide-react";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Gamevault" },
      {
        name: "description",
        content: "Terms of Service for Gamevault — your cross-platform game backlog tracker.",
      },
      { property: "og:title", content: "Terms of Service — Gamevault" },
      {
        property: "og:description",
        content: "The rules for using Gamevault. Read them before you build your vault.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <div className="pointer-events-none fixed inset-0 grid-bg opacity-40" />
      <div className="pointer-events-none absolute -top-52 left-1/2 h-[34rem] w-[64rem] -translate-x-1/2 rounded-full bg-neon/12 blur-[140px]" />

      <header className="relative mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-neon/15 neon-ring">
            <FileText className="text-neon" size={20} />
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
          <h1 className="mt-3 text-4xl font-bold leading-tight sm:text-5xl">Terms of Service</h1>
          <p className="mt-4 text-muted-foreground">Last updated: August 10, 2026</p>
        </div>

        <div className="mt-12 space-y-8">
          <section className="panel animate-fade-up p-6 sm:p-8">
            <h2 className="text-xl font-bold">1. Acceptance of Terms</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              By accessing or using Gamevault (&quot;the Service&quot;), you agree to be bound by
              these Terms of Service. If you do not agree to these terms, please do not use the
              Service. We may update these terms from time to time, and your continued use of the
              Service constitutes acceptance of any changes.
            </p>
          </section>

          <section className="panel animate-fade-up p-6 sm:p-8" style={{ animationDelay: "60ms" }}>
            <h2 className="text-xl font-bold">2. Account Registration</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              To use certain features of the Service, you must create an account. You are
              responsible for maintaining the confidentiality of your account credentials and for
              all activity that occurs under your account. You agree to provide accurate and
              complete information when creating an account and to update your information as
              needed.
            </p>
          </section>

          <section className="panel animate-fade-up p-6 sm:p-8" style={{ animationDelay: "120ms" }}>
            <h2 className="text-xl font-bold">3. User Content</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              You retain ownership of any reviews, ratings, and other content you submit to
              Gamevault. By submitting content, you grant us a worldwide, non-exclusive license to
              use, display, and distribute that content in connection with the Service. You agree
              not to submit content that is unlawful, defamatory, or infringes on the rights of
              others.
            </p>
          </section>

          <section className="panel animate-fade-up p-6 sm:p-8" style={{ animationDelay: "180ms" }}>
            <h2 className="text-xl font-bold">4. Intellectual Property</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              The Service and its original content, features, and functionality are owned by
              Gamevault and are protected by international copyright, trademark, and other
              intellectual property laws. Game titles, cover art, and related trademarks are the
              property of their respective owners.
            </p>
          </section>

          <section className="panel animate-fade-up p-6 sm:p-8" style={{ animationDelay: "240ms" }}>
            <h2 className="text-xl font-bold">5. Prohibited Activities</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              You agree not to use the Service to: (a) violate any applicable laws or regulations;
              (b) impersonate another person or entity; (c) upload malicious code; (d) interfere
              with or disrupt the integrity or performance of the Service; or (e) attempt to gain
              unauthorized access to any portion of the Service.
            </p>
          </section>

          <section className="panel animate-fade-up p-6 sm:p-8" style={{ animationDelay: "300ms" }}>
            <h2 className="text-xl font-bold">6. Termination</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We reserve the right to suspend or terminate your account at our sole discretion,
              without prior notice, for conduct that we believe violates these Terms or is harmful
              to other users, us, or third parties. Upon termination, your right to use the Service
              will immediately cease.
            </p>
          </section>

          <section className="panel animate-fade-up p-6 sm:p-8" style={{ animationDelay: "360ms" }}>
            <h2 className="text-xl font-bold">7. Limitation of Liability</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Gamevault is provided on an &quot;as-is&quot; and &quot;as-available&quot; basis. To
              the fullest extent permitted by law, we disclaim all warranties and shall not be
              liable for any indirect, incidental, special, or consequential damages arising out of
              or in connection with your use of the Service.
            </p>
          </section>

          <section className="panel animate-fade-up p-6 sm:p-8" style={{ animationDelay: "420ms" }}>
            <h2 className="text-xl font-bold">8. Changes to Terms</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              We may revise these Terms from time to time. The most current version will always be
              posted on this page. If a revision is material, we will provide notice through the
              Service or via email. Your continued use of the Service after changes become effective
              constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section className="panel animate-fade-up p-6 sm:p-8" style={{ animationDelay: "480ms" }}>
            <h2 className="text-xl font-bold">9. Contact Us</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              If you have any questions about these Terms, please reach out at{" "}
              <a
                href="mailto:terms@gamevault.app"
                className="text-neon transition-colors hover:underline"
              >
                terms@gamevault.app
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
