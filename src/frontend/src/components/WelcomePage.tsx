interface Props {
  onLogin: () => void;
}

export default function WelcomePage({ onLogin }: Props) {
  return (
    <div className="min-h-screen bg-background">
      {/* Threshold Space */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-background to-purple-50 opacity-70" />
        <div className="relative max-w-2xl mx-auto px-6 py-24 text-center">
          <p className="text-xs tracking-[0.25em] uppercase text-amber-600 mb-5 font-medium">
            A Sacred Practice for Remembering
          </p>
          <h1 className="text-5xl md:text-6xl text-amber-900 mb-5 leading-tight">
            ASR Journal
          </h1>
          <p className="text-xl text-amber-700 italic mb-8 font-light">
            Art · Spirit · Reflection
          </p>

          {/* Micro-pause: pulsing breath circle */}
          <div className="flex flex-col items-center my-10 gap-4">
            <div className="breath-circle" aria-hidden="true" />
            <p className="text-sm text-amber-700/70 italic">
              Take a breath. Let your shoulders soften.
            </p>
          </div>

          <p className="text-lg text-foreground/80 leading-relaxed mb-4 max-w-xl mx-auto">
            This is a sacred practice for remembering your authentic self.
          </p>
          <p className="text-base text-foreground/60 leading-relaxed mb-10 max-w-xl mx-auto italic">
            This space holds no expectations. You may enter fully or lightly.
            Both are welcome.
          </p>

          <button
            type="button"
            onClick={onLogin}
            data-ocid="welcome.primary_button"
            className="inline-block bg-amber-700 hover:bg-amber-800 text-amber-50 px-12 py-4 rounded-full text-lg font-medium transition-colors shadow-md hover:shadow-lg"
          >
            Enter when you're ready
          </button>
        </div>
      </div>

      {/* What this space holds */}
      <section className="max-w-3xl mx-auto px-6 py-16">
        <p className="text-xs tracking-widest uppercase text-amber-600 mb-2">
          What this space holds
        </p>
        <h2 className="text-3xl text-amber-900 mb-3">
          Art Therapy, Spirituality & Reflective Writing
        </h2>
        <div className="w-10 h-px bg-amber-400 mb-6" />
        <p className="text-foreground/70 leading-relaxed mb-8">
          Art, spirituality, and writing each offer tender ways to explore your
          inner world, express what words alone cannot hold, and return to
          yourself — again and again. Together, they create a living container
          for healing, insight, and creative awakening.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Art Therapy",
              desc: "Expression through color, line, and symbol — unlocking what lives beneath thought, without judgment or skill required.",
            },
            {
              title: "Spirituality",
              desc: "A quiet invitation toward inner peace, purpose, and the deeper current of meaning that runs through your days.",
            },
            {
              title: "Reflective Writing",
              desc: "Words as a bridge between feeling and understanding — a soft space to meet yourself honestly and with compassion.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-lg text-amber-800 mb-3">{item.title}</h3>
              <p className="text-sm text-foreground/65 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Grounding note */}
      <section className="bg-amber-50/50 py-14">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <blockquote className="text-xl italic text-amber-900 leading-relaxed mb-6">
            &ldquo;Spend as much or as little time with each as you need. The
            practice is sacred simply because you showed up.&rdquo;
          </blockquote>
          <p className="text-sm text-foreground/60 leading-relaxed">
            There are no rules here. No one is watching. You may revisit, pause,
            or arrive quietly. Every form of presence is complete.
          </p>
        </div>
      </section>

      {/* Closing invite */}
      <div className="text-center py-16 bg-gradient-to-t from-amber-50/40">
        <p className="text-foreground/50 mb-7 text-base italic">
          Your sanctuary is here whenever you're ready.
        </p>
        <button
          type="button"
          onClick={onLogin}
          data-ocid="welcome.secondary_button"
          className="inline-block bg-amber-700 hover:bg-amber-800 text-amber-50 px-10 py-4 rounded-full text-lg font-medium transition-colors shadow-md"
        >
          Enter when you're ready
        </button>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-foreground/40">
        © {new Date().getFullYear()}. Built with ♥ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          className="underline hover:text-foreground/60"
          target="_blank"
          rel="noreferrer"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
