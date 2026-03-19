import { useState } from "react";
import PageFooter from "./PageFooter";

export default function ClosingPage() {
  const [response, setResponse] = useState("");

  return (
    <article
      className="max-w-2xl mx-auto px-6 py-10 pb-8"
      data-ocid="closing.page"
    >
      <header className="mb-10">
        <p className="text-purple-500/70 text-sm tracking-widest uppercase mb-2">
          Integration &amp; Aftercare
        </p>
        <h1 className="font-display text-3xl text-amber-900 leading-snug mb-4">
          Closing &amp; Integration
        </h1>
        <p className="text-foreground/75 text-lg leading-relaxed">
          You have moved through a 90-day journey. Whatever you touched,
          whatever touched you — it matters.
        </p>
      </header>

      <div className="w-12 h-px bg-amber-300/60 mb-10" aria-hidden="true" />

      <section className="mb-10">
        <h2 className="font-display text-xl text-amber-800 mb-5">
          A Letter to You
        </h2>
        <div className="rounded-2xl bg-amber-50/70 border border-amber-200/50 px-6 py-6 space-y-4">
          <p className="text-foreground/75 leading-relaxed italic">Dear one,</p>
          <p className="text-foreground/70 leading-relaxed">
            You showed up. In ways large and small, on the difficult days and
            the open ones, you returned to this space and turned toward
            yourself. That is not a small thing.
          </p>
          <p className="text-foreground/70 leading-relaxed">
            This journal was never about reaching an end. It was always about
            the practice of noticing — your breath, your art, your words, your
            quiet inner knowing. And you brought all of that here.
          </p>
          <p className="text-foreground/70 leading-relaxed">
            You may have skipped days. You may have moved out of order,
            revisited weeks, or sat with a single prompt for longer than
            expected. All of that was the journey. All of it was right.
          </p>
          <p className="text-foreground/70 leading-relaxed">
            The threads you wove here — through art, through stillness, through
            writing — are now part of you. They do not disappear when the 90
            days are complete. They travel with you.
          </p>
          <p className="text-foreground/70 leading-relaxed">
            You are more whole than when you started. Not because you completed
            something, but because you kept returning to yourself.
          </p>
          <p className="text-foreground/75 leading-relaxed italic">
            With deep respect for your journey,
            <br />
            <span className="not-italic font-medium text-amber-800">
              ASR Journal
            </span>
          </p>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="font-display text-xl text-amber-800 mb-4">
          Carry It Forward
        </h2>
        <p className="text-foreground/70 leading-relaxed mb-3">
          This practice is cyclical. The journal does not end — it simply rests
          between visits. You may return to any week at any time. You may begin
          again from the first day, or open to whatever page calls to you.
        </p>
        <p className="text-foreground/70 leading-relaxed">
          Insights deepen over time. What you wrote on Day 12 may land
          differently now. The door remains open.
        </p>
      </section>

      <div className="w-12 h-px bg-purple-300/50 mb-10" aria-hidden="true" />

      <section>
        <h2 className="font-display text-xl text-amber-800 mb-3">
          A Closing Invitation
        </h2>
        <p className="text-foreground/70 leading-relaxed mb-5">
          One final open space, offered without expectation:
        </p>
        <blockquote className="border-l-2 border-amber-300/70 pl-5 mb-5">
          <p className="text-amber-800/80 italic leading-relaxed">
            What do you want to carry forward from this journey?
            <br />
            What has changed in you?
          </p>
        </blockquote>
        <textarea
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          placeholder="Write here, freely and without judgment..."
          rows={8}
          data-ocid="closing.textarea"
          className="w-full rounded-xl border border-amber-200/60 bg-amber-50/40 px-4 py-3 text-foreground/80 placeholder:text-muted-foreground/50 text-sm leading-relaxed resize-none focus:outline-none focus:ring-1 focus:ring-amber-300/70 focus:border-amber-300"
        />
      </section>

      <PageFooter />
    </article>
  );
}
