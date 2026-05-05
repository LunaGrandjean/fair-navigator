import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Building2, ChevronRight } from "lucide-react";
import { getInstitution, getFormationsForInstitution } from "@/lib/fair-catalog";
import { FormationFavoriteButton } from "@/components/FormationFavoriteButton";

export const Route = createFileRoute("/institution/$institutionId")({
  head: ({ params }) => ({
    meta: [{ title: `Établissement — ${params.institutionId}` }],
  }),
  component: InstitutionPage,
});

function InstitutionPage() {
  const { institutionId } = Route.useParams();
  const inst = getInstitution(institutionId);
  const formations = inst ? getFormationsForInstitution(inst.id) : [];

  if (!inst) {
    return <Navigate to="/" />;
  }

  return (
    <AppShell>
      <div className="px-5 pt-4 pb-8 animate-fade-in">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-primary-soft text-primary flex items-center justify-center">
            <Building2 className="w-7 h-7" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">{inst.city}</p>
            <h1 className="text-xl font-bold leading-tight">{inst.name}</h1>
          </div>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">{inst.summary}</p>

        <h2 className="mt-8 text-sm font-semibold text-muted-foreground uppercase tracking-wide">
          Formations référencées ({formations.length})
        </h2>
        <ul className="mt-3 space-y-2">
          {formations.map((f) => (
            <li
              key={f.id}
              className="tap-feedback rounded-2xl bg-card border border-border shadow-card overflow-hidden"
            >
              <div className="flex items-stretch">
                <Link
                  to="/formation/$formationId"
                  params={{ formationId: f.id }}
                  className="flex-1 p-4 block text-left"
                >
                  <p className="font-semibold text-sm">{f.name}</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    {f.levelLabel} · {f.pathway}
                  </p>
                  <p className="text-xs text-primary mt-2 font-medium">
                    {f.durationYears} an(s) · {f.tuitionAnnualEUR.toLocaleString("fr-FR")} €/an
                  </p>
                </Link>
                <div className="flex items-center pr-3 border-l border-border">
                  <FormationFavoriteButton formationId={f.id} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AppShell>
  );
}
