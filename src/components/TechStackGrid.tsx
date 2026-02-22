import { useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import powerbiLogo from "@/assets/powerbi-logo.png";
import tableauLogo from "@/assets/tableau-logo.svg";
import azureLogo from "@/assets/azure-logo.png";
import awsLogo from "@/assets/aws-logo.png";
import openaiLogo from "@/assets/openai-logo.png";
import dbtLogo from "@/assets/dbt-logo.png";
import fabricLogo from "@/assets/fabric-logo.png";
import clickhouseLogo from "@/assets/clickhouse-logo.svg";
import claudeLogo from "@/assets/claude-logo.svg";
import mistralLogo from "@/assets/mistral-logo.png";
import githubLogo from "@/assets/github-logo.png";

interface Tool {
  name: string;
  category: "cloud" | "data" | "analytics" | "automation" | "ai" | "engineering";
  logo: string;
}

const CDN = "https://cdn.simpleicons.org";

const TOOLS: Tool[] = [
  { name: "Azure", category: "cloud", logo: azureLogo },
  { name: "AWS", category: "cloud", logo: awsLogo },
  { name: "GCP", category: "cloud", logo: `${CDN}/googlecloud/4285F4` },
  { name: "Databricks", category: "data", logo: `${CDN}/databricks/FF3621` },
  { name: "Snowflake", category: "data", logo: `${CDN}/snowflake/29B5E8` },
  { name: "BigQuery", category: "data", logo: `${CDN}/googlebigquery/669DF6` },
  { name: "Power BI", category: "analytics", logo: powerbiLogo },
  { name: "Tableau", category: "analytics", logo: tableauLogo },
  { name: "Looker", category: "analytics", logo: `${CDN}/looker/4285F4` },
  { name: "dbt", category: "engineering", logo: dbtLogo },
  { name: "Fabric", category: "data", logo: fabricLogo },
  { name: "ClickHouse", category: "data", logo: clickhouseLogo },
  { name: "Airflow", category: "engineering", logo: `${CDN}/apacheairflow/017CEE` },
  { name: "Spark", category: "engineering", logo: `${CDN}/apachespark/E25A1C` },
  { name: "Python", category: "engineering", logo: `${CDN}/python/3776AB` },
  { name: "SQL", category: "engineering", logo: `${CDN}/postgresql/4169E1` },
  { name: "Terraform", category: "engineering", logo: `${CDN}/terraform/844FBA` },
  { name: "OpenAI", category: "ai", logo: openaiLogo },
  { name: "Claude", category: "ai", logo: claudeLogo },
  { name: "Mistral", category: "ai", logo: mistralLogo },
  { name: "LangChain", category: "ai", logo: `${CDN}/langchain/1C3C3C` },
  { name: "Hugging Face", category: "ai", logo: `${CDN}/huggingface/FFD21E` },
  { name: "n8n", category: "automation", logo: `${CDN}/n8n/EA4B71` },
  { name: "Kafka", category: "automation", logo: `${CDN}/apachekafka/fff` },
  { name: "Docker", category: "engineering", logo: `${CDN}/docker/2496ED` },
  { name: "GitHub", category: "engineering", logo: githubLogo },
];

const row1 = TOOLS.slice(0, 12);
const row2 = TOOLS.slice(12);

const MarqueeRow = ({ tools, direction = "left" }: { tools: Tool[]; direction?: "left" | "right" }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let raf: number;
    let pos = direction === "left" ? 0 : -el.scrollWidth / 2;

    const step = () => {
      pos += direction === "left" ? -0.4 : 0.4;
      const half = el.scrollWidth / 2;
      if (direction === "left" && pos <= -half) pos = 0;
      if (direction === "right" && pos >= 0) pos = -half;
      el.style.transform = `translateX(${pos}px)`;
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [direction]);

  const items = [...tools, ...tools];

  return (
    <div className="overflow-hidden w-full">
      <div ref={scrollRef} className="flex gap-3 w-max will-change-transform">
        {items.map((tool, i) => (
          <div
            key={`${tool.name}-${i}`}
            className="glass-panel rounded-xl px-4 py-3 flex items-center gap-3 border border-border/50 hover:glow-orange transition-all duration-300 group shrink-0 min-w-[140px]"
            data-cursor-hover
          >
            <img src={tool.logo} alt={tool.name} className="w-6 h-6 object-contain opacity-80 group-hover:opacity-100 transition-opacity" loading="lazy" />
            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">{tool.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* Mobile: static wrapping grid */
const StaticGrid = ({ tools }: { tools: Tool[] }) => (
  <div className="flex flex-wrap gap-2 justify-center">
    {tools.map((tool) => (
      <div
        key={tool.name}
        className="glass-panel rounded-lg px-3 py-2 flex items-center gap-2 border border-border/50 shrink-0"
      >
        <img src={tool.logo} alt={tool.name} className="w-5 h-5 object-contain opacity-80" loading="lazy" />
        <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">{tool.name}</span>
      </div>
    ))}
  </div>
);

const TechStackGrid = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div className="w-full">
        <StaticGrid tools={TOOLS.slice(0, 16)} />
      </div>
    );
  }

  return (
    <div className="w-full space-y-3">
      <MarqueeRow tools={row1} direction="left" />
      <MarqueeRow tools={row2} direction="right" />
    </div>
  );
};

export default TechStackGrid;
