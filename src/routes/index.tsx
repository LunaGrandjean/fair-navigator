import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { QrCode, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "L'Étudiant Fair — Welcome" },
      { name: "description", content: "Scan your badge to begin your personalized fair experience." },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  return (
    <AppShell showNav={false}>
      <div className="flex flex-col h-full px-6 pt-8 pb-8 animate-fade-in">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">L</div>
          <div>
            <p className="text-xs text-muted-foreground leading-none">Salon</p>
            <p className="text-sm font-bold leading-none mt-1">L'Étudiant</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="relative mb-10">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-scan-pulse" />
            <div className="relative w-44 h-44 rounded-[2rem] bg-gradient-to-br from-primary to-[oklch(0.5_0.24_15)] flex items-center justify-center shadow-soft">
              <QrCode className="w-20 h-20 text-primary-foreground" strokeWidth={1.5} />
              <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-primary-foreground/80 rounded-tl-2xl" />
              <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-primary-foreground/80 rounded-tr-2xl" />
              <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-primary-foreground/80 rounded-bl-2xl" />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-primary-foreground/80 rounded-br-2xl" />
            </div>
          </div>

          <h1 className="text-3xl font-bold tracking-tight leading-tight">
            Welcome to your<br/>
            <span className="text-primary">Fair Experience</span>
          </h1>
          <p className="mt-3 text-muted-foreground text-sm max-w-[260px]">
            Scan your badge to unlock a personalized journey through the salon.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            to="/journey"
            className="tap-feedback flex items-center justify-center gap-2 w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-soft"
          >
            <QrCode className="w-5 h-5" /> Scan my badge
          </Link>
          <Link
            to="/journey"
            className="tap-feedback flex items-center justify-center gap-2 w-full h-12 rounded-2xl bg-primary-soft text-primary font-medium"
          >
            <Sparkles className="w-4 h-4" /> Continue with demo QR
          </Link>
          <p className="text-[11px] text-center text-muted-foreground pt-1">
            No account needed · Free during the event
          </p>
        </div>
      </div>
    </AppShell>
  );
}
