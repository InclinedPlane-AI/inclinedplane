import { Database, BarChart3, Eye, TrendingUp, Layers, Factory, GraduationCap, Pill, Zap, Truck, Battery, Droplet, Cog, Route, Landmark, Sun } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import imgRetailMfg from "@/assets/case-retail-manufacturing.jpg";
import imgPharmaErp from "@/assets/case-pharma-erp.jpg";
import imgEnergyAudit from "@/assets/case-energy-audit.jpg";
import imgEdtech from "@/assets/case-edtech.jpg";
import imgCapitalEquipment from "@/assets/case-capital-equipment.jpg";
import imgPharmaSalesBi from "@/assets/case-pharma-sales-bi.jpg";
import imgEcomInventory from "@/assets/case-ecom-inventory.jpg";
import imgEvBattery from "@/assets/case-ev-battery.jpg";
import imgFmcgEdibleOil from "@/assets/case-fmcg-edible-oil.jpg";
import imgEngineForecast from "@/assets/case-engine-forecast.jpg";
import imgEvFleet from "@/assets/case-ev-fleet.jpg";
import imgCulturalHeritage from "@/assets/case-cultural-heritage.jpg";
import imgSolarBi from "@/assets/case-solar-bi.jpg";

export interface CaseStudyMetric {
  value: number | string;
  suffix?: string;
  prefix?: string;
  label: string;
}

export interface CaseStudySection {
  heading: string;
  body?: string;
  bullets?: string[];
}

export interface CaseStudy {
  id: string;
  number: string;
  title: string;
  industry: string;
  summary: string; // 2-3 line teaser shown on the card
  icon: LucideIcon;
  image: string;
  stack?: string;
  metrics?: CaseStudyMetric[];
  sections: CaseStudySection[]; // shown in modal
}

