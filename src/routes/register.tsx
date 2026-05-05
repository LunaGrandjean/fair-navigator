import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useEffect, useState } from "react";
import { ArrowLeft, UserPlus, KeyRound, User, Calendar } from "lucide-react";
import {
  clearPendingOnboardingProfile,
  getPendingOnboardingProfile,
  registerAccount,
} from "@/lib/session";
import type { Profile } from "@/lib/profile";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Créer ton accès — L'Étudiant" },
      {
        name: "description",
        content: "Choisis un identifiant pour retrouver ton profil sur cet appareil.",
      },
    ],
  }),
  component: Register,
});

function Register() {
  const navigate = useNavigate();
  const [pending, setPending] = useState<Profile | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const p = getPendingOnboardingProfile();
    if (!p || Object.keys(p).length === 0) {
      navigate({ to: "/onboarding" });
      return;
    }
    setPending(p);
  }, [navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pending) return;
    setError(null);
    try {
      registerAccount(username, password, {
        ...pending,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        birthDate: birthDate.trim(),
        account: "user",
      });
      clearPendingOnboardingProfile();
      navigate({ to: "/journey" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Impossible de créer le compte.");
    }
  };

  if (!pending) {
    return (
      <AppShell showNav={false}>
        <div className="flex flex-1 items-center justify-center px-6 text-sm text-muted-foreground">
          Chargement…
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell showNav={false}>
      <div className="flex flex-col h-full px-6 pt-4 pb-8 animate-fade-in">
        <button
          type="button"
          onClick={() => navigate({ to: "/onboarding" })}
          className="tap-feedback w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="mt-6">
          <div className="w-12 h-12 rounded-2xl bg-primary-soft text-primary flex items-center justify-center mb-3">
            <UserPlus className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold leading-tight">Ton identité</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Puis choisis un identifiant et un mot de passe pour retrouver ton profil sur cet
            appareil (démo locale).
          </p>
        </div>

        <form
          onSubmit={submit}
          className="mt-6 flex-1 flex flex-col space-y-3.5 overflow-y-auto min-h-0"
        >
          <label className="block">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Prénom
            </span>
            <input
              required
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              autoComplete="given-name"
              placeholder="Marie"
              className="mt-1.5 w-full h-12 px-4 rounded-2xl bg-muted border border-transparent focus:border-primary focus:bg-card outline-none text-sm transition-colors"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Nom
            </span>
            <input
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              autoComplete="family-name"
              placeholder="Dupont"
              className="mt-1.5 w-full h-12 px-4 rounded-2xl bg-muted border border-transparent focus:border-primary focus:bg-card outline-none text-sm transition-colors"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
              <Calendar className="w-3 h-3" /> Date de naissance
            </span>
            <input
              type="date"
              required
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="mt-1.5 w-full h-12 px-4 rounded-2xl bg-muted border border-transparent focus:border-primary focus:bg-card outline-none text-sm transition-colors"
            />
          </label>

          <div className="border-t border-border pt-4 mt-1 space-y-3.5">
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Identifiant
              </span>
              <div className="mt-1.5 relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  minLength={2}
                  placeholder="ex. alex.salon"
                  className="w-full h-12 py-3 pl-11 pr-4 rounded-2xl bg-muted border border-transparent focus:border-primary focus:bg-card outline-none text-sm transition-colors"
                />
              </div>
            </label>
            <label className="block">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Mot de passe
              </span>
              <div className="mt-1.5 relative">
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={4}
                  placeholder="Minimum 4 caractères"
                  className="w-full h-12 py-3 pl-11 pr-4 rounded-2xl bg-muted border border-transparent focus:border-primary focus:bg-card outline-none text-sm transition-colors"
                />
              </div>
            </label>
          </div>

          {error && (
            <p className="text-xs text-destructive font-medium" role="alert">
              {error}
            </p>
          )}

          <div className="flex-1 min-h-2" />

          <button
            type="submit"
            className="tap-feedback w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-soft shrink-0"
          >
            Créer mon compte et commencer
          </button>
          <p className="text-center text-xs text-muted-foreground shrink-0 pb-1">
            Déjà inscrit ?{" "}
            <Link to="/login" className="text-primary font-semibold">
              Log in
            </Link>
          </p>
        </form>
      </div>
    </AppShell>
  );
}
