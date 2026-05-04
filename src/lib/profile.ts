export type Profile = {
  account?: "user" | "guest";
  level?: string;
  specialties?: string[];
  duration?: string;
  interests?: string[];
  learning?: string;
  location?: string;
  email?: string;
};

const KEY = "letudiant_profile";

export function getProfile(): Profile {
  if (typeof window === "undefined") return {};
  try {
    return JSON.parse(localStorage.getItem(KEY) || "{}");
  } catch {
    return {};
  }
}

export function saveProfile(p: Partial<Profile>) {
  if (typeof window === "undefined") return;
  const next = { ...getProfile(), ...p };
  localStorage.setItem(KEY, JSON.stringify(next));
}

export function clearProfile() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}
