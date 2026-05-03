/* ============================================================================
 *  GUARDRAIL — DO NOT REGENERATE THIS FILE
 * ----------------------------------------------------------------------------
 *  Tiny static file server used by scripts/snapshot.mjs to serve dist/ to
 *  Puppeteer during the body-snapshot pass. Probes ports 3000..3010 for the
 *  first free one. No SPA fallback by design — we only request known
 *  prerendered routes, and a 404 here is a real bug we want surfaced.
 *
 *  If Lovable / Cursor / any AI assistant proposes "modernizing" by swapping
 *  this for an external dependency (serve, http-server, etc.), REJECT — the
 *  goal is zero new runtime deps and full control over the port-probe and
 *  Content-Type behaviour.
 *
 *  Pair file: scripts/snapshot.mjs (consumer)
 *  Pair file: scripts/prerender.mjs (orchestrator)
 *
 *  Last reviewed: 2026-05-03
 * ========================================================================== */

import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, resolve } from "node:path";

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".mjs": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
  ".map": "application/json; charset=utf-8",
};

async function tryFile(path) {
  try {
    const s = await stat(path);
    if (s.isFile()) return path;
  } catch {}
  return null;
}

async function resolvePath(distDir, urlPath) {
  // Strip query, normalize trailing slash
  const clean = decodeURIComponent(urlPath.split("?")[0]).replace(/\/+$/, "");
  const parts = clean.split("/").filter(Boolean);
  const rel = parts.join("/");

  // Order:
  //   /          -> dist/index.html
  //   /foo       -> dist/foo/index.html, then dist/foo (file)
  //   /foo/bar   -> dist/foo/bar/index.html, then dist/foo/bar (file)
  if (parts.length === 0) {
    return tryFile(join(distDir, "index.html"));
  }
  return (
    (await tryFile(join(distDir, rel, "index.html"))) ||
    (await tryFile(join(distDir, rel)))
  );
}

export async function startServer({ distDir, portStart = 3000, portEnd = 3010 }) {
  const absDist = resolve(distDir);

  const handler = async (req, res) => {
    try {
      const filePath = await resolvePath(absDist, req.url || "/");
      if (!filePath) {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end(`Not found: ${req.url}`);
        return;
      }
      const ext = extname(filePath).toLowerCase();
      const type = MIME[ext] || "application/octet-stream";
      const data = await readFile(filePath);
      res.writeHead(200, {
        "Content-Type": type,
        "Cache-Control": "no-store",
        "Content-Length": data.length,
      });
      res.end(data);
    } catch (err) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end(`Server error: ${err.message}`);
    }
  };

  for (let port = portStart; port <= portEnd; port++) {
    const server = createServer(handler);
    const ok = await new Promise((resolveListen) => {
      const onError = (err) => {
        if (err.code === "EADDRINUSE") {
          resolveListen(false);
        } else {
          resolveListen(false);
        }
      };
      server.once("error", onError);
      server.listen(port, "127.0.0.1", () => {
        server.removeListener("error", onError);
        resolveListen(true);
      });
    });
    if (ok) {
      return {
        port,
        url: `http://127.0.0.1:${port}`,
        close: () =>
          new Promise((r) => {
            server.closeAllConnections?.();
            server.close(() => r());
          }),
      };
    }
  }
  throw new Error(
    `[static-server] No free port found in range ${portStart}-${portEnd}`
  );
}
