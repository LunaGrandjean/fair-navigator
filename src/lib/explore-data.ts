/** Articles éditoriaux + pont vers le catalogue formations (`fair-catalog`). */

import {
  catalogFormationsInExploreCategory,
  exploreCategoryOfFormation,
  getCatalogFormation,
  getInstitution,
  type CatalogFormation,
  type ExploreCategorySlug,
} from "./fair-catalog";

export type ExploreCategoryId = ExploreCategorySlug;

export const EXPLORE_CATEGORIES: {
  id: ExploreCategoryId;
  title: string;
  subtitle: string;
}[] = [
  { id: "grandes-ecoles", title: "Grandes écoles", subtitle: "Commerce, ingénieurs, arts…" },
  { id: "universites", title: "Universités", subtitle: "Licences, doubles diplômes…" },
  { id: "prepas", title: "Prépas", subtitle: "MPSI, ECG, BCPST…" },
  { id: "bts-ecoles", title: "BTS & écoles spécialisées", subtitle: "Bac+2 technique, CFA…" },
];

export type Article = {
  id: string;
  categoryId: ExploreCategoryId;
  title: string;
  excerpt: string;
  body: string;
  publishedAt: string;
  schoolTag?: string;
};

export type FormationDetail = {
  id: string;
  categoryId: ExploreCategoryId;
  name: string;
  school: string;
  level: string;
  durationLabel: string;
  format: string;
  selectivityLabel?: string;
  openings?: number;
  applicants?: number;
  employmentRate6m?: number;
  averageSalaryK?: number;
  tuitionAnnualEUR?: number;
  locations: string[];
  keywords: string[];
  summary: string;
  lastUpdated: string;
};

const articles: Article[] = [
  {
    id: "a-albert-school",
    categoryId: "grandes-ecoles",
    title: "Albert School lève le voile sur son nouveau parcours data & IA",
    excerpt: "Une école en vogue qui renforce son positionnement tech et business.",
    body: "Contenu démo : Albert School annonce un renforcement de ses parcours autour de la data et de l’intelligence artificielle, avec davantage de projets terrain et de mentors issus du monde de l’entreprise. Les candidatures restent sélectives ; l’école mise sur une pédagogie hybride entre design, management et code.\n\n(Cet article est un placeholder pour le POC — les contenus réels seront branchés plus tard.)",
    publishedAt: "2026-04-28",
    schoolTag: "Albert School",
  },
  {
    id: "a-mines-psl",
    categoryId: "grandes-ecoles",
    title: "Mines Paris — PSL : nouveaux partenariats recherche et international",
    excerpt: "Renforcement des doubles compétences et des mobilités à l’échelle européenne.",
    body: "Contenu démo : l’école Mines Paris — PSL annonce l’élargissement de ses accords de double diplôme et de ses laboratoires partagés avec des universités partenaires. Les étudiants en cycle ingénieur bénéficient d’une offre plus large en semestres à l’étranger.\n\n(Article placeholder POC.)",
    publishedAt: "2026-04-22",
    schoolTag: "Mines Paris — PSL",
  },
  {
    id: "a-x-ensae",
    categoryId: "grandes-ecoles",
    title: "Polytechnique et l’ENSAE lancent un master conjoint en quant & risques",
    excerpt: "Un programme pointu pour viser la finance de marché et la modélisation.",
    body: "Contenu démo : École polytechnique et ENSAE Paris proposent un nouveau cursus conjoint mêlant probabilités, finance quantitative et régulation. Sélection sur dossier et entretiens ; alternance possible en 2ᵉ année.\n\n(Placeholder POC.)",
    publishedAt: "2026-04-18",
    schoolTag: "X + ENSAE",
  },
  {
    id: "a-sciencespo-rentree",
    categoryId: "grandes-ecoles",
    title: "Sciences Po : évolution du concours et nouvelles mentions bienvenues",
    excerpt: "La rentrée 2026 précise les attendus sur les épreuves et l’oral.",
    body: "Article fictif pour le POC : Sciences Po précise les attendus sur les matières de spécialité et l’entretien motivationnel. Les candidats en voie de réorientation sont de plus en plus nombreux.\n\n(À alimenter avec vos contenus éditoriaux.)",
    publishedAt: "2026-04-10",
    schoolTag: "Sciences Po",
  },
  {
    id: "a-sorbonne-l3",
    categoryId: "universites",
    title: "Sorbonne Université : réforme mineure des parcours L3 informatique",
    excerpt: "Des UE ouvertes aux doubles compétences math-info.",
    body: "Placeholder : la L3 informatique propose de nouvelles options ouvertes aux étudiants issus de doubles licences. Les débouchés vers les masters en data restent dynamiques.\n\n(POC.)",
    publishedAt: "2026-04-25",
    schoolTag: "Sorbonne Université",
  },
  {
    id: "a-paris-cite-med",
    categoryId: "universites",
    title: "Université Paris Cité : passerelles santé — sciences du médicament",
    excerpt: "Un flux accru vers les masters hospitalo-universitaires.",
    body: "Article démo sur les passerelles entre licences de biologie et parcours santé. Les étudiants peuvent découvrir des stages d’observation dès la L2.\n\n(POC.)",
    publishedAt: "2026-04-12",
    schoolTag: "Paris Cité",
  },
  {
    id: "a-aix-droit",
    categoryId: "universites",
    title: "Aix-Marseille : nouvelle plateforme d’orientation inter-facultés",
    excerpt: "Droit, éco et lettres mutualisent leurs journées portes ouvertes.",
    body: "Contenu fictif : l’université Aix-Marseille mutualise son calendrier d’événements pour les futurs bacheliers. Les licences en droit restent plébiscitées.\n\n(POC.)",
    publishedAt: "2026-03-30",
    schoolTag: "AMU",
  },
  {
    id: "a-lycee-henri4",
    categoryId: "prepas",
    title: "Henri-IV : retour sur les résultats 2025 aux concours scientifiques",
    excerpt: "Des taux d’intégration stables dans le top d’X et Centrale.",
    body: "Article placeholder sur la prépa MPSI/MP du lycée Henri-IV : bilan des intégrations et nouveautés pédagogiques pour la rentrée 2026.\n\n(POC.)",
    publishedAt: "2026-04-08",
    schoolTag: "Henri-IV",
  },
  {
    id: "a-louis-le-grand-ecg",
    categoryId: "prepas",
    title: "Louis-le-Grand : renforcement du volet oral en ECG",
    excerpt: "Préparation ciblée aux grandes écoles de commerce.",
    body: "Démo : la prépa ECG accentue les simulations d’entretien et la culture générale ciblée HEC/ESSEC. Les inscriptions restent sur concours interne.\n\n(POC.)",
    publishedAt: "2026-04-05",
    schoolTag: "LLG",
  },
  {
    id: "a-saint-louis-bcpst",
    categoryId: "prepas",
    title: "Saint-Louis : nouvelle option agronomie & environnement en BCPST",
    excerpt: "Pour viser AgroParisTech, ENSAE et les écoles du vivant.",
    body: "Article fictif : la BCPST propose un module supplémentaire sur les transitions écologiques et les concours Agro.\n\n(POC.)",
    publishedAt: "2026-03-22",
    schoolTag: "Saint-Louis",
  },
  {
    id: "a-bts-alternance",
    categoryId: "bts-ecoles",
    title: "BTS : hausse des contrats en alternance dans le numérique",
    excerpt: "SIO et SN participent au boom des débouchés tech.",
    body: "Article POC : les BTS industriels et services informatiques attirent de plus en plus d’alternants dans les métropoles régionales. Les CFA mutualisent les offres.\n\n(Données illustratives.)",
    publishedAt: "2026-04-15",
    schoolTag: "Réseau CFA",
  },
];

