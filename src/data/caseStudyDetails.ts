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
    heroTitle: "How a national retail & manufacturing chain turned scattered data into real-time decisions",
    heroSubtitle:
      "We modernized data operations end-to-end — from real-time executive reporting to dealer intelligence, scheme automation, market basket analysis, and dealer attrition prediction.",
    sections: [
      {
        id: "opportunity",
        label: "The Opportunity",
        number: "01",
        heading: "The prize is enormous.",
        body: "Manual reporting was draining senior talent and slowing decisions. Across Sales & Marketing, Inventory and Production, leaders were waiting on weekly Excel cycles assembled by hand. Roughly 30% of senior personnel's time was lost to reporting tasks, dealer conversations were happening without context, scheme rollouts were error-prone, and at-risk dealers were only recognized after revenue had already moved away.",
      },
      {
        id: "solution",
        label: "The Solution",
        number: "02",
        heading: "A unified, real-time intelligence layer for the entire chain.",
        body: "We rebuilt the data foundation and layered focused intelligence products on top — designed around the moments where decisions actually happen, from the boardroom to the dealer counter.",
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
        body: "The combination of real-time visibility and predictive intelligence shifted the organization from reactive reporting to proactive decisioning — at every level of the operation.",
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
        body: "Operating at the scale of hundreds of thousands of SKUs — across private label and third-party brands — the company needed to forecast demand and place POs precisely, while accounting for seasonality, promos, and varying lead times. They also needed clarity on vendor quality (sellable vs. unsellable) and inventory ageing cost.",
      },
      {
        id: "solution",
        label: "The Solution",
        number: "02",
        heading: "A unified Inventory Ageing & PO dashboard on AWS + Power BI.",
        body: "A comprehensive Inventory Ageing and Purchase Order Dashboard. Data unified through a best-in-class warehouse on AWS, with a Power BI front-end delivering real-time visibility across procurement.",
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
        body: "Real-time visibility across procurement reshaped how the team made buying decisions — freeing working capital while protecting availability across the long tail.",
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
    heroEyebrow: "12 · Renewables",
    heroTitle: "Project Intelligence for solar infrastructure — unifying EPC and Net Metering in real time",
    heroSubtitle:
      "A Tableau BI solution unifying Engineering, Procurement, Construction, and Net Metering data — giving leadership real-time delay impact, supplier dependency, and target-vs-actual visibility.",
    sections: [
      {
        id: "opportunity",
        label: "The Opportunity",
        number: "01",
        heading: "Large-scale solar runs on precision across EPC and Net Metering.",
        body: "A high-growth solar infrastructure company executing large-scale renewable projects for state and federal governments needed precision across Engineering, Procurement, Construction, and Net Metering — with leadership lacking a single, real-time view of delay impact, supplier dependency, and progress against targets.",
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
        body: "We unified disparate EPC and Net Metering data sources into a single Tableau-based BI environment — engineered for the operational rhythm of large-scale infrastructure project management.",
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
        body: "Leadership moved from chasing status updates to steering execution — with a single source of truth across EPC and Net Metering driving faster, more confident decisions on every active project.",
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
    heroEyebrow: "03 · Mobility / IoT",
    heroTitle: "Predicting EV battery failures before they happen — with 98%+ accuracy",
    heroSubtitle:
      "Built a multi-class classifier on IoT vitals from a Battery-as-a-Service fleet — predicting failures before they occur with 98%+ accuracy and balanced precision/recall.",
    sections: [
      {
        id: "opportunity",
        label: "The Opportunity",
        number: "01",
        heading: "The prize is enormous.",
        body: "A leading Battery-as-a-Service operator partnered with us to predict battery failures before they occur — anchored on real-time IoT vitals and pre-determined safe-operation thresholds.",
      },
      {
        id: "solution",
        label: "The Solution",
        number: "02",
        heading: "A multi-class classifier trained on engineered IoT features.",
        body: "We engineered predictive features from raw IoT data — recharge cycles, threshold breach frequency, intervals between breaches, and breach durations. Every data point was labeled Healthy, Warning, or Breached, creating a supervised dataset capturing the full spectrum of battery behavior. A multi-class classifier was trained to identify at-risk batteries in real time.",
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
        body: "The model delivered conclusive proof that failures are predictable — enabling the operator to shift from reactive servicing to preemptive intervention before batteries fail in the field.",
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
    heroEyebrow: "04 · FMCG",
    heroTitle: "Primary, Secondary & Field Efforts unified — one view of FMCG sales performance",
    heroSubtitle:
      "Unified SAP, DMS and SFA into a single AWS Redshift warehouse with Tableau — refreshed 4× daily — giving the Sales Head one view of primary, secondary and field-force performance.",
    sections: [
      {
        id: "opportunity",
        label: "The Opportunity",
        number: "01",
        heading: "Three disconnected systems, one Sales Head, zero unified view.",
        body: "India's foremost producer of sunflower oil — 50+ years of heritage, 1,000+ employees, FMCG distribution across multiple states. Sales data lived in three disconnected systems — SAP (primary sales), DMS (secondary), and SFA (field). The Sales Head had no unified view: primary-to-secondary conversion, fulfilment efficiency, TAT, field productivity, and route adherence all went unanswered daily.",
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
        body: "We integrated SAP, DMS, and SFA into a single AWS Redshift warehouse with a robust data engineering pipeline ensuring seamless flow. Tableau dashboards were modeled on existing business processes — refreshed four times a day so the Sales Head and field leadership could act on the same numbers.",
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
        body: "Real-time visibility into field force efforts and attendance enabled proactive intervention — replacing weekly retrospection with same-day course correction across primary, secondary, and field operations.",
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
    heroEyebrow: "05 · Logistics & Mobility",
    heroTitle: "AI-Driven Fleet Scheduling for Electric Cabs — optimized in real time",
    heroSubtitle:
      "A hybrid optimization engine — Genetic Algorithms, Tabu Search, and Simulated Annealing — that allocates EV cabs across pick-up/drop trips while respecting battery, driver, and operational constraints in real time.",
    sections: [
      {
        id: "opportunity",
        label: "The Opportunity",
        number: "01",
        heading: "Every EV cab assignment is a multi-constraint decision.",
        body: "Allocate EV cabs across a continuous stream of pick-up/drop trips — at depot and in transit — to maximize fleet utilization and minimize dead miles. Battery charge is a primary driver of every allocation: no cab is assigned a trip it can't physically complete.",
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
        body: "We combined mathematical programming with advanced heuristics — engineered to converge on globally optimal allocations within the operational tempo of a live cab fleet.",
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
        body: "A fully automated, optimized scheduling engine handling real-world complexity — live telematics, dynamic repositioning, and multi-constraint allocation — at the speed and scale operations demand.",
        bullets: [
          "Battery-aware allocations eliminate mid-trip range failures.",
          "Equitable distance distribution extends fleet life and driver fairness.",
          "Disruption-resilient re-planning on cab unavailability or charging events.",
        ],
      },
    ],
  },
  "pharma-sales-bi": {
    slug: "pharma-sales-bi",
    caseStudyId: "pharma-sales-bi",
    videoUrl: "",
    heroEyebrow: "06 · Pharmaceuticals",
    heroTitle: "Sales Process Optimization — from manual Excel to automated, rep-level Tableau intelligence",
    heroSubtitle:
      "Replaced manual, weekly Excel reporting with an end-to-end Tableau BI platform — cutting cost, accelerating decisions, and unlocking field-force intelligence at the rep level.",
    sections: [
      {
        id: "opportunity",
        label: "The Opportunity",
        number: "01",
        heading: "Senior employees crunching weekly Excel — leadership acting on stale data.",
        body: "A pharmaceutical leader was running its sales review on manual, weekly Excel reporting — consuming the time of senior employees, compromising data accuracy at every manual stage, and leaving leadership consistently acting on outdated numbers. Analytical depth was limited; there was no clean way to slice across departments, territories, or reps.",
        bullets: [
          "Manual, time-consuming weekly Excel reporting consuming senior employees' time.",
          "Data accuracy compromised by manual crunching at every stage.",
          "Delayed decision-making — leadership consistently acting on outdated data.",
          "No slice-and-dice across departments, territories, or reps.",
        ],
      },
      {
        id: "solution",
        label: "The Solution",
        number: "02",
        heading: "An end-to-end BI platform on Tableau — living, actionable intelligence.",
        body: "We delivered an end-to-end BI solution — requirement gathering, multi-source data integration, dynamic visualization, and automated refresh. Tableau served as the BI platform of choice, replacing static spreadsheets with living, actionable intelligence aligned to how the business actually runs.",
        bullets: [
          "Multi-source data integration replacing manual Excel pulls.",
          "Dynamic Tableau visualizations modeled on real sales workflows.",
          "Automated refresh — KPIs aligned to operational and strategic cadences.",
          "Drill-down from leadership rollup to individual rep activity.",
        ],
      },
      {
        id: "impact",
        label: "The Impact",
        number: "03",
        heading: "From weekly retrospection to rep-level, right-time decisioning.",
        body: "Sales leadership moved from weekly Excel retrospection to right-time, rep-level visibility — measurable productivity gains and hundreds of senior-talent hours reclaimed for strategic work.",
        bullets: [
          "Deeper sales intelligence — customer-facing days, F2F calls, remote calls, and coaching days, drillable to rep level.",
          "Right-time KPI delivery — real-time for operational, scheduled for strategic.",
          "Measurable productivity gains from daily visibility and proactive decisions.",
          "Hundreds of senior-talent hours reclaimed from manual data processing.",
        ],
      },
    ],
  },
  "engine-demand-forecast": {
    slug: "engine-demand-forecast",
    caseStudyId: "engine-demand-forecast",
    videoUrl: "",
    heroEyebrow: "02 · Manufacturing",
    heroTitle: "Demand Forecasting — Engine & Power Solutions",
    heroSubtitle:
      "Benchmarked ARIMA, LSTM and ML methods against MAPE/RMSE/MAD — DeepAR+ on AWS won. Monthly forecasts now feed production planning and procurement directly.",
    sections: [
      {
        id: "opportunity",
        label: "The Opportunity",
        number: "01",
        heading: "Volatile demand and material lead times",
        body: "Volatile demand, extended material lead times, and intense competition exposed the limits of the existing forecasting approach — costly stockouts, excess inventory, and missed expectations. The mandate: a forecasting system accurate enough to fix all three.",
      },
      {
        id: "solution",
        label: "The Solution",
        number: "02",
        heading: "DeepAR+ deployed on AWS",
        body: "We benchmarked ARIMA (classical), LSTM (deep learning), and ML ensembles against MAPE, RMSE, and MAD. DeepAR+ won — its ability to learn seasonal patterns and leverage correlated time series across product lines made it uniquely suited to the client's environment.",
        bullets: [
          "DeepAR+ deployed on AWS for scalability and seamless integration.",
          "Monthly forecasts feed production planning and procurement.",
          "A Power BI dashboard gives planners and ops teams real-time visibility into accuracy and inventory projections.",
        ],
      },
      {
        id: "impact",
        label: "The Impact",
        number: "03",
        heading: "From reactive to proactive inventory management",
        body: "More accurate demand signals led to significant reductions in inventory holding costs and set the stage for a continuously learning planning engine.",
        bullets: [
          "17% reduction in inventory holding costs — direct outcome of more accurate demand signals.",
          "Planned: integration of Marketing data streams and customer-submitted forecasts for a continuously learning planning engine.",
        ],
      },
    ],
  },
  "energy-audit": {
    slug: "energy-audit",
    caseStudyId: "energy-audit",
    videoUrl: "",
    heroEyebrow: "08 · Energy & Industrial",
    heroTitle: "Energy Audit & Maintenance Engineering",
    heroSubtitle:
      "Brought data-driven precision to minimizing equipment losses and detecting infrastructure failures before they become costly disasters.",
    sections: [
      {
        id: "opportunity",
        label: "The Opportunity",
        number: "01",
        heading: "Minimizing equipment losses and infrastructure failures",
        body: "Detecting infrastructure failures before they become costly disasters is a significant challenge. Manual monitoring and instinct-driven maintenance were not enough to prevent undetected failures and significant losses.",
      },
      {
        id: "solution",
        label: "The Solution",
        number: "02",
        heading: "Analytics-based decision-making and Audio Analytics",
        body: "We consolidated over 30 years of unorganized data and implemented a cutting-edge audio analytics infrastructure. This system identifies leak types and sizes by analyzing ultrasound frequency patterns, replacing guesswork with data-driven precision.",
        bullets: [
          "Scalable cloud infrastructure consolidating 30+ years of data.",
          "Digitized capture across structured and unstructured sources.",
          "Tableau-powered visualization environment for evidence-based decision making.",
          "Real-time audio analytics for non-invasive leak detection.",
        ],
      },
      {
        id: "impact",
        label: "The Impact",
        number: "03",
        heading: "From instinct-driven to evidence-based culture",
        body: "The deployment of the analytics-based decision-making framework and audio analytics infrastructure led to a significant shift in operational culture and measurable loss reduction.",
        bullets: [
          "11 distinct types of equipment aberrations addressed.",
          "Significant reduction in losses tied to undetected infrastructure failures.",
          "Organizational culture shifted to evidence-based maintenance and operations.",
        ],
      },
    ],
  },
  "vc-edtech": {
    slug: "vc-edtech",
    caseStudyId: "vc-edtech",
    videoUrl: "",
    heroEyebrow: "09 · EdTech",
    heroTitle: "VC-Funded Educational Products Company",
    heroSubtitle:
      "Established a solid Business Intelligence foundation — bringing structure, clarity, and foresight to previously scattered data.",
    sections: [
      {
        id: "opportunity",
        label: "The Opportunity",
        number: "01",
        heading: "Fragmented data across manual reporting cycles",
        body: "A high-growth, VC-funded edtech leader struggled with transactional data scattered across school-level ERPs, legacy manual reporting, and disconnected finance systems. Leadership lacked a unified view of student outcomes and financial health.",
      },
      {
        id: "solution",
        label: "The Solution",
        number: "02",
        heading: "A unified Data Warehouse and Tableau BI layer",
        body: "We architected a unified Data Warehouse that serves as the single source of truth. By integrating multiple data streams and standardizing inputs, we built a secure Tableau monitoring dashboard for real-time visibility.",
        bullets: [
          "Consolidated school-level ERPs and legacy finance systems.",
          "Architected a unified Data Warehouse for strategic planning.",
          "Built a secure, private Tableau dashboard for leadership monitoring.",
          "Implemented in-depth KPI consulting across all organization levels.",
        ],
      },
      {
        id: "impact",
        label: "The Impact",
        number: "03",
        heading: "From reactive guesswork to evidence-based strategy",
        body: "The transformation from manual spreadsheets to real-time BI enabled leadership to act with speed and confidence on both student learning outcomes and business performance.",
        bullets: [
          "Shifted from vanity metrics to decision-grade intelligence.",
          "Surfaced predictive insights into student learning and financial performance.",
          "Established a permanent analytical backbone for sustainable growth.",
        ],
      },
    ],
  },
  "pharma-mnc": {
    slug: "pharma-mnc",
    caseStudyId: "pharma-mnc",
    videoUrl: "",
    heroEyebrow: "10 · Pharmaceuticals",
    heroTitle: "Pharmaceutical MNC — Sales ERP Analytics",
    heroSubtitle:
      "Built a robust analytics layer on top of Sales ERP — transforming raw transactional data into strategic intelligence.",
    sections: [
      {
        id: "opportunity",
        label: "The Opportunity",
        number: "01",
        heading: "Siloed transactional data and manual sales oversight",
        body: "A leading pharmaceutical MNC faced challenges in extracting actionable insights from its enterprise-grade Sales ERP. Data was often siloed, and sales strategy relied on delayed manual retrospection rather than real-time tactical intelligence.",
      },
      {
        id: "solution",
        label: "The Solution",
        number: "02",
        heading: "A unified Tableau analytics layer and route optimization",
        body: "We established seamless data pipelines from the Sales ERP into a unified analytics environment. By applying route optimization and Sales vs. Efforts analysis, we moved the organization toward a browser-based, alert-driven monitoring system.",
        bullets: [
          "Enterprise Sales ERP data pipeline integration.",
          "Route optimization algorithms for peak field sales efficiency.",
          "In-depth Sales vs. Efforts analysis for brand and rep health.",
          "Tableau-powered operational, tactical, and strategic dashboards.",
        ],
      },
      {
        id: "impact",
        label: "The Impact",
        number: "03",
        heading: "From static transactions to alert-driven intelligence",
        body: "The shift to a real-time, browser-based analytics platform allowed decision-makers to respond immediately to deviations, while field forces operated with maximized efficiency and strategic clarity.",
        bullets: [
          "Eliminated manual overhead through automated ERP data ingestion.",
          "Enabled proactive response via intelligent threshold-based alerts.",
          "Standardized strategic metrics across the entire sales hierarchy.",
        ],
      },
    ],
  },
  "capital-equipment": {
    slug: "capital-equipment",
    caseStudyId: "capital-equipment",
    videoUrl: "",
    heroEyebrow: "11 · Manufacturing",
    heroTitle: "Leading Capital Equipment Manufacturer",
    heroSubtitle:
      "Laid the data management groundwork demanded by growth — ERP implementation, process mapping, and governance.",
    sections: [
      {
        id: "opportunity",
        label: "The Opportunity",
        number: "01",
        heading: "Fragmented processes and siloed operational data",
        body: "A global leader in capital equipment manufacturing struggled with data quality and process gaps during rapid growth. Disconnected systems for inventory, purchase, and manufacturing made reliable reporting and operational scaling impossible.",
      },
      {
        id: "solution",
        label: "The Solution",
        number: "02",
        heading: "ERP implementation and robust data governance",
        body: "We led an end-to-end ERP implementation across Inventory and Purchase, establishing standardized data capture. We cleansed years of legacy data and instituted formal governance structures to ensure ongoing quality.",
        bullets: [
          "End-to-end ERP implementation for Inventory and Purchase.",
          "Process mapping to identify and close silent operational gaps.",
          "Data sanitization using OpenRefine and Data Wrangler.",
          "Formal data governance with departmental stewards and audit processes.",
        ],
      },
      {
        id: "impact",
        label: "The Impact",
        number: "03",
        heading: "A scalable foundation for data-driven manufacturing",
        body: "The project established a 'single source of truth' for the entire manufacturing lifecycle, enabling real-time adoption tracking and high-confidence reporting that sustains global growth.",
        bullets: [
          "100% adoption visibility via real-time Tableau monitoring.",
          "Eliminated reporting siloes across departments.",
          "Sustained data quality through institutionalized governance.",
        ],
      },
    ],
  },
  "cultural-heritage": {
    slug: "cultural-heritage",
    caseStudyId: "cultural-heritage",
    videoUrl: "",
    heroEyebrow: "13 · Public Sector",
    heroTitle: "Cultural Heritage Analytics — Govt. (Middle East)",
    heroSubtitle:
      "Turning intuition-led cultural site planning into evidence-based strategy through dynamic geographic visualizations.",
    sections: [
      {
        id: "opportunity",
        label: "The Opportunity",
        number: "01",
        heading: "Strategic misalignment in cultural site development",
        body: "As the government authority planned future cultural site developments, decision-makers lacked a unified visual understanding of how population centers, existing historical landmarks, and proposed sites related geographically. This created a risk of misaligned resource allocation and underserved regions.",
      },
      {
        id: "solution",
        label: "The Solution",
        number: "02",
        heading: "Geographic correlation and population layering",
        body: "We developed a dynamic geographic visualization suite that layered proposed cultural sites against high-resolution population data and historical landmark density. This allowed for precise gap analysis and strategic prioritization.",
        bullets: [
          "Layered proposed sites against live population density data.",
          "Mapped historical landmark proximity to identify cultural clusters.",
          "Visualized geographic accessibility for equitable development planning.",
          "Correlated demographic data with cultural reach projections.",
        ],
      },
      {
        id: "impact",
        label: "The Impact",
        number: "03",
        heading: "Evidence-based preservation and public outreach",
        body: "The project shifted the planning process from intuition-led to evidence-based, ensuring that cultural infrastructure investments are placed where they maximize heritage preservation and community engagement.",
        bullets: [
          "Identified underserved regions for prioritized investment.",
          "Maximized cultural reach per dollar of infrastructure spend.",
          "Established a data-driven framework for long-term heritage preservation.",
        ],
      },
    ],
  },
  "erp-unification": {
    slug: "erp-unification",
    caseStudyId: "erp-unification",
    videoUrl: "",
    heroEyebrow: "14 · Industrial Manufacturing",
    heroTitle: "Unifying Fragmented ERP Ecosystems into a Single Enterprise Intelligence Platform",
    heroSubtitle:
      "A globally scalable Azure data platform that unified 25–30 EMEA operating companies, onboarded 15 legacy ERPs, and processes ~100 million rows daily.",
    sections: [
      {
        id: "opportunity",
        label: "The Opportunity",
        number: "01",
        heading: "ERP fragmentation crippling executive visibility across 80+ countries",
        body: "A century-old global manufacturing conglomerate operating across 80+ countries faced increasing complexity within its EMEA division. While a portion of operating companies were aligned on modern ERP and CRM systems, many continued to operate on heterogeneous legacy platforms — JDE variants, Infor LN, region-specific systems — creating reporting silos that limited executive visibility. Regional leadership faced 15–20 separate dashboards, inconsistent KPI definitions, manual Excel/email reporting, and high onboarding complexity for new entities.",
        bullets: [
          "25–30 operating companies required consolidated sales and opportunity reporting.",
          "15 operated on heterogeneous legacy ERP systems with significant schema variation.",
          "15–20 separate dashboards needed for regional performance review.",
          "Inconsistent KPI definitions and manual reporting across regions.",
        ],
      },
      {
        id: "solution",
        label: "The Solution",
        number: "02",
        heading: "An ERP-agnostic Azure data platform with medallion architecture",
        body: "We evolved the existing Azure data architecture into a flexible, multi-ERP adaptive analytics platform capable of harmonizing diverse ERP ecosystems into a canonical sales and opportunity model. The platform was built on a medallion architecture with incremental load strategy, Change Data Feed implementation, and a schema drift handling framework.",
        bullets: [
          "Azure Data Factory — Pipeline orchestration across all ERP sources.",
          "Azure Databricks — Transformation logic and schema harmonization.",
          "Azure Synapse Analytics — Enterprise data warehouse (terabyte-scale).",
          "Power BI — Unified semantic reporting layer for executives.",
          "Azure DevOps — CI/CD-first multi-environment governance (Dev → Test → Pre-Prod → UAT → Prod).",
          "Snowflake schema design: 4 Fact tables + ~10 Dimension tables.",
          "JIRA-based Agile sprint execution and project management.",
        ],
      },
      {
        id: "impact",
        label: "The Impact",
        number: "03",
        heading: "From 20 dashboards to one executive view — at terabyte scale",
        body: "The platform processes ~100 million rows daily across 3 ETL cycles, with ~150+ GB processed daily and a terabyte-scale warehouse footprint. Leadership transitioned from fragmented data consumption to centralized commercial visibility. ERP onboarding was reduced to 2–3 weeks for previously integrated variants and 4–6 weeks for entirely new systems. What began as a focused pilot initiative evolved into a region-wide transformation program.",
        bullets: [
          "25–30 operating companies unified under a single reporting framework.",
          "~100 million rows processed daily across 3 ETL cycles.",
          "15–20 regional dashboards consolidated into a single executive view.",
          "ERP onboarding reduced to 2–6 weeks.",
          "Standardized KPI framework across the entire EMEA division.",
          "Platform now serves as a blueprint for global rollout across South America, Asia, and Africa.",
        ],
      },
    ],
  },
};
