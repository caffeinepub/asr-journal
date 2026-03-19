import PageFooter from "./PageFooter";

export default function JourneyCovenantPage() {
  const threads = [
    {
      symbol: "✧",
      title: "Art",
      body: "Creative expression is a doorway to the parts of ourselves that language cannot always reach. Art in this journal is not about skill, technique, or producing something beautiful. It is about the act of making — of putting something outside yourself and witnessing it. The process matters far more than the result.",
    },
    {
      symbol: "✧",
      title: "Spirituality",
      body: "Spirituality here is not a religion or a doctrine. It is the quiet awareness that there is something larger than the noise of the everyday — a sense of meaning, presence, and connection. In this journal it shows up as a pause, a breath, a noticing. It is entirely personal and entirely yours.",
    },
    {
      symbol: "✧",
      title: "Writing",
      body: "Reflective writing is how we hear our own voice more clearly. It is not about grammar, elegance, or completion. It is about witnessing yourself on the page — noticing patterns, releasing what has been held, and discovering what you already know. Writing here is a conversation with yourself, not a performance for anyone else.",
    },
  ];

  const permissions = [
    "You may skip any day.",
    "You may revisit any week, any time.",
    "You may move through this journal in any order.",
    "There is no grade, no judgment, no right answer.",
    "Your pace is the right pace.",
    "Showing up — even for a single breath — is participation.",
    "This practice is yours. Shape it as you need.",
  ];

  return (
    <article
      className="max-w-2xl mx-auto px-6 py-10 pb-8"
      data-ocid="covenant.page"
    >
      <header className="mb-10">
        <p className="text-amber-600/70 text-sm tracking-widest uppercase mb-2">
          Journey Covenant
        </p>
        <h1 className="font-display text-3xl text-amber-900 leading-snug mb-4">
          The Three Threads
        </h1>
        <p className="text-foreground/75 text-lg leading-relaxed">
          This journal is built on the integration of three practices —{" "}
          <em>Art</em>, <em>Spirituality</em>, and <em>Writing</em>. Each thread
          supports the others. Together they create a space for healing,
          creativity, and self-discovery.
        </p>
      </header>

      <div className="w-12 h-px bg-amber-300/60 mb-10" aria-hidden="true" />

      <div className="space-y-8 mb-10">
        {threads.map((t) => (
          <section key={t.title}>
            <div className="flex items-center gap-3 mb-3">
              <span
                className="w-8 h-8 rounded-full bg-amber-100 border border-amber-300/60 flex items-center justify-center text-amber-700 text-sm"
                aria-hidden="true"
              >
                {t.symbol}
              </span>
              <h2 className="font-display text-xl text-amber-800">{t.title}</h2>
            </div>
            <p className="text-foreground/70 leading-relaxed">{t.body}</p>
          </section>
        ))}
      </div>

      <div className="w-12 h-px bg-amber-300/60 mb-10" aria-hidden="true" />

      <section>
        <h2 className="font-display text-xl text-amber-800 mb-5">
          The Covenant
        </h2>
        <p className="text-foreground/70 leading-relaxed mb-5">
          Before you enter the journal, a few permissions — offered freely and
          without condition:
        </p>
        <ul className="space-y-4">
          {permissions.map((item) => (
            <li key={item} className="flex gap-3 items-start">
              <span
                className="text-amber-400 mt-0.5 shrink-0 text-base"
                aria-hidden="true"
              >
                ◌
              </span>
              <span className="text-foreground/70 leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      <PageFooter />
    </article>
  );
}
