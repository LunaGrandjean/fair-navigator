import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState, type ComponentType } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  GraduationCap,
  BookOpen,
  Clock,
  Heart,
  Brain,
  MapPin,
  PartyPopper,
  Calculator,
  Coins,
  Atom,
  MoreHorizontal,
  Briefcase,
  Cpu,
  Stethoscope,
  Megaphone,
  Wrench,
} from "lucide-react";
import { setPendingOnboardingProfile } from "@/lib/session";
import type { Profile } from "@/lib/profile";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Build your profile — L'Étudiant" },
      { name: "description", content: "Personalize your fair journey in under a minute." },
    ],
  }),
  component: Onboarding,
});

const specialties = [
  { label: "Math", icon: Calculator },
  { label: "Economics", icon: Coins },
  { label: "Science", icon: Atom },
  { label: "Literature", icon: BookOpen },
  { label: "Other", icon: MoreHorizontal },
];

const interests = [
  { label: "Business / Management", icon: Briefcase },
  { label: "Engineering", icon: Wrench },
  { label: "Health", icon: Stethoscope },
  { label: "Arts / Communication", icon: Megaphone },
  { label: "IT / Tech", icon: Cpu },
];

type SingleStep = {
  type: "single";
  key: keyof StepData;
  title: string;
  icon: ComponentType<{ className?: string }>;
  options: { label: string; sub?: string }[];
};
type MultiStep = {
  type: "multi";
  key: keyof StepData;
  title: string;
  helper: string;
  icon: ComponentType<{ className?: string }>;
  options: { label: string; icon: ComponentType<{ className?: string }> }[];
};
type StepData = {
  level: string;
  specialties: string[];
  duration: string;
  interests: string[];
  learning: string;
  location: string;
};

