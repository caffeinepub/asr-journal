import { useState } from "react";

interface Props {
  milestone: 30 | 60 | 90;
}

const CLOSING_STEPS = [
  "Light a candle or take a grounding breath.",
  "Choose one symbol from your art over the last 90 days.",
  "Re-draw it on this page as your Final Symbol of Wholeness.",
  `Place your hand over it and say: "Thank you for guiding me back to myself."`,
];

function Section({
  title,
  children,
}: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h3 className="text-xl text-amber-800">{title}</h3>
      <div className="w-8 h-px bg-amber-300" />
      {children}
    </section>
  );
}

function JournalArea({
  placeholder,
  minHeight = "120px",
}: { placeholder: string; minHeight?: string }) {
  const [value, setValue] = useState("");
  return (
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      placeholder={placeholder}
      style={{ minHeight }}
      className="w-full p-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground resize-y focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm leading-relaxed"
    />
  );
}

const SOFT_AREA_LABELS = ["First", "Second", "Third", "Fourth", "Fifth"];

function SoftAreas({
  count,
  placeholder,
}: { count: number; placeholder: string }) {
  return (
    <div className="space-y-3">
      {SOFT_AREA_LABELS.slice(0, count).map((label) => (
        <div key={label} className="flex gap-3">
          <span className="text-amber-400 mt-3.5 shrink-0">&mdash;</span>
          <JournalArea placeholder={placeholder} minHeight="80px" />
        </div>
      ))}
    </div>
  );
}

function AffirmationSection({
  suggested,
  label,
}: { suggested: string; label: string }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">A suggested affirmation:</p>
      <blockquote className="border-l-4 border-amber-400 pl-4 italic text-amber-800 text-lg">
        &ldquo;{suggested}&rdquo;
      </blockquote>
      <JournalArea
        placeholder={`Write your own ${label} affirmation...`}
        minHeight="80px"
      />
    </div>
  );
}

