import { allCatalogFormations, type CatalogFormation, type MatchVec } from "./fair-catalog";

/** Indices d’options du quiz (0 = première option, 1 = seconde). */
export function quizAnswersToUserVec(answers: number[]): MatchVec {
  const [a0 = 0, a1 = 0, a2 = 0, a3 = 0] = answers;
  return {
    teaching: a0 === 0 ? 28 : 82,
    length: a1 === 0 ? 22 : 78,
    setting: a2 === 0 ? 25 : 78,
    domain: a3 === 0 ? 18 : 85,
  };
}

const DEFAULT_VEC: MatchVec = { teaching: 50, length: 50, setting: 50, domain: 50 };

export function matchScorePercent(user: MatchVec, form: CatalogFormation): number {
  const v = form.matchVec ?? DEFAULT_VEC;
  const d =
    Math.abs(user.teaching - v.teaching) +
    Math.abs(user.length - v.length) +
    Math.abs(user.setting - v.setting) +
    Math.abs(user.domain - v.domain);
  return Math.max(0, Math.min(100, Math.round(100 - d / 4)));
}

export function rankedFormationsForQuiz(
  answers: number[],
): { formation: CatalogFormation; score: number; why: string }[] {
  const u = quizAnswersToUserVec(answers);
  return allCatalogFormations()
    .map((f) => {
      const score = matchScorePercent(u, f);
      const why = explainMatch(u, f);
      return { formation: f, score, why };
    })
    .sort((a, b) => b.score - a.score);
}

function explainMatch(user: MatchVec, form: CatalogFormation): string {
  const v = form.matchVec ?? DEFAULT_VEC;
  const dims: string[] = [];
  if (Math.abs(user.teaching - v.teaching) < 22) dims.push("style d’apprentissage proche");
  if (Math.abs(user.length - v.length) < 25) dims.push("durée alignée avec ton objectif");
  if (Math.abs(user.setting - v.setting) < 28) dims.push("cadre ville / campus cohérent");
  if (Math.abs(user.domain - v.domain) < 30) dims.push("orientation métier / tech");
  if (dims.length === 0) return "Profil complémentaire pour élargir tes options.";
  return dims.slice(0, 2).join(" · ") + ".";
}
