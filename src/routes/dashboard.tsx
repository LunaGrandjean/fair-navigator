import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Briefcase, Cpu, Building2, GraduationCap, Send, ArrowRight, Sparkles } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your Orientation Dashboard" },
      { name: "description", content: "Your personalized school matches and next steps." },
    ],
  }),
  component: Dashboard,
});

const tags = ["Business-oriented", "Practical learning", "Urban environment", "Short studies"];
const visited = [
  { name: "HEC Paris", icon: Briefcase },
  { name: "Epitech", icon: Cpu },
  { name: "Sciences Po", icon: Building2 },
];
const recos = [
  { name: "ESCP Business School", score: 92, why: "Matches your interest in marketing & international business." },
  { name: "EM Lyon", score: 87, why: "Practical learning approach with strong entrepreneurship track." },
  { name: "Kedge Business School", score: 81, why: "Short Bachelor programs in a vibrant city campus." },
];

function Dashboard() {
  return (
    <AppShell>
      <div className="px-6 pt-5 pb-6 animate-fade-in space-y-6">
        <div>
          <p className="text-xs text-primary font-semibold uppercase tracking-wider">Post-fair</p>
          <h1 className="text-2xl font-bold mt-1">Your Orientation Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Built from your visits and quiz answers.
          </p>
        </div>

        {/* Profile */}
        <section className="rounded-2xl bg-card border border-border p-5 shadow-card">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-primary" />
            <h2 className="font-semibold text-sm">Your Profile</h2>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((t) => (
              <span
                key={t}
                className="px-3 py-1.5 rounded-full bg-primary-soft text-primary text-xs font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* Visited */}
        <section>
          <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary" /> Schools you visited
          </h2>
          <div className="grid grid-cols-3 gap-2">
            {visited.map(({ name, icon: Icon }) => (
              <div
                key={name}
                className="rounded-2xl bg-card border border-border p-3 flex flex-col items-center text-center shadow-card"
              >
                <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-2">
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-[11px] font-medium leading-tight">{name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Recommendations */}
        <section>
          <h2 className="font-semibold text-sm mb-3">Recommended for you</h2>
          <ul className="space-y-3">
            {recos.map((r, i) => (
              <li
                key={r.name}
                className="rounded-2xl bg-card border border-border p-4 shadow-card animate-slide-up"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{r.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-snug">{r.why}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary leading-none">{r.score}%</div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">match</p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${r.score}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Next steps */}
        <section className="space-y-2.5">
          <h2 className="font-semibold text-sm">Next steps</h2>
          <button className="tap-feedback w-full flex items-center justify-between p-4 rounded-2xl bg-card border border-border shadow-card">
            <span className="text-sm font-medium">Explore programs</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </button>
          <button className="tap-feedback w-full flex items-center justify-between p-4 rounded-2xl bg-card border border-border shadow-card">
            <span className="text-sm font-medium">Get contacted by schools</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </button>
        </section>

        <Link
          to="/save"
          className="tap-feedback flex items-center justify-center gap-2 w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-soft"
        >
          <Send className="w-4 h-4" /> Save & email my dashboard
        </Link>
      </div>
    </AppShell>
  );
}
