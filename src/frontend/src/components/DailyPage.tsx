import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { backendInterface } from "../backend.d";
import type { NWeekData } from "../hooks/useJournalContent";
import { getDayDataFromWeeks } from "../hooks/useJournalContent";
import ArtCanvas from "./ArtCanvas";
import PageFooter from "./PageFooter";

interface Props {
  dayNum: number;
  actor: backendInterface | null;
  onSaved?: () => void;
  weeks: NWeekData[];
}

const soulReminders = [
  "Show up in your own way.",
  "You don't have to finish. Presence is enough.",
  "Who am I remembering today?",
  "There is no right answer here — only your truth.",
  "Your authentic self is already here.",
];

type DayMark = "favorite" | "surprising" | null;

const BOOKMARKS_KEY = "asr_day_bookmarks";

function getBookmarks(): Record<number, DayMark> {
  try {
    return JSON.parse(localStorage.getItem(BOOKMARKS_KEY) ?? "{}");
  } catch {
    return {};
  }
}

function setBookmark(day: number, mark: DayMark) {
  const all = getBookmarks();
  if (mark === null) {
    delete all[day];
  } else {
    all[day] = mark;
  }
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(all));
}

export default function DailyPage({ dayNum, actor, onSaved, weeks }: Props) {
  const data = getDayDataFromWeeks(weeks, dayNum);
  const [spiritualResponse, setSpiritualResponse] = useState("");
  const [writingResponse, setWritingResponse] = useState("");
  const [gratitudeAnchor, setGratitudeAnchor] = useState("");
  const [artData, setArtData] = useState("");
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentMark, setCurrentMark] = useState<DayMark>(
    () => getBookmarks()[dayNum] ?? null,
  );

  const soulReminder = soulReminders[dayNum % soulReminders.length];

  useEffect(() => {
    setSpiritualResponse("");
    setWritingResponse("");
    setGratitudeAnchor("");
    setArtData("");
    setLoaded(false);
    setCurrentMark(getBookmarks()[dayNum] ?? null);
    if (actor) {
      actor
        .getJournalEntry(BigInt(dayNum))
        .then((entry) => {
          if (entry) {
            setSpiritualResponse(entry.spiritualResponse);
            setWritingResponse(entry.writingResponse);
            setGratitudeAnchor(entry.gratitudeAnchor);
            setArtData(entry.artCanvas.base64Data);
          }
          setLoaded(true);
        })
        .catch(() => setLoaded(true));
    } else {
      setLoaded(true);
    }
  }, [dayNum, actor]);

  const handleSave = async () => {
    if (!actor) return;
    setSaving(true);
    try {
      await actor.saveJournalEntry(
        BigInt(dayNum),
        spiritualResponse,
        writingResponse,
        gratitudeAnchor,
        { base64Data: artData },
      );
      toast.success("Gently received", {
        description: `Your offering for Day ${dayNum} has been held safely.`,
      });
      onSaved?.();
    } catch {
      toast.error("Could not save", { description: "Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const toggleMark = (mark: DayMark) => {
    const next = currentMark === mark ? null : mark;
    setCurrentMark(next);
    setBookmark(dayNum, next);
    if (next === "favorite") toast.success("♥ Marked as a favorite day");
    else if (next === "surprising")
      toast.success("✨ Marked as most surprising");
  };

  if (!data)
    return <div className="p-10 text-muted-foreground">Day not found.</div>;

  const { week, day } = data;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 pb-8">
      {/* Soul reminder band */}
      <div className="mb-6 -mx-2 px-4 py-3 rounded-xl bg-amber-50/70 border border-amber-200/60">
        <p className="text-sm italic text-amber-700/80 text-center">
          {soulReminder}
        </p>
      </div>

      <div className="mb-8 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs tracking-widest uppercase text-amber-600 mb-2">
            Week {week.week} — {week.theme}
          </p>
          <h2 className="text-4xl text-amber-900">Day {day.day}</h2>
          <div className="w-12 h-px bg-amber-400 mt-3" />
        </div>
        {/* Bookmark controls */}
        <div className="flex gap-2 mt-1 shrink-0">
          <button
            type="button"
            onClick={() => toggleMark("favorite")}
            title={
              currentMark === "favorite"
                ? "Remove favorite"
                : "Mark as favorite"
            }
            className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-colors ${
              currentMark === "favorite"
                ? "bg-amber-100 border-amber-400 text-amber-800"
                : "border-border text-muted-foreground hover:border-amber-300 hover:text-amber-700"
            }`}
          >
            ♥ Favorite
          </button>
          <button
            type="button"
            onClick={() => toggleMark("surprising")}
            title={
              currentMark === "surprising"
                ? "Remove mark"
                : "Mark as most surprising"
            }
            className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-full border transition-colors ${
              currentMark === "surprising"
                ? "bg-purple-100 border-purple-400 text-purple-800"
                : "border-border text-muted-foreground hover:border-purple-300 hover:text-purple-700"
            }`}
          >
            ✨ Surprising
          </button>
        </div>
      </div>

      <div className="space-y-10">
        <section className="space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">
                🌟
              </span>
              <h3 className="text-xl text-amber-800">Spiritual Prompt</h3>
            </div>
            <span className="text-xs italic text-muted-foreground/60 mt-1.5 shrink-0">
              (optional — skip or sit quietly)
            </span>
          </div>
          <blockquote className="border-l-4 border-amber-400 pl-4 text-lg italic text-foreground/80 leading-relaxed">
            {day.spiritual}
          </blockquote>
          <textarea
            value={spiritualResponse}
            onChange={(e) => setSpiritualResponse(e.target.value)}
            placeholder="Write your reflection here..."
            disabled={!loaded}
            data-ocid="daily.spiritual.textarea"
            className="w-full min-h-[120px] p-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground resize-y focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm leading-relaxed"
          />
        </section>

        <section className="space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">
                🎨
              </span>
              <h3 className="text-xl text-amber-800">Art Prompt</h3>
            </div>
            <span className="text-xs italic text-muted-foreground/60 mt-1.5 shrink-0">
              (optional — skip or sit quietly)
            </span>
          </div>
          <blockquote className="border-l-4 border-amber-400 pl-4 text-lg italic text-foreground/80 leading-relaxed">
            {day.art}
          </blockquote>
          {loaded && (
            <ArtCanvas
              initialData={artData || undefined}
              onChange={setArtData}
            />
          )}
        </section>

        <section className="space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">
                ✍️
              </span>
              <h3 className="text-xl text-amber-800">Writing Prompt</h3>
            </div>
            <span className="text-xs italic text-muted-foreground/60 mt-1.5 shrink-0">
              (optional — skip or sit quietly)
            </span>
          </div>
          <blockquote className="border-l-4 border-amber-400 pl-4 text-lg italic text-foreground/80 leading-relaxed">
            {day.writing}
          </blockquote>
          <textarea
            value={writingResponse}
            onChange={(e) => setWritingResponse(e.target.value)}
            placeholder="Let your thoughts flow..."
            disabled={!loaded}
            data-ocid="daily.writing.textarea"
            className="w-full min-h-[160px] p-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground resize-y focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm leading-relaxed"
          />
        </section>

        <section className="space-y-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl" aria-hidden="true">
                💛
              </span>
              <h3 className="text-xl text-amber-800">Gratitude Anchor</h3>
            </div>
            <span className="text-xs italic text-muted-foreground/60 mt-1.5 shrink-0">
              (optional — skip or sit quietly)
            </span>
          </div>
          <blockquote className="border-l-4 border-amber-400 pl-4 text-lg italic text-foreground/80 leading-relaxed">
            {day.gratitude}
          </blockquote>
          <textarea
            value={gratitudeAnchor}
            onChange={(e) => setGratitudeAnchor(e.target.value)}
            placeholder="What are you grateful for today?"
            disabled={!loaded}
            data-ocid="daily.gratitude.textarea"
            className="w-full min-h-[100px] p-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground resize-y focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm leading-relaxed"
          />
        </section>

        <div className="pt-4">
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || !loaded}
            data-ocid="daily.submit_button"
            className="w-full py-4 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-amber-50 rounded-full text-lg font-medium transition-colors shadow-md"
          >
            {saving ? "Receiving..." : "Offer this to yourself"}
          </button>
        </div>
      </div>

      <PageFooter />
    </div>
  );
}
