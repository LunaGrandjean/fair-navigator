import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { ArrowLeft, Check } from "lucide-react";

export const Route = createFileRoute("/quiz")({
  head: () => ({
    meta: [
      { title: "Mini Quiz — Discover your profile" },
      { name: "description", content: "Quick quiz to personalize your school recommendations." },
    ],
  }),
  component: Quiz,
});

const questions = [
  {
    q: "How do you prefer to learn?",
    options: [
      { label: "Practical & hands-on", emoji: "🛠️" },
      { label: "Theoretical & academic", emoji: "📚" },
    ],
  },
  {
    q: "Which study length appeals to you?",
    options: [
      { label: "Short (2–3 years)", emoji: "⚡" },
      { label: "Long (5+ years)", emoji: "🎓" },
    ],
  },
  {
    q: "Where would you like to study?",
    options: [
      { label: "Big city", emoji: "🏙️" },
      { label: "Quiet campus", emoji: "🌳" },
    ],
  },
  {
    q: "What drives you most?",
    options: [
      { label: "Business & impact", emoji: "💼" },
      { label: "Tech & creation", emoji: "💡" },
    ],
  },
];

function Quiz() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selected, setSelected] = useState<number | null>(null);

  const total = questions.length;
  const progress = ((step + (selected !== null ? 1 : 0)) / total) * 100;
  const current = questions[step];

  const handleSelect = (i: number) => {
    setSelected(i);
    setTimeout(() => {
      const next = [...answers, i];
      setAnswers(next);
      setSelected(null);
      if (step + 1 < total) setStep(step + 1);
      else navigate({ to: "/dashboard" });
    }, 350);
  };

  return (
    <AppShell showNav={false}>
      <div className="flex flex-col h-full px-6 pt-4 pb-8 animate-fade-in">
        <div className="flex items-center gap-3">
          <button
            onClick={() => (step > 0 ? setStep(step - 1) : navigate({ to: "/journey" }))}
            className="tap-feedback w-10 h-10 rounded-full bg-muted flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <span className="text-xs font-medium text-muted-foreground">
            {step + 1}/{total}
          </span>
        </div>

        <div key={step} className="flex-1 flex flex-col justify-center animate-slide-up">
          <p className="text-xs uppercase tracking-wider text-primary font-bold">
            Question {step + 1}
          </p>
          <h1 className="mt-2 text-3xl font-bold leading-tight">{current.q}</h1>
          <p className="mt-2 text-sm text-muted-foreground">Pick what feels closest to you.</p>

          <div className="mt-8 space-y-3">
            {current.options.map((opt, i) => {
              const isSelected = selected === i;
              return (
                <button
                  key={opt.label}
                  onClick={() => handleSelect(i)}
                  className={`tap-feedback w-full p-5 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${
                    isSelected
                      ? "border-primary bg-primary-soft"
                      : "border-border bg-card hover:border-primary/40"
                  }`}
                >
                  <span className="text-3xl">{opt.emoji}</span>
                  <span className="flex-1 font-semibold">{opt.label}</span>
                  {isSelected && (
                    <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <p className="text-center text-[11px] text-muted-foreground">
          Your answers personalize your dashboard.
        </p>
      </div>
    </AppShell>
  );
}
