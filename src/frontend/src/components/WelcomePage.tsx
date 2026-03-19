import { motion } from "motion/react";

interface Props {
  onLogin: () => void;
}

export default function WelcomePage({ onLogin }: Props) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="max-w-md w-full text-center space-y-6"
      >
        {/* Breathing circle */}
        <div className="flex justify-center mb-2">
          <div className="breath-circle" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl text-amber-900 leading-tight">ASR Journal</h1>
          <p className="text-sm tracking-widest uppercase text-amber-600/80">
            90-Day Soul Reminder Journey
          </p>
        </div>

        <p className="text-base text-foreground/65 leading-relaxed">
          A 90-day guided practice blending art, spiritual awareness, and
          reflective writing.
        </p>

        <motion.button
          type="button"
          onClick={onLogin}
          data-ocid="welcome.primary_button"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="inline-block bg-amber-700 hover:bg-amber-800 text-amber-50 px-12 py-3.5 rounded-full text-base font-medium transition-colors shadow-sm hover:shadow-md"
        >
          Begin
        </motion.button>

        <p className="text-xs text-foreground/35 italic pt-2">
          There is no right way, and no pressure to finish anything.
        </p>
      </motion.div>

      <footer className="absolute bottom-6 text-center text-xs text-foreground/30">
        © {new Date().getFullYear()}. Built with ♥ using{" "}
        <a
          href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
          className="underline hover:text-foreground/50"
          target="_blank"
          rel="noreferrer"
        >
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
