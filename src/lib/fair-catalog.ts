/**
 * Banque établissements + formations (POC).
 * Les montants / contacts sont indicatifs ou factices pour la démo.
 */

export type ExploreCategorySlug = "grandes-ecoles" | "universites" | "prepas" | "bts-ecoles";

export type InstitutionBucket = "grandes-ecoles" | "universites" | "prepas" | "bts-ecoles";

export type Institution = {
  id: string;
  name: string;
  shortName: string;
  bucket: InstitutionBucket;
  city: string;
  summary: string;
};

/** Vecteur de matching quiz (0–100 par axe, même logique que quizToUserVector). */
export type MatchVec = {
  teaching: number;
  length: number;
  setting: number;
  domain: number;
};

export type CatalogFormation = {
  id: string;
  institutionId: string;
  name: string;
  pathway: string;
  domainTag: string;
  levelLabel: string;
  durationYears: number;
  tuitionAnnualEUR: number;
  format: string;
  summary: string;
  outcomes: string[];
  contactEmail: string;
  contactPhone: string;
  selectivity?: string;
  employmentRate6m?: number;
  applicants?: number;
  openings?: number;
  matchVec: MatchVec;
};

export const INSTITUTIONS: Institution[] = [
  {
    id: "inst-hec",
    name: "HEC Paris",
    shortName: "HEC",
    bucket: "grandes-ecoles",
    city: "Jouy-en-Josas",
    summary: "Grande école de management, triple accréditation.",
  },
  {
    id: "inst-escp",
    name: "ESCP Business School",
    shortName: "ESCP",
    bucket: "grandes-ecoles",
    city: "Paris",
    summary: "École européenne multi-campus commerce & management.",
  },
  {
    id: "inst-emlyon",
    name: "emlyon business school",
    shortName: "emlyon",
    bucket: "grandes-ecoles",
    city: "Écully",
    summary: "Management, entrepreneuriat et innovation.",
  },
  {
    id: "inst-centralesupelec",
    name: "CentraleSupélec",
    shortName: "CentraleSupélec",
    bucket: "grandes-ecoles",
    city: "Gif-sur-Yvette",
    summary: "École d’ingénieurs généraliste et numérique.",
  },
  {
    id: "inst-mines-paris",
    name: "Mines Paris — PSL",
    shortName: "Mines Paris",
    bucket: "grandes-ecoles",
    city: "Paris",
    summary: "Ingénieurs, recherche et transitions.",
  },
  {
    id: "inst-polytechnique",
    name: "École polytechnique",
    shortName: "l’X",
    bucket: "grandes-ecoles",
    city: "Palaiseau",
    summary: "Formation d’ingénieurs et recherche de très haut niveau.",
  },
  {
    id: "inst-sciencespo",
    name: "Sciences Po",
    shortName: "Sciences Po",
    bucket: "grandes-ecoles",
    city: "Paris",
    summary: "Sciences humaines et sociales, décision publique.",
  },
  {
    id: "inst-sorbonne",
    name: "Sorbonne Université",
    shortName: "Sorbonne",
    bucket: "universites",
    city: "Paris",
    summary: "Multi-disciplinaire : lettres, sciences, santé, ingénierie.",
  },
  {
    id: "inst-paris-cite",
    name: "Université Paris Cité",
    shortName: "Paris Cité",
    bucket: "universites",
    city: "Paris",
    summary: "Licences et masters santé, sciences, lettres et droit.",
  },
  {
    id: "inst-amu",
    name: "Aix-Marseille Université",
    shortName: "AMU",
    bucket: "universites",
    city: "Marseille",
    summary: "La plus grande université francophone.",
  },
  {
    id: "inst-henri4",
    name: "Lycée Henri-IV",
    shortName: "Henri-IV",
    bucket: "prepas",
    city: "Paris",
    summary: "CPGE scientifiques et littéraires d’excellence.",
  },
  {
    id: "inst-llg",
    name: "Lycée Louis-le-Grand",
    shortName: "LLG",
    bucket: "prepas",
    city: "Paris",
    summary: "CPGE scientifiques, éco et lettres.",
  },
  {
    id: "inst-stlouis",
    name: "Lycée Saint-Louis",
    shortName: "Saint-Louis",
    bucket: "prepas",
    city: "Paris",
    summary: "CPGE scientifiques et BCPST.",
  },
  {
    id: "inst-greta-bts",
    name: "GRETA CFA Lyon",
    shortName: "GRETA Lyon",
    bucket: "bts-ecoles",
    city: "Lyon",
    summary: "BTS en alternance et formation continue.",
  },
];

