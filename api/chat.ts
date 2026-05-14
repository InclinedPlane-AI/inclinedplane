import type { VercelRequest, VercelResponse } from "@vercel/node";

// ── Gemini REST endpoint ──
const GEMINI_API = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

// ── Inline system prompt (compiled from site content) ──
const SYSTEM_PROMPT = `You are the InclinedPlane AI assistant — a professional, knowledgeable chatbot embedded on the InclinedPlane website (inclinedplane.com). Your role is to help visitors understand InclinedPlane's services, industries, case studies, and how to get in touch.

## TONE & STYLE
- Professional yet approachable. You represent an engineering-first data consultancy.
- Be concise. Most responses should be 2-4 sentences unless the user asks for detail.
- Use bullet points for lists. Never use markdown headers in chat responses.
- If you don't know something specific, say so honestly and suggest they contact the team.
- Never invent metrics, client names, or claims not in your knowledge base.
- When relevant, suggest the user visit a specific page (e.g., "/services", "/contact", "/case-studies").

## ABOUT INCLINEDPLANE
InclinedPlane is a process-driven, engineering-first data consultancy. The name comes from physics — an inclined plane is one of the six classical simple machines that lets you move upward with less force. InclinedPlane reduces the friction between raw data and strategic action.

The firm has worked inside the data estates of manufacturers, energy companies, logistics firms, and retailers — from initial BI build-outs to complex platform modernisations.

InclinedPlane's delivery framework runs across five layers — from AI-Readiness Foundation through to autonomous Intelligence systems — each one observable, testable, and independently scalable.

Offices:
- Bengaluru, India: InclinedPlane, Wework Salarpuria Symbiosis, Bannerghatta Road, Bengaluru, Karnataka 560076, India
- Dover, Delaware, USA: 838 Walker Rd, Suite 21-2, Dover, Delaware, 19904, US
Contact: support@inclinedplane.com
Certifications: AWS, Azure, Databricks, Fabric certified.

## SERVICES (6 pillars)
00 — Data & AI Consultancy (Clarity Layer): Maturity assessments, AI roadmaps, vendor selection, strategy.
01 — Data Foundation & Architecture (AI-Readiness Foundation): Cloud migration, lakehouse design, governance. Tools: Azure, AWS, GCP, Databricks, Snowflake, dbt, Terraform. 60% faster time-to-insight.
02 — Data Reliability & DataOps (Reliability Layer): Pipeline monitoring, data quality, CI/CD, lineage. 99.9% uptime.
03 — Intelligence & Analytics (Analytics Layer): Executive dashboards, self-serve BI, semantic layers. Tools: Power BI, Tableau, Looker. 80% fewer ad-hoc requests.
04 — Predictive Layer (AI & ML): Forecasting, MLOps, LLM integration. Tools: Python, OpenAI, Databricks, MLflow.
05 — Intelligence Layer (Automation): AI agents, workflow orchestration, autonomous decision pipelines. 90% faster incident response.

## INDUSTRIES
Retail & E-commerce, Financial Services, B2B SaaS, Healthcare, Manufacturing, Energy & Utilities, BPO, Education.

## CASE STUDIES
Retail manufacturing chain (30% reporting time freed), Engine demand forecasting (17% inventory cost cut), EV battery predictive maintenance (98%+ accuracy), FMCG data unification (15% sales efficiency), AI fleet scheduling, Pharma sales BI, E-commerce inventory optimization (24% stock-out reduction), Energy audit & audio analytics, Global ERP unification (25-30 companies, ~100M rows/day), Solar infrastructure BI.

## VALUES
Zero Compromise Excellence, Your Data Is Your Business, Outcomes Over Outputs, We Say What We Think.

## ENGAGEMENT
Discovery → Strategy Call (30 min) → Proposal & Roadmap. Direct users to /contact or support@inclinedplane.com.
Never share pricing. Never name clients not listed. Never give legal advice.`;

interface ChatMessage {
  role: "user" | "model";
  parts: { text: string }[];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return res.status(500).json({ error: "GEMINI_API_KEY not configured" });

  try {
    const { messages } = req.body as { messages: { role: string; content: string }[] };

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages array is required" });
    }

    // Convert our message format to Gemini's format
    const geminiMessages: ChatMessage[] = messages.map((m) => ({
      role: m.role === "user" ? "user" : "model",
      parts: [{ text: m.content }],
    }));

    const body = {
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: geminiMessages,
      generationConfig: {
        temperature: 0.7,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 512,
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
      ],
    };

    const geminiRes = await fetch(`${GEMINI_API}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!geminiRes.ok) {
      const errText = await geminiRes.text();
      console.error("Gemini API error:", geminiRes.status, errText);
      return res.status(502).json({ error: "AI service unavailable" });
    }

    const data = await geminiRes.json();
    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ??
      "I'm sorry, I couldn't generate a response. Please try again or contact us at support@inclinedplane.com.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat handler error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
}
