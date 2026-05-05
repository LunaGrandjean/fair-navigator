import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { LogIn, UserPlus, Sparkles } from "lucide-react";
import { clearProfile } from "@/lib/profile";
import { setGuestSession } from "@/lib/session";

export const Route = createFileRoute("/welcome")({
  head: () => ({
    meta: [
      { title: "L'Étudiant — Connexion" },
      { name: "description", content: "Start your personalized fair journey." },
    ],
  }),
  component: Welcome,
});

function Welcome() {
  const navigate = useNavigate();

  const guest = () => {
    clearProfile();
    setGuestSession();
    navigate({ to: "/journey" });
  };

  return (
    <AppShell showNav={false}>
      <div className="flex flex-col h-full px-6 pt-8 pb-8 animate-fade-in">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
            E
          </div>
          <div>
            <p className="text-xs text-muted-foreground leading-none">Salon</p>
            <p className="text-sm font-bold leading-none mt-1">L'Étudiant</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="relative mb-8">
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-scan-pulse" />
            <div className="relative w-32 h-32 rounded-[2rem] bg-gradient-to-br from-primary to-[oklch(0.5_0.24_15)] flex items-center justify-center shadow-soft text-primary-foreground font-bold text-5xl">
              E
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight leading-tight">
            Welcome to
            <br />
            <span className="text-primary">L'Étudiant</span>
          </h1>
          <p className="mt-3 text-muted-foreground text-sm max-w-[280px]">
            Start your personalized fair journey
          </p>
        </div>

        <div className="space-y-3">
          <button
            type="button"
            onClick={() => navigate({ to: "/login" })}
            className="tap-feedback flex items-center justify-center gap-2 w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-soft"
          >
            <LogIn className="w-5 h-5" /> Log in
          </button>
          <Link
            to="/onboarding"
            className="tap-feedback flex items-center justify-center gap-2 w-full h-14 rounded-2xl bg-primary-soft text-primary font-semibold"
          >
            <UserPlus className="w-5 h-5" /> Create an account
          </Link>
          <button
            type="button"
            onClick={guest}
            className="tap-feedback flex items-center justify-center gap-1.5 w-full h-10 text-xs text-muted-foreground font-medium"
          >
            <Sparkles className="w-3.5 h-3.5" /> Continue as guest (demo mode)
          </button>
          <Link
            to="/"
            className="tap-feedback block text-center text-xs text-primary font-medium pt-2"
          >
            Explorer formations & écoles
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
