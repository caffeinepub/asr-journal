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
    return 1;
  });
  const [collapsed, setCollapsed] = useState(false);

  const visitedCount = completedDays.length;

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
      <div className="px-5 py-3 border-b border-sidebar-border">
        <p className="text-xs text-muted-foreground/60 italic">
          {visitedCount} {visitedCount === 1 ? "day" : "days"} visited
        </p>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3">
        <p className="text-xs italic text-muted-foreground/60 px-2 pb-3 leading-relaxed">
          All weeks are open. Enter wherever you feel called.
        </p>
        <div className="space-y-1">
          {weeks.map((week) => {
            const isExpanded = expandedWeek === week.week;

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
                    view.type === "week" && view.week === week.week
                      ? "bg-amber-100 text-amber-900 font-semibold"
                      : "text-foreground/70 hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span className="text-left">{week.theme}</span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 20 20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    aria-hidden="true"
                    className={`shrink-0 transition-transform ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  >
                    <path d="M8 4l6 6-6 6" />
                  </svg>
                </button>

                {isExpanded && (
                  <div className="ml-3 mt-1 space-y-0.5">
                    {week.days.map((d) => {
                      const visited = completedDays.includes(d.day);
                      const active = view.type === "day" && view.day === d.day;
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
                            className={`w-3 h-3 rounded-full border shrink-0 ${
                              visited
                                ? "bg-amber-400/60 border-amber-400"
                                : "border-muted-foreground/30"
                            }`}
                          />
                          Day {d.day}
                        </button>
                      );
                    })}

                    {week.week === 5 && (
                      <button
                        type="button"
                        onClick={() =>
                          setView({ type: "checkin", milestone: 30 })
                        }
                        className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors mt-1 ${
                          view.type === "checkin" && view.milestone === 30
                            ? "bg-purple-100 text-purple-900 font-medium"
                            : "text-purple-700/70 hover:bg-purple-50 hover:text-purple-900"
                        }`}
                      >
                        🌙 30-Day Reflection
                      </button>
                    )}
                    {week.week === 9 && (
                      <button
                        type="button"
                        onClick={() =>
                          setView({ type: "checkin", milestone: 60 })
                        }
                        className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors mt-1 ${
                          view.type === "checkin" && view.milestone === 60
                            ? "bg-purple-100 text-purple-900 font-medium"
                            : "text-purple-700/70 hover:bg-purple-50 hover:text-purple-900"
                        }`}
                      >
                        🌙 60-Day Reflection
                      </button>
                    )}
                    {week.week === 13 && (
                      <button
                        type="button"
                        onClick={() =>
                          setView({ type: "checkin", milestone: 90 })
                        }
                        className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors mt-1 ${
                          view.type === "checkin" && view.milestone === 90
                            ? "bg-purple-100 text-purple-900 font-medium"
                            : "text-purple-700/70 hover:bg-purple-50 hover:text-purple-900"
                        }`}
                      >
                        🌙 90-Day Reflection
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
      <div className="px-3 py-3 border-t border-sidebar-border/50 space-y-1">
        <button
          type="button"
          onClick={() => setView({ type: "journey-map" })}
          data-ocid="sidebar.journey_map.link"
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
            view.type === "journey-map"
              ? "bg-amber-100 text-amber-900 font-medium"
              : "text-foreground/60 hover:bg-muted hover:text-foreground"
          }`}
        >
          <span aria-hidden="true">🗺️</span>Journey Map
        </button>
        <button
          type="button"
          onClick={() => setView({ type: "guidance" })}
          data-ocid="sidebar.guidance.link"
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
            view.type === "guidance"
              ? "bg-amber-100 text-amber-900 font-medium"
              : "text-foreground/60 hover:bg-muted hover:text-foreground"
          }`}
        >
          <span aria-hidden="true">📖</span>Core Guidance
        </button>
        <button
          type="button"
          onClick={() => setView({ type: "community" })}
          data-ocid="sidebar.community.link"
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
            view.type === "community"
              ? "bg-amber-100 text-amber-900 font-medium"
              : "text-foreground/60 hover:bg-muted hover:text-foreground"
          }`}
        >
          <span aria-hidden="true">🕊️</span>A Space for Witnessing
        </button>
        <button
          type="button"
          onClick={() => setView({ type: "archive" })}
          data-ocid="sidebar.archive.link"
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
            view.type === "archive"
              ? "bg-amber-100 text-amber-900 font-medium"
              : "text-foreground/60 hover:bg-muted hover:text-foreground"
          }`}
        >
          <span aria-hidden="true">🌀</span>Return &amp; Revisit
        </button>
        <button
          type="button"
          onClick={() => setView({ type: "aftercare" })}
          data-ocid="sidebar.aftercare.link"
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
            view.type === "aftercare"
              ? "bg-amber-100 text-amber-900 font-medium"
              : "text-foreground/60 hover:bg-muted hover:text-foreground"
          }`}
        >
          <span aria-hidden="true">🌱</span>Integration &amp; Aftercare
        </button>
        <div>
          <button
            type="button"
            onClick={() => setView({ type: "identity" })}
            data-ocid="sidebar.identity.link"
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
              view.type === "identity"
                ? "bg-amber-100 text-amber-900 font-medium"
                : "text-foreground/60 hover:bg-muted hover:text-foreground"
            }`}
          >
            <span aria-hidden="true">🔮</span>Identity Tracking
          </button>
          <p className="text-xs italic text-muted-foreground/40 pl-9 -mt-0.5 pb-1">
            optional
          </p>
        </div>
      </div>
    </aside>
  );
}
