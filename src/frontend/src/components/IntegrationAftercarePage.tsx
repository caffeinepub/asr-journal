import { useState } from "react";
import { toast } from "sonner";

const closingRitualSteps = [
  "Light a candle or take a grounding breath.",
  "Choose one symbol from your art over the last 90 days.",
  "Re-draw it on this page as your Final Symbol of Wholeness.",
  'Place your hand over it and say: "Thank you for guiding me back to myself."',
];

const notessections = [
  {
    id: "favorite-prompts",
    title: "My Favorite Prompts from This Journey",
    hint: "List or highlight.",
    placeholder: "The prompts that stayed with me...",
  },
  {
    id: "symbols-themes",
    title: "Symbols & Themes That Showed Up",
    hint: "Free space.",
    placeholder: "I kept returning to...",
  },
  {
    id: "creative-breakthroughs",
    title: "Creative Ideas or Breakthroughs",
    hint: "Free space.",
    placeholder: "Something opened in me when...",
  },
];

const futureIntentionPrompts = [
  { id: "create", prompt: "What do you want to create next?" },
  { id: "curious", prompt: "What are you curious about?" },
  { id: "deepen", prompt: "What spiritual practice do you want to deepen?" },
];

export default function IntegrationAftercarePage() {
  const [closingLetter, setClosingLetter] = useState("");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [intentions, setIntentions] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    toast.success("Held gently ✦", {
      description: "Your reflections and intentions are held with care.",
    });
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 pb-20">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-amber-600 mb-2">
          Closing &amp; Continuing
        </p>
        <h2 className="text-4xl text-amber-900 font-light">
          Integration &amp; Aftercare
        </h2>
        <p className="text-base text-foreground/60 mt-3 leading-relaxed italic">
          Pause. Notice. Integrate. Carry forward what feels meaningful. This
          practice is cyclical — come back anytime.
        </p>
        <div className="w-12 h-px bg-amber-400 mt-4" />
      </div>

      {/* A. Closing Ritual */}
      <section className="mb-12" aria-labelledby="closing-ritual-heading">
        <h3
          id="closing-ritual-heading"
          className="text-xl text-amber-900 font-medium mb-2"
        >
          Closing Ritual
        </h3>
        <p className="text-sm italic text-foreground/55 mb-5">
          A simple guided closing ceremony.
        </p>
        <div className="bg-amber-50/50 border border-amber-100/70 rounded-2xl p-6 space-y-4">
          {closingRitualSteps.map((step, i) => (
            <div key={step} className="flex gap-4">
              <span className="shrink-0 w-7 h-7 rounded-full bg-amber-200/70 text-amber-800 text-xs flex items-center justify-center font-medium">
                {i + 1}
              </span>
              <p className="text-sm text-foreground/75 leading-relaxed pt-0.5">
                {step}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* B. Closing Letter to Self */}
      <section className="mb-12" aria-labelledby="closing-letter-heading">
        <h3
          id="closing-letter-heading"
          className="text-xl text-amber-900 font-medium mb-2"
        >
          A Closing Letter to Yourself
        </h3>
        <p className="text-sm text-foreground/60 mb-4 leading-relaxed">
          Write a heartfelt letter expressing gratitude, pride, and
          encouragement for your journey.
        </p>
        <textarea
          value={closingLetter}
          onChange={(e) => setClosingLetter(e.target.value)}
          placeholder="Dear self..."
          data-ocid="aftercare.closing_letter.textarea"
          className="w-full min-h-[220px] p-5 rounded-2xl border border-border/60 bg-white/60 text-foreground placeholder:text-muted-foreground/40 resize-y focus:outline-none focus:ring-2 focus:ring-amber-300/50 text-sm leading-relaxed"
        />
      </section>

      {/* C. Notes + Additional Pages */}
      <section className="mb-12" aria-labelledby="notes-heading">
        <h3
          id="notes-heading"
          className="text-xl text-amber-900 font-medium mb-6"
        >
          Notes + Additional Pages
        </h3>
        <div className="space-y-8">
          {notessections.map((section, i) => (
            <div key={section.id}>
              <label
                htmlFor={`notes-${section.id}`}
                className="block text-base text-amber-800 font-medium mb-1"
              >
                {section.title}
              </label>
              <p className="text-xs italic text-muted-foreground/55 mb-3">
                {section.hint}
              </p>
              <textarea
                id={`notes-${section.id}`}
                value={notes[section.id] ?? ""}
                onChange={(e) =>
                  setNotes((prev) => ({
                    ...prev,
                    [section.id]: e.target.value,
                  }))
                }
                placeholder={section.placeholder}
                data-ocid={`aftercare.notes.textarea.${i + 1}`}
                className="w-full min-h-[140px] p-4 rounded-xl border border-border/60 bg-white/60 text-foreground placeholder:text-muted-foreground/40 resize-y focus:outline-none focus:ring-2 focus:ring-amber-300/50 text-sm leading-relaxed"
              />
            </div>
          ))}

          {/* Future Intentions sub-section */}
          <div>
            <p className="block text-base text-amber-800 font-medium mb-4">
              Future Intentions
            </p>
            <div className="space-y-6">
              {futureIntentionPrompts.map((p, i) => (
                <div key={p.id}>
                  <label
                    htmlFor={`intention-${p.id}`}
                    className="block text-sm text-foreground/75 mb-2 leading-relaxed"
                  >
                    {p.prompt}
                    <span className="ml-2 text-xs italic text-muted-foreground/50">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id={`intention-${p.id}`}
                    value={intentions[p.id] ?? ""}
                    onChange={(e) =>
                      setIntentions((prev) => ({
                        ...prev,
                        [p.id]: e.target.value,
                      }))
                    }
                    placeholder="Take your time..."
                    data-ocid={`aftercare.intention.textarea.${i + 1}`}
                    className="w-full min-h-[110px] p-4 rounded-xl border border-border/60 bg-white/60 text-foreground placeholder:text-muted-foreground/40 resize-y focus:outline-none focus:ring-2 focus:ring-amber-300/50 text-sm leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Save button */}
      <div className="flex justify-center mb-10">
        <button
          type="button"
          onClick={handleSave}
          disabled={saved}
          data-ocid="aftercare.save_button"
          className="px-10 py-3 rounded-full border border-amber-400/50 text-amber-800 text-sm hover:bg-amber-50 transition-colors disabled:opacity-60"
        >
          {saved ? "Held gently ✦" : "Hold this gently"}
        </button>
      </div>

      {/* Care note */}
      <div className="text-center">
        <p className="text-sm italic text-muted-foreground/50 leading-relaxed">
          This practice is not complete because you finished. It is complete
          because you showed up.
        </p>
      </div>
    </div>
  );
}
