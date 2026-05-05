import { getActiveProfile, saveActiveProfile, clearGuestProfile, getSession } from "./session";
import type { JourneyState } from "./journey-state";
import { getJourneyState } from "./journey-state";

export type Profile = {
  account?: "user" | "guest";
  firstName?: string;
  lastName?: string;
  birthDate?: string;
  level?: string;
  specialties?: string[];
  duration?: string;
  interests?: string[];
  learning?: string;
  location?: string;
  email?: string;
  journey?: JourneyState;
};

export type { JourneyState };

export function patchJourney(patch: Partial<JourneyState>) {
  const cur = getProfile();
  saveProfile({
    journey: { ...getJourneyState(cur), ...patch },
  });
}

export function getProfile(): Profile {
  const session = getSession();
  const base = getActiveProfile();
  if (session.kind === "registered") {
    return { ...base, account: "user" };
  }
  if (session.kind === "guest") {
    return { ...base, account: "guest" };
  }
  return { ...base };
}

export function saveProfile(p: Partial<Profile>) {
  const { account: _a, ...rest } = p;
  saveActiveProfile(rest);
}

/** Réinitialise les données profil de l’invité (parcours groupe / démo). */
export function clearProfile() {
  clearGuestProfile();
}
