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
      <aside className="w-12 bg-sidebar border-r border-sidebar-border flex flex-col items-center py-4">
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

  const navBtn = (active: boolean) =>
    `w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
      active
        ? "bg-amber-100/80 text-amber-900 font-medium"
        : "text-foreground/65 hover:bg-muted hover:text-foreground"
    }`;

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-sidebar-border flex items-start justify-between">
        <div>
          <h1 className="font-display text-lg text-amber-900 leading-tight">
            ASR Journal
          </h1>
          <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
            90-Day Soul Reminder Journey
          </p>
        </div>
        <button
          type="button"
          onClick={() => setCollapsed(true)}
          className="text-muted-foreground hover:text-foreground mt-0.5 shrink-0"
          aria-label="Collapse sidebar"
          data-ocid="sidebar.toggle"
        >
          <svg
            width="16"
            height="16"
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

      <nav className="flex-1 overflow-y-auto px-2 py-3 flex flex-col">
        {/* Top: Welcome + Three Threads */}
        <div className="space-y-0.5 mb-1">
          <button
            type="button"
            onClick={() => setView({ type: "threshold" })}
            data-ocid="sidebar.threshold.link"
            className={navBtn(view.type === "threshold")}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
              className="shrink-0 opacity-70"
            >
              <path d="M12 22s-8-6-8-12a8 8 0 0 1 16 0c0 6-8 12-8 12z" />
              <circle cx="12" cy="10" r="2" />
            </svg>
            Welcome
          </button>
          <button
            type="button"
            onClick={() => setView({ type: "covenant" })}
            data-ocid="sidebar.covenant.link"
            className={navBtn(view.type === "covenant")}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
              className="shrink-0 opacity-70"
            >
              <path d="M4 12c2-4 6-6 8-6s6 2 8 6" />
              <path d="M4 12c2 4 6 6 8 6s6-2 8-6" />
              <circle cx="12" cy="12" r="1.5" fill="currentColor" />
            </svg>
            The Three Threads
          </button>
        </div>

        <div className="h-px bg-amber-200/40 my-2 mx-1" aria-hidden="true" />

        {/* Weeks */}
        <div className="space-y-0.5 flex-1">
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
                      ? "bg-amber-100/80 text-amber-900 font-medium"
                      : "text-foreground/65 hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span className="text-left truncate pr-1">{week.theme}</span>
                  <svg
                    width="12"
                    height="12"
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
                  <div className="ml-2 mt-0.5 space-y-0.5 border-l border-amber-200/60 pl-2">
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
                          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                            active
                              ? "bg-amber-200/70 text-amber-900 font-medium"
                              : "text-foreground/55 hover:bg-muted hover:text-foreground"
                          }`}
                        >
                          <span
                            className={`w-2 h-2 rounded-full border shrink-0 ${
                              visited
                                ? "bg-amber-400/70 border-amber-400"
                                : "border-muted-foreground/25"
                            }`}
                          />
                          Day {d.day}
                        </button>
                      );
                    })}

                    <button
                      type="button"
                      onClick={() =>
                        setView({ type: "week-reflection", week: week.week })
                      }
                      data-ocid="sidebar.week_reflection.link"
                      className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors mt-0.5 ${
                        view.type === "week-reflection" &&
                        (view as { type: "week-reflection"; week: number })
                          .week === week.week
                          ? "bg-purple-100/70 text-purple-900 font-medium"
                          : "text-purple-700/55 hover:bg-purple-50 hover:text-purple-900"
                      }`}
                    >
                      <span className="text-[10px]" aria-hidden="true">
                        ✦
                      </span>
                      Week Reflection
                    </button>

                    {week.week === 5 && (
                      <button
                        type="button"
                        onClick={() =>
                          setView({ type: "checkin", milestone: 30 })
                        }
                        data-ocid="sidebar.checkin_30.link"
                        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                          view.type === "checkin" &&
                          (view as { type: "checkin"; milestone: number })
                            .milestone === 30
                            ? "bg-purple-100/70 text-purple-900 font-medium"
                            : "text-purple-600/45 hover:bg-purple-50 hover:text-purple-900"
                        }`}
                      >
                        <span className="text-[10px]" aria-hidden="true">
                          🌙
                        </span>
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
                        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                          view.type === "checkin" &&
                          (view as { type: "checkin"; milestone: number })
                            .milestone === 60
                            ? "bg-purple-100/70 text-purple-900 font-medium"
                            : "text-purple-600/45 hover:bg-purple-50 hover:text-purple-900"
                        }`}
                      >
                        <span className="text-[10px]" aria-hidden="true">
                          🌙
                        </span>
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
                        className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-colors ${
                          view.type === "checkin" &&
                          (view as { type: "checkin"; milestone: number })
                            .milestone === 90
                            ? "bg-purple-100/70 text-purple-900 font-medium"
                            : "text-purple-600/45 hover:bg-purple-50 hover:text-purple-900"
                        }`}
                      >
                        <span className="text-[10px]" aria-hidden="true">
                          🌙
                        </span>
                        90-Day Reflection
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="h-px bg-amber-200/40 my-2 mx-1" aria-hidden="true" />

        {/* Bottom: Closing */}
        <div className="space-y-0.5 mb-1">
          <button
            type="button"
            onClick={() => setView({ type: "closing" })}
            data-ocid="sidebar.closing.link"
            className={navBtn(view.type === "closing")}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
              className="shrink-0 opacity-70"
            >
              <path d="M12 21C12 21 3 14 3 8a9 9 0 0 1 18 0c0 6-9 13-9 13z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            Closing &amp; Integration
          </button>
        </div>
      </nav>
    </aside>
  );
}
