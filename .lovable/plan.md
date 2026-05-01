
# Expand Content Across All 14 Case Studies

## Overview
Enrich the body text and bullet points for every case study in `src/data/caseStudyDetails.ts`. Each case study is unique — expansions will be tailored to the specific domain, client context, and technical approach.

## What's being expanded per section

**The Opportunity** — Deepen business context: industry pressures, scale of the problem, what was at stake. Add bullets where missing.

**The Solution** — Expand on methodology, architecture decisions, why specific tools were chosen. Add bullets where missing, enrich existing ones.

**The Impact** — Strengthen with more specific outcomes and downstream effects. Add bullets where thin.

## All 14 case studies

1. **Retail & Manufacturing Chain** — Add depth to opportunity (dealer network scale, competitive pressure). Expand impact bullets (dealer satisfaction, reporting cadence shift).

2. **Engine Demand Forecast** — Opportunity has no bullets — add product line complexity, planning horizon, cost of forecast errors. Expand solution on benchmarking rigor and retraining. Add impact bullets on production alignment.

3. **EV Battery Predictive** — Opportunity has no bullets — add fleet scale, safety risk, IoT data volume, cost of reactive maintenance. Expand solution on feature engineering and scoring pipeline. Expand impact on scheduling transformation.

4. **FMCG Edible Oil** — Expand opportunity on distribution complexity. Deepen solution on pipeline engineering. Add impact context on decision cadence.

5. **EV Fleet Scheduling** — Expand opportunity on real-time dispatch complexity. Deepen solution on how the three algorithms complement each other. Add impact bullets on utilization and driver fairness.

6. **Pharma Sales BI** — Expand opportunity on field force scale and regulatory context. Deepen solution on integration complexity. Add impact bullets on territory optimization.

7. **E-Commerce Inventory & Procurement** — Expand opportunity on working capital pressure. Deepen solution on AWS architecture. Add impact bullets on vendor negotiation leverage.

8. **Energy Audit** — Opportunity has no bullets — add industry context (compressed air/steam/gas), scale of losses, regulatory drivers. Expand solution on audio analytics methodology. Add impact bullets on quantified savings.

9. **VC EdTech** — Opportunity has no bullets — add growth-stage chaos, investor reporting needs, student outcome tracking. Expand solution on warehouse architecture. Add impact bullets on investor confidence.

10. **Pharma MNC** — Opportunity has no bullets — add multi-geography complexity, field force coordination. Expand solution on route optimization logic. Add impact bullets on brand-level intelligence.

11. **Capital Equipment** — Opportunity has no bullets — add BOM complexity, manufacturing scale. Expand solution on ERP rollout and change management. Add impact bullets on adoption metrics.

12. **Solar BI** — Expand opportunity on government project stakes. Deepen solution on Tableau modeling. Add impact bullets on timeline adherence.

13. **Cultural Heritage** — Opportunity has no bullets — add government mandate, tourism economics, heritage stakes. Expand solution on geospatial methodology. Add impact bullets on policy influence.

14. **ERP Unification** — Already the strongest entry; light enrichment to opportunity context on legacy system technical debt and impact on onboarding speed and global rollout momentum.

## Content rules
- Domain-accurate, professional language — no filler.
- Each case study keeps its unique voice and technical specificity.
- Bullets: action-led, specific, outcome-oriented (matching existing pattern).
- Body paragraphs: narrative context setting the stage for bullets.
- No invented metrics — only expand on what's contextually defensible.

## Technical details
- Single file edit: `src/data/caseStudyDetails.ts`
- No component, layout, routing, or structural changes.
- All existing slugs, IDs, hero content, and section structure preserved.