function catalogToFormationDetail(f: CatalogFormation): FormationDetail {
  const inst = getInstitution(f.institutionId);
  const city = inst?.city ?? "";
  return {
    id: f.id,
    categoryId: exploreCategoryOfFormation(f),
    name: f.name,
    school: inst?.name ?? "",
    level: f.levelLabel,
    durationLabel: `${f.durationYears} an(s)`,
    format: f.format,
    selectivityLabel: f.selectivity,
    openings: f.openings,
    applicants: f.applicants,
    employmentRate6m: f.employmentRate6m,
    tuitionAnnualEUR: f.tuitionAnnualEUR,
    locations: city ? [city] : [],
    keywords: [f.domainTag, f.pathway],
    summary: f.summary,
    lastUpdated: "2026-05-01",
  };
}

function byDateDesc<T extends { publishedAt?: string; lastUpdated?: string }>(a: T, b: T) {
  const da = new Date(a.publishedAt ?? a.lastUpdated ?? 0).getTime();
  const db = new Date(b.publishedAt ?? b.lastUpdated ?? 0).getTime();
  return db - da;
}

export function getHomeFeedArticles(): Article[] {
  return [...articles].sort(byDateDesc);
}

export function getArticlesByCategory(categoryId: ExploreCategoryId): Article[] {
  return articles.filter((a) => a.categoryId === categoryId).sort(byDateDesc);
}

export function getArticleById(articleId: string): Article | undefined {
  return articles.find((a) => a.id === articleId);
}

export function getFormationsByCategory(categoryId: ExploreCategoryId): FormationDetail[] {
  return catalogFormationsInExploreCategory(categoryId)
    .map(catalogToFormationDetail)
    .sort(byDateDesc);
}

export function getFormationById(formationId: string): FormationDetail | undefined {
  const f = getCatalogFormation(formationId);
  if (!f) return undefined;
  return catalogToFormationDetail(f);
}

export function isExploreCategoryId(id: string): id is ExploreCategoryId {
  return EXPLORE_CATEGORIES.some((c) => c.id === id);
}
