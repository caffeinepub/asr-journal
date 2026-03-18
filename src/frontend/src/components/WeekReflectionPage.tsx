import { motion } from "motion/react";
import { useState } from "react";
import type { View } from "../App";
import type { NWeekData } from "../hooks/useJournalContent";
import ArtCanvas from "./ArtCanvas";

interface Props {
  weekNum: number;
  weeks: NWeekData[];
  setView: (v: View) => void;
}

const milestoneMap: Record<number, { label: string; milestone: 30 | 60 | 90 }> =
  {
    5: { label: "30-Day Milestone Reflection", milestone: 30 },
    9: { label: "60-Day Milestone Reflection", milestone: 60 },
    13: { label: "90-Day Milestone Reflection", milestone: 90 },
  };

const reflectionPrompts = [
  "What insight or feeling emerged most strongly this week?",
  "What would you like to carry forward from this week — as a gift to yourself?",
  "Is there anything you are ready to release, bless, and let go?",
];

export default function WeekReflectionPage({ weekNum, weeks, setView }: Props) {
  const week = weeks.find((w) => w.week === weekNum);
  const [responses, setResponses] = useState<string[]>(["", "", ""]);

  const milestone = milestoneMap[weekNum];

  const updateResponse = (idx: number, val: string) => {
    setResponses((prev) => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
          data-ocid="week_reflection.section"
        >
          <p className="text-xs tracking-[0.25em] uppercase text-amber-600/70 mb-2">
            Week {weekNum} Reflection
          </p>
          {week && (
            <h1 className="text-3xl text-amber-900 mb-3 font-light">
              {week.theme}
            </h1>
          )}
          <div className="w-10 h-px bg-sage-border mx-auto mb-4" />
          <p className="text-base text-foreground/70 italic leading-relaxed">
            Pause. Notice. Integrate. Carry forward what feels meaningful.
          </p>
          <p className="text-sm text-foreground/50 italic mt-2">
            This practice is cyclical — come back anytime.
          </p>
        </motion.div>

        {/* Milestone callout */}
        {milestone && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-8 text-center"
            data-ocid="week_reflection.card"
          >
            <p className="text-xs tracking-widest uppercase text-amber-600/70 mb-2">
              ✦ Milestone
            </p>
            <h2 className="text-xl text-amber-900 mb-3">{milestone.label}</h2>
            <p className="text-sm text-foreground/60 mb-4 leading-relaxed">
              You have moved through {milestone.milestone} days of this journey.
              Take a moment to honor how far you have come.
            </p>
            <button
              type="button"
              onClick={() =>
                setView({ type: "checkin", milestone: milestone.milestone })
              }
              data-ocid="week_reflection.primary_button"
              className="inline-block bg-amber-700 hover:bg-amber-800 text-amber-50 px-8 py-3 rounded-full text-sm font-medium transition-colors shadow-sm"
            >
              Open {milestone.milestone}-Day Reflection
            </button>
          </motion.div>
        )}

        {/* Closing Reflection section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="mb-10"
        >
          <h2 className="text-lg text-amber-800 mb-1 font-medium">
            Closing Reflection Invitations
          </h2>
          <p className="text-xs text-foreground/45 italic mb-6">
            There is no right answer. Show up however feels authentic. Skip or
            pause if needed.
          </p>

          <div className="space-y-6">
            {reflectionPrompts.map((prompt, idx) => (
              <div key={prompt} className="space-y-2">
                <label
                  htmlFor={`reflection-${idx}`}
                  className="block text-sm text-foreground/70 leading-relaxed"
                >
                  {prompt}
                </label>
                <textarea
                  id={`reflection-${idx}`}
                  value={responses[idx]}
                  onChange={(e) => updateResponse(idx, e.target.value)}
                  rows={4}
                  placeholder="Write freely, or simply sit with the question…"
                  data-ocid="week_reflection.textarea"
                  className="w-full rounded-xl border border-sage-border bg-sage-tint/40 px-4 py-3 text-sm text-foreground/80 placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-sage-ring resize-none leading-relaxed"
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* Art canvas */}
        <motion.section
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mb-10"
          data-ocid="week_reflection.canvas_target"
        >
          <h2 className="text-lg text-amber-800 mb-1 font-medium">
            A Symbolic Closing Gesture
          </h2>
          <p className="text-xs text-foreground/45 italic mb-4">
            Use this space for a drawing, mark, or image that feels true to this
            week.
          </p>
          <ArtCanvas />
        </motion.section>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.65 }}
          className="flex flex-col items-center gap-3 pt-4 border-t border-border"
        >
          {weekNum < 13 && (
            <button
              type="button"
              onClick={() => setView({ type: "week", week: weekNum + 1 })}
              data-ocid="week_reflection.secondary_button"
              className="inline-block border border-amber-400/60 text-amber-800 hover:bg-amber-50 px-8 py-3 rounded-full text-sm transition-colors"
            >
              Continue to Week {weekNum + 1}
            </button>
          )}
          {weekNum === 13 && (
            <button
              type="button"
              onClick={() => setView({ type: "aftercare" })}
              data-ocid="week_reflection.secondary_button"
              className="inline-block border border-amber-400/60 text-amber-800 hover:bg-amber-50 px-8 py-3 rounded-full text-sm transition-colors"
            >
              Integration &amp; Aftercare
            </button>
          )}
          <p className="text-xs text-foreground/35 italic">
            Return anytime — all reflections remain yours.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
