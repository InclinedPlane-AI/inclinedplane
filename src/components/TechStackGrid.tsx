import { motion } from "framer-motion";
import { useState } from "react";

interface Tool {
  name: string;
  category: "cloud" | "data" | "analytics" | "automation" | "ai" | "engineering";
  icon: string;
}

const TOOLS: Tool[] = [
  // Cloud
  { name: "Azure", category: "cloud", icon: "☁️" },
  { name: "AWS", category: "cloud", icon: "⚡" },
  { name: "GCP", category: "cloud", icon: "🌐" },
  // Data & Engineering
  { name: "Databricks", category: "data", icon: "🔶" },
  { name: "Snowflake", category: "data", icon: "❄️" },
  { name: "BigQuery", category: "data", icon: "📊" },
  { name: "dbt", category: "engineering", icon: "🔧" },
  { name: "Airflow", category: "engineering", icon: "🌀" },
  { name: "Spark", category: "engineering", icon: "✨" },
  // Analytics & BI
  { name: "Power BI", category: "analytics", icon: "📈" },
  { name: "Tableau", category: "analytics", icon: "📉" },
  { name: "Looker", category: "analytics", icon: "🔍" },
  // Languages & Core
  { name: "Python", category: "engineering", icon: "🐍" },
  { name: "SQL", category: "engineering", icon: "🗃️" },
  { name: "Terraform", category: "engineering", icon: "🏗️" },
  // AI & ML
  { name: "OpenAI", category: "ai", icon: "🧠" },
  { name: "LangChain", category: "ai", icon: "🔗" },
  { name: "Hugging Face", category: "ai", icon: "🤗" },
  // Automation
  { name: "n8n", category: "automation", icon: "⚙️" },
  { name: "Kafka", category: "automation", icon: "📡" },
  { name: "Docker", category: "engineering", icon: "🐳" },
];

const CATEGORIES = [
  { key: "all", label: "All" },
  { key: "cloud", label: "Cloud" },
  { key: "data", label: "Data" },
  { key: "engineering", label: "Engineering" },
  { key: "analytics", label: "Analytics" },
  { key: "ai", label: "AI / ML" },
  { key: "automation", label: "Automation" },
] as const;

const categoryColors: Record<string, string> = {
  cloud: "from-blue-500/20 to-blue-600/5",
  data: "from-amber-500/20 to-amber-600/5",
  analytics: "from-emerald-500/20 to-emerald-600/5",
  automation: "from-violet-500/20 to-violet-600/5",
  ai: "from-rose-500/20 to-rose-600/5",
  engineering: "from-cyan-500/20 to-cyan-600/5",
};

const categoryBorders: Record<string, string> = {
  cloud: "group-hover:border-blue-500/30",
  data: "group-hover:border-amber-500/30",
  analytics: "group-hover:border-emerald-500/30",
  automation: "group-hover:border-violet-500/30",
  ai: "group-hover:border-rose-500/30",
  engineering: "group-hover:border-cyan-500/30",
};

const TechStackGrid = () => {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered = activeFilter === "all"
    ? TOOLS
    : TOOLS.filter((t) => t.category === activeFilter);

  return (
    <div className="w-full">
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {CATEGORIES.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveFilter(key)}
            className={`px-3 py-1.5 rounded-full text-[11px] font-medium tracking-wide transition-all duration-200 border ${
              activeFilter === key
                ? "bg-primary text-primary-foreground border-primary"
                : "glass-panel text-muted-foreground hover:text-foreground border-border"
            }`}
            data-cursor-hover
          >
            {label}
          </button>
        ))}
      </div>

      {/* Honeycomb-style grid */}
      <motion.div
        layout
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-3"
      >
        {filtered.map((tool, i) => (
          <motion.div
            key={tool.name}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.25, delay: i * 0.02 }}
            className={`group relative`}
            data-cursor-hover
          >
            <div
              className={`relative glass-panel rounded-xl p-4 flex flex-col items-center justify-center text-center
                border border-border/50 ${categoryBorders[tool.category]}
                hover:glow-orange transition-all duration-300 aspect-square`}
            >
              {/* Gradient overlay on hover */}
              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-br ${categoryColors[tool.category]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
              />
              <span className="relative text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">
                {tool.icon}
              </span>
              <span className="relative text-[10px] sm:text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors leading-tight">
                {tool.name}
              </span>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TechStackGrid;
