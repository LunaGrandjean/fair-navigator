import type { Profile } from "./profile";

const SESSION_KEY = "letudiant_session_v2";
const ACCOUNTS_KEY = "letudiant_accounts_v2";
const GUEST_PROFILE_KEY = "letudiant_guest_profile_v2";
const LEGACY_PROFILE_KEY = "letudiant_profile";
const PENDING_ONBOARDING_KEY = "letudiant_pending_onboarding";

export type SessionState =
  | { kind: "none" }
  | { kind: "guest" }
  | { kind: "registered"; username: string };

export type StoredAccount = {
  password: string;
  profile: Profile;
};

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

/** POC : migration one-shot depuis l’ancienne clé unique profil. */
function migrateLegacyProfile() {
  if (typeof window === "undefined") return;
  const legacy = readJson<Profile | null>(LEGACY_PROFILE_KEY, null);
  if (!legacy || Object.keys(legacy).length === 0) return;
  const accounts = getAccountsRaw();
  if (Object.keys(accounts).length > 0) {
    localStorage.removeItem(LEGACY_PROFILE_KEY);
    return;
  }
  if (legacy.account === "user") {
    const raw = legacy.email?.split("@")[0] || "demo_user";
    const username = raw.replace(/[^a-zA-Z0-9_-]/g, "").toLowerCase() || "demo_user";
    accounts[username] = {
      password: "demo",
      profile: { ...legacy, account: "user" },
    };
    writeJson(ACCOUNTS_KEY, accounts);
    writeJson(SESSION_KEY, { kind: "registered", username } satisfies SessionState);
  } else {
    writeJson(GUEST_PROFILE_KEY, { ...legacy, account: "guest" });
    writeJson(SESSION_KEY, { kind: "guest" } satisfies SessionState);
  }
  localStorage.removeItem(LEGACY_PROFILE_KEY);
}

export function getSession(): SessionState {
  migrateLegacyProfile();
  const s = readJson<SessionState | null>(SESSION_KEY, null);
  if (s && (s as SessionState).kind) return s as SessionState;
  return { kind: "none" };
}

export function setSession(s: SessionState) {
  writeJson(SESSION_KEY, s);
}

function getAccountsRaw(): Record<string, StoredAccount> {
  return readJson<Record<string, StoredAccount>>(ACCOUNTS_KEY, {});
}

export function listUsernames(): string[] {
  return Object.keys(getAccountsRaw());
}

export function registerAccount(username: string, password: string, profile: Profile) {
  const key = username.trim().toLowerCase();
  if (!key || !password) throw new Error("Identifiants invalides");
  const accounts = getAccountsRaw();
  if (accounts[key]) throw new Error("Ce nom d’utilisateur est déjà pris");
  accounts[key] = {
    password,
    profile: { ...profile, account: "user" },
  };
  writeJson(ACCOUNTS_KEY, accounts);
  setSession({ kind: "registered", username: key });
}

export function login(username: string, password: string): boolean {
  const key = username.trim().toLowerCase();
  const acc = getAccountsRaw()[key];
  if (!acc || acc.password !== password) return false;
  setSession({ kind: "registered", username: key });
  return true;
}

export function logoutToGuest() {
  setSession({ kind: "guest" });
}

/** Fin de session sur l’appareil (retour écran connexion / welcome). */
export function logout() {
  clearGuestProfile();
  setSession({ kind: "none" });
}

export function setGuestSession() {
  setSession({ kind: "guest" });
}

export function getGuestProfile(): Profile {
  return readJson<Profile>(GUEST_PROFILE_KEY, {});
}

function saveGuestProfile(p: Partial<Profile>) {
  const next = { ...getGuestProfile(), ...p, account: "guest" as const };
  writeJson(GUEST_PROFILE_KEY, next);
}

function getRegisteredProfile(username: string): Profile {
  return getAccountsRaw()[username]?.profile ?? {};
}

function saveRegisteredProfile(username: string, p: Partial<Profile>) {
  const accounts = getAccountsRaw();
  const acc = accounts[username];
  if (!acc) return;
  acc.profile = { ...acc.profile, ...p, account: "user" };
  writeJson(ACCOUNTS_KEY, accounts);
}

/** Profil actif (invité vs compte enregistré), compatible avec l’existant `account: user | guest`. */
export function getActiveProfile(): Profile {
  const session = getSession();
  if (session.kind === "registered") {
    return getRegisteredProfile(session.username);
  }
  if (session.kind === "guest") {
    return getGuestProfile();
  }
  return {};
}

export function saveActiveProfile(p: Partial<Profile>) {
  const session = getSession();
  if (session.kind === "registered") {
    saveRegisteredProfile(session.username, p);
    return;
  }
  if (session.kind === "guest") {
    saveGuestProfile(p);
    return;
  }
  /* Pas de session : comportement invité implicite pour ne pas perdre de données en démo */
  saveGuestProfile(p);
}

export function clearGuestProfile() {
  localStorage.removeItem(GUEST_PROFILE_KEY);
}

export function setPendingOnboardingProfile(profile: Profile) {
  sessionStorage.setItem(PENDING_ONBOARDING_KEY, JSON.stringify(profile));
}

export function getPendingOnboardingProfile(): Profile | null {
  const raw = sessionStorage.getItem(PENDING_ONBOARDING_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Profile;
  } catch {
    return null;
  }
}

export function clearPendingOnboardingProfile() {
  sessionStorage.removeItem(PENDING_ONBOARDING_KEY);
}
