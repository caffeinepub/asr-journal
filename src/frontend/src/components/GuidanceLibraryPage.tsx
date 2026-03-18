import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const dailyStructureItems = [
  {
    title: "Spiritual Prompt",
    body: "A reflective question that helps you explore your inner world, intuition, values, or emotions.",
  },
  {
    title: "Art Prompt",
    body: "A non-verbal expression practice using shapes, color, or imagery. No skill required — just exploration.",
  },
  {
    title: "Writing Prompt",
    body: "A grounding exercise for clarity and emotional integration.",
  },
  {
    title: "Gratitude Anchor",
    body: "A closing moment to return to appreciation and presence.",
  },
];

const sections = [
  {
    id: "daily-structure",
    icon: "📋",
    title: "Daily Practice Guide",
    subtitle: "How to use this journal — from Segment 1",
    isDailyStructure: true,
  },
  {
    id: "lessons",
    icon: "🕯️",
    title: "Lessons",
    subtitle: "Gentle teachings to explore when you feel called.",
    items: [
      {
        title: "The Art of Showing Up",
        body: "Presence is the practice. Not perfection, not completion — just the act of arriving. Each time you open this space, you have already succeeded.",
      },
      {
        title: "Returning to Your Breath",
        body: "The breath is your most faithful anchor. Whenever you feel scattered, overwhelmed, or unsure — return here. Three slow breaths. You are already home.",
      },
      {
        title: "What Authenticity Asks of Us",
        body: "Authenticity doesn't demand drama or grand revelation. It is a quiet agreement with yourself — to notice, to feel, and to let what is true be enough.",
      },
    ],
  },
  {
    id: "reflections",
    icon: "🌿",
    title: "Reflections",
    subtitle: "Open-ended invitations to sit with.",
    items: [
      {
        title: "What does your authentic self need today?",
        body: "No answer required — only the willingness to ask. Sit quietly, breathe, and see what arises without forcing a response.",
      },
      {
        title: "Where in your body do you feel most at home?",
        body: "We carry wisdom in our bodies, often unheard. A hand on your heart, a deep breath into the belly — notice where ease lives in you.",
      },
      {
        title: "What are you learning to release?",
        body: "Releasing is not forgetting. It is an act of love — trusting that there is more space when we stop holding so tightly.",
      },
    ],
  },
  {
    id: "rituals",
    icon: "🌸",
    title: "Rituals",
    subtitle: "Small, sacred practices to try.",
    items: [
      {
        title: "Morning Arrival Practice",
        body: "Before reaching for your phone, take three conscious breaths. Place a hand on your heart. Ask: what does this day invite me to notice? That's all. You're ready.",
      },
      {
        title: "Evening Gratitude Breath",
        body: "Before sleep, recall one small thing that brought you ease today. Not gratitude as a task — but a single, real moment. Breathe it in. Let it settle.",
      },
      {
        title: "Weekly Art Release Ritual",
        body: "At the end of each week, look at what you created — writing, art, or simply a sense of having been present. Offer it a wordless acknowledgment. That was enough.",
      },
    ],
  },
  {
    id: "audio",
    icon: "🎧",
    title: "Audio",
    subtitle: "Guided presence exercises.",
    items: [
      {
        title: "Coming soon",
        body: "A space for guided audio will be added here — gentle presence exercises, breath practices, and soft soundscapes to support your journey.",
      },
    ],
  },
];

export default function GuidanceLibraryPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-10 pb-20">
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-amber-600 mb-2">
          Optional Support
        </p>
        <h2 className="text-4xl text-amber-900 font-light">
          Core Guidance Library
        </h2>
        <p className="text-base text-foreground/60 mt-3 leading-relaxed italic">
          All guidance is optional. Notice what resonates. Participate in your
          own way.
        </p>
        <div className="w-12 h-px bg-amber-400 mt-4" />
      </div>

      <Accordion type="multiple" className="space-y-3">
        {sections.map((section) => (
          <AccordionItem
            key={section.id}
            value={section.id}
            className="border border-border/60 rounded-2xl overflow-hidden px-0"
            data-ocid={`guidance.${section.id}.panel`}
          >
            <AccordionTrigger
              className="px-6 py-4 hover:no-underline"
              data-ocid={`guidance.${section.id}.toggle`}
            >
              <div className="flex items-center gap-3 text-left">
                <span className="text-xl" aria-hidden="true">
                  {section.icon}
                </span>
                <div>
                  <p className="text-base font-medium text-amber-900">
                    {section.title}
                  </p>
                  <p className="text-xs text-muted-foreground/60 italic font-normal mt-0.5">
                    {section.subtitle}
                  </p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-5">
              {section.isDailyStructure ? (
                <div>
                  <p className="text-sm text-foreground/65 leading-relaxed mb-5">
                    Daily — Reflect on the guided daily spiritual focus. Respond
                    visually, symbolically, or abstractly in the art box.
                    Journal freely using the writing prompt. End with one
                    meaningful note of gratitude.
                  </p>
                  <div className="space-y-4 mb-5">
                    {dailyStructureItems.map((item) => (
                      <div
                        key={item.title}
                        className="bg-amber-50/50 rounded-xl p-4 border border-amber-100/60"
                      >
                        <p className="text-sm font-medium text-amber-800 mb-1.5">
                          {item.title}
                        </p>
                        <p className="text-sm text-foreground/65 leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm italic text-amber-800/60 leading-relaxed">
                    Weekly theme, intentions, and bonus reflection questions
                    accompany each week. Every 30 days, a reflective spread
                    captures insights, resistance, or inner shifts. Spend as
                    much or as little time with each as you need. The practice
                    is sacred simply because you showed up.
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-xs italic text-muted-foreground/50 mb-4">
                    All items are optional. Skip what doesn&apos;t resonate.
                  </p>
                  <div className="space-y-4">
                    {section.items?.map((item) => (
                      <div
                        key={item.title}
                        className="bg-amber-50/50 rounded-xl p-4 border border-amber-100/60"
                      >
                        <p className="text-sm font-medium text-amber-800 mb-1.5">
                          {item.title}
                        </p>
                        <p className="text-sm text-foreground/65 leading-relaxed">
                          {item.body}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 text-center">
        <p className="text-sm italic text-muted-foreground/45">
          Return to this library whenever you feel called. There is no order, no
          requirement.
        </p>
      </div>
    </div>
  );
}