const steps: (SingleStep | MultiStep)[] = [
  {
    type: "single",
    key: "level",
    title: "What is your current level?",
    icon: GraduationCap,
    options: [
      { label: "High school", sub: "Seconde / Première / Terminale" },
      { label: "Post-bac" },
      { label: "Reorientation" },
    ],
  },
  {
    type: "multi",
    key: "specialties",
    title: "What are your specialties?",
    helper: "Select one or more",
    icon: BookOpen,
    options: specialties,
  },
  {
    type: "single",
    key: "duration",
    title: "What kind of studies are you looking for?",
    icon: Clock,
    options: [
      { label: "Short", sub: "2–3 years" },
      { label: "Long", sub: "5+ years" },
      { label: "Not sure" },
    ],
  },
  {
    type: "multi",
    key: "interests",
    title: "What fields interest you most?",
    helper: "Pick all that spark your curiosity",
    icon: Heart,
    options: interests,
  },
  {
    type: "single",
    key: "learning",
    title: "How do you prefer to learn?",
    icon: Brain,
    options: [
      { label: "Practical", sub: "Hands-on" },
      { label: "Theoretical" },
      { label: "Mixed" },
    ],
  },
  {
    type: "single",
    key: "location",
    title: "Where would you like to study?",
    icon: MapPin,
    options: [
      { label: "Big city" },
      { label: "Medium city" },
      { label: "Campus environment" },
      { label: "No preference" },
    ],
  },
];

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [data, setData] = useState<Partial<StepData>>({});
  const total = steps.length;

  const current = steps[step];
  const value = data[current.key];
  const canNext = current.type === "single" ? !!value : Array.isArray(value) && value.length > 0;

  const persistAndShowDone = () => {
    const profile: Profile = {
      level: data.level,
      specialties: data.specialties,
      duration: data.duration,
      interests: data.interests,
      learning: data.learning,
      location: data.location,
    };
    setPendingOnboardingProfile(profile);
    setDone(true);
  };

  const next = () => {
    if (step < total - 1) setStep(step + 1);
    else persistAndShowDone();
  };
  const skip = () => {
    if (step < total - 1) setStep(step + 1);
    else persistAndShowDone();
  };
  const back = () => {
    if (step === 0) navigate({ to: "/welcome" });
    else setStep(step - 1);
  };

  if (done) {
    return (
      <AppShell showNav={false}>
        <div className="flex flex-col h-full px-6 pt-8 pb-8 animate-fade-in items-center justify-center text-center">
          <div className="w-24 h-24 rounded-full bg-primary-soft flex items-center justify-center mb-6 animate-slide-up">
            <PartyPopper className="w-12 h-12 text-primary" />
          </div>
          <h1 className="text-2xl font-bold">Your profile is ready 🎉</h1>
          <p className="mt-3 text-sm text-muted-foreground max-w-[280px]">
            Declared preferences will combine with your fair activity for smarter matches on your
            dashboard.
          </p>
          <button
            onClick={() => navigate({ to: "/register" })}
            className="tap-feedback mt-10 w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-soft"
          >
            Start my fair journey
          </button>
        </div>
      </AppShell>
    );
  }

  const Icon = current.icon;

  return (
    <AppShell showNav={false}>
      <div className="flex flex-col h-full px-6 pt-4 pb-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={back}
            className="tap-feedback w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                Step {step + 1} / {total}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {Math.round(((step + 1) / total) * 100)}%
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-muted overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${((step + 1) / total) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question */}
        <div key={step} className="mt-6 animate-slide-up">
          <div className="w-12 h-12 rounded-2xl bg-primary-soft text-primary flex items-center justify-center mb-3">
            <Icon className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold leading-tight">{current.title}</h1>
          {current.type === "multi" && (
            <p className="text-xs text-muted-foreground mt-1">{current.helper}</p>
          )}
        </div>

        {/* Options */}
        <div className="flex-1 overflow-y-auto mt-5 -mx-1 px-1 min-h-0">
          {current.type === "single" ? (
            <div className="space-y-2.5">
              {current.options.map((opt) => {
                const selected = value === opt.label;
                return (
                  <button
                    type="button"
                    key={opt.label}
                    onClick={() => setData({ ...data, [current.key]: opt.label })}
                    className={`tap-feedback w-full text-left p-4 rounded-2xl border-2 transition-all flex items-center justify-between ${
                      selected ? "border-primary bg-primary-soft" : "border-border bg-card"
                    }`}
                  >
                    <div>
                      <p className={`text-sm font-semibold ${selected ? "text-primary" : ""}`}>
                        {opt.label}
                      </p>
                      {opt.sub && (
                        <p className="text-[11px] text-muted-foreground mt-0.5">{opt.sub}</p>
                      )}
                    </div>
                    {selected && (
                      <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {current.options.map((opt) => {
                const arr = (value as string[]) || [];
                const selected = arr.includes(opt.label);
                const ItemIcon = opt.icon;
                return (
                  <button
                    type="button"
                    key={opt.label}
                    onClick={() => {
                      const newArr = selected
                        ? arr.filter((x) => x !== opt.label)
                        : [...arr, opt.label];
                      setData({ ...data, [current.key]: newArr });
                    }}
                    className={`tap-feedback inline-flex items-center gap-1.5 px-3 py-2 rounded-full border-2 text-xs font-medium transition-all ${
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground"
                    }`}
                  >
                    <ItemIcon className="w-3.5 h-3.5" />
                    {opt.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="pt-4 space-y-2 shrink-0">
          <button
            type="button"
            onClick={next}
            disabled={!canNext}
            className="tap-feedback flex items-center justify-center gap-2 w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-soft disabled:opacity-40 disabled:shadow-none"
          >
            {step === total - 1 ? "Finish" : "Continue"}
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={skip}
            className="tap-feedback w-full h-10 text-xs text-muted-foreground font-medium"
          >
            Skip for now
          </button>
        </div>
      </div>
    </AppShell>
  );
}
