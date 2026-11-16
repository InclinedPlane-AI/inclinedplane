import { Compass, Database, Shield, BarChart3, Brain, Zap, type LucideIcon } from "lucide-react";

/** Icons per service layer number; mirrors the pillar icons in src/pages/Services.tsx. */
export const SERVICE_ICONS: Record<string, LucideIcon> = {
  "00": Compass,
  "01": Database,
  "02": Shield,
  "03": BarChart3,
  "04": Brain,
  "05": Zap,
};