export const FORMATIONS: CatalogFormation[] = [
  {
    id: "form-hec-mim",
    institutionId: "inst-hec",
    name: "Master in Management (Grande école)",
    pathway: "PGE",
    domainTag: "commerce",
    levelLabel: "Master / PGE",
    durationYears: 2,
    tuitionAnnualEUR: 19800,
    format: "Présentiel — stages longs",
    summary: "Management généraliste, échanges internationaux et impact.",
    outcomes: ["Consulting", "Finance", "Marketing", "Entrepreneuriat"],
    contactEmail: "admissions@hec.demo.fr",
    contactPhone: "+33 1 23 45 67 01",
    selectivity: "Très sélectif",
    employmentRate6m: 96,
    applicants: 9200,
    openings: 450,
    matchVec: { teaching: 42, length: 78, setting: 72, domain: 22 },
  },
  {
    id: "form-hec-msc-finance",
    institutionId: "inst-hec",
    name: "MSc International Finance",
    pathway: "MSc",
    domainTag: "commerce",
    levelLabel: "Master of Science",
    durationYears: 1,
    tuitionAnnualEUR: 22400,
    format: "Présentiel intensif",
    summary: "Finance de marché et corporate finance.",
    outcomes: ["Banque d’investissement", "Asset management", "Trésorerie"],
    contactEmail: "msc.finance@hec.demo.fr",
    contactPhone: "+33 1 23 45 67 02",
    matchVec: { teaching: 55, length: 35, setting: 68, domain: 18 },
  },
  {
    id: "form-escp-bachelor",
    institutionId: "inst-escp",
    name: "Bachelor in Management",
    pathway: "Bachelor",
    domainTag: "commerce",
    levelLabel: "Bachelor",
    durationYears: 3,
    tuitionAnnualEUR: 14200,
    format: "Multi-campus",
    summary: "Socle management avec mobilité européenne.",
    outcomes: ["Poursuite Master", "Marketing", "International"],
    contactEmail: "bachelor@escp.demo.fr",
    contactPhone: "+33 1 23 45 67 03",
    matchVec: { teaching: 38, length: 52, setting: 58, domain: 25 },
  },
  {
    id: "form-escp-mim",
    institutionId: "inst-escp",
    name: "Master in Management",
    pathway: "PGE",
    domainTag: "commerce",
    levelLabel: "Master / PGE",
    durationYears: 2,
    tuitionAnnualEUR: 18500,
    format: "Présentiel",
    summary: "Management généraliste pan-européen.",
    outcomes: ["Consulting", "Sales", "Operations"],
    contactEmail: "mim@escp.demo.fr",
    contactPhone: "+33 1 23 45 67 04",
    employmentRate6m: 94,
    matchVec: { teaching: 45, length: 75, setting: 70, domain: 24 },
  },
  {
    id: "form-emlyon-pge",
    institutionId: "inst-emlyon",
    name: "Programme Grande École",
    pathway: "PGE",
    domainTag: "commerce",
    levelLabel: "Master",
    durationYears: 2,
    tuitionAnnualEUR: 15200,
    format: "Présentiel — projets",
    summary: "Entrepreneuriat, innovation et transformation durable.",
    outcomes: ["Start-up", "Strategy", "Finance durable"],
    contactEmail: "pge@emlyon.demo.fr",
    contactPhone: "+33 4 23 45 67 05",
    matchVec: { teaching: 48, length: 76, setting: 62, domain: 28 },
  },
  {
    id: "form-emlyon-msc-digital",
    institutionId: "inst-emlyon",
    name: "MSc Digital Marketing & Data",
    pathway: "MSc",
    domainTag: "numerique",
    levelLabel: "MSc",
    durationYears: 1.5,
    tuitionAnnualEUR: 16800,
    format: "Hybride",
    summary: "Data-driven marketing et analytics.",
    outcomes: ["Growth", "Data analyst marketing", "CRM"],
    contactEmail: "msc.digital@emlyon.demo.fr",
    contactPhone: "+33 4 23 45 67 06",
    matchVec: { teaching: 52, length: 40, setting: 55, domain: 62 },
  },
  {
    id: "form-cs-ingenieur",
    institutionId: "inst-centralesupelec",
    name: "Diplôme d’ingénieur — cycle centralien",
    pathway: "Ingénieur",
    domainTag: "ingenieur",
    levelLabel: "Diplôme d’ingénieur",
    durationYears: 3,
    tuitionAnnualEUR: 3500,
    format: "Présentiel + projets",
    summary: "Généraliste numérique, énergie, IA.",
    outcomes: ["Tech", "R&D", "Conseil technique"],
    contactEmail: "admissions@centralesupelec.demo.fr",
    contactPhone: "+33 1 23 45 67 07",
    applicants: 11000,
    openings: 800,
    employmentRate6m: 94,
    matchVec: { teaching: 58, length: 82, setting: 48, domain: 78 },
  },
  {
    id: "form-cs-cyber",
    institutionId: "inst-centralesupelec",
    name: "Majeure Cybersécurité",
    pathway: "Majeure 3ᵉ année",
    domainTag: "numerique",
    levelLabel: "Spécialisation",
    durationYears: 1,
    tuitionAnnualEUR: 3500,
    format: "Projets + lab",
    summary: "Sécurité des systèmes et réseaux.",
    outcomes: ["SOC", "Risk", "Security engineer"],
    contactEmail: "cyber@centralesupelec.demo.fr",
    contactPhone: "+33 1 23 45 67 08",
    matchVec: { teaching: 62, length: 30, setting: 42, domain: 82 },
  },
  {
    id: "form-mines-ingenieur",
    institutionId: "inst-mines-paris",
    name: "Cycle ingénieur civil",
    pathway: "Ingénieur",
    domainTag: "ingenieur",
    levelLabel: "Diplôme d’ingénieur",
    durationYears: 3,
    tuitionAnnualEUR: 2700,
    format: "Présentiel — recherche",
    summary: "Sciences et technologies pour les transitions.",
    outcomes: ["Industrie", "Énergie", "Data industrielle"],
    contactEmail: "admissions@minesparis.demo.fr",
    contactPhone: "+33 1 23 45 67 09",
    matchVec: { teaching: 68, length: 85, setting: 52, domain: 75 },
  },
  {
    id: "form-x-cycle",
    institutionId: "inst-polytechnique",
    name: "Cycle ingénieur polytechnicien",
    pathway: "Ingénieur",
    domainTag: "ingenieur",
    levelLabel: "Diplôme d’ingénieur",
    durationYears: 4,
    tuitionAnnualEUR: 0,
    format: "Présentiel + recherche",
    summary: "Tronc commun scientifique puis spécialisation.",
    outcomes: ["Recherche", "Public", "Deep tech"],
    contactEmail: "admissions@polytechnique.demo.fr",
    contactPhone: "+33 1 23 45 67 10",
    selectivity: "Très sélectif",
    matchVec: { teaching: 78, length: 88, setting: 38, domain: 70 },
  },
  {
    id: "form-x-master-data",
    institutionId: "inst-polytechnique",
    name: "Master Data Science (partenariat)",
    pathway: "Master",
    domainTag: "numerique",
    levelLabel: "Master",
    durationYears: 2,
    tuitionAnnualEUR: 4500,
    format: "Présentiel",
    summary: "Mathématiques appliquées et machine learning.",
    outcomes: ["ML engineer", "Quant", "R&D data"],
    contactEmail: "master.data@polytechnique.demo.fr",
    contactPhone: "+33 1 23 45 67 11",
    matchVec: { teaching: 72, length: 70, setting: 45, domain: 80 },
  },
  {
    id: "form-sciencespo-bachelor",
    institutionId: "inst-sciencespo",
    name: "Bachelor Sciences Po",
    pathway: "Bachelor",
    domainTag: "sciences-humaines",
    levelLabel: "Bachelor",
    durationYears: 3,
    tuitionAnnualEUR: 13500,
    format: "Multi-campus",
    summary: "Sciences politiques, économie, humanités.",
    outcomes: ["Master interne", "ONG", "International"],
    contactEmail: "bachelor@sciencespo.demo.fr",
    contactPhone: "+33 1 23 45 67 12",
    matchVec: { teaching: 48, length: 55, setting: 68, domain: 35 },
  },
  {
    id: "form-sciencespo-master-pub",
    institutionId: "inst-sciencespo",
    name: "Master Affaires publiques",
    pathway: "Master",
    domainTag: "sciences-humaines",
    levelLabel: "Master",
    durationYears: 2,
    tuitionAnnualEUR: 14800,
    format: "Présentiel",
    summary: "Policy, régulation et décision publique.",
    outcomes: ["Institutions", "Consulting public", "Advocacy"],
    contactEmail: "master.pub@sciencespo.demo.fr",
    contactPhone: "+33 1 23 45 67 13",
    matchVec: { teaching: 52, length: 72, setting: 74, domain: 30 },
  },
  {
    id: "form-sorbonne-l3-maths",
    institutionId: "inst-sorbonne",
    name: "L3 Mathématiques",
    pathway: "Licence",
    domainTag: "sciences",
    levelLabel: "Licence",
    durationYears: 1,
    tuitionAnnualEUR: 243,
    format: "Présentiel",
    summary: "Parcours algèbre, analyse et probabilités.",
    outcomes: ["Master maths", "MEEF", "Data"],
    contactEmail: "licence.maths@sorbonne.demo.fr",
    contactPhone: "+33 1 23 45 67 14",
    matchVec: { teaching: 75, length: 28, setting: 42, domain: 72 },
  },
  {
    id: "form-sorbonne-l3-info",
    institutionId: "inst-sorbonne",
    name: "L3 Informatique — parcours données",
    pathway: "Licence",
    domainTag: "numerique",
    levelLabel: "Licence",
    durationYears: 1,
    tuitionAnnualEUR: 243,
    format: "Présentiel",
    summary: "Algorithmique, bases de données et IA intro.",
    outcomes: ["Master informatique", "Data", "Dev"],
    contactEmail: "licence.info@sorbonne.demo.fr",
    contactPhone: "+33 1 23 45 67 15",
    matchVec: { teaching: 60, length: 25, setting: 40, domain: 85 },
  },
  {
    id: "form-paris-cite-sante",
    institutionId: "inst-paris-cite",
    name: "Licence Sciences pour la santé",
    pathway: "Licence",
    domainTag: "sante",
    levelLabel: "Licence",
    durationYears: 3,
    tuitionAnnualEUR: 243,
    format: "Présentiel",
    summary: "Socle santé : biologie, chimie, physiologie.",
    outcomes: ["PASS/LAS", "Paramédical", "Recherche"],
    contactEmail: "sante@u-pariscite.demo.fr",
    contactPhone: "+33 1 23 45 67 16",
    matchVec: { teaching: 58, length: 48, setting: 55, domain: 48 },
  },
  {
    id: "form-paris-cite-droit",
    institutionId: "inst-paris-cite",
    name: "Licence Droit",
    pathway: "Licence",
    domainTag: "droit",
    levelLabel: "Licence",
    durationYears: 3,
    tuitionAnnualEUR: 243,
    format: "Présentiel",
    summary: "Fondamentaux du droit public et privé.",
    outcomes: ["Master droit", "CRFPA", "RH"],
    contactEmail: "droit@u-pariscite.demo.fr",
    contactPhone: "+33 1 23 45 67 17",
    matchVec: { teaching: 68, length: 50, setting: 65, domain: 45 },
  },
  {
    id: "form-amu-dd-litterature",
    institutionId: "inst-amu",
    name: "Double licence Lettres — Langues",
    pathway: "Double licence",
    domainTag: "lettres",
    levelLabel: "Licence",
    durationYears: 3,
    tuitionAnnualEUR: 243,
    format: "Présentiel",
    summary: "Littérature comparée et civilisations.",
    outcomes: ["Édition", "Enseignement", "International"],
    contactEmail: "lettres@amu.demo.fr",
    contactPhone: "+33 4 23 45 67 18",
    matchVec: { teaching: 62, length: 52, setting: 38, domain: 42 },
  },
  {
    id: "form-amu-economie",
    institutionId: "inst-amu",
    name: "Licence Économie — parcours analyse des politiques",
    pathway: "Licence",
    domainTag: "commerce",
    levelLabel: "Licence",
    durationYears: 3,
    tuitionAnnualEUR: 243,
    format: "Présentiel",
    summary: "Micro/macro, économétrie intro et société.",
    outcomes: ["Master éco", "Concours", "Data sociale"],
    contactEmail: "eco@amu.demo.fr",
    contactPhone: "+33 4 23 45 67 19",
    matchVec: { teaching: 65, length: 48, setting: 35, domain: 28 },
  },
  {
    id: "form-henri4-mpsi",
    institutionId: "inst-henri4",
    name: "MPSI — filière scientifique",
    pathway: "CPGE",
    domainTag: "sciences",
    levelLabel: "CPGE",
    durationYears: 2,
    tuitionAnnualEUR: 0,
    format: "Présentiel intensif",
    summary: "Maths, physique, SI — concours ingénieurs.",
    outcomes: ["X", "Centrale", "Mines", "ENS"],
    contactEmail: "cpge@henri4.demo.fr",
    contactPhone: "+33 1 23 45 67 20",
    selectivity: "Très sélectif",
    matchVec: { teaching: 82, length: 55, setting: 28, domain: 78 },
  },
  {
    id: "form-llg-ecg",
    institutionId: "inst-llg",
    name: "ECG — économique & commerciale",
    pathway: "CPGE",
    domainTag: "commerce",
    levelLabel: "CPGE",
    durationYears: 2,
    tuitionAnnualEUR: 0,
    format: "Présentiel",
    summary: "Préparation concours écoles de commerce.",
    outcomes: ["HEC", "ESSEC", "ESCP"],
    contactEmail: "ecg@llg.demo.fr",
    contactPhone: "+33 1 23 45 67 21",
    matchVec: { teaching: 48, length: 52, setting: 30, domain: 24 },
  },
  {
    id: "form-stlouis-bcpst",
    institutionId: "inst-stlouis",
    name: "BCPST — biologie, chimie, physique & ST",
    pathway: "CPGE",
    domainTag: "sciences",
    levelLabel: "CPGE",
    durationYears: 2,
    tuitionAnnualEUR: 0,
    format: "Présentiel",
    summary: "Concours Agro, véto, G2E, ENS.",
    outcomes: ["AgroParisTech", "ENVAl", "Pharma"],
    contactEmail: "bcpst@saintlouis.demo.fr",
    contactPhone: "+33 1 23 45 67 22",
    matchVec: { teaching: 78, length: 54, setting: 32, domain: 68 },
  },
  {
    id: "form-greta-bts-sio",
    institutionId: "inst-greta-bts",
    name: "BTS SIO — Solutions logicielles",
    pathway: "BTS",
    domainTag: "numerique",
    levelLabel: "BTS",
    durationYears: 2,
    tuitionAnnualEUR: 600,
    format: "Alternance possible",
    summary: "Développement, réseaux et cybersécurité intro.",
    outcomes: ["Technicien", "Licence pro", "Alternance"],
    contactEmail: "bts.sio@greta-lyon.demo.fr",
    contactPhone: "+33 4 23 45 67 23",
    matchVec: { teaching: 42, length: 35, setting: 40, domain: 88 },
  },
  {
    id: "form-greta-bts-notariat",
    institutionId: "inst-greta-bts",
    name: "BTS Notariat",
    pathway: "BTS",
    domainTag: "droit",
    levelLabel: "BTS",
    durationYears: 2,
    tuitionAnnualEUR: 550,
    format: "Présentiel",
    summary: "Actes, immobilier et droit de la famille.",
    outcomes: ["Clerk", "Études notariales", "Carrière admin"],
    contactEmail: "bts.notariat@greta-lyon.demo.fr",
    contactPhone: "+33 4 23 45 67 24",
    matchVec: { teaching: 38, length: 32, setting: 48, domain: 38 },
  },
];

