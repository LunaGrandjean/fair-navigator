import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { useEffect, useMemo, useState } from "react";
import {
  Briefcase,
  GraduationCap,
  Send,
  ArrowRight,
  Sparkles,
  Lightbulb,
  Building2,
} from "lucide-react";
import { getProfile, type Profile, patchJourney } from "@/lib/profile";
import { getSession } from "@/lib/session";
import { getJourneyState } from "@/lib/journey-state";
import { rankedFormationsForQuiz } from "@/lib/match-scoring";
import { getCatalogFormation, getInstitution } from "@/lib/fair-catalog";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Your Orientation Dashboard" },
      { name: "description", content: "Your personalized school matches and next steps." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const [profile, setProfile] = useState<Profile>({});

  useEffect(() => {
    setProfile(getProfile());
  }, []);

  const refresh = () => setProfile(getProfile());

  const journey = getJourneyState(profile);
  const session = getSession();
  const scannedIds = journey.scannedInstitutionIds ?? [];
  const favIds = journey.favoriteFormationIds ?? [];
  const quizAnswers = journey.quizAnswers;

  const ranked = useMemo(() => {
    if (!quizAnswers || quizAnswers.length < 4) return [];
    return rankedFormationsForQuiz(quizAnswers).slice(0, 8);
  }, [quizAnswers]);

  const declared = [
    profile.level,
    ...(profile.specialties || []),
    ...(profile.interests || []),
    profile.duration && `${profile.duration} studies`,
    profile.learning && `${profile.learning} learning`,
    profile.location,
  ].filter(Boolean) as string[];

  const favFormations = useMemo(
    () =>
      favIds.map((id) => getCatalogFormation(id)).filter((x): x is NonNullable<typeof x> => !!x),
    [favIds],
  );

  const chartTuition = useMemo(() => {
    const rows: { name: string; frais: number }[] = [];
    const favAvg =
      favFormations.length > 0
        ? favFormations.reduce((s, f) => s + f.tuitionAnnualEUR, 0) / favFormations.length
        : 0;
    if (favAvg > 0) rows.push({ name: "Favoris (moy.)", frais: Math.round(favAvg) });
    ranked.slice(0, 3).forEach((r, i) => {
      rows.push({ name: `Reco ${i + 1}`, frais: r.formation.tuitionAnnualEUR });
    });
    return rows;
  }, [favFormations, ranked]);

  const radarData = useMemo(() => {
    if (ranked.length === 0 && favFormations.length === 0) return [];
    const axes = ["Pédagogie", "Durée", "Lieu", "Domaine"];
    const recoVec = ranked[0]?.formation.matchVec;
    const fav =
      favFormations.length > 0
        ? {
            teaching:
              favFormations.reduce((s, f) => s + (f.matchVec?.teaching ?? 50), 0) /
              favFormations.length,
            length:
              favFormations.reduce((s, f) => s + (f.matchVec?.length ?? 50), 0) / favFormations.length,
            setting:
              favFormations.reduce((s, f) => s + (f.matchVec?.setting ?? 50), 0) /
              favFormations.length,
            domain:
              favFormations.reduce((s, f) => s + (f.matchVec?.domain ?? 50), 0) /
              favFormations.length,
          }
        : null;
    if (!recoVec && !fav) return [];
    return axes.map((subject, i) => {
      const keys = ["teaching", "length", "setting", "domain"] as const;
      const k = keys[i];
      return {
        subject,
        Recommandé: recoVec ? recoVec[k] : 0,
        Favoris: fav ? fav[k] : 0,
      };
    });
  }, [ranked, favFormations]);

  const markContact = () => {
    patchJourney({ contactedSchool: true });
    refresh();
  };

  return (
    <AppShell>
      <div className="px-6 pt-5 pb-6 animate-fade-in space-y-6">
        <div>
          <p className="text-xs text-primary font-semibold uppercase tracking-wider">Post-fair</p>
          <h1 className="text-2xl font-bold mt-1">Your Orientation Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Données déclarées, quiz, favoris et scans — même logique que l’onglet Journey.
          </p>
        </div>

        {declared.length > 0 && (
          <section className="rounded-2xl bg-card border border-border p-5 shadow-card">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <h2 className="font-semibold text-sm">Your Profile</h2>
              <span className="ml-auto text-[10px] text-muted-foreground uppercase tracking-wide">
                Declared
              </span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {declared.slice(0, 10).map((t) => (
                <span
                  key={t}
                  className="px-3 py-1.5 rounded-full bg-primary-soft text-primary text-xs font-medium"
                >
                  {t}
                </span>
              ))}
            </div>
          </section>
        )}

        <section className="rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.5_0.24_15)] p-5 text-primary-foreground shadow-soft">
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4" />
            <h2 className="font-semibold text-sm">Based on your profile</h2>
          </div>
        </section>

        <section>
          <h2 className="font-semibold text-sm mb-3 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary" /> Schools you visited
          </h2>
          {scannedIds.length === 0 ? (
            <p className="text-xs text-muted-foreground">Aucun stand scanné pour l’instant.</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {scannedIds.map((id) => {
                const inst = getInstitution(id);
                if (!inst) return null;
                return (
                  <Link
                    key={id}
                    to="/institution/$institutionId"
                    params={{ institutionId: id }}
                    className="rounded-2xl bg-card border border-border p-3 flex flex-col items-center text-center shadow-card tap-feedback"
                  >
                    <div className="w-10 h-10 rounded-xl bg-primary-soft text-primary flex items-center justify-center mb-2">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <p className="text-[11px] font-medium leading-tight">{inst.shortName}</p>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        <section>
          <h2 className="font-semibold text-sm mb-2">Recommended for you</h2>
          {!quizAnswers || quizAnswers.length < 4 ? (
            <p className="text-xs text-muted-foreground mb-3">
              Complète le mini quiz pour générer des scores personnalisés sur le catalogue.
            </p>
          ) : null}
          <ul className="space-y-3">
            {ranked.slice(0, 5).map((r, i) => {
              const inst = getInstitution(r.formation.institutionId);
              return (
                <li
                  key={r.formation.id}
                  className="rounded-2xl bg-card border border-border p-4 shadow-card animate-slide-up"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <Link
                    to="/formation/$formationId"
                    params={{ formationId: r.formation.id }}
                    className="block text-left"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-sm">{r.formation.name}</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">{inst?.name}</p>
                        <p className="text-xs text-muted-foreground mt-1 leading-snug">{r.why}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="text-lg font-bold text-primary leading-none">
                          {r.score}%
                        </div>
                        <p className="text-[10px] text-muted-foreground mt-0.5">match</p>
                      </div>
                    </div>
                    <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: `${r.score}%` }}
                      />
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
          {quizAnswers && quizAnswers.length >= 4 && ranked.length === 0 && (
            <p className="text-xs text-muted-foreground mt-2">Aucun résultat.</p>
          )}
        </section>

        {(chartTuition.length > 0 || radarData.length > 0) && (
          <section className="space-y-4">
            <h2 className="font-semibold text-sm">Compare tes pistes</h2>
            {chartTuition.length > 0 && (
              <div className="rounded-2xl bg-card border border-border p-4 shadow-card h-64">
                <p className="text-xs text-muted-foreground mb-2">Frais annuels indicatifs (€)</p>
                <ResponsiveContainer width="100%" height="85%">
                  <BarChart data={chartTuition} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 10 }}
                      interval={0}
                      angle={-15}
                      textAnchor="end"
                      height={48}
                    />
                    <YAxis tick={{ fontSize: 10 }} />
                    <Tooltip formatter={(v: number) => [`${v.toLocaleString("fr-FR")} €`, ""]} />
                    <Bar dataKey="frais" fill="oklch(0.55 0.22 25)" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
            {radarData.length > 0 && ranked[0] && favFormations.length > 0 && (
              <div className="rounded-2xl bg-card border border-border p-4 shadow-card h-72">
                <p className="text-xs text-muted-foreground mb-1">
                  Profil favoris vs meilleure reco (axes internes 0–100)
                </p>
                <ResponsiveContainer width="100%" height="90%">
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10 }} />
                    <PolarRadiusAxis domain={[0, 100]} tick={false} />
                    <Radar
                      name="Reco #1"
                      dataKey="Recommandé"
                      stroke="oklch(0.55 0.22 25)"
                      fill="oklch(0.55 0.22 25)"
                      fillOpacity={0.35}
                    />
                    <Radar
                      name="Favoris"
                      dataKey="Favoris"
                      stroke="oklch(0.45 0.08 240)"
                      fill="oklch(0.45 0.08 240)"
                      fillOpacity={0.25}
                    />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            )}
          </section>
        )}

        <section className="space-y-2.5">
          <h2 className="font-semibold text-sm">Next steps</h2>
          <Link
            to="/"
            className="tap-feedback w-full flex items-center justify-between p-4 rounded-2xl bg-card border border-border shadow-card"
          >
            <span className="text-sm font-medium">Explore programs</span>
            <ArrowRight className="w-4 h-4 text-primary" />
          </Link>
          <button
            type="button"
            onClick={markContact}
            className="tap-feedback w-full flex items-center justify-between p-4 rounded-2xl bg-card border border-border shadow-card text-left"
          >
            <span className="text-sm font-medium">Get contacted by schools</span>
            <Briefcase className="w-4 h-4 text-primary" />
          </button>
          {journey.contactedSchool && (
            <p className="text-[11px] text-primary font-medium px-1">
              ✓ Étape contact enregistrée pour ton parcours.
            </p>
          )}
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
