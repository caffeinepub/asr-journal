import { useEffect, useState } from "react";
import ArchivePage from "./components/ArchivePage";
import CheckInPage from "./components/CheckInPage";
import DailyPage from "./components/DailyPage";
import JourneyCovenantPage from "./components/JourneyCovenantPage";
import Sidebar from "./components/Sidebar";
import ThresholdPage from "./components/ThresholdPage";
import WeekReflectionPage from "./components/WeekReflectionPage";
import WeeklyOverview from "./components/WeeklyOverview";
import WelcomePage from "./components/WelcomePage";
import { Toaster } from "./components/ui/sonner";
import { useActor } from "./hooks/useActor";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useJournalContent } from "./hooks/useJournalContent";

export type View =
  | { type: "threshold" }
  | { type: "covenant" }
  | { type: "archive" }
  | { type: "day"; day: number }
  | { type: "week"; week: number }
  | { type: "week-reflection"; week: number }
  | { type: "checkin"; milestone: 30 | 60 | 90 };

export default function App() {
  const { identity, login } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();
  const { actor } = useActor();
  const [view, setView] = useState<View>({ type: "threshold" });
  const [completedDays, setCompletedDays] = useState<number[]>([]);

  const { weeks, loading: journalLoading } = useJournalContent(
    isAuthenticated ? actor : null,
  );

  useEffect(() => {
    if (isAuthenticated && actor) {
      actor
        .getProgress()
        .then((days) => {
          setCompletedDays(days.map((d) => Number(d)));
        })
        .catch(() => {});
    }
  }, [isAuthenticated, actor]);

  const refreshProgress = async () => {
    if (actor) {
      const days = await actor.getProgress();
      setCompletedDays(days.map((d) => Number(d)));
    }
  };

  const navigateDay = (day: number) => {
    setView({ type: "day", day });
  };

  if (!isAuthenticated) {
    return <WelcomePage onLogin={login} />;
  }

  if (journalLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p
          className="text-amber-700/70 text-lg italic"
          data-ocid="app.loading_state"
        >
          Taking a quiet breath...
        </p>
      </div>
    );
  }

  const isOnDayPage = view.type === "day";

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar
        view={view}
        setView={setView}
        completedDays={completedDays}
        weeks={weeks}
        isOnDayPage={isOnDayPage}
      />
      <main className="flex-1 overflow-y-auto">
        {view.type === "threshold" && <ThresholdPage />}
        {view.type === "covenant" && <JourneyCovenantPage />}
        {view.type === "archive" && (
          <ArchivePage
            actor={actor}
            onNavigateDay={(day) => setView({ type: "day", day })}
          />
        )}
        {view.type === "week" && (
          <WeeklyOverview
            weekNum={view.week}
            setView={setView}
            completedDays={completedDays}
            weeks={weeks}
          />
        )}
        {view.type === "week-reflection" && (
          <WeekReflectionPage
            weekNum={view.week}
            weeks={weeks}
            setView={setView}
          />
        )}
        {view.type === "day" && (
          <DailyPage
            dayNum={view.day}
            actor={actor}
            onSaved={refreshProgress}
            onNavigateDay={navigateDay}
            weeks={weeks}
          />
        )}
        {view.type === "checkin" && <CheckInPage milestone={view.milestone} />}
      </main>
      <Toaster richColors position="top-right" />
    </div>
  );
}
