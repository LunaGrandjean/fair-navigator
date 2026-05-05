import { getProfile, patchJourney } from "./profile";
import { getJourneyState } from "./journey-state";

export function toggleFavoriteFormation(formationId: string) {
  const j = getJourneyState(getProfile());
  const s = new Set(j.favoriteFormationIds ?? []);
  if (s.has(formationId)) s.delete(formationId);
  else s.add(formationId);
  patchJourney({ favoriteFormationIds: [...s] });
}

export function isFavoriteFormation(formationId: string): boolean {
  return getJourneyState(getProfile()).favoriteFormationIds?.includes(formationId) ?? false;
}
