import { useEffect, useState } from "react";
import type { backendInterface } from "../backend";
import { WEEKS } from "../journalData";

export interface NDayData {
  art: string;
  day: number;
  spiritual: string;
  gratitude: string;
  writing: string;
}

export interface NWeekData {
  theme: string;
  reflectionQuestions: Array<string>;
  days: Array<NDayData>;
  week: number;
  quote: string;
  mandalaHint: string;
  intention: string;
}

function normalizeWeek(w: {
  theme: string;
  reflectionQuestions: Array<string>;
  days: Array<{
    art: string;
    day: bigint;
    spiritual: string;
    gratitude: string;
    writing: string;
  }>;
  week: bigint;
  quote: string;
  mandalaHint: string;
  intention: string;
}): NWeekData {
  return {
    ...w,
    week: Number(w.week),
    days: w.days.map((d) => ({ ...d, day: Number(d.day) })),
  };
}

function localWeeksToNWeeks(): NWeekData[] {
  return WEEKS.map((w) => ({
    week: w.week,
    theme: w.theme,
    intention: w.intention,
    quote: w.quote,
    mandalaHint: w.mandalaHint,
    reflectionQuestions: w.reflectionQuestions,
    days: w.days.map((d) => ({
      day: d.day,
      art: d.art,
      writing: d.writing,
      spiritual: d.spiritual,
      gratitude: d.gratitude,
    })),
  }));
}

export function getDayDataFromWeeks(
  weeks: NWeekData[],
  dayNum: number,
): { week: NWeekData; day: NDayData } | null {
  for (const week of weeks) {
    const day = week.days.find((d) => d.day === dayNum);
    if (day) return { week, day };
  }
  return null;
}

export function useJournalContent(actor: backendInterface | null) {
  const [weeks, setWeeks] = useState<NWeekData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!actor) {
      // No actor available — use local data immediately
      setWeeks(localWeeksToNWeeks());
      setLoading(false);
      return;
    }
    setLoading(true);
    actor
      .getWeeks()
      .then((raw) => {
        if (raw.length === 0) {
          // Backend returned empty — fall back to local data
          setWeeks(localWeeksToNWeeks());
        } else {
          setWeeks(raw.map(normalizeWeek));
        }
      })
      .catch(() => {
        // On error, fall back to local data
        setWeeks(localWeeksToNWeeks());
      })
      .finally(() => setLoading(false));
  }, [actor]);

  const getDayData = (dayNum: number) => getDayDataFromWeeks(weeks, dayNum);

  return { weeks, loading, getDayData };
}
