export default function PageFooter() {
  return (
    <footer className="mt-16 border-t border-amber-200/40 pt-6 pb-8 text-center space-y-3">
      <p className="text-xs text-foreground/45 leading-relaxed max-w-sm mx-auto italic">
        The ASR Journal is a reflective, creative space for personal growth. It
        is not a substitute for professional mental health care. Move at your
        own pace, honor your boundaries, and use what feels safe and nourishing
        for you.
      </p>
      <p className="text-xs text-foreground/30">
        Powered by{" "}
        <a
          href="https://acleaver.art"
          target="_blank"
          rel="noreferrer"
          title="Creating spaces for reflection, art, and personal growth."
          className="underline hover:text-foreground/55 transition-colors"
        >
          ACleaverArt
        </a>
      </p>
    </footer>
  );
}
