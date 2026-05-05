import { createFileRoute, Link, useNavigate, useLocation } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useEffect, useState } from "react";
import {
  Brain,
  ChevronRight,
  Building2,
  Award,
  LogOut,
  UserCircle,
  Heart,
  ScanLine,
} from "lucide-react";
import { getProfile } from "@/lib/profile";
import { getSession, logout } from "@/lib/session";
import { initialsFromName } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { getInstitution, getCatalogFormation } from "@/lib/fair-catalog";
import { completedJourneySteps, journeySteps, getJourneyState } from "@/lib/journey-state";

export const Route = createFileRoute("/journey")({
  head: () => ({
    meta: [
      { title: "Your Fair Journey" },
      {
        name: "description",
        content: "Track stands you've visited and continue your fair experience.",
      },
    ],
  }),
  component: Journey,
});

function Journey() {
  const navigate = useNavigate();
  const location = useLocation();
  const [, tick] = useState(0);
  const refresh = () => tick((n) => n + 1);

  useEffect(() => {
    refresh();
  }, [location.pathname]);

  const profile = getProfile();
  const session = getSession();
  const j = getJourneyState(profile);
  const completed = completedJourneySteps(profile, session);
  const steps = journeySteps(profile, session);
  const compactBadge = completed >= 1;

  const scannedIds = j.scannedInstitutionIds ?? [];
  const favoriteIds = j.favoriteFormationIds ?? [];

  const [menuOpen, setMenuOpen] = useState(false);
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [sessionKind, setSessionKind] = useState<"none" | "guest" | "registered">("none");
  const [initials, setInitials] = useState("EX");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const refreshProfile = () => {
    const s = getSession();
    const p = getProfile();
    if (s.kind === "registered") {
      setSessionKind("registered");
      setFirstName(p.firstName?.trim() || "");
      setLastName(p.lastName?.trim() || "");
      setInitials(initialsFromName(p.firstName, p.lastName, "E"));
    } else if (s.kind === "guest") {
      setSessionKind("guest");
      setFirstName("");
      setLastName("");
      setInitials(initialsFromName(undefined, undefined, "GV"));
    } else {
      setSessionKind("none");
      setInitials("?");
    }
  };

  useEffect(() => {
    refreshProfile();
  }, []);

  useEffect(() => {
    const onVis = () => refresh();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const hello =
    sessionKind === "registered" && firstName
      ? `Hello ${firstName} 👋`
      : sessionKind === "guest"
        ? "Hello explorer 👋"
        : "Hello 👋";

  const doLogout = () => {
    logout();
    setConfirmLogout(false);
    setMenuOpen(false);
    refreshProfile();
    refresh();
    navigate({ to: "/welcome" });
  };

  const pct = (completed / 5) * 100;

  return (
    <AppShell>
      <div className="px-6 pt-4 pb-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted-foreground">{hello}</p>
            <h1 className="text-2xl font-bold mt-0.5">Your Fair Journey</h1>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="tap-feedback w-11 h-11 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm shrink-0"
            aria-label="Ouvrir le menu profil"
          >
            {initials}
          </button>
        </div>

        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetContent side="bottom" className="rounded-t-3xl border-t px-6 pb-8 pt-2">
            <SheetHeader className="text-left space-y-1 pb-4">
              <SheetTitle className="flex items-center gap-2">
                <UserCircle className="w-5 h-5 text-primary" />
                {sessionKind === "registered" ? "Mon profil" : "Session"}
              </SheetTitle>
              <SheetDescription className="text-left">
                {sessionKind === "registered"
                  ? "Informations liées à ton compte sur cet appareil."
                  : "Tu parcours le salon en mode démo invité."}
              </SheetDescription>
            </SheetHeader>

            {sessionKind === "registered" && (
              <div className="space-y-3 pb-6">
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                    Prénom
                  </p>
                  <p className="text-base font-semibold mt-0.5">{firstName || "—"}</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                    Nom
                  </p>
                  <p className="text-base font-semibold mt-0.5">{lastName || "—"}</p>
                </div>
              </div>
            )}

            {sessionKind === "guest" && (
              <p className="text-sm text-muted-foreground pb-6">
                Mode invité — crée un compte pour tout enregistrer.
              </p>
            )}

            {sessionKind === "none" && (
              <p className="text-sm text-muted-foreground pb-4">
                Connecte-toi pour retrouver ton profil et ton parcours sur cet appareil.
              </p>
            )}

            {sessionKind === "none" && (
              <Button
                type="button"
                className="w-full h-12 rounded-2xl mb-3"
                onClick={() => {
                  setMenuOpen(false);
                  navigate({ to: "/welcome" });
                }}
              >
                Connexion
              </Button>
            )}

            {sessionKind === "registered" ? (
              <Button
                type="button"
                variant="outline"
                className="w-full h-12 rounded-2xl border-destructive/40 text-destructive hover:bg-destructive/10"
                onClick={() => {
                  setMenuOpen(false);
                  setConfirmLogout(true);
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Se déconnecter
              </Button>
            ) : (
              <Button
                type="button"
                className="w-full h-12 rounded-2xl"
                onClick={() => {
                  setMenuOpen(false);
                  navigate({ to: "/welcome" });
                }}
              >
                Connexion / créer un compte
              </Button>
            )}
          </SheetContent>
        </Sheet>

        <AlertDialog open={confirmLogout} onOpenChange={setConfirmLogout}>
          <AlertDialogContent className="rounded-2xl max-w-[min(92vw,380px)]">
            <AlertDialogHeader>
              <AlertDialogTitle>Se déconnecter ?</AlertDialogTitle>
              <AlertDialogDescription>
                Tu quitteras ta session sur cet appareil. Tu pourras te reconnecter avec ton
                identifiant.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex-col gap-2 sm:flex-col">
              <Button
                type="button"
                variant="destructive"
                className="w-full rounded-xl"
                onClick={() => doLogout()}
              >
                Me déconnecter
              </Button>
              <AlertDialogCancel className="w-full rounded-xl mt-0">Annuler</AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Badge progression */}
        {!compactBadge ? (
          <div className="mt-5 rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.5_0.24_15)] p-5 text-primary-foreground shadow-soft">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs opacity-80">Parcours salon</p>
                  <p className="font-semibold text-sm">5 étapes pour compléter ton badge</p>
                </div>
              </div>
              <span className="text-2xl font-bold">{completed}/5</span>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/20 overflow-hidden">
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${pct}%` }}
              />
            </div>
            <ul className="mt-4 space-y-2 text-xs opacity-95">
              {steps.map((s) => (
                <li key={s.id} className="flex items-center gap-2">
                  <span className={s.done ? "opacity-100" : "opacity-60"}>
                    {s.done ? "✓" : "○"} {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="mt-4 flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-primary text-primary-foreground flex items-center justify-center shadow-soft shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
            <span className="text-sm font-bold text-primary shrink-0">{completed}/5</span>
          </div>
        )}

        <h2 className="mt-6 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Quick actions
        </h2>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <Link
            to="/scan"
            className="tap-feedback rounded-2xl bg-card border border-border p-4 text-left shadow-card block"
          >
            <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-3">
              <ScanLine className="w-5 h-5" />
            </div>
            <p className="font-semibold text-sm">Scan a stand</p>
            <p className="text-[11px] text-muted-foreground mt-0.5">QR établissement</p>
          </Link>
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

        {/* En ligne de mire — favoris */}
        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
            <Heart className="w-4 h-4 text-primary" /> En ligne de mire
          </h2>
          <Link to="/" className="text-xs font-semibold text-primary">
            Explorer +
          </Link>
        </div>
        {favoriteIds.length === 0 ? (
          <p className="mt-2 text-xs text-muted-foreground">
            Ajoute au moins <strong>3 formations</strong> en favoris depuis l’accueil ou les fiches
            formation (icône cœur).
          </p>
        ) : (
          <ul className="mt-3 space-y-2">
            {favoriteIds.map((fid) => {
              const fo = getCatalogFormation(fid);
              const ins = fo ? getInstitution(fo.institutionId) : undefined;
              if (!fo) return null;
              return (
                <li key={fid}>
                  <Link
                    to="/formation/$formationId"
                    params={{ formationId: fid }}
                    className="tap-feedback flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border shadow-card"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary-soft text-primary flex items-center justify-center shrink-0">
                      <Heart className="w-5 h-5 fill-primary/30" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm truncate">{fo.name}</p>
                      <p className="text-xs text-muted-foreground truncate">{ins?.name}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        <div className="mt-6 flex items-center justify-between">
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            Visited stands
          </h2>
          <span className="text-xs text-primary font-medium">{scannedIds.length} stands</span>
        </div>
        {scannedIds.length === 0 ? (
          <p className="mt-2 text-xs text-muted-foreground">
            Scanne un QR salon ou choisis un établissement dans l’écran scan pour remplir cette
            liste.
          </p>
        ) : (
          <ul className="mt-3 space-y-2.5">
            {scannedIds.map((id, i) => {
              const inst = getInstitution(id);
              if (!inst) return null;
              return (
                <li key={id}>
                  <Link
                    to="/institution/$institutionId"
                    params={{ institutionId: id }}
                    className="tap-feedback flex items-center gap-3 p-3.5 rounded-2xl bg-card border border-border shadow-card animate-slide-up"
                    style={{ animationDelay: `${i * 80}ms` }}
                  >
                    <div className="w-11 h-11 rounded-xl bg-[oklch(0.95_0.05_25)] text-primary flex items-center justify-center">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm">{inst.name}</p>
                      <p className="text-xs text-muted-foreground">{inst.city}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </Link>
                </li>
              );
            })}
          </ul>
        )}

        <Link
          to="/dashboard"
          className="mt-6 tap-feedback flex items-center justify-center w-full h-12 rounded-2xl bg-foreground text-background font-medium text-sm"
          onClick={() => refresh()}
        >
          See my dashboard
        </Link>
      </div>
    </AppShell>
  );
}
