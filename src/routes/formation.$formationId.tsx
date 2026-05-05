import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { MapPin, Phone, Mail, Euro, Clock, BookOpen, Target } from "lucide-react";
import {
  getCatalogFormation,
  getInstitution,
  exploreCategoryOfFormation,
} from "@/lib/fair-catalog";
import { FormationFavoriteButton } from "@/components/FormationFavoriteButton";

export const Route = createFileRoute("/formation/$formationId")({
  head: ({ params }) => ({
    meta: [{ title: `Formation — ${params.formationId}` }],
  }),
  component: FormationPage,
});

function FormationPage() {
  const { formationId } = Route.useParams();
  const f = getCatalogFormation(formationId);
  const inst = f ? getInstitution(f.institutionId) : undefined;

  if (!f || !inst) {
    return <Navigate to="/" />;
  }

  const cat = exploreCategoryOfFormation(f);

  return (
    <AppShell>
      <div className="px-5 pt-4 pb-8 animate-fade-in">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wide text-primary">
              {inst.name}
            </p>
            <h1 className="text-xl font-bold leading-tight mt-1">{f.name}</h1>
            <p className="text-xs text-muted-foreground mt-1">
              {f.pathway} · {f.domainTag} · {f.levelLabel}
            </p>
          </div>
          <FormationFavoriteButton formationId={f.id} />
        </div>

        <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{f.summary}</p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span className="px-3 py-1 rounded-full bg-primary-soft text-primary text-xs font-medium">
            {cat.replace(/-/g, " ")}
          </span>
          {f.selectivity && (
            <span className="px-3 py-1 rounded-full bg-muted text-xs font-medium">
              {f.selectivity}
            </span>
          )}
        </div>

        <section className="mt-6 space-y-3">
          <h2 className="text-sm font-semibold flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-primary" /> Débouchés possibles
          </h2>
          <ul className="list-disc pl-5 text-sm space-y-1 text-muted-foreground">
            {f.outcomes.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>

        <section className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-card border border-border p-4 shadow-card">
            <Clock className="w-4 h-4 text-primary mb-1" />
            <p className="text-[10px] text-muted-foreground uppercase font-semibold">Durée</p>
            <p className="font-bold">{f.durationYears} an(s)</p>
          </div>
          <div className="rounded-2xl bg-card border border-border p-4 shadow-card">
            <Euro className="w-4 h-4 text-primary mb-1" />
            <p className="text-[10px] text-muted-foreground uppercase font-semibold">
              Frais / an (indicatif)
            </p>
            <p className="font-bold">{f.tuitionAnnualEUR.toLocaleString("fr-FR")} €</p>
          </div>
        </section>

        {f.employmentRate6m != null && (
          <div className="mt-4 rounded-xl bg-primary-soft/60 p-4 text-sm">
            <Target className="w-4 h-4 text-primary inline mr-1" />
            <span className="font-semibold">Insertion à 6 mois :</span> {f.employmentRate6m}%
          </div>
        )}

        <section className="mt-6 rounded-2xl bg-muted/50 border border-border p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
            Contact (POC)
          </p>
          <a
            href={`mailto:${f.contactEmail}`}
            className="mt-2 flex items-center gap-2 text-sm font-medium text-primary"
          >
            <Mail className="w-4 h-4" /> {f.contactEmail}
          </a>
          <a
            href={`tel:${f.contactPhone.replace(/\s/g, "")}`}
            className="mt-2 flex items-center gap-2 text-sm"
          >
            <Phone className="w-4 h-4 text-muted-foreground" /> {f.contactPhone}
          </a>
          <div className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
            {inst.name} — {inst.city}
          </div>
        </section>

        <Link
          to="/institution/$institutionId"
          params={{ institutionId: inst.id }}
          className="mt-6 tap-feedback block text-center w-full py-3 rounded-2xl bg-foreground text-background text-sm font-semibold"
        >
          Voir l’établissement et toutes les formations
        </Link>
      </div>
    </AppShell>
  );
}
