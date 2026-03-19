import PageFooter from "./PageFooter";

export default function ThresholdPage() {
  return (
    <article
      className="max-w-2xl mx-auto px-6 py-10 pb-8"
      data-ocid="threshold.page"
    >
      <header className="mb-10">
        <p className="text-amber-600/70 text-sm tracking-widest uppercase mb-2">
          Threshold Space
        </p>
        <h1 className="font-display text-3xl text-amber-900 leading-snug mb-4">
          Welcome
        </h1>
        <p className="text-foreground/75 text-lg leading-relaxed">
          This is your sacred space — a quiet container created just for you.
          Here, you are invited to notice your authentic self: the part of you
          that exists beneath the noise, the expectations, and the doing. There
          is no performance required. No finish line. Only presence.
        </p>
      </header>

      <div className="w-12 h-px bg-amber-300/60 mb-10" aria-hidden="true" />

      <section className="mb-10">
        <h2 className="font-display text-xl text-amber-800 mb-4">
          How to Use This Journal
        </h2>
        <p className="text-foreground/70 leading-relaxed mb-4">
          This journal weaves together three practices — <em>Art</em>,{" "}
          <em>Spirituality</em>, and <em>Writing</em> — into a single daily
          rhythm. Each day offers a gentle invitation across all three threads.
          You do not have to follow them in any order, and you do not have to
          complete them all.
        </p>
        <ul className="space-y-3 text-foreground/70 leading-relaxed">
          <li className="flex gap-3">
            <span className="text-amber-500 mt-0.5 shrink-0">✦</span>
            <span>
              All prompts are optional. Take what serves you, leave what does
              not.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-500 mt-0.5 shrink-0">✦</span>
            <span>
              You may skip any day, pause any week, or revisit anything at any
              time.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-500 mt-0.5 shrink-0">✦</span>
            <span>
              There is no right way to move through this journal. Your pace is
              the right pace.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-amber-500 mt-0.5 shrink-0">✦</span>
            <span>
              The focus is presence, not performance. Showing up — even briefly
              — is enough.
            </span>
          </li>
        </ul>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl text-amber-800 mb-4">
          About This Journey
        </h2>
        <p className="text-foreground/70 leading-relaxed mb-4">
          The journal spans 90 days and 13 weeks, each organized around a gentle
          theme. Every week is self-contained — you may enter from any point,
          revisit earlier weeks, or move through them in sequence. The structure
          is yours to shape.
        </p>
        <p className="text-foreground/70 leading-relaxed mb-4">
          Each daily page holds four invitations:
        </p>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="rounded-xl bg-amber-50/60 border border-amber-200/40 px-4 py-3">
            <p className="text-amber-800 font-medium text-sm mb-1">
              Art Prompt
            </p>
            <p className="text-foreground/60 text-sm leading-relaxed">
              A creative expression invitation. No skill required — the process
              matters more than the result.
            </p>
          </div>
          <div className="rounded-xl bg-amber-50/60 border border-amber-200/40 px-4 py-3">
            <p className="text-amber-800 font-medium text-sm mb-1">
              Spiritual Prompt
            </p>
            <p className="text-foreground/60 text-sm leading-relaxed">
              An awareness invitation — a moment to notice, breathe, or connect
              inward.
            </p>
          </div>
          <div className="rounded-xl bg-amber-50/60 border border-amber-200/40 px-4 py-3">
            <p className="text-amber-800 font-medium text-sm mb-1">
              Writing Prompt
            </p>
            <p className="text-foreground/60 text-sm leading-relaxed">
              An open-ended journaling question to explore your thoughts,
              feelings, or patterns.
            </p>
          </div>
          <div className="rounded-xl bg-amber-50/60 border border-amber-200/40 px-4 py-3">
            <p className="text-amber-800 font-medium text-sm mb-1">
              Gratitude Anchor
            </p>
            <p className="text-foreground/60 text-sm leading-relaxed">
              A small closing moment to notice something that nourished you
              today.
            </p>
          </div>
        </div>
        <p className="text-foreground/70 leading-relaxed">
          Optional weekly reflections and milestone check-ins at 30, 60, and 90
          days are available when you feel ready.
        </p>
      </section>

      <div className="rounded-2xl bg-amber-50/80 border border-amber-200/50 px-6 py-5">
        <p className="text-amber-800/80 text-sm leading-relaxed italic text-center">
          This space is safe, open, and free from expectation.
          <br />
          Take what serves you. Leave what does not.
          <br />
          You are already enough.
        </p>
      </div>

      <PageFooter />
    </article>
  );
}
