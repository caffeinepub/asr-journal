import { useEffect, useState } from "react";
import ArchivePage from "./components/ArchivePage";
import CheckInPage from "./components/CheckInPage";
import CommunityWitnessPage from "./components/CommunityWitnessPage";
import DailyPage from "./components/DailyPage";
import JourneyCovenantPage from "./components/JourneyCovenantPage";
import Sidebar from "./components/Sidebar";
import WeeklyOverview from "./components/WeeklyOverview";
import WelcomePage from "./components/WelcomePage";
import { Toaster } from "./components/ui/sonner";
import { useActor } from "./hooks/useActor";
import { useInternetIdentity } from "./hooks/useInternetIdentity";

export type View =
  | { type: "day"; day: number }
  | { type: "week"; week: number }
  | { type: "checkin"; milestone: 30 | 60 | 90 }
  | { type: "covenant" }
  | { type: "community" }
  | { type: "archive" };

export default function App() {
  const { identity, login } = useInternetIdentity();
  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();
  const { actor } = useActor();
  const [view, setView] = useState<View>({ type: "day", day: 1 });
  const [completedDays, setCompletedDays] = useState<number[]>([]);
  const [showCovenant, setShowCovenant] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      const seen = localStorage.getItem("asr_covenant_seen");
      if (!seen) {
        setShowCovenant(true);
      }
    }
  }, [isAuthenticated]);

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

  const handleCovenantReceive = () => {
    localStorage.setItem("asr_covenant_seen", "true");
    setShowCovenant(false);
  };

  if (!isAuthenticated) {
    return <WelcomePage onLogin={login} />;
  }

  if (showCovenant) {
    return <JourneyCovenantPage onReceive={handleCovenantReceive} />;
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar view={view} setView={setView} completedDays={completedDays} />
      <main className="flex-1 overflow-y-auto">
        {view.type === "week" && (
          <WeeklyOverview
            weekNum={view.week}
            setView={setView}
            completedDays={completedDays}
          />
        )}
        {view.type === "day" && (
          <DailyPage
            dayNum={view.day}
            actor={actor}
            onSaved={refreshProgress}
          />
        )}
        {view.type === "checkin" && <CheckInPage milestone={view.milestone} />}
        {view.type === "community" && <CommunityWitnessPage />}
        {view.type === "archive" && (
          <ArchivePage setView={setView} completedDays={completedDays} />
        )}
      </main>
      <Toaster richColors position="top-right" />
    </div>
  );
}
