import type { View } from "../App";
import type { NWeekData } from "../hooks/useJournalContent";
import ArtCanvas from "./ArtCanvas";
import PageFooter from "./PageFooter";

interface Props {
  weekNum: number;
  setView: (v: View) => void;
  completedDays: number[];
  weeks: NWeekData[];
}

type DayMark = "favorite" | "surprising" | null;
const BOOKMARKS_KEY = "asr_day_bookmarks";
function getBookmarks(): Record<number, DayMark> {
  try {
    return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export default function WeeklyOverview({
  weekNum,
  setView,
  completedDays,
  weeks,
}: Props) {
  const week = weeks.find((w) => w.week === weekNum);
  const bookmarks = getBookmarks();

  if (!week) return null;

  const firstDay = week.days[0].day;
  const lastDay = week.days[week.days.length - 1].day;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 pb-8">
      <div className="mb-8">
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
            Days This Week
          </p>
          <div className="grid grid-cols-7 gap-2">
            {week.days.map((d) => {
              const visited = completedDays.includes(d.day);
              const mark = bookmarks[d.day];
              return (
                <button
                  key={d.day}
                  type="button"
                  onClick={() => setView({ type: "day", day: d.day })}
                  title={
                    mark === "favorite"
                      ? "♥ Favorite"
                      : mark === "surprising"
                        ? "✨ Surprising"
                        : undefined
                  }
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center text-sm font-medium transition-colors border relative ${
                    visited
                      ? "bg-amber-100 border-amber-300 text-amber-800"
                      : "bg-card border-border text-foreground/70 hover:border-amber-400 hover:text-amber-900"
                  }`}
                >
                  {mark && (
                    <span className="absolute top-1 right-1 text-[8px] leading-none">
                      {mark === "favorite" ? "♥" : "✨"}
                    </span>
                  )}
                  <span className="text-xs opacity-60">Day</span>
                  <span>{d.day}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <PageFooter />
    </div>
  );
}
