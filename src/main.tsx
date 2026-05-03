/* GUARDRAIL — DO NOT REMOVE the data-react-ready reveal or the
 * data-prerendered propagation below.
 *
 * The index.html template hides #root via `#root:not([data-react-ready])
 * { visibility: hidden }` so users do not see a flash of the prerendered
 * body before React mounts. This file is responsible for revealing #root
 * once React's initial render has been scheduled. If you remove the rAF
 * reveal and keep the veil in index.html, the entire app stays invisible.
 *
 * The `data-prerendered` marker is stamped onto <body> by
 * scripts/prerender.mjs at build time. We propagate it to <html> here
 * before React mounts so src/App.tsx can read it via useState's lazy
 * initializer and skip the splash screen on prerendered pages. (Reading
 * from <body> directly inside App.tsx is also possible, but propagating
 * to <html> matches the convention of the data-app-ready signal and
 * keeps the splash-skip logic colocated with other app-readiness state.)
 *
 * Last reviewed: 2026-05-03. */
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root")!;
if (document.body.dataset.prerendered === "true") {
  document.documentElement.setAttribute("data-prerendered", "true");
}
createRoot(rootEl).render(<App />);
requestAnimationFrame(() => rootEl.setAttribute("data-react-ready", "true"));
