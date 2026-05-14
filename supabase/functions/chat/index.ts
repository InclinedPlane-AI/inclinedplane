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

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      return new Response(JSON.stringify({ error: "LOVABLE_API_KEY not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { messages } = await req.json();
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(JSON.stringify({ error: "messages array is required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Normalize incoming messages to OpenAI-style roles
    const normalized = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "model" || m.role === "assistant" ? "assistant" : "user",
      content: m.content,
    }));

    const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: SYSTEM_PROMPT }, ...normalized],
      }),
    });

    if (!aiRes.ok) {
      if (aiRes.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiRes.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please contact support." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await aiRes.text();
      console.error("AI gateway error:", aiRes.status, errText);
      return new Response(JSON.stringify({ error: "AI service unavailable" }), {
        status: 502,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await aiRes.json();
    const reply =
      data?.choices?.[0]?.message?.content ??
      "I'm sorry, I couldn't generate a response. Please try again or contact us at support@inclinedplane.com.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Chat handler error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});