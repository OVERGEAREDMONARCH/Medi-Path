import { format, parseISO } from "date-fns";

export const formatDate = (iso: string) => format(parseISO(iso), "d MMM yyyy");
export const formatDateTime = (iso: string) => format(parseISO(iso), "d MMM yyyy, HH:mm");
export const toISODate = (d: Date) => format(d, "yyyy-MM-dd");

export const toneClasses = {
  primary: { dot: "bg-primary", soft: "bg-primary/10", text: "text-primary" },
  secondary: { dot: "bg-secondary", soft: "bg-secondary/10", text: "text-secondary" },
  accent: { dot: "bg-accent", soft: "bg-accent/10", text: "text-accent" },
} as const;
