import { createFileRoute, Navigate } from "@tanstack/react-router";

/** Ancienne URL — redirige vers la fiche formation globale. */
export const Route = createFileRoute("/explore/$categoryId/formation/$formationId")({
  component: RedirectFormation,
});

function RedirectFormation() {
  const { formationId } = Route.useParams();
  return <Navigate to="/formation/$formationId" params={{ formationId }} replace />;
}
