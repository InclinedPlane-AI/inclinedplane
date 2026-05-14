# Migrate chat backend to Lovable Cloud + Lovable AI Gateway

## Why
The current `/api/chat` endpoint is a Vercel Serverless Function. It does not run in the Lovable preview sandbox (returns the SPA `index.html` instead of JSON), and the project's GitHub Actions deploy pipeline uploads only `dist/` via `vercel deploy --prebuilt` — so `api/` functions likely aren't deployed in production either.

Switching to a Lovable Cloud edge function fixes both: it works in preview AND production, and the AI key (`LOVABLE_API_KEY`) is auto-provisioned — no Vercel env-var setup, no Gemini key needed.

## Steps

1. **Enable Lovable Cloud** on the project (provisions the edge runtime + auto-injects `LOVABLE_API_KEY`).

2. **Create edge function** `supabase/functions/chat/index.ts`:
   - CORS headers
   - Accepts `{ messages: [{role, content}] }`
   - Imports the existing `SYSTEM_PROMPT` content from `src/data/chatbotKnowledge.ts` (copy the prompt string into the function file — edge functions can't import from `src/`)
   - Calls `https://ai.gateway.lovable.dev/v1/chat/completions` with model `google/gemini-3-flash-preview`, streams the response back as SSE
   - Handles 429 (rate limited) and 402 (out of credits) with friendly errors

3. **Update `src/components/ChatWidget.tsx`** to:
   - Call the edge function via `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat` instead of `/api/chat`
   - Stream tokens line-by-line and render incrementally (already-buffered `JSON.parse` will be replaced with the SSE parser pattern)
   - Show toast on 429 / 402

4. **Delete the now-unused Vercel function** `api/chat.ts` (and the empty `api/` directory) so it doesn't confuse future deploys.

5. **Verify** in preview: open the chat widget, send "What services do you offer?", confirm a streamed response appears.

## Technical notes

- Edge function uses `verify_jwt = false` by default — fine for a public marketing-site chatbot.
- The `SYSTEM_PROMPT` lives in `src/data/chatbotKnowledge.ts` today. Edge functions can't reach `src/`, so the prompt string will be duplicated into the function. Future edits need to update both — acceptable tradeoff vs adding a build step.
- No database, no auth, no storage needed — pure stateless AI proxy.
- `GEMINI_API_KEY` is no longer needed anywhere; can be removed from Vercel env if it was set.
- Cost: Lovable AI has a free monthly allowance, then usage-based. `gemini-3-flash-preview` is the cheap default.

## Out of scope
- No conversation persistence (matches current behavior — chat history lives in component state).
- No changes to the chat widget's visual design.
