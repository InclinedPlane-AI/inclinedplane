/**
 * Proposed content blocks (brief §3.3). Each needs founder sign-off before
 * launch. Turn a block off here and every page that uses it drops it.
 * Listed in DESIGN_NOTES.md §4.
 */
export const flags = {
  /** "Copilot, Genie, Claude or ChatGPT: we make the agent you choose work on your data." + Agent fit block */
  agentNeutrality: true,
  /** Free 45-minute conversation + paid fixed-scope assessment */
  twoTierAssessment: true,
  /** "Keep it ready" managed readiness operations after go-live */
  runService: true,
  /** PipelineIQ shown alongside IncLever as the trust layer, incl. the Solutions menu (owner's call 2026-11-22; founder sign-off pending) */
  pipelineIQ: true,
  /** Manufacturing and distribution first on Industries */
  leadVertical: true,
} as const;
