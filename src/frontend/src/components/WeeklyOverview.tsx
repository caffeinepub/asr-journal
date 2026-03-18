import { useState } from "react";
import type { View } from "../App";
import { WEEKS } from "../journalData";
import ArtCanvas from "./ArtCanvas";

interface Props {
  weekNum: number;
  setView: (v: View) => void;
  completedDays: number[];
}

const integrationPrompts = [
  {
    id: "carry-forward",
    label:
      "What are you carrying forward from this week — not as a task, but as a gift to yourself?",
  },
  {
    id: "release",
    label:
      "Is there anything from this week you'd like to release, bless, and let go?",
  },
  {
    id: "care-act",
    label:
      "One small act of care you can offer yourself as you close this week.",
  },
];

export default function WeeklyOverview({
  weekNum,
  setView,
  completedDays,
}: Props) {
  const week = WEEKS.find((w) => w.week === weekNum);
  const [integration, setIntegration] = useState<Record<string, string>>({});

  if (!week) return null;

  const firstDay = week.days[0].day;
  const lastDay = week.days[week.days.length - 1].day;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 pb-20">
      <div className="mb-8">
        {/* Exact microcopy per spec — no Week X label */}
        <p className="text-sm italic text-muted-foreground/65 mb-4 leading-relaxed">
          This week invites you into{" "}
          <span className="text-amber-700 not-italic">{week.theme}</span>. Move
          at your own pace, revisit anytime, notice without judgment.
        </p>
        <h2 className="text-4xl text-amber-900 font-light">{week.theme}</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Days {firstDay}–{lastDay}
        </p>
        <p className="text-xs italic text-muted-foreground/55 mt-2">
          You may revisit, pause, or skip days. All is welcome.
        </p>
        <div className="w-12 h-px bg-amber-400 mt-3" />
      </div>

      <div className="space-y-8">
        <div className="bg-amber-50/60 rounded-2xl p-6">
          <p className="text-xs uppercase tracking-widest text-amber-600 mb-2">
            Weekly Intention
          </p>
          <p className="text-lg text-amber-900 leading-relaxed">
            {week.intention}
          </p>
        </div>

        <blockquote className="border-l-4 border-amber-400 pl-6 py-2">
          <p className="text-xl italic text-amber-800 leading-relaxed">
            &ldquo;{week.quote}&rdquo;
          </p>
        </blockquote>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-amber-600">
            Mini Mandala / Symbol Space
          </p>
          <p className="text-sm text-muted-foreground italic">
            {week.mandalaHint}
          </p>
          <ArtCanvas />
        </div>

        <div className="space-y-4">
          <p className="text-xs uppercase tracking-widest text-amber-600">
            Weekly Reflection Invitations
          </p>
          <p className="text-xs italic text-muted-foreground/50">
            (optional — sit with whatever feels alive)
          </p>
          <ul className="space-y-3">
            {week.reflectionQuestions.map((q) => (
              <li key={q} className="flex gap-3">
                <span className="text-amber-400 mt-1 shrink-0">✦</span>
                <p className="text-foreground/80 leading-relaxed pt-0.5">{q}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <p className="text-xs uppercase tracking-widest text-amber-600">
            Days This Week
          </p>
          <div className="grid grid-cols-7 gap-2">
            {week.days.map((d) => {
              const visited = completedDays.includes(d.day);
              return (
                <button
                  key={d.day}
                  type="button"
                  onClick={() => setView({ type: "day", day: d.day })}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-colors border ${
                    visited
                      ? "bg-amber-100 border-amber-300 text-amber-800"
                      : "bg-card border-border text-foreground/70 hover:border-amber-400 hover:text-amber-900"
                  }`}
                >
                  <span className="text-xs opacity-60">Day</span>
                  <span>{d.day}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Integration & Aftercare */}
        <div className="rounded-2xl bg-sage-tint border border-sage-border p-6 space-y-5">
          <div>
            <p className="text-xs uppercase tracking-widest text-sage-text mb-1">
              Closing this Week with Gentleness
            </p>
            <p className="text-sm italic text-sage-text/70 mb-1">
              Pause. Notice. Integrate. Carry forward what feels meaningful.
            </p>
            <p className="text-xs italic text-muted-foreground/45">
              This practice is cyclical — come back anytime.
            </p>
          </div>
          <div className="space-y-4">
            {integrationPrompts.map((prompt, i) => (
              <div key={prompt.id} className="space-y-2">
                <label
                  htmlFor={`integration-${prompt.id}`}
                  className="text-sm text-sage-text/80 leading-relaxed block"
                >
                  {prompt.label}
                </label>
                <textarea
                  id={`integration-${prompt.id}`}
                  value={integration[prompt.id] ?? ""}
                  onChange={(e) => {
                    setIntegration((prev) => ({
                      ...prev,
                      [prompt.id]: e.target.value,
                    }));
                  }}
                  placeholder="Take your time..."
                  data-ocid={`weekly.integration.textarea.${i + 1}`}
                  className="w-full min-h-[90px] p-3 rounded-xl border border-sage-border bg-white/60 text-foreground placeholder:text-muted-foreground/50 resize-y focus:outline-none focus:ring-2 focus:ring-sage-ring text-sm leading-relaxed"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
