import type { SessionState } from "./session";

export type JourneyState = {
  quizCompletedAt?: string;
  quizAnswers?: number[];
  favoriteFormationIds?: string[];
  scannedInstitutionIds?: string[];
  contactedSchool?: boolean;
};

export type JourneyStepMeta = {
  id: string;
  label: string;
  shortLabel: string;
  done: boolean;
};

export function getJourneyState(profile: { journey?: JourneyState }): JourneyState {
  return profile.journey ?? {};
}

export function journeySteps(
  profile: { journey?: JourneyState },
  session: SessionState,
): JourneyStepMeta[] {
  const j = getJourneyState(profile);
  const favCount = j.favoriteFormationIds?.length ?? 0;
  const scanCount = j.scannedInstitutionIds?.length ?? 0;

  return [
    {
      id: "account",
      label: "Créer un compte",
      shortLabel: "Compte",
      done: session.kind === "registered",
    },
    {
      id: "quiz",
      label: "Répondre au mini quiz",
      shortLabel: "Quiz",
      done: !!j.quizCompletedAt,
    },
    {
      id: "favorites",
      label: "Enregistrer au moins 3 formations",
      shortLabel: "Favoris",
      done: favCount >= 3,
    },
    {
      id: "scan",
      label: "Scanner au moins un stand",
      shortLabel: "Scan",
      done: scanCount >= 1,
    },
    {
      id: "contact",
      label: "Contacter une école",
      shortLabel: "Contact",
      done: !!j.contactedSchool,
    },
  ];
}

export function completedJourneySteps(
  profile: { journey?: JourneyState },
  session: SessionState,
): number {
  return journeySteps(profile, session).filter((s) => s.done).length;
}