export default function CheckInPage({ milestone }: Props) {
  const configs = {
    30: {
      title: "30-Day Reflection",
      theme: "Awareness of Change",
      opening:
        "Take a breath. You've moved through 30 days of inner work. This is a moment to notice what's shifting — gently, honestly, without pressure.",
      affirmation: {
        suggested: "I am growing gently, intentionally, and in my own rhythm.",
        label: "30-day",
      },
    },
    60: {
      title: "60-Day Reflection",
      theme: "Deepening the Practice",
      opening:
        "You've moved through the halfway point. Your consistency is creating real internal shifts. Honor the depth of your journey.",
      affirmation: {
        suggested: "I listen to my growth and honor its pace.",
        label: "days 61–90",
      },
    },
    90: {
      title: "90-Day Reflection",
      theme: "Completion, Embodiment, Transformation",
      opening:
        "This is a sacred moment. You have moved through a 90-day journey of art, spirit, and reflection. Look back with compassion, gratitude, and tenderness.",
      affirmation: {
        suggested:
          "I am whole, evolving, and deeply connected to my inner wisdom.",
        label: "final",
      },
    },
  };

  const cfg = configs[milestone];

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 pb-20">
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-purple-600 mb-2">
          Milestone Reflection
        </p>
        <h2 className="text-4xl text-amber-900">{cfg.title}</h2>
        <p className="text-lg text-amber-700 italic mt-1">Theme: {cfg.theme}</p>
        <div className="w-12 h-px bg-amber-400 mt-3" />
      </div>

      <p className="text-xs italic text-muted-foreground mb-8 border border-amber-200 rounded-xl px-4 py-3 bg-amber-50/40">
        All sections below are invitations, not requirements. Take what serves
        you.
      </p>

      <blockquote className="border-l-4 border-purple-300 pl-6 py-2 mb-10">
        <p className="text-lg text-foreground/80 leading-relaxed italic">
          {cfg.opening}
        </p>
      </blockquote>

      <div className="space-y-10">
        {milestone === 30 && (
          <>
            <Section title="Mood + Energy Noticing">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Color a circle or mandala divided into 30 sections. Choose a
                color each day to represent your overall mood. Today, fill in
                the 30th section and step back to observe patterns.
              </p>
              <JournalArea
                placeholder="What colors show up most often? Was there a rhythm to your energy? What surprised you?"
                minHeight="100px"
              />
            </Section>
            <Section title="Noticing: What has touched you?">
              <p className="text-sm text-muted-foreground">
                What has moved through you through the spiritual, art, and
                writing prompts?
              </p>
              <SoftAreas count={3} placeholder="Something that touched me..." />
            </Section>
            <Section title="What has shifted emotionally?">
              <JournalArea
                placeholder="A gentle reflection..."
                minHeight="120px"
              />
            </Section>
            <Section title="What has shifted spiritually?">
              <JournalArea
                placeholder="A gentle reflection..."
                minHeight="120px"
              />
            </Section>
            <Section title="Noticing your practice">
              <JournalArea
                placeholder="Which daily practices felt natural? Which ones were tender or challenging? Where did you notice healing or resistance?"
                minHeight="120px"
              />
            </Section>
            <Section title="An affirmation to carry forward">
              <AffirmationSection {...cfg.affirmation} />
            </Section>
          </>
        )}

        {milestone === 60 && (
          <>
            <Section title="Mood + Energy Noticing">
              <p className="text-sm text-muted-foreground">
                Gently compare your first 30 days with the second 30.
              </p>
              <JournalArea
                placeholder="What emotional patterns repeat? What feels different now compared to a month ago?"
                minHeight="120px"
              />
            </Section>
            <Section title="Integration Invitations">
              <JournalArea
                placeholder="What spiritual messages or symbols have shown up repeatedly? What emotions have softened, opened, or asked for attention? What creative themes emerged in your art?"
                minHeight="140px"
              />
            </Section>
            <Section title="What feels natural now?">
              <JournalArea
                placeholder="Which habits feel natural now? Which habits need gentle reinforcement? What new habits are forming because of this journal?"
                minHeight="120px"
              />
            </Section>
            <Section title="Moments of alignment">
              <p className="text-sm text-muted-foreground">
                A few moments when you felt completely yourself.
              </p>
              <SoftAreas count={3} placeholder="A moment of alignment..." />
            </Section>
            <Section title="What are you ready to release?">
              <JournalArea
                placeholder="What can you release moving into the last 30 days? What do you want to invite in?"
                minHeight="120px"
              />
            </Section>
            <Section title="An affirmation to carry forward">
              <AffirmationSection {...cfg.affirmation} />
            </Section>
          </>
        )}

        {milestone === 90 && (
          <>
            <Section title="90-Day Mood Mandala">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Create a 3-ring wheel (Days 1–30, 31–60, 61–90). Fill each ring
                with colors that represent your emotional journey.
              </p>
              <JournalArea
                placeholder="What emotional seasons did you experience? What did each ring teach you about yourself?"
                minHeight="120px"
              />
            </Section>
            <Section title="What has shifted in you?">
              <p className="text-sm text-muted-foreground">
                What changed in your mind, body, spirit, or habits?
              </p>
              <SoftAreas count={5} placeholder="A shift I've noticed..." />
            </Section>
            <Section title="Identity noticing">
              <JournalArea
                placeholder="Who were you when you started? Who are you now? What truth have you stepped into?"
                minHeight="140px"
              />
            </Section>
            <Section title="The practices you're keeping">
              <JournalArea
                placeholder="List the creative, spiritual, or writing habits you want to continue beyond this journal."
                minHeight="120px"
              />
            </Section>
            <Section title="Embodied wisdom">
              <JournalArea
                placeholder="What inner wisdom has become part of who you are?"
                minHeight="120px"
              />
            </Section>
            <Section title="Closing ritual">
              <ol className="space-y-2 text-sm text-foreground/80">
                {CLOSING_STEPS.map((step) => (
                  <li key={step} className="flex gap-3">
                    <span className="text-amber-400 mt-0.5 shrink-0">
                      &mdash;
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </Section>
            <Section title="Final affirmation">
              <AffirmationSection {...cfg.affirmation} />
            </Section>
            <Section title="A closing letter to yourself">
              <p className="text-sm text-muted-foreground">
                A heartfelt letter expressing gratitude, tenderness, and
                encouragement for your journey.
              </p>
              <JournalArea placeholder="Dear self..." minHeight="220px" />
            </Section>
          </>
        )}
      </div>
    </div>
  );
}
