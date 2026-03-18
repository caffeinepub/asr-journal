import { useState } from "react";
import { toast } from "sonner";
import type { View } from "../App";

interface Props {
  setView: (v: View) => void;
}

const soulPrompts = [
  { id: "remembering", label: "Who am I remembering today?" },
  { id: "patterns", label: "What patterns am I beginning to notice?" },
  { id: "softened", label: "What has softened in me recently?" },
  { id: "asking", label: "What is my authentic self asking for?" },
];

const reflectionSeeds = [
  "You are not behind. You are exactly where you need to be.",
  "Noticing is enough. You don't have to fix anything.",
  "Your authentic self has been here all along.",
  "Small acts of presence are the whole practice.",
  "Rest is not the absence of practice — it is practice.",
  "You came back. That is everything.",
  "Gentleness is the path, not just the destination.",
];

export default function IdentityTrackingPage({ setView }: Props) {
  const [responses, setResponses] = useState<Record<string, string>>({});
  const [selfTrackingNotes, setSelfTrackingNotes] = useState("");
  const [saved, setSaved] = useState(false);

  const handleHold = () => {
    setSaved(true);
    toast.success("Held gently ✦", {
      description: "Your reflections are yours — no grading, only noticing.",
    });
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 pb-20">
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-amber-600 mb-2">
          Optional · Identity Tracking
        </p>
        <h2 className="text-4xl text-amber-900 font-light">
          Identity Tracking
        </h2>
        <p className="text-base text-foreground/60 mt-3 leading-relaxed italic">
          Observe shifts in your authentic self. There is no grading, only
          noticing.
        </p>
        <div className="w-12 h-px bg-amber-400 mt-4" />
      </div>

      <div className="bg-amber-50/40 border border-amber-100/70 rounded-2xl p-5 mb-10">
        <p className="text-sm italic text-amber-800/75 leading-relaxed">
          This space is entirely optional. It exists for your own noticing, not
          for measurement. Nothing here will be evaluated, scored, or compared.
        </p>
      </div>

      {/* Segment 5 — Reflective Milestones quick access */}
      <div className="bg-purple-50/40 border border-purple-100/60 rounded-2xl p-5 mb-10">
        <p className="text-sm font-medium text-purple-800 mb-1">
          Segment 5 — Reflective Milestones
        </p>
        <p className="text-xs italic text-purple-700/60 mb-4">
          Your 30, 60, and 90-day reflections are mapped here. Access them
          anytime.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setView({ type: "checkin", milestone: 30 })}
            data-ocid="identity.checkin_30.button"
            className="px-4 py-2 rounded-full border border-purple-300/60 text-purple-800 text-xs hover:bg-purple-100/50 transition-colors"
          >
            30-Day Reflection
          </button>
          <button
            type="button"
            onClick={() => setView({ type: "checkin", milestone: 60 })}
            data-ocid="identity.checkin_60.button"
            className="px-4 py-2 rounded-full border border-purple-300/60 text-purple-800 text-xs hover:bg-purple-100/50 transition-colors"
          >
            60-Day Reflection
          </button>
          <button
            type="button"
            onClick={() => setView({ type: "checkin", milestone: 90 })}
            data-ocid="identity.checkin_90.button"
            className="px-4 py-2 rounded-full border border-purple-300/60 text-purple-800 text-xs hover:bg-purple-100/50 transition-colors"
          >
            90-Day Reflection
          </button>
        </div>
      </div>

      {/* Soul reminder prompts */}
      <div className="space-y-6 mb-12">
        {soulPrompts.map((prompt, i) => (
          <div key={prompt.id} className="space-y-2">
            <label
              htmlFor={`soul-${prompt.id}`}
              className="text-sm text-foreground/75 leading-relaxed block"
            >
              {prompt.label}
              <span className="ml-2 text-xs italic text-muted-foreground/50">
                (optional)
              </span>
            </label>
            <textarea
              id={`soul-${prompt.id}`}
              value={responses[prompt.id] ?? ""}
              onChange={(e) =>
                setResponses((prev) => ({
                  ...prev,
                  [prompt.id]: e.target.value,
                }))
              }
              placeholder="Sit with this for a moment..."
              data-ocid={`identity.textarea.${i + 1}`}
              className="w-full min-h-[100px] p-4 rounded-xl border border-border/60 bg-white/60 text-foreground placeholder:text-muted-foreground/40 resize-y focus:outline-none focus:ring-2 focus:ring-amber-300/50 text-sm leading-relaxed"
            />
          </div>
        ))}
      </div>

      {/* Gentle hold button */}
      <div className="flex justify-center mb-14">
        <button
          type="button"
          onClick={handleHold}
          data-ocid="identity.save_button"
          disabled={saved}
          className="px-10 py-3 rounded-full border border-amber-400/50 text-amber-800 text-sm hover:bg-amber-50 transition-colors disabled:opacity-60"
        >
          {saved ? "Held gently ✦" : "Hold this gently"}
        </button>
      </div>

      {/* Reflection Seeds */}
      <div className="space-y-4 mb-14">
        <p className="text-xs uppercase tracking-widest text-amber-600 mb-1">
          Reflection Seeds
        </p>
        <p className="text-xs italic text-muted-foreground/50 mb-4">
          Gentle reminders — no response needed.
        </p>
        <div className="grid gap-3">
          {reflectionSeeds.map((seed) => (
            <div
              key={seed}
              className="bg-gradient-to-br from-amber-50/60 to-sage-50/40 border border-amber-100/50 rounded-xl p-4"
            >
              <p className="text-sm italic text-amber-900/70 leading-relaxed text-center">
                ✦ {seed}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Notes — Self-Tracking Space */}
      <section aria-labelledby="self-tracking-notes-heading">
        <h3
          id="self-tracking-notes-heading"
          className="text-xl text-amber-900 font-medium mb-2"
        >
          Notes — Self-Tracking Space
        </h3>
        <p className="text-sm italic text-muted-foreground/55 mb-4">
          A place to notice patterns, shifts, and what&apos;s becoming clear.
        </p>
        <textarea
          value={selfTrackingNotes}
          onChange={(e) => setSelfTrackingNotes(e.target.value)}
          placeholder="This space is for noticing, not measuring..."
          data-ocid="identity.notes.textarea"
          className="w-full min-h-[180px] p-5 rounded-2xl border border-border/60 bg-white/60 text-foreground placeholder:text-muted-foreground/40 resize-y focus:outline-none focus:ring-2 focus:ring-amber-300/50 text-sm leading-relaxed"
        />
      </section>

      <div className="mt-14 text-center">
        <p className="text-sm italic text-muted-foreground/40">
          Who am I remembering today? You are the answer.
        </p>
      </div>
    </div>
  );
}
