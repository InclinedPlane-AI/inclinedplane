import { Activity, ShieldCheck, type LucideIcon } from "lucide-react";
import type { ProductId } from "@/data/products";

export const PRODUCT_ICONS: Record<ProductId, LucideIcon> = {
  pipelineiq: Activity,
  inclever: ShieldCheck,
};
