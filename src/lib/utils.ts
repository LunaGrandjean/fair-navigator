import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Initiales affichées (prénom + nom), max 2 caractères. */
export function initialsFromName(firstName?: string, lastName?: string, fallback = "?"): string {
  const a = firstName?.trim().charAt(0);
  const b = lastName?.trim().charAt(0);
  if (a && b) return `${a}${b}`.toUpperCase();
  if (a) return `${a}${firstName!.trim().charAt(1) || a}`.slice(0, 2).toUpperCase();
  const fb = fallback.trim().slice(0, 2);
  return fb.length ? fb.toUpperCase() : "?";
}