const instMap = new Map(INSTITUTIONS.map((i) => [i.id, i]));

export function getInstitution(id: string): Institution | undefined {
  return instMap.get(id);
}

export function getCatalogFormation(id: string): CatalogFormation | undefined {
  return FORMATIONS.find((f) => f.id === id);
}

export function getFormationsForInstitution(institutionId: string): CatalogFormation[] {
  return FORMATIONS.filter((f) => f.institutionId === institutionId);
}

export function allCatalogFormations(): CatalogFormation[] {
  return FORMATIONS;
}

export function bucketToExploreCategory(bucket: InstitutionBucket): ExploreCategorySlug {
  if (bucket === "grandes-ecoles") return "grandes-ecoles";
  if (bucket === "universites") return "universites";
  if (bucket === "prepas") return "prepas";
  return "bts-ecoles";
}

export function exploreCategoryOfFormation(f: CatalogFormation): ExploreCategorySlug {
  const inst = getInstitution(f.institutionId);
  if (!inst) return "grandes-ecoles";
  return bucketToExploreCategory(inst.bucket);
}

export function catalogFormationsInExploreCategory(cat: ExploreCategorySlug): CatalogFormation[] {
  return FORMATIONS.filter((f) => exploreCategoryOfFormation(f) === cat);
}
