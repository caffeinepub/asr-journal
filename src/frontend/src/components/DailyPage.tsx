import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { backendInterface } from "../backend";
import type { EmbedLink } from "../backend.d";
import type { NWeekData } from "../hooks/useJournalContent";
import { getDayDataFromWeeks } from "../hooks/useJournalContent";
import ArtCanvas from "./ArtCanvas";
import PageFooter from "./PageFooter";

interface Props {
  dayNum: number;
  actor: backendInterface | null;
  onSaved?: () => void;
  onNavigateDay?: (day: number) => void;
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
type TabId = "write" | "draw" | "photo" | "links";

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
  if (mark === null) delete all[day];
  else all[day] = mark;
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(all));
}

function detectLinkType(url: string): string {
  const lower = url.toLowerCase();
  if (
    lower.includes("youtube") ||
    lower.includes("youtu.be") ||
    lower.includes("vimeo")
  )
    return "video";
  if (lower.includes("spotify") || lower.includes("soundcloud")) return "music";
  return "reference";
}

function getYouTubeEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.slice(1);
      return `https://www.youtube.com/embed/${id}`;
    }
    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    // ignore
  }
  return null;
}

function getSpotifyEmbedUrl(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname.includes("spotify.com")) {
      // open.spotify.com/track/ID → open.spotify.com/embed/track/ID
      const path = u.pathname; // e.g. /track/abc123
      return `https://open.spotify.com/embed${path}`;
    }
  } catch {
    // ignore
  }
  return null;
}

function getLinkHostname(url: string): string {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url.slice(0, 40);
  }
}

const PHOTO_STORAGE_KEY = (day: number) => `asr_photos_day_${day}`;

function loadPhotos(day: number): string[] {
  try {
    return JSON.parse(localStorage.getItem(PHOTO_STORAGE_KEY(day)) ?? "[]");
  } catch {
    return [];
  }
}

function savePhotos(day: number, photos: string[]) {
  localStorage.setItem(PHOTO_STORAGE_KEY(day), JSON.stringify(photos));
}

