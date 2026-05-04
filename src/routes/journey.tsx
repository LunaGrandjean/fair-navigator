import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { QrCode, Brain, ChevronRight, Building2, Briefcase, Cpu, Award } from "lucide-react";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Your Fair Journey" },
      { name: "description", content: "Track stands you've visited and continue your fair experience." },
    ],
  }),
  component: Journey,
});

const visited = [
  { name: "HEC Paris", tag: "Business", icon: Briefcase, color: "bg-[oklch(0.95_0.05_25)] text-primary" },
  { name: "Epitech", tag: "Engineering", icon: Cpu, color: "bg-[oklch(0.95_0.04_240)] text-[oklch(0.45_0.2_240)]" },
  { name: "Sciences Po", tag: "Politics", icon: Building2, color: "bg-[oklch(0.95_0.05_140)] text-[oklch(0.45_0.18_140)]" },
];

function Journey() {
  const progress = 60;
  return (
    <AppShell>
      <div className="px-6 pt-4 pb-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Hello explorer 👋</p>
            <h1 className="text-2xl font-bold mt-0.5">Your Fair Journey</h1>
          </div>
          <div className="w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">
            JT
          </div>
        </div>

        {/* Progress card */}
        <div className="mt-5 rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.5_0.24_15)] p-5 text-primary-foreground shadow-soft">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs opacity-80">Your badge</p>
                <p className="font-semibold text-sm">Explorer 🔍</p>
              </div>
            </div>
            <span className="text-2xl font-bold">3/5</span>
          </div>
          <div className="mt-4 h-2 rounded-full bg-white/20 overflow-hidden">
            <div className="h-full bg-white rounded-full animate-progress" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs opacity-90">You've explored 3 of 5 recommended categories. Keep going!</p>
        </div>

        {/* Quick actions */}
        <h2 className="mt-6 text-sm font-semibold text-muted-foreground uppercase tracking-wide">Quick actions</h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <button className="tap-feedback rounded-2xl bg-card border border-border p-4 text-left shadow-card">
            <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-3">
              <QrCode className="w-5 h-5" />
            </div>
            <p className="font-semibold text-sm">Scan a stand</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Add to your journey</p>
          </button>
          <Link
            to="/quiz"
            className="tap-feedback rounded-2xl bg-card border border-border p-4 text-left shadow-card block"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-3">
              <Brain className="w-5 h-5" />
            </div>
            <p className="font-semibold text-sm">Discover profile</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">Mini quiz · 1 min</p>
          </Link>
        </div>

        {/* Visited */}
        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Visited stands</h2>
          <span className="text-xs text-primary font-medium">{visited.length} stands</span>
        </div>
        <ul className="mt-3 space-y-2.5">
          {visited.map(({ name, tag, icon: Icon, color }, i) => (
            <li
              key={name}
              className="tap-feedback flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border shadow-card animate-slide-up"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{name}</p>
                <p className="text-xs text-muted-foreground">{tag}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </li>
          ))}
        </ul>

        <Link
          to="/dashboard"
          className="mt-6 tap-feedback flex items-center justify-center w-full h-12 rounded-2xl bg-foreground text-background font-medium text-sm"
        >
          See my dashboard
        </Link>
      </div>
    </AppShell>
  );
}
