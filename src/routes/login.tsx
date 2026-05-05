import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useState } from "react";
import { ArrowLeft, KeyRound, User } from "lucide-react";
import { login } from "@/lib/session";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Connexion — L'Étudiant" },
      { name: "description", content: "Accède à ton parcours salon avec ton compte démo." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const ok = login(username, password);
    if (!ok) {
      setError("Identifiant ou mot de passe incorrect.");
      return;
    }
    navigate({ to: "/journey" });
  };

  return (
    <AppShell showNav={false}>
      <div className="flex flex-col h-full px-6 pt-4 pb-8 animate-fade-in">
        <button
          type="button"
          onClick={() => navigate({ to: "/welcome" })}
          className="tap-feedback w-10 h-10 rounded-full bg-muted flex items-center justify-center shrink-0"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="mt-6">
          <h1 className="text-2xl font-bold leading-tight">Log in</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            POC : comptes stockés sur cet appareil uniquement (sans serveur).
          </p>
        </div>

        <form onSubmit={submit} className="mt-8 flex-1 flex flex-col space-y-4">
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
                placeholder="prenom.nom"
                className="w-full h-13 py-4 pl-11 pr-4 rounded-2xl bg-muted border border-transparent focus:border-primary focus:bg-card outline-none text-sm transition-colors"
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
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-13 py-4 pl-11 pr-4 rounded-2xl bg-muted border border-transparent focus:border-primary focus:bg-card outline-none text-sm transition-colors"
              />
            </div>
          </label>

          {error && (
            <p className="text-xs text-destructive font-medium" role="alert">
              {error}
            </p>
          )}

          <div className="flex-1" />

          <button
            type="submit"
            className="tap-feedback w-full h-14 rounded-2xl bg-primary text-primary-foreground font-semibold shadow-soft"
          >
            Continuer
          </button>
          <p className="text-center text-xs text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link to="/onboarding" className="text-primary font-semibold">
              Create an account
            </Link>
          </p>
        </form>
      </div>
    </AppShell>
  );
}