export default function DailyPage({
  dayNum,
  actor,
  onSaved,
  onNavigateDay,
  weeks,
}: Props) {
  const data = getDayDataFromWeeks(weeks, dayNum);
  const [activeTab, setActiveTab] = useState<TabId>("write");
  const [spiritualResponse, setSpiritualResponse] = useState("");
  const [writingResponse, setWritingResponse] = useState("");
  const [gratitudeAnchor, setGratitudeAnchor] = useState("");
  const [artData, setArtData] = useState("");
  const [links, setLinks] = useState<EmbedLink[]>([]);
  const [photos, setPhotos] = useState<string[]>([]);
  const [photoBackground, setPhotoBackground] = useState<string | null>(null);
  const [linkInput, setLinkInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentMark, setCurrentMark] = useState<DayMark>(
    () => getBookmarks()[dayNum] ?? null,
  );
  const [cameraActive, setCameraActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const cameraStreamRef = useRef<MediaStream | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const soulReminder = soulReminders[dayNum % soulReminders.length];
  const totalDays = weeks.reduce((acc, w) => acc + w.days.length, 0);

  useEffect(() => {
    setSpiritualResponse("");
    setWritingResponse("");
    setGratitudeAnchor("");
    setArtData("");
    setLinks([]);
    setPhotos(loadPhotos(dayNum));
    setPhotoBackground(null);
    setLoaded(false);
    setCurrentMark(getBookmarks()[dayNum] ?? null);
    setActiveTab("write");
    stopCamera();

    if (actor) {
      actor
        .getJournalEntry(BigInt(dayNum))
        .then((entry) => {
          if (entry) {
            setSpiritualResponse(entry.spiritualResponse);
            setWritingResponse(entry.writingResponse);
            setGratitudeAnchor(entry.gratitudeAnchor);
            setArtData(entry.artCanvas.base64Data);
            const entryAny = entry as any;
            if (entryAny.links) setLinks(entryAny.links);
          }
          setLoaded(true);
        })
        .catch(() => setLoaded(true));
    } else {
      setLoaded(true);
    }

    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dayNum, actor]);

  const stopCamera = () => {
    if (cameraStreamRef.current) {
      for (const track of cameraStreamRef.current.getTracks()) track.stop();
      cameraStreamRef.current = null;
    }
    setCameraActive(false);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      cameraStreamRef.current = stream;
      setCameraActive(true);
      // attach to video after state update
      setTimeout(() => {
        if (videoRef.current) videoRef.current.srcObject = stream;
      }, 50);
    } catch {
      toast.error("Camera not available", {
        description: "Please check browser permissions.",
      });
    }
  };

  const capturePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement("canvas");
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(videoRef.current, 0, 0);
    const base64 = canvas.toDataURL("image/jpeg", 0.85);
    const next = [...photos, base64];
    setPhotos(next);
    savePhotos(dayNum, next);
    toast.success("Photo captured");
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const base64 = ev.target?.result as string;
        if (!base64) return;
        setPhotos((prev) => {
          const next = [...prev, base64];
          savePhotos(dayNum, next);
          return next;
        });
      };
      reader.readAsDataURL(file);
    }
    e.target.value = "";
  };

  const removePhoto = (idx: number) => {
    setPhotos((prev) => {
      const next = prev.filter((_, i) => i !== idx);
      savePhotos(dayNum, next);
      return next;
    });
  };

  const setAsDrawingBackground = (base64: string) => {
    setPhotoBackground(base64);
    setActiveTab("draw");
    toast.success("Photo set as canvas background", {
      description: "Switched to Draw tab.",
    });
  };

  const addLink = () => {
    const url = linkInput.trim();
    if (!url) return;
    let fullUrl = url;
    if (!fullUrl.startsWith("http")) fullUrl = `https://${fullUrl}`;
    const linkType = detectLinkType(fullUrl);
    const title = getLinkHostname(fullUrl);
    setLinks((prev) => [...prev, { url: fullUrl, title, linkType }]);
    setLinkInput("");
  };

  const removeLink = (idx: number) => {
    setLinks((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    if (!actor) return;
    setSaving(true);
    const photoIds = photos.map((_, i) => `photo_day${dayNum}_${i}`);
    try {
      // @ts-ignore - backend will be updated to support new signature
      await (actor as any).saveJournalEntry(
        BigInt(dayNum),
        spiritualResponse,
        writingResponse,
        gratitudeAnchor,
        { base64Data: artData },
        links,
        photoIds,
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

  const TABS: { id: TabId; label: string; icon: string }[] = [
    { id: "write", label: "Write", icon: "✍" },
    { id: "draw", label: "Draw", icon: "🎨" },
    { id: "photo", label: "Photo", icon: "📷" },
    { id: "links", label: "Links", icon: "🔗" },
  ];

  if (!data)
    return <div className="p-10 text-muted-foreground">Day not found.</div>;

  const { week, day } = data;

  return (
    <div className="max-w-2xl mx-auto px-5 py-8 pb-16 min-h-screen flex flex-col">
      {/* Soul reminder band */}
      <div className="mb-5 px-4 py-3 rounded-2xl bg-amber-50/80 border border-amber-200/60">
        <p className="text-sm italic text-amber-700/80 text-center">
          {soulReminder}
        </p>
      </div>

      {/* Day header + bookmarks */}
      <div className="mb-6 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs tracking-widest uppercase text-amber-600 mb-1.5">
            Week {week.week} — {week.theme}
          </p>
          <h2 className="text-3xl font-display text-amber-900">
            Day {day.day}
          </h2>
          <div className="w-10 h-px bg-amber-400 mt-2" />
        </div>
        <div className="flex gap-2 mt-1 shrink-0">
          <button
            type="button"
            onClick={() => toggleMark("favorite")}
            data-ocid="daily.favorite.toggle"
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
            data-ocid="daily.surprising.toggle"
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

      {/* Tabs */}
      <div
        className="flex gap-1.5 mb-6 p-1 bg-amber-50/60 rounded-2xl border border-amber-100"
        data-ocid="daily.tab"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            data-ocid={`daily.${tab.id}.tab`}
            className={`flex-1 flex items-center justify-center gap-1.5 text-sm py-2.5 rounded-xl transition-all font-medium ${
              activeTab === tab.id
                ? "bg-white text-amber-900 shadow-sm border border-amber-200/60"
                : "text-amber-700/60 hover:text-amber-800 hover:bg-white/50"
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1">
        {/* WRITE TAB */}
        {activeTab === "write" && (
          <div className="space-y-8">
            <section className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-display text-amber-800 flex items-center gap-2">
                  <span>🌟</span> Spiritual Prompt
                </h3>
                <span className="text-xs italic text-muted-foreground/60 mt-1 shrink-0">
                  (optional)
                </span>
              </div>
              <blockquote className="border-l-4 border-amber-300 pl-4 text-base italic text-foreground/80 leading-relaxed">
                {day.spiritual}
              </blockquote>
              <textarea
                value={spiritualResponse}
                onChange={(e) => setSpiritualResponse(e.target.value)}
                placeholder="Write your reflection here..."
                disabled={!loaded}
                data-ocid="daily.spiritual.textarea"
                className="w-full min-h-[120px] p-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground resize-y focus:outline-none focus:ring-2 focus:ring-amber-300 text-sm leading-relaxed"
              />
            </section>

            <section className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-display text-amber-800 flex items-center gap-2">
                  <span>🎨</span> Art Prompt
                </h3>
                <span className="text-xs italic text-muted-foreground/60 mt-1 shrink-0">
                  (optional)
                </span>
              </div>
              <blockquote className="border-l-4 border-amber-300 pl-4 text-base italic text-foreground/80 leading-relaxed">
                {day.art}
              </blockquote>
            </section>

            <section className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-display text-amber-800 flex items-center gap-2">
                  <span>✍️</span> Writing Prompt
                </h3>
                <span className="text-xs italic text-muted-foreground/60 mt-1 shrink-0">
                  (optional)
                </span>
              </div>
              <blockquote className="border-l-4 border-amber-300 pl-4 text-base italic text-foreground/80 leading-relaxed">
                {day.writing}
              </blockquote>
              <textarea
                value={writingResponse}
                onChange={(e) => setWritingResponse(e.target.value)}
                placeholder="Let your thoughts flow..."
                disabled={!loaded}
                data-ocid="daily.writing.textarea"
                className="w-full min-h-[160px] p-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground resize-y focus:outline-none focus:ring-2 focus:ring-amber-300 text-sm leading-relaxed"
              />
            </section>

            <section className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-display text-amber-800 flex items-center gap-2">
                  <span>💛</span> Gratitude Anchor
                </h3>
                <span className="text-xs italic text-muted-foreground/60 mt-1 shrink-0">
                  (optional)
                </span>
              </div>
              <blockquote className="border-l-4 border-amber-300 pl-4 text-base italic text-foreground/80 leading-relaxed">
                {day.gratitude}
              </blockquote>
              <textarea
                value={gratitudeAnchor}
                onChange={(e) => setGratitudeAnchor(e.target.value)}
                placeholder="What are you grateful for today?"
                disabled={!loaded}
                data-ocid="daily.gratitude.textarea"
                className="w-full min-h-[100px] p-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground resize-y focus:outline-none focus:ring-2 focus:ring-amber-300 text-sm leading-relaxed"
              />
            </section>
          </div>
        )}

        {/* DRAW TAB */}
        {activeTab === "draw" && (
          <div>
            {loaded && (
              <ArtCanvas
                initialData={artData || undefined}
                onChange={setArtData}
                photoBackground={photoBackground}
                fullHeight
              />
            )}
          </div>
        )}

        {/* PHOTO TAB */}
        {activeTab === "photo" && (
          <div className="space-y-6">
            <p className="text-sm italic text-amber-700/70 text-center">
              Capture what words can't hold
            </p>
            <div className="flex gap-3">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileUpload}
                data-ocid="daily.upload_button"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                data-ocid="daily.upload_button"
                className="flex-1 py-3 border-2 border-dashed border-amber-300 rounded-xl text-sm text-amber-700 hover:bg-amber-50 transition-colors flex items-center justify-center gap-2"
              >
                📁 Upload from Device
              </button>
              <button
                type="button"
                onClick={cameraActive ? stopCamera : startCamera}
                data-ocid="daily.camera.button"
                className={`flex-1 py-3 border-2 rounded-xl text-sm transition-colors flex items-center justify-center gap-2 ${
                  cameraActive
                    ? "border-amber-500 bg-amber-50 text-amber-800"
                    : "border-dashed border-amber-300 text-amber-700 hover:bg-amber-50"
                }`}
              >
                {cameraActive ? "✕ Close Camera" : "📷 Use Camera"}
              </button>
            </div>

            {/* Camera preview */}
            {cameraActive && (
              <div className="space-y-3">
                <div className="rounded-2xl overflow-hidden border border-amber-200 bg-black">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full max-h-72 object-cover"
                  >
                    <track kind="captions" />
                  </video>
                </div>
                <button
                  type="button"
                  onClick={capturePhoto}
                  data-ocid="daily.camera.capture_button"
                  className="w-full py-3 bg-amber-700 hover:bg-amber-800 text-amber-50 rounded-full text-sm font-medium transition-colors"
                >
                  ⬤ Capture Photo
                </button>
              </div>
            )}

            {/* Photo grid */}
            {photos.length > 0 ? (
              <div>
                <div
                  className="grid grid-cols-2 gap-3"
                  data-ocid="daily.photo.list"
                >
                  {photos.map((photo, idx) => (
                    <div
                      key={photo.slice(0, 30)}
                      className="relative group rounded-xl overflow-hidden border border-amber-100"
                      data-ocid={`daily.photo.item.${idx + 1}`}
                    >
                      <img
                        src={photo}
                        alt={`Memory ${idx + 1}`}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-end justify-between p-2 opacity-0 group-hover:opacity-100">
                        <button
                          type="button"
                          onClick={() => setAsDrawingBackground(photo)}
                          className="text-xs bg-white/90 text-amber-900 px-2 py-1 rounded-md font-medium"
                        >
                          Set as BG
                        </button>
                        <button
                          type="button"
                          onClick={() => removePhoto(idx)}
                          data-ocid={`daily.photo.delete_button.${idx + 1}`}
                          className="w-7 h-7 bg-white/90 text-red-500 rounded-full flex items-center justify-center text-sm font-bold"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setAsDrawingBackground(photos[0])}
                  className="mt-3 w-full py-2.5 border border-amber-300 rounded-xl text-sm text-amber-700 hover:bg-amber-50 transition-colors"
                >
                  🎨 Set First Photo as Drawing Background
                </button>
              </div>
            ) : (
              <div
                className="text-center py-14 text-muted-foreground/50 italic text-sm"
                data-ocid="daily.photo.empty_state"
              >
                Your images will appear here
              </div>
            )}
          </div>
        )}

        {/* LINKS TAB */}
        {activeTab === "links" && (
          <div className="space-y-5">
            <p className="text-sm italic text-amber-700/70 text-center">
              Your sonic and visual world — what feeds your spirit today
            </p>

            {/* URL input */}
            <div className="flex gap-2">
              <input
                type="url"
                value={linkInput}
                onChange={(e) => setLinkInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") addLink();
                }}
                placeholder="Paste a link — music, video, reference..."
                data-ocid="daily.links.input"
                className="flex-1 px-4 py-2.5 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
              />
              <button
                type="button"
                onClick={addLink}
                data-ocid="daily.links.add_button"
                className="px-4 py-2.5 bg-amber-700 hover:bg-amber-800 text-amber-50 rounded-xl text-sm font-medium transition-colors"
              >
                + Add
              </button>
            </div>

            {/* Links list */}
            {links.length > 0 ? (
              <div className="space-y-3" data-ocid="daily.links.list">
                {links.map((link, idx) => {
                  const ytEmbed =
                    link.linkType === "video"
                      ? getYouTubeEmbedUrl(link.url)
                      : null;
                  const spotifyEmbed =
                    link.linkType === "music"
                      ? getSpotifyEmbedUrl(link.url)
                      : null;
                  const icon =
                    link.linkType === "music"
                      ? "🎵"
                      : link.linkType === "video"
                        ? "🎬"
                        : "🔗";

                  return (
                    <div
                      key={link.url}
                      data-ocid={`daily.links.item.${idx + 1}`}
                      className="rounded-2xl border border-amber-100/80 bg-card overflow-hidden"
                    >
                      {ytEmbed && (
                        <div className="aspect-video w-full">
                          <iframe
                            src={ytEmbed}
                            title={`Video ${idx + 1}`}
                            className="w-full h-full"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                        </div>
                      )}
                      {spotifyEmbed && (
                        <iframe
                          src={spotifyEmbed}
                          title={`Spotify ${idx + 1}`}
                          className="w-full"
                          height="152"
                          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                          loading="lazy"
                        />
                      )}
                      <div className="flex items-center justify-between px-4 py-3 gap-3">
                        <button
                          type="button"
                          onClick={() =>
                            window.open(
                              link.url,
                              "_blank",
                              "noopener,noreferrer",
                            )
                          }
                          className="flex items-center gap-2 text-sm text-foreground/80 hover:text-foreground transition-colors min-w-0"
                        >
                          <span className="text-base shrink-0">{icon}</span>
                          <span className="truncate text-xs text-muted-foreground">
                            {getLinkHostname(link.url)}
                          </span>
                          <span className="text-xs text-amber-600/60 shrink-0">
                            ↗
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeLink(idx)}
                          data-ocid={`daily.links.delete_button.${idx + 1}`}
                          className="shrink-0 w-7 h-7 rounded-full border border-border text-muted-foreground hover:text-red-500 hover:border-red-300 flex items-center justify-center text-sm transition-colors"
                        >
                          ×
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div
                className="text-center py-14 text-muted-foreground/50 italic text-sm"
                data-ocid="daily.links.empty_state"
              >
                Add music, videos, or references that inspire you today
              </div>
            )}
          </div>
        )}
      </div>

      {/* Page-turn navigation */}
      <div className="mt-10 grid grid-cols-3 gap-3 items-center">
        <div>
          {dayNum > 1 && (
            <button
              type="button"
              onClick={() => onNavigateDay?.(dayNum - 1)}
              data-ocid="daily.pagination_prev"
              className="w-full py-3 px-4 border-2 border-amber-200 hover:border-amber-400 text-amber-800 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              ← Day {dayNum - 1}
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !loaded}
          data-ocid="daily.submit_button"
          className="py-3 px-4 bg-amber-700 hover:bg-amber-800 disabled:opacity-50 text-amber-50 rounded-xl text-sm font-medium transition-colors shadow-md text-center"
        >
          {saving ? "Receiving..." : "Offer this to yourself"}
        </button>

        <div className="flex justify-end">
          {dayNum < totalDays && (
            <button
              type="button"
              onClick={() => onNavigateDay?.(dayNum + 1)}
              data-ocid="daily.pagination_next"
              className="w-full py-3 px-4 border-2 border-amber-200 hover:border-amber-400 text-amber-800 rounded-xl text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              Day {dayNum + 1} →
            </button>
          )}
        </div>
      </div>

      <PageFooter />
    </div>
  );
}
