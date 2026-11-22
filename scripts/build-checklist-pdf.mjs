// =============================================================================
// Builds the one-page, brand-styled "AI data readiness checklist" PDF from
// src/content/checklist.json into public/downloads/. Not part of `npm run
// build`: run it by hand after editing the JSON, and commit the PDF.
//
//   node scripts/build-checklist-pdf.mjs
//
// Uses the Playwright Chromium already installed for the prerender pipeline,
// the self-hosted Google Sans Flex, IBM Plex Mono (@fontsource) and the brand
// assets in public/brand/.
// =============================================================================

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(fs.readFileSync(path.join(root, "src/content/checklist.json"), "utf8"));
const out = path.join(root, "public", data.file.replace(/^\//, ""));
// Assets are inlined as data URIs: pages loaded via setContent() can't read file:// URLs.
const mime = { ".woff2": "font/woff2", ".png": "image/png" };
const url = (p) => `data:${mime[path.extname(p)]};base64,${fs.readFileSync(path.join(root, p)).toString("base64")}`;
const plex = (w) => url(`node_modules/@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-${w}-normal.woff2`);
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

let n = 0;
const sections = data.sections
  .map(
    (s) => `
  <section class="area">
    <p class="label"><i></i>${esc(s.area)}</p>
    <h2>${esc(s.question)}</h2>
    <ul>${s.checks.map((c) => `<li><span class="box"></span><span class="num">${String(++n).padStart(2, "0")}</span><span>${esc(c)}</span></li>`).join("")}</ul>
  </section>`,
  )
  .join("");

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:GSF;src:url(${url("public/fonts/google-sans-flex.woff2")}) format('woff2');font-weight:100 1000}
@font-face{font-family:Plex;src:url(${plex(400)}) format('woff2');font-weight:400}
@font-face{font-family:Plex;src:url(${plex(500)}) format('woff2');font-weight:500}
@page{size:A4;margin:0}
*{box-sizing:border-box;margin:0;padding:0}
html,body{width:210mm;height:297mm}
body{font-family:GSF,system-ui,sans-serif;color:#000;background:#fff;position:relative;overflow:hidden;-webkit-print-color-adjust:exact;print-color-adjust:exact}
.page{padding:12mm 14mm 0}
header{display:flex;justify-content:space-between;align-items:flex-start;border-bottom:1px solid #E4E4E5;padding-bottom:4.5mm}
header img{height:8.5mm}
.meta{font-family:Plex;font-size:7.5pt;letter-spacing:.1em;text-transform:uppercase;color:#555;text-align:right;line-height:1.6}
.kicker{margin-top:5.5mm;font-family:Plex;font-size:8pt;letter-spacing:.1em;text-transform:uppercase;color:#3D3D3D;display:flex;align-items:center;gap:2.5mm}
.kicker i,.label i{width:2.4mm;height:2.4mm;background:#F47920;display:inline-block}
h1{margin-top:2.5mm;font-size:25pt;line-height:1.02;font-weight:600;letter-spacing:-.03em}
.sub{margin-top:2.5mm;font-size:10pt;line-height:1.45;color:#3D3D3D;max-width:150mm}
.how{margin-top:3.5mm;font-size:8.8pt;line-height:1.45;color:#000;border-left:2.5px solid #F47920;padding-left:3mm;max-width:160mm}
.grid{margin-top:5mm;display:grid;grid-template-columns:1fr 1fr;column-gap:8mm;row-gap:4.5mm}
.area{border-top:2px solid #000;padding-top:3mm}
.label{font-family:Plex;font-size:7.5pt;letter-spacing:.1em;text-transform:uppercase;color:#3D3D3D;display:flex;align-items:center;gap:2mm}
h2{margin-top:1.2mm;font-size:10pt;line-height:1.25;font-weight:600;letter-spacing:-.005em;min-height:8.5mm}
ul{list-style:none;margin-top:1.2mm}
li{display:grid;grid-template-columns:4.2mm 6mm 1fr;align-items:start;gap:1mm;padding:1.45mm 0;border-bottom:1px solid #E4E4E5;font-size:8.3pt;line-height:1.34;color:#222}
.box{width:3.4mm;height:3.4mm;border:1.2px solid #000;border-radius:.6mm;margin-top:.3mm}
.num{font-family:Plex;font-size:7pt;color:#777;margin-top:.5mm}
.bottom{margin-top:5mm;display:grid;grid-template-columns:1fr 1.08fr;gap:8mm;align-items:stretch}
.score{border-top:2px solid #000;padding-top:3mm}
.score table{width:100%;border-collapse:collapse;margin-top:2mm}
.score td{font-size:8.3pt;line-height:1.32;padding:1.3mm 0;border-bottom:1px solid #E4E4E5;vertical-align:top}
.score td:first-child{font-weight:600;white-space:nowrap;padding-right:3mm;width:22mm}
.cta{background:#000;color:#fff;border-radius:2.5mm;padding:4mm 5mm;border-top:3px solid #F47920}
.cta h3{font-size:12pt;font-weight:600;letter-spacing:-.01em}
.cta p{margin-top:1.5mm;font-size:8.5pt;line-height:1.45;color:#D1D2D4}
.cta .link{margin-top:2.5mm;display:inline-block;background:#F47920;color:#000;font-weight:600;font-size:9pt;padding:1.8mm 3.2mm;border-radius:1.2mm}
.cta .mail{margin-top:2mm;font-size:8pt;color:#D1D2D4}
footer{position:absolute;left:0;right:0;bottom:0}
.foot{display:flex;justify-content:space-between;align-items:center;padding:0 14mm 3mm;font-family:Plex;font-size:7pt;letter-spacing:.08em;text-transform:uppercase;color:#555}
.strip{height:11mm;background:url(${url("public/brand/pattern-strip.png")}) 30% 42%/210mm auto no-repeat}
</style></head><body><div class="page">
<header><img src="${url("public/brand/logo-primary.png")}" alt="InclinedPlane"><div class="meta">${esc(data.version)}<br>inclinedplane.com</div></header>
<p class="kicker"><i></i>Data Engineered. Intelligence Deployed.</p>
<h1>${esc(data.title)}</h1>
<p class="sub">${esc(data.subtitle)}</p>
<p class="how"><strong>How to use it.</strong> ${esc(data.howTo)}</p>
<div class="grid">${sections}</div>
<div class="bottom">
  <div class="score"><p class="label"><i></i>Count your ticks</p>
    <table>${data.scoring.map((r) => `<tr><td>${esc(r.range)}</td><td>${esc(r.meaning)}</td></tr>`).join("")}</table>
  </div>
  <div class="cta"><h3>${esc(data.cta.title)}</h3><p>${esc(data.cta.body)}</p><span class="link">${esc(data.cta.url)}</span><p class="mail">${esc(data.cta.email)}</p></div>
</div>
</div>
<footer><div class="foot"><span>© ${new Date().getFullYear()} InclinedPlane</span><span>AI data readiness checklist</span></div><div class="strip"></div></footer>
</body></html>`;

fs.mkdirSync(path.dirname(out), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 794, height: 1123 }, deviceScaleFactor: 2 });
await page.setContent(html, { waitUntil: "load" });
await page.evaluate(() => document.fonts.ready);
const overflow = await page.evaluate(() => document.body.scrollHeight > document.body.clientHeight + 2);
await page.pdf({ path: out, format: "A4", printBackground: true, preferCSSPageSize: true });
if (process.argv.includes("--png")) await page.screenshot({ path: out.replace(/\.pdf$/, ".png"), fullPage: false });
await browser.close();
console.log(`checklist PDF: ${path.relative(root, out)} (${(fs.statSync(out).size / 1024).toFixed(0)} KB)${overflow ? "  WARNING: content overflows one page" : ""}`);