export const caseStudies: CaseStudy[] = [
  {
    id: "retail-manufacturing-chain",
    number: "01",
    title: "Retail & Manufacturing Chain",
    industry: "Retail & Manufacturing",
    summary:
      "Modernized data operations end-to-end — from real-time executive reporting to dealer intelligence, scheme automation, market basket analysis, and dealer attrition prediction.",
    icon: Factory,
    image: imgRetailMfg,
    metrics: [
      { value: 30, suffix: "%", label: "Reporting time freed" },
    ],
    sections: [
      {
        heading: "What we delivered",
        bullets: [
          "Real-time reporting across Sales & Marketing, Inventory, and Production — freeing 30% of key personnel's time previously lost to manual reporting.",
          "Equipped front-line sales teams with rich, actionable dealer intelligence at the point of engagement — sharper conversations, faster closures, stronger relationships.",
          "Automated end-to-end implementation of scheme benefit policies across the dealer and distributor network — eliminating manual errors and accelerating rollout.",
          "Leveraged Market Basket Analysis to guide dealers toward the optimal product mix and smarter in-store placement — improving sell-through and customer satisfaction.",
          "Built a dealer attrition prediction model that identifies at-risk partners in advance — enabling targeted retention before revenue is impacted.",
        ],
      },
    ],
  },
  {
    id: "pharma-mnc",
    number: "02",
    title: "Pharmaceutical MNC — Sales ERP Analytics",
    industry: "Pharmaceuticals",
    summary:
      "Built a robust analytics layer on top of Sales ERP — transforming raw transactional data into strategic intelligence across operations, tactics, and strategy.",
    icon: Pill,
    image: imgPharmaErp,
    stack: "Tableau",
    sections: [
      {
        heading: "Data sourcing & management",
        body:
          "Established seamless, reliable data pipelines directly from enterprise-grade Sales ERP systems — ensuring clean, consistent, and audit-ready data as the foundation for all analytics.",
      },
      {
        heading: "Analytics",
        bullets: [
          "Applied advanced route optimization algorithms to maximize field sales efficiency — reducing travel overhead while improving territory coverage and rep productivity.",
          "In-depth Sales vs. Efforts analysis to identify the precise combination of activities that drive peak performance — blending descriptive and predictive analytics to measure brand health and rep effectiveness.",
        ],
      },
      {
        heading: "Visualization",
        bullets: [
          "Operational, tactical, and strategic dashboards on a browser-based Tableau platform — a clear, real-time view of the metrics that matter at every level.",
          "Intelligent threshold-based alerts that notify decision-makers the moment critical metrics deviate — enabling proactive responses before issues escalate.",
        ],
      },
    ],
  },
  {
    id: "energy-audit",
    number: "03",
    title: "Energy Audit & Maintenance Engineering",
    industry: "Energy & Industrial",
    summary:
      "Brought data-driven precision to one of the industry's hardest problems — minimizing equipment losses and detecting infrastructure failures before they become costly disasters.",
    icon: Zap,
    image: imgEnergyAudit,
    stack: "Cloud Data Warehouse, Tableau, Audio Analytics",
    metrics: [
      { value: 11, label: "Aberration types" },
      { value: 30, suffix: "+ yrs", label: "Data consolidated" },
    ],
    sections: [
      {
        heading: "What we delivered",
        bullets: [
          "An analytics-based decision-making framework deployed across leading oil refineries nationwide — addressing 11 distinct types of equipment aberrations and reducing losses tied to undetected failures.",
          "A cutting-edge audio analytics infrastructure that automatically identifies leak type and size by analyzing ultrasound frequency patterns — real-time, non-invasive detection that replaces guesswork with precision.",
        ],
      },
      {
        heading: "How we executed it",
        body:
          "We stood up scalable cloud infrastructure to consolidate over 30 years of unorganized data — spanning multiple formats and siloed across departments. We digitized capture across structured and unstructured sources (including audio), implemented rigorous data quality monitoring, and architected a robust data warehouse to serve as the analytics backbone. A Tableau-powered visualization environment shifted the organization's culture from instinct-driven to evidence-based.",
      },
    ],
  },
  {
    id: "vc-edtech",
    number: "04",
    title: "VC-Funded Educational Products Company",
    industry: "EdTech",
    summary:
      "Established a solid Business Intelligence foundation — bringing structure, clarity, and foresight to data that was previously scattered, manual, and impossible to act on at speed.",
    icon: GraduationCap,
    image: imgEdtech,
    stack: "Tableau, Data Warehouse",
    sections: [
      {
        heading: "Data sourcing & management",
        bullets: [
          "Integrated transactional data from school-level ERPs, finance and accounting systems, and legacy manual reporting — consolidating fragmented data into a single source of truth.",
          "Standardized and cleansed inputs across structured and unstructured sources — ensuring consistency, completeness, and confidence in every report downstream.",
        ],
      },
      {
        heading: "Analytics",
        bullets: [
          "In-depth KPI consulting across organizational levels — moving from vanity numbers to decisions-grade intelligence aligned across leadership, operations, and academic teams.",
          "Architected a unified Data Warehouse — the analytical backbone for both day-to-day monitoring and long-term strategic planning.",
        ],
      },
      {
        heading: "Visualization",
        bullets: [
          "Descriptive and predictive analytics surfaced insights into student learning outcomes and financial performance — what happened, and what is likely to happen next.",
          "A secure, private Tableau monitoring dashboard — a browser-based, real-time window into the metrics that drive academic and business success.",
        ],
      },
    ],
  },
  {
    id: "capital-equipment",
    number: "05",
    title: "Leading Capital Equipment Manufacturer",
    industry: "Manufacturing",
    summary:
      "Laid the data management groundwork demanded by growth — ERP implementation, process mapping, and the governance structures needed to sustain data quality at scale.",
    icon: Cog,
    image: imgCapitalEquipment,
    stack: "Tableau, OpenRefine, Data Wrangler",
    sections: [
      {
        heading: "Data sourcing & management",
        bullets: [
          "Led end-to-end ERP implementation across Inventory and Purchase — a structured, standardized approach to data capture from day one.",
          "Mapped existing capture processes, identifying critical gaps silently undermining operational accuracy and reporting reliability.",
        ],
      },
      {
        heading: "Analytics & data management",
        bullets: [
          "Robust data storage and organization across Inventory, Purchase, and Manufacturing — coherent, scalable architecture for ops and reporting.",
          "Comprehensive data sanitization using OpenRefine and Data Wrangler — cleansed, standardized, and enriched across departments.",
          "Formal data governance: dedicated departmental stewards and structured audit processes — ongoing data quality owned and continuously improved at the source.",
        ],
      },
      {
        heading: "Visualization",
        bullets: [
          "Tableau dashboards tracked ERP adoption progress in real time — clear visibility into rollout milestones and early identification of data aberrations.",
        ],
      },
    ],
  },
  {
    id: "pharma-sales-bi",
    number: "06",
    title: "Sales Process Optimization — Pharmaceutical",
    industry: "Pharmaceuticals",
    summary:
      "Replaced manual, weekly Excel reporting with an automated Tableau BI platform — cutting cost, accelerating decisions, and unlocking field-force intelligence at the rep level.",
    icon: BarChart3,
    image: imgPharmaSalesBi,
    stack: "Tableau",
    sections: [
      {
        heading: "The challenges",
        bullets: [
          "Manual, time-consuming weekly Excel reporting consuming senior employees' time.",
          "Compromised data accuracy from manual crunching at every stage.",
          "Delayed decision-making — leadership consistently acting on outdated data.",
          "Limited analytical depth — no slice-and-dice across departments, territories, or reps.",
        ],
      },
      {
        heading: "Our solution",
        body:
          "An end-to-end BI solution — requirement gathering, multi-source data integration, dynamic visualization, and automated refresh. Tableau served as the BI platform of choice, replacing static spreadsheets with living, actionable intelligence.",
      },
      {
        heading: "Impact & benefits",
        bullets: [
          "Deeper sales intelligence: visibility into customer-facing days, F2F calls, remote calls, and coaching days — drill-down to the rep level.",
          "Right-time information delivery: KPIs refreshed at frequencies aligned to business need — real-time for operational, scheduled for strategic.",
          "Measurable productivity gains from daily visibility and proactive decision-making.",
          "Hundreds of hours reclaimed from manual data processing — senior talent freed for strategic work.",
        ],
      },
    ],
  },
  {
    id: "ecom-inventory",
    number: "07",
    title: "Inventory & Procurement Optimization — E-Commerce",
    industry: "E-Commerce",
    summary:
      "Hundreds of thousands of SKUs, multiple vendors, volatile demand. We built an Inventory Ageing & PO dashboard on AWS + Power BI that reshaped procurement strategy.",
    icon: Layers,
    image: imgEcomInventory,
    stack: "AWS, Power BI",
    metrics: [
      { value: 24, suffix: "%", label: "Stock-out reduction" },
      { value: 17, suffix: "%", label: "Inventory value cut" },
    ],
    sections: [
      {
        heading: "The challenge",
        body:
          "Operating at the scale of hundreds of thousands of SKUs — across private label and third-party brands — the company needed to forecast demand and place POs precisely, while accounting for seasonality, promos, and varying lead times. They also needed clarity on vendor quality (sellable vs. unsellable) and inventory ageing cost.",
      },
      {
        heading: "Our solution",
        body:
          "A comprehensive Inventory Ageing and Purchase Order Dashboard. Data unified through a best-in-class warehouse on AWS, with a Power BI front-end delivering real-time visibility across procurement.",
        bullets: [
          "Sellable vs. non-sellable inventory at vendor and SKU level.",
          "Inventory ageing by quantity and cost — bucketed to prioritize action on slow-moving stock.",
          "Historically non-performing SKUs to inform smarter future purchases.",
          "Pareto analysis of the long-tail SKU base — vendor consolidation and PO rationalization.",
        ],
      },
      {
        heading: "The results",
        bullets: [
          "Stock-outs reduced by 24% across the portfolio.",
          "Holding inventory value reduced by 17% — significant working capital freed.",
          "Procurement operations streamlined through automation — reactive firefighting replaced with proactive strategy.",
        ],
      },
    ],
  },
  {
    id: "ev-battery-predictive",
    number: "08",
    title: "Predictive Maintenance of EV Batteries",
    industry: "Mobility / IoT",
    summary:
      "Built a multi-class classifier on IoT vitals from a Battery-as-a-Service fleet — predicting failures before they occur with 98%+ accuracy and balanced precision/recall.",
    icon: Battery,
    image: imgEvBattery,
    stack: "IoT, Python, SMOTE, Multi-class Classification",
    metrics: [
      { value: 98, suffix: "%+", label: "Overall accuracy" },
      { value: "0.78–0.82", label: "Precision / Recall / F1" },
    ],
    sections: [
      {
        heading: "Background",
        body:
          "A leading Battery-as-a-Service operator partnered with us to predict battery failures before they occur — anchored on real-time IoT vitals and pre-determined safe-operation thresholds.",
      },
      {
        heading: "Our approach",
        body:
          "We engineered predictive features from raw IoT data — recharge cycles, threshold breach frequency, intervals between breaches, and breach durations. Every data point was labeled Healthy, Warning, or Breached, creating a supervised dataset capturing the full spectrum of battery behavior. A multi-class classifier was trained to identify at-risk batteries in real time.",
      },
      {
        heading: "Successes & challenges",
        body:
          "Visualizing breach patterns confirmed the core hypothesis — Warning carries a statistically significant relationship with Breached. Severe class imbalance was addressed using SMOTE — synthetically enriching the minority class without compromising integrity.",
      },
      {
        heading: "Results",
        bullets: [
          "98%+ overall accuracy — best-in-class for imbalanced datasets.",
          "Precision, Recall, F1 in the 0.78–0.82 range — real-world reliability without false-alarm overload.",
          "Conclusive proof: failures are predictable, enabling a shift from reactive to preemptive maintenance.",
        ],
      },
    ],
  },
  {
    id: "fmcg-edible-oil",
    number: "09",
    title: "Primary, Secondary & Field Efforts — FMCG",
    industry: "FMCG",
    summary:
      "Unified SAP, DMS and SFA into a single AWS Redshift warehouse with Tableau — refreshed 4× daily — giving the Sales Head one view of primary, secondary and field-force performance.",
    icon: Droplet,
    image: imgFmcgEdibleOil,
    stack: "AWS Redshift, Tableau",
    metrics: [
      { value: 15, suffix: "%", label: "Sales efficiency" },
      { value: 25, suffix: "%", label: "Route adherence" },
      { value: 27, suffix: "%", label: "TAT reduction" },
    ],
    sections: [
      {
        heading: "About the client",
        body:
          "India's foremost producer of sunflower oil — 50+ years of heritage, 1,000+ employees, FMCG distribution across multiple states.",
      },
      {
        heading: "The challenge",
        body:
          "Sales data lived in three disconnected systems — SAP (primary sales), DMS (secondary), and SFA (field). The Sales Head had no unified view: primary-to-secondary conversion, fulfilment efficiency, TAT, field productivity, and route adherence all went unanswered daily.",
      },
      {
        heading: "Our solution",
        body:
          "A unified Data Warehouse on AWS Redshift integrating SAP, DMS, and SFA. A robust data engineering pipeline ensured seamless flow. Tableau dashboards mirrored existing business processes, refreshed four times a day.",
      },
      {
        heading: "The impact",
        bullets: [
          "15% increase in sales efficiency — real-time visibility into field force efforts and attendance enabling proactive intervention.",
          "25% improvement in route adherence — stronger compliance and consistent customer visits.",
          "15% improvement in order fulfilment rate.",
          "27% reduction in order fulfilment turnaround time.",
        ],
      },
    ],
  },
  {
    id: "engine-demand-forecast",
    number: "10",
    title: "Demand Forecasting — Engine & Power Solutions",
    industry: "Manufacturing",
    summary:
      "Benchmarked ARIMA, LSTM and ML methods against MAPE/RMSE/MAD — DeepAR+ on AWS won. Monthly forecasts now feed production planning and procurement directly.",
    icon: TrendingUp,
    image: imgEngineForecast,
    stack: "AWS, DeepAR+, Power BI",
    metrics: [
      { value: 17, suffix: "%", label: "Inventory cost cut" },
    ],
    sections: [
      {
        heading: "Background",
        body:
          "Volatile demand, extended material lead times, and intense competition exposed the limits of the existing forecasting approach — costly stockouts, excess inventory, and missed expectations. The mandate: a forecasting system accurate enough to fix all three.",
      },
      {
        heading: "Our approach",
        body:
          "We benchmarked ARIMA (classical), LSTM (deep learning), and ML ensembles against MAPE, RMSE, and MAD. DeepAR+ won — its ability to learn seasonal patterns and leverage correlated time series across product lines made it uniquely suited to the client's environment.",
      },
      {
        heading: "Implementation",
        body:
          "DeepAR+ deployed on AWS for scalability and seamless integration. Monthly forecasts feed production planning and procurement. A Power BI dashboard gives planners and ops teams real-time visibility into accuracy and inventory projections.",
      },
      {
        heading: "Results & road ahead",
        bullets: [
          "17% reduction in inventory holding costs — direct outcome of more accurate demand signals.",
          "Planned: integration of Marketing data streams and customer-submitted forecasts for a continuously learning planning engine.",
        ],
      },
    ],
  },
  {
    id: "ev-fleet-scheduling",
    number: "11",
    title: "AI-Driven Fleet Scheduling — Electric Cabs",
    industry: "Logistics & Mobility",
    summary:
      "A hybrid optimization engine — Genetic Algorithms, Tabu Search, and Simulated Annealing — that allocates EV cabs across pick-up/drop trips while respecting battery, driver, and operational constraints in real time.",
    icon: Route,
    image: imgEvFleet,
    stack: "Genetic Algorithms, Tabu Search, Simulated Annealing",
    sections: [
      {
        heading: "The challenge",
        body:
          "Allocate EV cabs across a continuous stream of pick-up/drop trips — at depot and in transit — to maximize fleet utilization and minimize dead miles. Battery charge is a primary driver of every allocation: no cab is assigned a trip it can't physically complete.",
      },
      {
        heading: "The constraints",
        bullets: [
          "Battery sufficiency for full journey.",
          "Driver working hours — every allocation within scheduled shift.",
          "Vehicle type compliance and campus-specific designations.",
          "Escort trips originate from campus; cab returns immediately after drop.",
          "Company-mandated occupancy limits respected per trip.",
          "5-minute pick-up buffer for boarding.",
          "Equitable distance distribution across the fleet.",
          "Mid-schedule disruption minimization on cab unavailability.",
          "Intelligent fast/slow charging scheduling.",
        ],
      },
      {
        heading: "Our solution",
        body:
          "A hybrid optimization strategy combining mathematical programming with advanced heuristics:",
        bullets: [
          "Genetic Algorithms — evolutionary search across large solution spaces.",
          "Tabu Search — memory-based local search avoiding revisits to explored solutions.",
          "Simulated Annealing — probabilistic moves to escape local optima and converge globally.",
        ],
      },
      {
        heading: "Outcome",
        body:
          "A fully automated, optimized scheduling engine handling real-world complexity — live telematics, dynamic repositioning, and multi-constraint allocation — at the speed and scale operations demand.",
      },
    ],
  },
  {
    id: "cultural-heritage",
    number: "12",
    title: "Cultural Heritage Analytics — Govt. (Middle East)",
    industry: "Public Sector",
    summary:
      "Dynamic geographic visualizations correlating population, historical landmarks, and proposed sites — turning intuition-led cultural site planning into evidence-based strategy.",
    icon: Landmark,
    image: imgCulturalHeritage,
    sections: [
      {
        heading: "The challenge",
        body:
          "As the authority planned future cultural site development, decision-makers needed a clear visual understanding of how population distribution, existing landmarks, and proposed sites related geographically and strategically — to prevent misaligned resource allocation.",
      },
      {
        heading: "Our solution",
        bullets: [
          "Plan future cultural site developments with confidence — proposed sites layered against population data and historical landmark density.",
          "Identify underserved regions where cultural infrastructure was sparse relative to population — for more equitable development.",
          "Correlate geographic and demographic data to prioritize investments that maximize cultural reach and heritage preservation.",
        ],
      },
    ],
  },
  {
    id: "solar-bi",
    number: "13",
    title: "Project Intelligence — Solar Infrastructure",
    industry: "Renewables",
    summary:
      "A Tableau BI solution unifying Engineering, Procurement, Construction, and Net Metering data — giving leadership real-time delay impact, supplier dependency, and target-vs-actual visibility.",
    icon: Sun,
    image: imgSolarBi,
    stack: "Tableau",
    sections: [
      {
        heading: "About the client",
        body:
          "A high-growth solar infrastructure company executing large-scale renewable projects for state and federal governments — precision required across Engineering, Procurement, Construction, and Net Metering.",
      },
      {
        heading: "The challenge",
        bullets: [
          "Procurement/construction risk and knock-on effects on project timelines.",
          "Supplier dependency and concentration of procurement value.",
          "Live status of every material in the procurement pipeline.",
          "Target vs. actual completion at week, month, and quarter level.",
          "Cost and quality benchmarks for construction activities.",
        ],
      },
      {
        heading: "Our solution",
        body:
          "A Tableau-based BI solution unifying disparate data sources — purpose-built for the operational rhythm of large-scale infrastructure project management.",
        bullets: [
          "Delay impact analysis — real-time view of expected delays and cascading effects.",
          "Supplier dependency mapping — concentration risks and strategic sourcing decisions.",
          "Procurement stage tracking — activity-level visibility from order to delivery.",
          "Target vs. actual progress monitoring — week, month, and quarter cadence.",
          "Cost & quality dashboards — speed of execution never at the expense of standards.",
        ],
      },
    ],
  },
];

// Re-export icons used so the unused import warnings stay quiet.
export { Database, Eye };