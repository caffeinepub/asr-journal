import { useState } from "react";
import type { View } from "../App";
import type { NWeekData } from "../hooks/useJournalContent";

interface Props {
  view: View;
  setView: (v: View) => void;
  completedDays: number[];
  weeks: NWeekData[];
}

export default function Sidebar({
  view,
  setView,
  completedDays,
  weeks,
}: Props) {
  const [expandedWeek, setExpandedWeek] = useState<number | null>(() => {
    if (view.type === "day") {
      for (const w of weeks) {
        if (
          w.days.some(
            (d) => d.day === (view as { type: "day"; day: number }).day,
          )
        )
          return w.week;
      }
    }
    if (view.type === "week")
      return (view as { type: "week"; week: number }).week;
    if (view.type === "week-reflection")
      return (view as { type: "week-reflection"; week: number }).week;
    return null;
  });
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <aside className="w-12 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4 gap-4">
        <button
          type="button"
          onClick={() => setCollapsed(false)}
          className="text-amber-700 hover:text-amber-900"
          title="Expand sidebar"
          aria-label="Expand sidebar"
          data-ocid="sidebar.toggle"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M8 4l6 6-6 6" />
          </svg>
        </button>
      </aside>
    );
  }

  return (
    <aside className="w-72 bg-sidebar border-r border-sidebar-border flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-6 pb-4 border-b border-sidebar-border flex items-center justify-between">
        <div>
          <h1 className="text-xl text-amber-900">ASR Journal</h1>
          <p className="text-xs text-muted-foreground mt-1">
            90-Day Soul Reminder Journey
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCollapsed(true)}
          className="text-muted-foreground hover:text-foreground"
          aria-label="Collapse sidebar"
          data-ocid="sidebar.toggle"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M12 4l-6 6 6 6" />
          </svg>
        </button>
      </div>

      {/* Gentle presence note */}
      <div className="px-5 py-2.5 border-b border-sidebar-border">
        <p className="text-xs text-muted-foreground/50 italic">
          Your journey is your own.
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        {/* Top links: Threshold + Covenant */}
        <div className="space-y-0.5 mb-3">
          <button
            type="button"
            onClick={() => setView({ type: "threshold" })}
            data-ocid="sidebar.threshold.link"
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              view.type === "threshold"
                ? "bg-amber-100 text-amber-900 font-semibold"
                : "text-foreground/70 hover:bg-muted hover:text-foreground"
            }`}
          >
            <span aria-hidden="true">🌿</span>
            Threshold Space
          </button>
          <button
            type="button"
            onClick={() => setView({ type: "covenant" })}
            data-ocid="sidebar.covenant.link"
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              view.type === "covenant"
                ? "bg-amber-100 text-amber-900 font-semibold"
                : "text-foreground/70 hover:bg-muted hover:text-foreground"
            }`}
          >
            <span aria-hidden="true">📜</span>
            Journey Covenant
          </button>
        </div>

        {/* Weekly Themes label */}
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground/50 font-medium px-2 pb-2 pt-1">
          Weekly Themes
        </p>

        {/* Weekly tree */}
        <div className="space-y-0.5">
          {weeks.map((week) => {
            const isExpanded = expandedWeek === week.week;
            const isWeekActive =
              view.type === "week" &&
              (view as { type: "week"; week: number }).week === week.week;

            return (
              <div key={week.week}>
                <button
                  type="button"
                  onClick={() => {
                    setExpandedWeek(isExpanded ? null : week.week);
                    setView({ type: "week", week: week.week });
                  }}
                  data-ocid={`sidebar.item.${week.week}`}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                    isWeekActive
                      ? "bg-amber-100 text-amber-900 font-semibold"
                      : "text-foreground/70 hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span className="text-left truncate">{week.theme}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                    className={`shrink-0 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                  >
                    <path d="M8 4l6 6-6 6" />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="ml-3 mt-0.5 space-y-0.5">
                    {/* Day buttons */}
                    {week.days.map((d) => {
                      const visited = completedDays.includes(d.day);
                      const active =
                        view.type === "day" &&
                        (view as { type: "day"; day: number }).day === d.day;
                      return (
                        <button
                          key={d.day}
                          type="button"
                          onClick={() => setView({ type: "day", day: d.day })}
                          className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors ${
                            active
                              ? "bg-amber-200 text-amber-900 font-medium"
                              : "text-foreground/60 hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <span
                            className={`w-2.5 h-2.5 rounded-full border shrink-0 ${
                              visited
                                ? "bg-amber-400/60 border-amber-400"
                                : "border-muted-foreground/30"
                            }`}
                          />
                          Day {d.day}
                        </button>
                      );
                    })}

                    {/* Week Reflection link */}
                    <button
                      type="button"
                      onClick={() =>
                        setView({ type: "week-reflection", week: week.week })
                      }
                      data-ocid="sidebar.week_reflection.link"
                      className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors mt-1 ${
                        view.type === "week-reflection" &&
                        (view as { type: "week-reflection"; week: number })
                          .week === week.week
                          ? "bg-purple-100 text-purple-900 font-medium"
                          : "text-purple-700/65 hover:bg-purple-50 hover:text-purple-900"
                      }`}
                    >
                      <span aria-hidden="true">✦</span>
                      Week Reflection
                    </button>

                    {/* Milestone check-ins */}
                    {week.week === 5 && (
                      <button
                        type="button"
                        onClick={() =>
                          setView({ type: "checkin", milestone: 30 })
                        }
                        data-ocid="sidebar.checkin_30.link"
                        className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors mt-0.5 ${
                          view.type === "checkin" &&
                          (view as { type: "checkin"; milestone: number })
                            .milestone === 30
                            ? "bg-purple-100 text-purple-900 font-medium"
                            : "text-purple-700/50 hover:bg-purple-50 hover:text-purple-900"
                        }`}
                      >
                        <span aria-hidden="true">🌙</span>
                        30-Day Reflection
                      </button>
                    )}
                    {week.week === 9 && (
                      <button
                        type="button"
                        onClick={() =>
                          setView({ type: "checkin", milestone: 60 })
                        }
                        data-ocid="sidebar.checkin_60.link"
                        className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors mt-0.5 ${
                          view.type === "checkin" &&
                          (view as { type: "checkin"; milestone: number })
                            .milestone === 60
                            ? "bg-purple-100 text-purple-900 font-medium"
                            : "text-purple-700/50 hover:bg-purple-50 hover:text-purple-900"
                        }`}
                      >
                        <span aria-hidden="true">🌙</span>
                        60-Day Reflection
                      </button>
                    )}
                    {week.week === 13 && (
                      <button
                        type="button"
                        onClick={() =>
                          setView({ type: "checkin", milestone: 90 })
                        }
                        data-ocid="sidebar.checkin_90.link"
                        className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors mt-0.5 ${
                          view.type === "checkin" &&
                          (view as { type: "checkin"; milestone: number })
                            .milestone === 90
                            ? "bg-purple-100 text-purple-900 font-medium"
                            : "text-purple-700/50 hover:bg-purple-50 hover:text-purple-900"
                        }`}
                      >
                        <span aria-hidden="true">🌙</span>
                        90-Day Reflection
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Bottom nav links */}
      <div className="px-3 py-3 border-t border-sidebar-border/50 space-y-0.5">
        <button
          type="button"
          onClick={() => setView({ type: "guidance" })}
          data-ocid="sidebar.guidance.link"
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
            view.type === "guidance"
              ? "bg-amber-100 text-amber-900 font-medium"
              : "text-foreground/60 hover:bg-muted hover:text-foreground"
          }`}
        >
          <span aria-hidden="true">📖</span>Core Guidance Library
        </button>

        <div>
          <button
            type="button"
            onClick={() => setView({ type: "identity" })}
            data-ocid="sidebar.identity.link"
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              view.type === "identity"
                ? "bg-amber-100 text-amber-900 font-medium"
                : "text-foreground/60 hover:bg-muted hover:text-foreground"
            }`}
          >
            <span aria-hidden="true">🔮</span>Identity Tracking
          </button>
          <p className="text-xs italic text-muted-foreground/40 pl-9 -mt-0.5 pb-0.5">
            optional
          </p>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setView({ type: "community" })}
            data-ocid="sidebar.community.link"
            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
              view.type === "community"
                ? "bg-amber-100 text-amber-900 font-medium"
                : "text-foreground/60 hover:bg-muted hover:text-foreground"
            }`}
          >
            <span aria-hidden="true">🕊️</span>Community Witness
          </button>
          <p className="text-xs italic text-muted-foreground/40 pl-9 -mt-0.5 pb-0.5">
            optional
          </p>
        </div>

        <button
          type="button"
          onClick={() => setView({ type: "aftercare" })}
          data-ocid="sidebar.aftercare.link"
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
            view.type === "aftercare"
              ? "bg-amber-100 text-amber-900 font-medium"
              : "text-foreground/60 hover:bg-muted hover:text-foreground"
          }`}
        >
          <span aria-hidden="true">🌱</span>Integration &amp; Aftercare
        </button>

        <button
          type="button"
          onClick={() => setView({ type: "archive" })}
          data-ocid="sidebar.archive.link"
          className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
            view.type === "archive"
              ? "bg-amber-100 text-amber-900 font-medium"
              : "text-foreground/60 hover:bg-muted hover:text-foreground"
          }`}
        >
          <span aria-hidden="true">🌀</span>Archive &amp; Return
        </button>
      </div>
    </aside>
  );
}
