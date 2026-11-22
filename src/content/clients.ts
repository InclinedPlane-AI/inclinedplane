/**
 * Client logos ("Trusted by"). List supplied by the founder on 2026-11-22.
 *
 * Logos were taken from each company's own website or supplied by Mohan's
 * team (2026-11-22). Supplied files were low-resolution rasters, so they were
 * traced to single-colour SVG silhouettes (the band renders every logo as a
 * uniform white mark anyway). Every entry is
 * `verified: false` until written permission to show the logo is on file
 * (brief: client logos only with approval). Unverified logos show on staging
 * with a "Verify before launch" badge and are hidden in production.
 *
 * `logo: null` = we couldn't identify the company's official site/logo with
 * confidence; staging shows a "logo file needed" tile, production skips it.
 * Drop the file in public/clients/ and set the path.
 *
 * `height` balances optical weight: wide wordmarks render shorter, stacked
 * marks taller. Never link a logo to an anonymized case study (that would
 * de-anonymize it).
 */
import type { Verifiable } from "./verify";

export interface Client extends Verifiable {
  name: string;
  logo: string | null;
  /** Display height in px on desktop (scaled down ~20% on phones). */
  height: number;
  source?: string;
}

export const clients: Client[] = [
  { name: "Revlon", logo: "/clients/revlon.svg", height: 22, source: "revlon.com", verified: false },
  { name: "Rotimatic", logo: "/clients/rotimatic.svg", height: 25, source: "rotimatic.com", verified: false },
  { name: "Duroflex", logo: "/clients/duroflex.png", height: 24, source: "duroflexworld.com", verified: false },
  { name: "Cocoblu (RattanIndia)", logo: "/clients/cocoblu.svg", height: 26, source: "cocoblu.in", verified: false },
  { name: "Kanoria Chemicals (KCIL)", logo: "/clients/kanoria.png", height: 38, source: "kanoriachem.com", verified: false },
  { name: "Tarasafe", logo: "/clients/tarasafe.svg", height: 26, source: "tarasafe.com", verified: false },
  { name: "Masoom Group", logo: "/clients/masoom.png", height: 46, source: "masoom.in", verified: false },
  { name: "Arenco Group", logo: "/clients/arenco.svg", height: 46, source: "supplied by Mohan's team", verified: false },
  {
    name: "Global Development Initiative (GDi)",
    logo: "/clients/gdi.svg",
    height: 38,
    source: "supplied by Mohan's team",
    verified: false,
  },
  { name: "VSM Technologies", logo: "/clients/vsm.svg", height: 33, source: "supplied by Mohan's team", verified: false },
  { name: "Noble Bioresources", logo: "/clients/noble.svg", height: 37, source: "supplied by Mohan's team", verified: false },
];
