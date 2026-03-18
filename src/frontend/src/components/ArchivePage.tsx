import type { View } from "../App";
import { WEEKS } from "../journalData";

interface Props {
  setView: (v: View) => void;
  completedDays: number[];
}

export default function ArchivePage({ setView, completedDays }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 pb-20">
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-amber-600 mb-2">
          Your Living Archive
        </p>
        <h2 className="text-4xl text-amber-900 font-light">
          Return &amp; Revisit
        </h2>
        <p className="text-base text-foreground/65 mt-3 leading-relaxed italic">
          Return anytime — all reflections, art, and prompts remain yours.
        </p>
        <div className="w-12 h-px bg-amber-400 mt-4" />
      </div>

      {/* Segment 5 return language — care note card */}
      <div className="bg-amber-50/50 border border-amber-100/70 rounded-2xl p-5 mb-8">
        <p className="text-sm italic text-amber-800/75 leading-relaxed mb-2">
          Your practice is cyclical and ongoing. Come back anytime — all
          reflections, art, and prompts remain yours.
        </p>
        <p className="text-sm italic text-amber-800/60 leading-relaxed">
          Each week is its own complete world. You may enter anywhere, anytime.
        </p>
      </div>

      <p className="text-sm italic text-muted-foreground/55 mb-8 leading-relaxed">
        Your journey is cyclical, not linear. Every return is a new beginning.
      </p>

      <div className="grid sm:grid-cols-2 gap-4">
        {WEEKS.map((week) => {
          const visitedInWeek = week.days.filter((d) =>
            completedDays.includes(d.day),
          ).length;
          const hasVisited = visitedInWeek > 0;

          return (
            <button
              key={week.week}
              type="button"
              onClick={() => setView({ type: "week", week: week.week })}
              data-ocid={`archive.item.${week.week}`}
              className="text-left bg-card border border-border rounded-2xl p-5 shadow-sm hover:border-amber-300 hover:shadow-md transition-all group"
            >
              {hasVisited && (
                <span className="text-xs italic text-amber-600/70 block mb-1">
                  visited
                </span>
              )}
              <h3 className="text-base text-amber-800 group-hover:text-amber-900 transition-colors mb-2">
                {week.theme}
              </h3>
              <p className="text-xs text-foreground/50 leading-relaxed line-clamp-2">
                {week.intention}
              </p>
              {hasVisited && (
                <div className="mt-3 flex gap-1">
                  {week.days.map((d) => (
                    <div
                      key={d.day}
                      className={`w-2 h-2 rounded-full ${
                        completedDays.includes(d.day)
                          ? "bg-amber-400/70"
                          : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-12 text-center space-y-4">
        <p className="text-sm italic text-muted-foreground/45">
          Each week is its own complete world. You may enter anywhere, anytime.
        </p>
        <button
          type="button"
          onClick={() => setView({ type: "aftercare" })}
          data-ocid="archive.aftercare.link"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-amber-400/50 text-amber-800 text-sm hover:bg-amber-50 transition-colors"
        >
          🌱 Visit Integration &amp; Aftercare →
        </button>
      </div>
    </div>
  );
}
