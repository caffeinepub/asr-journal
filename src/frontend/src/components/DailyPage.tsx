import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { backendInterface } from "../backend.d";
import { getDayData } from "../journalData";
import ArtCanvas from "./ArtCanvas";

interface Props {
  dayNum: number;
  actor: backendInterface | null;
  onSaved?: () => void;
}

const soulReminders = [
  "Show up in your own way.",
  "You don't have to finish. Presence is enough.",
  "Who am I remembering today?",
  "There is no right answer here — only your truth.",
  "Your authentic self is already here.",
];

export default function DailyPage({ dayNum, actor, onSaved }: Props) {
  const data = getDayData(dayNum);
  const [spiritualResponse, setSpiritualResponse] = useState("");
  const [writingResponse, setWritingResponse] = useState("");
  const [gratitudeAnchor, setGratitudeAnchor] = useState("");
  const [artData, setArtData] = useState("");
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const soulReminder = soulReminders[dayNum % soulReminders.length];

  useEffect(() => {
    setSpiritualResponse("");
    setWritingResponse("");
    setGratitudeAnchor("");
    setArtData("");
    setLoaded(false);
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

  if (!data)
    return <div className="p-10 text-muted-foreground">Day not found.</div>;

  const { week, day } = data;

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 pb-20">
      {/* Soul reminder band */}
      <div className="mb-6 -mx-2 px-4 py-3 rounded-xl bg-amber-50/70 border border-amber-200/60">
        <p className="text-sm italic text-amber-700/80 text-center">
          {soulReminder}
        </p>
      </div>

      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-amber-600 mb-2">
          Week {week.week} — {week.theme}
        </p>
        <h2 className="text-4xl text-amber-900">Day {day.day}</h2>
        <div className="w-12 h-px bg-amber-400 mt-3" />
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
    </div>
  );
}
