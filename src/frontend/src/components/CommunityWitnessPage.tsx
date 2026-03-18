import { useState } from "react";
import { toast } from "sonner";

const placeholderOfferings = [
  {
    id: 1,
    text: "Today I sat with the art prompt longer than I expected. Something about drawing roots made me cry — in the gentlest way. I am grateful for that softening.",
    when: "a little while ago",
  },
  {
    id: 2,
    text: "Week 3's theme on letting go arrived at exactly the right time. I didn't write anything. I just sat with the prompt and breathed. That felt like enough.",
    when: "recently",
  },
  {
    id: 3,
    text: 'I keep returning to the question: "Who am I remembering today?" It follows me into the day like a quiet companion. Thank you for this space.',
    when: "sometime this week",
  },
];

export default function CommunityWitnessPage() {
  const [offering, setOffering] = useState("");
  const [shared, setShared] = useState(false);

  const handleShare = () => {
    if (!offering.trim()) return;
    toast.success("Received with care", {
      description: "Your offering has been witnessed.",
    });
    setOffering("");
    setShared(true);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 pb-20">
      <div className="mb-8">
        <p className="text-xs tracking-widest uppercase text-amber-600 mb-2">
          Optional Space
        </p>
        <h2 className="text-4xl text-amber-900">A Space for Witnessing</h2>
        <p className="text-base text-foreground/65 mt-3 leading-relaxed italic">
          Sharing here is an act of offering, not performance. You are welcome
          to witness others and be witnessed in return.
        </p>
        <div className="w-12 h-px bg-amber-400 mt-4" />
      </div>

      {/* Boundary note */}
      <div className="bg-purple-50/60 border border-purple-200/60 rounded-2xl px-6 py-4 mb-8">
        <p className="text-sm text-purple-800/70 leading-relaxed">
          There are no comments, ratings, or evaluations here. Only
          compassionate presence.
        </p>
      </div>

      {/* Offering area */}
      <div className="space-y-4 mb-12">
        <label
          htmlFor="community-offering"
          className="block text-base text-amber-800 leading-relaxed"
        >
          If you feel moved to share something from your journey today, offer it
          here.
        </label>
        <textarea
          id="community-offering"
          value={offering}
          onChange={(e) => setOffering(e.target.value)}
          placeholder="Whatever wishes to be witnessed..."
          data-ocid="community.textarea"
          className="w-full min-h-[140px] p-4 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground/50 resize-y focus:outline-none focus:ring-2 focus:ring-amber-300 text-sm leading-relaxed"
        />
        {shared && (
          <p
            className="text-sm italic text-amber-700/70 text-center"
            data-ocid="community.success_state"
          >
            Your offering has been received with care. ✦
          </p>
        )}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleShare}
            disabled={!offering.trim()}
            data-ocid="community.submit_button"
            className="bg-amber-600/80 hover:bg-amber-700 disabled:opacity-40 text-amber-50 px-8 py-3 rounded-full text-sm font-medium transition-colors shadow-sm"
          >
            Share with the circle
          </button>
        </div>
      </div>

      {/* Witnessing feed */}
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-widest text-amber-600 mb-4">
          Offerings from the circle
        </p>
        {placeholderOfferings.map((item) => (
          <div
            key={item.id}
            className="bg-amber-50/60 border border-amber-200/70 rounded-2xl p-5 space-y-3"
            data-ocid={`community.item.${item.id}`}
          >
            <p className="text-sm text-foreground/75 leading-relaxed italic">
              &ldquo;{item.text}&rdquo;
            </p>
            <p className="text-xs text-muted-foreground/50">{item.when}</p>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="mt-12 text-center">
        <p className="text-sm italic text-muted-foreground/60 leading-relaxed">
          Participation is entirely optional. Simply being here is enough.
        </p>
      </div>
    </div>
  );
}
