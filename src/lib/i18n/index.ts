import arDict from "./dictionaries/ar.json";
import enDict from "./dictionaries/en.json";

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ar";

export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

export function getDirection(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}

export function getOppositeLocale(locale: Locale): Locale {
  return locale === "ar" ? "en" : "ar";
}

const dictionaries = {
  ar: arDict,
  en: enDict,
} as Record<string, typeof arDict>;

export async function getDictionary(locale: Locale | string) {
  return dictionaries[locale] || dictionaries["ar"];
}