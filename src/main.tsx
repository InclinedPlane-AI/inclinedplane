/* GUARDRAIL — DO NOT REMOVE the data-react-ready reveal below.
 * The index.html template hides #root via `#root:not([data-react-ready])
 * { visibility: hidden }` so users do not see a flash of the prerendered
 * body before React mounts. This file is responsible for revealing #root
 * once React's initial render has been scheduled. If you remove this and
 * keep the veil in index.html, the entire app stays invisible.
 * Last reviewed: 2026-05-03. */
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const rootEl = document.getElementById("root")!;
createRoot(rootEl).render(<App />);
requestAnimationFrame(() => rootEl.setAttribute("data-react-ready", "true"));
