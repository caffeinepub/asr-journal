import type { View } from "../App";

interface Props {
  setView: (v: View) => void;
}

const segment2Weeks = [
  { week: 1, theme: "Grounding & Awareness", days: "Days 1–7" },
  { week: 2, theme: "Presence & Observation", days: "Days 8–14" },
  { week: 3, theme: "Letting Go & Release", days: "Days 15–21" },
  { week: 4, theme: "Joy & Playfulness", days: "Days 22–28" },
];

const segment3Weeks = [
  { week: 5, theme: "Gratitude & Growth", days: "Days 29–35" },
  { week: 6, theme: "Compassion & Self-Love", days: "Days 36–42" },
  { week: 7, theme: "Stillness & Inner Listening", days: "Days 43–49" },
  { week: 8, theme: "Authenticity & Truth", days: "Days 50–56" },
];

const segment4Weeks = [
  { week: 9, theme: "Sacred Simplicity", days: "Days 57–63" },
  { week: 10, theme: "Energy & Movement", days: "Days 64–70" },
  { week: 11, theme: "Vision & Inner Wisdom", days: "Days 71–77" },
  { week: 12, theme: "Connection & Wholeness", days: "Days 78–84" },
  { week: 13, theme: "Integration & Embodiment", days: "Days 85–90" },
];

const milestones: { label: string; milestone: 30 | 60 | 90; day: string }[] = [
  { label: "30-Day Check-In", milestone: 30, day: "Day 30" },
  { label: "60-Day Check-In", milestone: 60, day: "Day 60" },
  { label: "90-Day Check-In", milestone: 90, day: "Day 90" },
];

function SegmentCard({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border/60 rounded-2xl p-6 shadow-sm">
      <p className="text-xs uppercase tracking-widest text-amber-500 mb-4 font-medium">
        {label}
      </p>
      {children}
    </div>
  );
}

export default function JourneyMapPage({ setView }: Props) {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10 pb-20">
      {/* Header */}
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-amber-600 mb-2">
          Your Path
        </p>
        <h2 className="text-4xl text-amber-900 font-light">
          Phased Inner Journey Map
        </h2>
        <p className="text-base text-foreground/60 mt-3 leading-relaxed italic">
          This map reflects the temporal rhythm and thematic progression of your
          90-day journey. There is no required order — enter wherever you feel
          called.
        </p>
        <div className="w-12 h-px bg-amber-400 mt-4" />
      </div>

      <div className="space-y-6">
        {/* Segment 1 — Orientation (informational) */}
        <SegmentCard label="Orientation">
          <p className="text-sm text-foreground/70 leading-relaxed mb-3">
            <span className="font-medium text-amber-800">Segment 1</span> —
            Intro + Structure
          </p>
          <div className="flex flex-wrap gap-2">
            {["Welcome", "The Overlap", "How to Use", "Daily Structure"].map(
              (item) => (
                <span
                  key={item}
                  className="px-3 py-1 rounded-full bg-amber-50 border border-amber-100 text-xs text-amber-700"
                >
                  {item}
                </span>
              ),
            )}
          </div>
        </SegmentCard>

        {/* Segment 2 — Weeks 1–4 */}
        <SegmentCard label="Weeks 1–4 — Days 1–28">
          <p className="text-sm text-foreground/70 mb-4">
            <span className="font-medium text-amber-800">Segment 2</span> —
            Weeks 1–4
          </p>
          <div className="space-y-2">
            {segment2Weeks.map((w) => (
              <button
                key={w.week}
                type="button"
                onClick={() => setView({ type: "week", week: w.week })}
                data-ocid={`journey_map.week.${w.week}`}
                className="w-full text-left flex items-center justify-between px-4 py-3 rounded-xl border border-amber-100/70 bg-amber-50/40 hover:bg-amber-100/60 hover:border-amber-300 transition-all group"
              >
                <span className="text-sm text-amber-800 group-hover:text-amber-900">
                  {w.theme}
                </span>
                <span className="text-xs text-muted-foreground/50">
                  {w.days}
                </span>
              </button>
            ))}
          </div>
        </SegmentCard>

        {/* Segment 3 — Weeks 5–8 */}
        <SegmentCard label="Weeks 5–8 — Days 29–56">
          <p className="text-sm text-foreground/70 mb-4">
            <span className="font-medium text-amber-800">Segment 3</span> —
            Weeks 5–8
          </p>
          <div className="space-y-2">
            {segment3Weeks.map((w) => (
              <button
                key={w.week}
                type="button"
                onClick={() => setView({ type: "week", week: w.week })}
                data-ocid={`journey_map.week.${w.week}`}
                className="w-full text-left flex items-center justify-between px-4 py-3 rounded-xl border border-amber-100/70 bg-amber-50/40 hover:bg-amber-100/60 hover:border-amber-300 transition-all group"
              >
                <span className="text-sm text-amber-800 group-hover:text-amber-900">
                  {w.theme}
                </span>
                <span className="text-xs text-muted-foreground/50">
                  {w.days}
                </span>
              </button>
            ))}
          </div>
        </SegmentCard>

        {/* Segment 4 — Weeks 9–13 */}
        <SegmentCard label="Weeks 9–13 — Days 57–90">
          <p className="text-sm text-foreground/70 mb-4">
            <span className="font-medium text-amber-800">Segment 4</span> —
            Weeks 9–13
          </p>
          <div className="space-y-2">
            {segment4Weeks.map((w) => (
              <button
                key={w.week}
                type="button"
                onClick={() => setView({ type: "week", week: w.week })}
                data-ocid={`journey_map.week.${w.week}`}
                className="w-full text-left flex items-center justify-between px-4 py-3 rounded-xl border border-amber-100/70 bg-amber-50/40 hover:bg-amber-100/60 hover:border-amber-300 transition-all group"
              >
                <span className="text-sm text-amber-800 group-hover:text-amber-900">
                  {w.theme}
                </span>
                <span className="text-xs text-muted-foreground/50">
                  {w.days}
                </span>
              </button>
            ))}
          </div>
        </SegmentCard>

        {/* Segment 5 — Reflective Milestones */}
        <SegmentCard label="Reflective Milestones">
          <p className="text-sm text-foreground/70 mb-4">
            <span className="font-medium text-amber-800">Segment 5</span> —
            Check-Ins + Closing
          </p>
          <div className="space-y-2">
            {milestones.map((m) => (
              <button
                key={m.milestone}
                type="button"
                onClick={() =>
                  setView({ type: "checkin", milestone: m.milestone })
                }
                data-ocid={`journey_map.checkin.${m.milestone}`}
                className="w-full text-left flex items-center justify-between px-4 py-3 rounded-xl border border-purple-100/70 bg-purple-50/30 hover:bg-purple-100/50 hover:border-purple-300 transition-all group"
              >
                <span className="text-sm text-purple-800 group-hover:text-purple-900">
                  🌙 {m.label}
                </span>
                <span className="text-xs text-muted-foreground/50">
                  {m.day}
                </span>
              </button>
            ))}
          </div>
        </SegmentCard>

        {/* Integration & Aftercare link */}
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => setView({ type: "aftercare" })}
            data-ocid="journey_map.aftercare.link"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-amber-400/50 text-amber-800 text-sm hover:bg-amber-50 transition-colors"
          >
            🌱 Integration &amp; Aftercare →
          </button>
        </div>
      </div>
    </div>
  );
}
