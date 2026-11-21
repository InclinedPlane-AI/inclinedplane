/**
 * Verification markers (brief §6.4).
 *
 * Every number, client name, logo, certification, office location or listed
 * capability that a human has not yet confirmed carries `verified: false`.
 *
 *  - Development and staging (`VITE_SITE_ENV=staging`): unverified items render
 *    with a visible "Verify before launch" badge so reviewers can see them.
 *  - Production builds: unverified items are NOT rendered. scripts/prerender.mjs
 *    reports how many were hidden, so a launch never silently drops proof.
 *
 * To approve an item, flip it to `verified: true` in src/content/.
 */

export interface Verifiable {
  verified: boolean;
}

export const SITE_ENV: "development" | "staging" | "production" = import.meta.env.DEV
  ? "development"
  : import.meta.env.VITE_SITE_ENV === "staging"
    ? "staging"
    : "production";

export const SHOW_UNVERIFIED = SITE_ENV !== "production";

/** Whether a single item may render in this build. */
export function canShow(item: Verifiable | undefined | null): boolean {
  if (!item) return false;
  return item.verified || SHOW_UNVERIFIED;
}

/** Filter a list down to what may render in this build. */
export function visible<T extends Verifiable>(items: T[]): T[] {
  return items.filter(canShow);
}
