import { motion } from "motion/react";

interface Props {
  onLogin: () => void;
}

export default function WelcomePage({ onLogin }: Props) {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero / Threshold Space */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-background to-sage-50 opacity-80" />
        <div className="relative max-w-2xl mx-auto px-6 py-20 text-center">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs tracking-[0.25em] uppercase text-amber-600 mb-4 font-medium"
          >
            A Sacred Practice for Remembering
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-4xl md:text-5xl text-amber-900 mb-4 leading-tight font-light"
          >
            ASR Journal —{" "}
            <span className="block text-2xl md:text-3xl mt-1 text-amber-700">
              90-Day Soul Reminder Journey
            </span>
          </motion.h1>

          {/* Exact microcopy from spec */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="space-y-2 mb-6"
          >
            <p className="text-base text-foreground/75 leading-relaxed">
              Welcome. This is your sacred space for noticing your authentic
              self.
            </p>
            <p className="text-sm text-foreground/60 leading-relaxed italic">
              All weeks are open — enter wherever you feel called.
            </p>
            <p className="text-sm text-foreground/55 leading-relaxed italic">
              There is no right way, and no pressure to finish anything.
            </p>

            {/* Verbatim Welcome paragraph from Segment 1 */}
            <p className="text-sm text-foreground/65 leading-relaxed mt-4">
              The ASR Journal is a 90-day guided experience blending art
              therapy, spiritual awareness, and reflective writing to support
              emotional healing, personal growth, and creative awakening. This
              journal is designed to help you build a daily habit of creativity
              and mindfulness through structured, meaningful prompts. You will
              move through 13 weekly themes, each deepening a different layer of
              awareness, transformation, and embodiment.
            </p>
          </motion.div>

          {/* Breathing circle */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="flex flex-col items-center my-10 gap-4"
          >
            <div className="breath-circle" aria-hidden="true" />
            <p className="text-sm text-amber-700/65 italic">
              Take a moment. Ground yourself.
            </p>
            <p className="text-xs text-foreground/45 italic">
              This is your space — safe, open, and free from expectation.
            </p>
          </motion.div>

          {/* Three CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col items-center gap-3"
          >
            <button
              type="button"
              onClick={onLogin}
              data-ocid="welcome.primary_button"
              className="inline-block bg-amber-700 hover:bg-amber-800 text-amber-50 px-12 py-4 rounded-full text-base font-medium transition-colors shadow-md hover:shadow-lg"
            >
              Enter Journal
            </button>
            <button
              type="button"
              onClick={onLogin}
              data-ocid="welcome.secondary_button"
              className="inline-block border border-amber-400/60 text-amber-800 hover:bg-amber-50 px-10 py-3 rounded-full text-sm transition-colors"
            >
              Community Witness{" "}
              <span className="text-amber-600/70 text-xs italic">
                (optional)
              </span>
            </button>
            <button
              type="button"
              onClick={onLogin}
              data-ocid="welcome.archive_button"
              className="text-sm text-amber-700/70 hover:text-amber-900 underline underline-offset-4 decoration-dotted transition-colors py-1"
            >
              Archive &amp; Return
            </button>
          </motion.div>
        </div>
      </div>

      {/* Journey Covenant Preview */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-sage-50/60 via-amber-50/30 to-purple-50/40" />
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <p className="text-xs tracking-widest uppercase text-amber-600/70 mb-4">
            Journey Covenant
          </p>
          <blockquote className="text-lg italic text-amber-900/80 leading-relaxed mb-4">
            &ldquo;This space is not designed for performance.
            <br />
            You may skip, pause, or return at any time.
            <br />
            Through daily practice — art, reflection, gratitude — you gently
            reconnect with your authentic self.&rdquo;
          </blockquote>
          <p className="text-sm text-foreground/50 italic">
            All participation here is an act of presence, not performance.
          </p>
        </div>
      </section>

      {/* What this space holds */}
      <section className="max-w-3xl mx-auto px-6 py-14">
        <p className="text-xs tracking-widest uppercase text-amber-600 mb-2">
          What this space holds
        </p>
        <h2 className="text-3xl text-amber-900 mb-3 font-light">
          Art Therapy, Spirituality &amp; Writing
        </h2>
        <div className="w-10 h-px bg-amber-400 mb-6" />
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Art Therapy",
              desc: "Art Therapy lets you express feelings through drawing, painting, or coloring, unlocking intuition and emotional release.",
            },
            {
              title: "Spirituality",
              desc: "Spirituality connects you to something greater—inner peace, purpose, or universal energy—bringing grounding and meaning.",
            },
            {
              title: "Writing",
              desc: "Writing helps you articulate thoughts, process experiences, and clarify emotions, blending reflection with intuition.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-card border border-border rounded-2xl p-6 shadow-sm"
            >
              <h3 className="text-base text-amber-800 mb-2">{item.title}</h3>
              <p className="text-sm text-foreground/60 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* How to Use This Journal — verbatim from Segment 1 */}
        <div className="mt-10 bg-amber-50/60 border border-amber-200/60 rounded-2xl p-7">
          <h3 className="text-base text-amber-800 mb-4 font-medium tracking-wide">
            How to Use This Journal
          </h3>
          <ul className="space-y-2">
            {[
              "Daily — Reflect on the guided daily spiritual focus.",
              "Respond visually, symbolically, or abstractly in the art box.",
              "Journal freely using the writing prompt.",
              "End with one meaningful note of gratitude.",
              "Weekly theme, intentions, and bonus reflection questions.",
              "Every 30 days, complete a reflective spread — designed to capture insights, resistance, or inner shifts.",
              "Spend as much or as little time with each as you need.",
              "The practice is sacred simply because you showed up.",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-3 items-start text-sm text-foreground/65 leading-relaxed"
              >
                <span className="text-amber-500 mt-0.5 shrink-0">✦</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Closing invite */}
      <div className="text-center py-14 bg-gradient-to-t from-amber-50/50">
        <p className="text-foreground/45 mb-6 text-sm italic">
          Your sanctuary is here whenever you're ready.
        </p>
        <button
          type="button"
          onClick={onLogin}
          data-ocid="welcome.bottom_button"
          className="inline-block bg-amber-700 hover:bg-amber-800 text-amber-50 px-10 py-4 rounded-full text-base font-medium transition-colors shadow-md"
        >
          Enter when you're ready
        </button>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-xs text-foreground/35">
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
