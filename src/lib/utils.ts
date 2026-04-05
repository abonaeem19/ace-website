import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) { return twMerge(clsx(inputs)); }

export function getLocalizedField<T extends Record<string, unknown>>(item: T, field: string, locale: "ar" | "en"): string {
  const key = `${field}${locale === "ar" ? "Ar" : "En"}` as keyof T;
  return (item[key] as string) || "";
}

export function formatDate(date: Date, locale: "ar" | "en"): string {
  return new Intl.DateTimeFormat(locale === "ar" ? "ar-SA" : "en-US", { year: "numeric", month: "long", day: "numeric" }).format(new Date(date));
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "new": return "bg-ace-600/20 text-ace-400";
    case "reviewed": return "bg-yellow-600/20 text-yellow-400";
    case "closed": return "bg-green-600/20 text-green-400";
    default: return "bg-silver-600/20 text-silver-400";
  }
}