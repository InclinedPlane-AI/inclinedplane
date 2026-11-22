/**
 * Testimonials. ALL THREE ARE PLACEHOLDERS (2026-11-22): written to show the
 * layout, not said by anyone. Replace each with an approved quote (exact
 * words, named person and title or an approved anonymized attribution)
 * before launch. `placeholder: true` + `verified: false` means staging shows
 * them with a "Placeholder" badge and production never renders them.
 */
import type { Verifiable } from "./verify";

export interface Testimonial extends Verifiable {
  quote: string;
  role: string;
  company: string;
  placeholder: boolean;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "We had five ERPs and five versions of revenue. Now finance, sales and our Copilot pilot read the same definitions, and month-end reconciliation is a check, not a project.",
    role: "Head of Data",
    company: "Global industrial manufacturer, EMEA",
    placeholder: true,
    verified: false,
  },
  {
    quote:
      "They found the problems in our data before our agents did. The readiness findings gave security the evidence it needed to approve the rollout.",
    role: "Chief Information Officer",
    company: "FMCG company, India",
    placeholder: true,
    verified: false,
  },
  {
    quote: "Engineers, not slideware. They built on the Azure estate we already had, and our own team runs it today.",
    role: "Director of Analytics",
    company: "Retail and manufacturing group",
    placeholder: true,
    verified: false,
  },
];
