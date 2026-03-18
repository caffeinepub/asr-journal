interface Props {
  onReceive: () => void;
}

export default function JourneyCovenantPage({ onReceive }: Props) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-16">
      <div className="relative max-w-2xl w-full">
        {/* Decorative botanical border (CSS only) */}
        <div className="covenant-border rounded-3xl bg-card shadow-lg px-10 py-14 relative overflow-hidden">
          {/* Corner leaf accents */}
          <span
            className="absolute top-5 left-5 text-3xl opacity-30 select-none"
            aria-hidden="true"
          >
            🌿
          </span>
          <span
            className="absolute top-5 right-5 text-3xl opacity-30 select-none"
            aria-hidden="true"
          >
            🌿
          </span>
          <span
            className="absolute bottom-5 left-5 text-3xl opacity-20 select-none"
            aria-hidden="true"
          >
            ✦
          </span>
          <span
            className="absolute bottom-5 right-5 text-3xl opacity-20 select-none"
            aria-hidden="true"
          >
            ✦
          </span>

          <div className="text-center mb-8">
            <p className="text-xs tracking-[0.3em] uppercase text-amber-600 mb-3">
              Before you begin
            </p>
            <h1 className="text-3xl md:text-4xl text-amber-900 mb-3">
              Your Journey Covenant
            </h1>
            <div className="w-16 h-px bg-amber-400 mx-auto" />
          </div>

          <div className="space-y-6 text-foreground/80 leading-relaxed">
            <p className="text-lg italic text-amber-800 text-center">
              This is a space held with care. What follows is an offering, not a
              contract.
            </p>

            <div className="space-y-5">
              {[
                {
                  symbol: "✦",
                  text: "There is no right way to journey here. Your way is the right way.",
                },
                {
                  symbol: "✦",
                  text: "You may engage fully, lightly, or simply witness yourself with compassion. All are welcome.",
                },
                {
                  symbol: "✦",
                  text: "All sections, prompts, and invitations are optional. Take what serves you; leave the rest.",
                },
                {
                  symbol: "✦",
                  text: "The daily practice — art, reflection, gratitude — exists as authentic soul reminders, not tasks. There is no due date.",
                },
                {
                  symbol: "✦",
                  text: "Community sharing, if you choose it, is witnessing only. There is no evaluation here.",
                },
                {
                  symbol: "✦",
                  text: "You are invited to skip, pause, revisit, or sit quietly. This practice is complete in whatever form you bring to it.",
                },
                {
                  symbol: "✦",
                  text: "Trust yourself. Honor your pace. Return whenever you're ready.",
                },
              ].map((item) => (
                <div key={item.text} className="flex gap-4 items-start">
                  <span className="text-amber-500 mt-1 shrink-0 text-sm">
                    {item.symbol}
                  </span>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>

            {/* Verbatim Segment 1: The Overlap of Art Therapy, Spirituality & Writing */}
            <div className="border-t border-amber-200 pt-6 mt-6 bg-amber-50/40 rounded-xl px-5 py-5">
              <h2 className="text-sm tracking-[0.2em] uppercase text-amber-700 mb-3 font-medium">
                The Overlap of Art Therapy, Spirituality &amp; Writing
              </h2>
              <p className="text-sm italic text-amber-900/75 leading-relaxed mb-4">
                Art, spirituality, and writing each offer ways to explore your
                inner world, express emotions, and find meaning. Together, they
                create a space for healing, insight, and growth.
              </p>
              <ul className="space-y-2 mb-4">
                {[
                  "Engage mind, body, and spirit",
                  "Encourage self-reflection and insight",
                  "Support emotional release and healing",
                  "Foster connection to self, others, and the larger world",
                  "Promote mindfulness, calm, and presence",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 items-start text-sm text-foreground/70 leading-relaxed"
                  >
                    <span className="text-amber-400 mt-0.5 shrink-0">✦</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-amber-800/70 leading-relaxed italic">
                This integration guides personal growth, self-love, and creative
                exploration, honoring your journey with intention and heart, by
                giving you reminders of your authentic self.
              </p>
            </div>

            <div className="border-t border-amber-200 pt-6 mt-2">
              <p className="text-sm text-center text-foreground/60 italic">
                This is a sacred practice for remembering your authentic self.
                You are already whole. This journal simply invites you to
                remember.
              </p>
            </div>
          </div>

          <div className="text-center mt-10">
            <button
              type="button"
              onClick={onReceive}
              data-ocid="covenant.primary_button"
              className="bg-amber-700 hover:bg-amber-800 text-amber-50 px-10 py-4 rounded-full text-base font-medium transition-colors shadow-md hover:shadow-lg"
            >
              I receive this with an open heart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
