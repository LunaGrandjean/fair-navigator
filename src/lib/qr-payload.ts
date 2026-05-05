/** QR salon : payload texte attendu `LETUDIANT:INST:<institutionId>` */

const PREFIX = "LETUDIANT:INST:";

export function encodeInstitutionQr(institutionId: string): string {
  return `${PREFIX}${institutionId}`;
}

export function parseQrPayload(text: string): string | null {
  const t = text.trim();
  if (t.startsWith(PREFIX)) {
    const id = t.slice(PREFIX.length).trim();
    return id.length ? id : null;
  }
  /* URL avec query ?inst= id */
  try {
    const u = new URL(t);
    const q = u.searchParams.get("inst") ?? u.searchParams.get("institution");
    if (q) return q;
  } catch {
    /* pas une URL */
  }
  /* code brut = id institution si alphanum */
  if (/^[a-z0-9-]+$/i.test(t) && t.length >= 4 && t.length < 80) return t;
  return null;
}
