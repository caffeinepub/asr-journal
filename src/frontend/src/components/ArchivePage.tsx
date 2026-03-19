import { useEffect, useState } from "react";
import type { JournalEntry, backendInterface } from "../backend";
import PageFooter from "./PageFooter";

interface Props {
  actor: backendInterface | null;
  onNavigateDay: (day: number) => void;
}

interface EntryCard {
  day: number;
  entry: JournalEntry;
}

export default function ArchivePage({ actor, onNavigateDay }: Props) {
  const [entries, setEntries] = useState<EntryCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!actor) {
      setLoading(false);
      return;
    }

    const load = async () => {
      try {
        const progressDays = await actor.getProgress();
        const dayNums = progressDays.map((d) => Number(d));
        const results = await Promise.all(
          dayNums.map(async (day) => {
            const entry = await actor.getJournalEntry(BigInt(day));
            return entry ? { day, entry } : null;
          }),
        );
        const valid = results.filter((r): r is EntryCard => r !== null);
        valid.sort((a, b) => a.day - b.day);
        setEntries(valid);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [actor]);

  const excerpt = (text: string) => {
    if (!text) return "";
    return text.length > 120 ? `${text.slice(0, 120)}\u2026` : text;
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-12">
      <header className="mb-10">
        <h2 className="font-display text-2xl text-amber-900 mb-2">
          Your Archive
        </h2>
        <p className="text-sm text-foreground/55 italic leading-relaxed">
          A quiet collection of what you have offered — return whenever you
          wish.
        </p>
      </header>

      {loading && (
        <p
          className="text-amber-700/60 italic text-sm"
          data-ocid="archive.loading_state"
        >
          Gathering your reflections...
        </p>
      )}

      {!loading && entries.length === 0 && (
        <p
          className="text-foreground/40 italic text-sm"
          data-ocid="archive.empty_state"
        >
          No offerings yet — your journal awaits you.
        </p>
      )}

      {!loading && entries.length > 0 && (
        <ul className="space-y-4" data-ocid="archive.list">
          {entries.map(({ day, entry }, index) => {
            const hasArt =
              entry.artCanvas?.base64Data &&
              entry.artCanvas.base64Data.length > 0;
            const writingText =
              entry.writingResponse ||
              entry.spiritualResponse ||
              entry.gratitudeAnchor ||
              "";

            return (
              <li
                key={day}
                data-ocid={`archive.item.${index + 1}`}
                className="bg-card border border-amber-200/50 rounded-xl p-5 shadow-sm flex gap-4 items-start"
              >
                {hasArt && (
                  <img
                    src={`data:image/png;base64,${entry.artCanvas.base64Data}`}
                    alt={`Art from Day ${day}`}
                    className="w-16 h-16 rounded-lg object-cover shrink-0 border border-amber-200/40 opacity-90"
                  />
                )}

                <div className="flex-1 min-w-0">
                  <span className="text-xs font-medium text-amber-800/70 tracking-wide uppercase block mb-1.5">
                    Day {day}
                  </span>

                  {writingText ? (
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      {excerpt(writingText)}
                    </p>
                  ) : (
                    <p className="text-sm text-foreground/35 italic">
                      An offering without words.
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={() => onNavigateDay(day)}
                    data-ocid={`archive.edit_button.${index + 1}`}
                    className="mt-3 text-xs text-amber-700/70 hover:text-amber-900 underline underline-offset-2 transition-colors"
                  >
                    Revisit this day →
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <PageFooter />
    </div>
  );
}
