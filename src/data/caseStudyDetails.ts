export interface CaseStudyDetailSection {
  id: "opportunity" | "solution" | "impact";
  label: string;
  number: string;
  heading: string;
  body: string;
  bullets?: string[];
}

export interface CaseStudyDetail {
  slug: string;
  caseStudyId: string;
  videoUrl: string;
  heroEyebrow: string;
  heroTitle: string;
  heroSubtitle: string;
  sections: CaseStudyDetailSection[];
}

export const caseStudyDetails: Record<string, CaseStudyDetail> = {
  "retail-manufacturing-chain": {
    slug: "retail-manufacturing-chain",
    caseStudyId: "retail-manufacturing-chain",
    videoUrl:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260210_031346_d87182fb-b0af-4273-84d1-c6fd17d6bf0f.mp4",
    heroEyebrow: "01 · Retail & Manufacturing",
    heroTitle:
      "How a national retail & manufacturing chain turned scattered data into real-time decisions",
    heroSubtitle:
      "We modernized data operations end-to-end — from real-time executive reporting to dealer intelligence, scheme automation, market basket analysis, and dealer attrition prediction.",
    sections: [
      {
        id: "opportunity",
        label: "The Opportunity",
        number: "01",
        heading: "The prize is enormous.",
        body:
          "Manual reporting was draining senior talent and slowing decisions. Across Sales & Marketing, Inventory and Production, leaders were waiting on weekly Excel cycles assembled by hand. Roughly 30% of senior personnel's time was lost to reporting tasks, dealer conversations were happening without context, scheme rollouts were error-prone, and at-risk dealers were only recognized after revenue had already moved away.",
      },
      {
        id: "solution",
        label: "The Solution",
        number: "02",
        heading: "A unified, real-time intelligence layer for the entire chain.",
        body:
          "We rebuilt the data foundation and layered focused intelligence products on top — designed around the moments where decisions actually happen, from the boardroom to the dealer counter.",
        bullets: [
          "Real-time reporting across Sales & Marketing, Inventory and Production — freeing 30% of key personnel's time previously lost to manual reporting.",
          "Front-line sales teams equipped with rich, actionable dealer intelligence at the point of engagement — sharper conversations, faster closures, stronger relationships.",
          "Automated end-to-end implementation of scheme benefit policies across the dealer and distributor network — eliminating manual errors and accelerating rollout.",
          "Market Basket Analysis guiding dealers toward the optimal product mix and smarter in-store placement — improving sell-through and customer satisfaction.",
          "A dealer attrition prediction model identifying at-risk partners in advance — enabling targeted retention before revenue is impacted.",
        ],
      },
      {
        id: "impact",
        label: "The Impact",
        number: "03",
        heading: "Faster cycles, sharper conversations, retention before revenue moves.",
        body:
          "The combination of real-time visibility and predictive intelligence shifted the organization from reactive reporting to proactive decisioning — at every level of the operation.",
        bullets: [
          "30% of senior personnel's reporting time freed and redirected to strategic work.",
          "Sharper, evidence-led dealer conversations driving faster closures.",
          "Scheme rollout accelerated and de-risked through end-to-end automation.",
          "Improved sell-through and customer satisfaction via Market Basket-led product placement.",
          "Proactive retention of at-risk dealers — protecting revenue before it moves.",
        ],
      },
    ],
  },
  "ecom-inventory": {
    slug: "ecom-inventory",
    caseStudyId: "ecom-inventory",
    videoUrl: "",
    heroEyebrow: "07 · E-Commerce",
    heroTitle:
      "Inventory & Procurement Optimization for an E-Commerce leader — at the scale of hundreds of thousands of SKUs",
    heroSubtitle:
      "Hundreds of thousands of SKUs, multiple vendors, volatile demand. We built an Inventory Ageing & PO dashboard on AWS + Power BI that reshaped procurement strategy.",
    sections: [
      {
        id: "opportunity",
        label: "The Opportunity",
        number: "01",
        heading: "The prize is enormous.",
        body:
          "Operating at the scale of hundreds of thousands of SKUs — across private label and third-party brands — the company needed to forecast demand and place POs precisely, while accounting for seasonality, promos, and varying lead times. They also needed clarity on vendor quality (sellable vs. unsellable) and inventory ageing cost.",
      },
      {
        id: "solution",
        label: "The Solution",
        number: "02",
        heading: "A unified Inventory Ageing & PO dashboard on AWS + Power BI.",
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
        id: "impact",
        label: "The Impact",
        number: "03",
        heading: "From reactive firefighting to proactive procurement strategy.",
        body:
          "Real-time visibility across procurement reshaped how the team made buying decisions — freeing working capital while protecting availability across the long tail.",
        bullets: [
          "Stock-outs reduced by 24% across the portfolio.",
          "Holding inventory value reduced by 17% — significant working capital freed.",
          "Procurement operations streamlined through automation — reactive firefighting replaced with proactive strategy.",
        ],
      },
    ],
  },
  "solar-bi": {
    slug: "solar-bi",
    caseStudyId: "solar-bi",
    videoUrl: "",
    heroEyebrow: "13 · Renewables",
    heroTitle:
      "Project Intelligence for solar infrastructure — unifying EPC and Net Metering in real time",
    heroSubtitle:
      "A Tableau BI solution unifying Engineering, Procurement, Construction, and Net Metering data — giving leadership real-time delay impact, supplier dependency, and target-vs-actual visibility.",
    sections: [
      {
        id: "opportunity",
        label: "The Opportunity",
        number: "01",
        heading: "Large-scale solar runs on precision across EPC and Net Metering.",
        body:
          "A high-growth solar infrastructure company executing large-scale renewable projects for state and federal governments needed precision across Engineering, Procurement, Construction, and Net Metering — with leadership lacking a single, real-time view of delay impact, supplier dependency, and progress against targets.",
        bullets: [
          "Procurement and construction risk with knock-on effects on project timelines.",
          "Supplier dependency and concentration of procurement value.",
          "Live status of every material in the procurement pipeline.",
          "Target vs. actual completion at week, month, and quarter level.",
        ],
      },
      {
        id: "solution",
        label: "The Solution",
        number: "02",
        heading: "A Tableau-based BI solution purpose-built for infrastructure cadence.",
        body:
          "We unified disparate EPC and Net Metering data sources into a single Tableau-based BI environment — engineered for the operational rhythm of large-scale infrastructure project management.",
        bullets: [
          "Delay impact analysis — real-time view of expected delays and cascading effects.",
          "Supplier dependency mapping — concentration risks and strategic sourcing decisions.",
          "Procurement stage tracking — activity-level visibility from order to delivery.",
          "Target vs. actual progress monitoring — week, month, and quarter cadence.",
          "Cost & quality dashboards — speed of execution never at the expense of standards.",
        ],
      },
      {
        id: "impact",
        label: "The Impact",
        number: "03",
        heading: "From fragmented project data to executive-grade project intelligence.",
        body:
          "Leadership moved from chasing status updates to steering execution — with a single source of truth across EPC and Net Metering driving faster, more confident decisions on every active project.",
        bullets: [
          "Real-time delay impact and supplier concentration visible at the executive level.",
          "Activity-level procurement tracking from order to site delivery.",
          "Target vs. actual reviews standardized across week, month, and quarter cadence.",
        ],
      },
    ],
  },
  "ev-battery-predictive": {
    slug: "ev-battery-predictive",
    caseStudyId: "ev-battery-predictive",
    videoUrl: "",
    heroEyebrow: "08 · Mobility / IoT",
    heroTitle:
      "Predicting EV battery failures before they happen — with 98%+ accuracy",
    heroSubtitle:
      "Built a multi-class classifier on IoT vitals from a Battery-as-a-Service fleet — predicting failures before they occur with 98%+ accuracy and balanced precision/recall.",
    sections: [
      {
        id: "opportunity",
        label: "The Opportunity",
        number: "01",
        heading: "The prize is enormous.",
        body:
          "A leading Battery-as-a-Service operator partnered with us to predict battery failures before they occur — anchored on real-time IoT vitals and pre-determined safe-operation thresholds.",
      },
      {
        id: "solution",
        label: "The Solution",
        number: "02",
        heading: "A multi-class classifier trained on engineered IoT features.",
        body:
          "We engineered predictive features from raw IoT data — recharge cycles, threshold breach frequency, intervals between breaches, and breach durations. Every data point was labeled Healthy, Warning, or Breached, creating a supervised dataset capturing the full spectrum of battery behavior. A multi-class classifier was trained to identify at-risk batteries in real time.",
        bullets: [
          "Visualizing breach patterns confirmed the core hypothesis — Warning carries a statistically significant relationship with Breached.",
          "Severe class imbalance was addressed using SMOTE — synthetically enriching the minority class without compromising integrity.",
        ],
      },
      {
        id: "impact",
        label: "The Impact",
        number: "03",
        heading: "From reactive to preemptive battery maintenance.",
        body:
          "The model delivered conclusive proof that failures are predictable — enabling the operator to shift from reactive servicing to preemptive intervention before batteries fail in the field.",
        bullets: [
          "98%+ overall accuracy — best-in-class for imbalanced datasets.",
          "Precision, Recall, F1 in the 0.78–0.82 range — real-world reliability without false-alarm overload.",
          "Conclusive proof: failures are predictable, enabling a shift from reactive to preemptive maintenance.",
        ],
      },
    ],
  },
  "fmcg-edible-oil": {
    slug: "fmcg-edible-oil",
    caseStudyId: "fmcg-edible-oil",
    videoUrl: "",
    heroEyebrow: "09 · FMCG",
    heroTitle:
      "Primary, Secondary & Field Efforts unified — one view of FMCG sales performance",
    heroSubtitle:
      "Unified SAP, DMS and SFA into a single AWS Redshift warehouse with Tableau — refreshed 4× daily — giving the Sales Head one view of primary, secondary and field-force performance.",
    sections: [
      {
        id: "opportunity",
        label: "The Opportunity",
        number: "01",
        heading: "Three disconnected systems, one Sales Head, zero unified view.",
        body:
          "India's foremost producer of sunflower oil — 50+ years of heritage, 1,000+ employees, FMCG distribution across multiple states. Sales data lived in three disconnected systems — SAP (primary sales), DMS (secondary), and SFA (field). The Sales Head had no unified view: primary-to-secondary conversion, fulfilment efficiency, TAT, field productivity, and route adherence all went unanswered daily.",
        bullets: [
          "Primary-to-secondary sales conversion invisible day-to-day.",
          "Order fulfilment efficiency and turnaround time unmeasured.",
          "Field-force productivity and route adherence untracked.",
          "No single source of truth for the Sales Head.",
        ],
      },
      {
        id: "solution",
        label: "The Solution",
        number: "02",
        heading: "A unified Data Warehouse on AWS Redshift, refreshed 4× daily.",
        body:
          "We integrated SAP, DMS, and SFA into a single AWS Redshift warehouse with a robust data engineering pipeline ensuring seamless flow. Tableau dashboards were modeled on existing business processes — refreshed four times a day so the Sales Head and field leadership could act on the same numbers.",
        bullets: [
          "AWS Redshift warehouse unifying SAP, DMS, and SFA.",
          "Engineering pipeline with quality checks and 4× daily refresh cadence.",
          "Tableau dashboards mirrored to existing primary, secondary, and field workflows.",
          "Drill-down from national rollup to individual rep, route, and outlet.",
        ],
      },
      {
        id: "impact",
        label: "The Impact",
        number: "03",
        heading: "From fragmented sales data to proactive field-force intervention.",
        body:
          "Real-time visibility into field force efforts and attendance enabled proactive intervention — replacing weekly retrospection with same-day course correction across primary, secondary, and field operations.",
        bullets: [
          "15% increase in sales efficiency through real-time field-force visibility.",
          "25% improvement in route adherence and customer-visit consistency.",
          "15% improvement in order fulfilment rate.",
          "27% reduction in order fulfilment turnaround time.",
        ],
      },
    ],
  },
  "ev-fleet-scheduling": {
    slug: "ev-fleet-scheduling",
    caseStudyId: "ev-fleet-scheduling",
    videoUrl: "",
    heroEyebrow: "11 · Logistics & Mobility",
    heroTitle:
      "AI-Driven Fleet Scheduling for Electric Cabs — optimized in real time",
    heroSubtitle:
      "A hybrid optimization engine — Genetic Algorithms, Tabu Search, and Simulated Annealing — that allocates EV cabs across pick-up/drop trips while respecting battery, driver, and operational constraints in real time.",
    sections: [
      {
        id: "opportunity",
        label: "The Opportunity",
        number: "01",
        heading: "Every EV cab assignment is a multi-constraint decision.",
        body:
          "Allocate EV cabs across a continuous stream of pick-up/drop trips — at depot and in transit — to maximize fleet utilization and minimize dead miles. Battery charge is a primary driver of every allocation: no cab is assigned a trip it can't physically complete.",
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
        id: "solution",
        label: "The Solution",
        number: "02",
        heading: "A hybrid optimization engine built for real-world complexity.",
        body:
          "We combined mathematical programming with advanced heuristics — engineered to converge on globally optimal allocations within the operational tempo of a live cab fleet.",
        bullets: [
          "Genetic Algorithms — evolutionary search across large solution spaces.",
          "Tabu Search — memory-based local search avoiding revisits to explored solutions.",
          "Simulated Annealing — probabilistic moves to escape local optima and converge globally.",
        ],
      },
      {
        id: "impact",
        label: "The Impact",
        number: "03",
        heading: "From manual dispatch to autonomous, constraint-aware scheduling.",
        body:
          "A fully automated, optimized scheduling engine handling real-world complexity — live telematics, dynamic repositioning, and multi-constraint allocation — at the speed and scale operations demand.",
        bullets: [
          "Battery-aware allocations eliminate mid-trip range failures.",
          "Equitable distance distribution extends fleet life and driver fairness.",
          "Disruption-resilient re-planning on cab unavailability or charging events.",
        ],
      },
    ],
  },
};