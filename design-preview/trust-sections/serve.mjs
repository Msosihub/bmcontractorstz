/** Read-only loopback server for generated layout samples, never an application server. */
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
const root = process.cwd(),
  output = path.resolve("../../outputs/trust-sections-20261026/visual-review");
createServer(async (req, res) => {
  res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; font-src 'self'; script-src 'none'; form-action 'none'; frame-ancestors 'none'; base-uri 'none'",
  );
  if (!["GET", "HEAD"].includes(req.method)) {
    res.writeHead(405);
    res.end("Static review only");
    return;
  }
  try {
    const url = new URL(req.url, "http://127.0.0.1:3008"),
      lang = url.searchParams.get("lang") === "sw" ? "sw" : "en";
    let file,
      type = "text/html; charset=utf-8";
    const route = { "/": "home", "/services": "services", "/about": "about" }[
      url.pathname
    ];
    if (route) file = path.join(output, route + "-" + lang + ".html");
    else if (
      url.pathname.startsWith("/assets/") ||
      url.pathname.startsWith("/fonts/") ||
      url.pathname.startsWith("/_next/static/")
    ) {
      const candidate = url.pathname.startsWith("/_next/static/")
        ? path.resolve(
            root,
            ".next/static",
            url.pathname.slice("/_next/static/".length),
          )
        : path.resolve(root, "public", "." + url.pathname);
      const allowed = url.pathname.startsWith("/_next/static/")
        ? path.resolve(root, ".next/static")
        : path.resolve(root, "public");
      if (!candidate.startsWith(allowed + path.sep))
        throw Error("Path rejected");
      file = candidate;
      const ext = path.extname(file);
      type =
        {
          ".webp": "image/webp",
          ".png": "image/png",
          ".woff2": "font/woff2",
          ".css": "text/css",
        }[ext] || "application/octet-stream";
    } else {
      res.writeHead(404);
      res.end(
        "Layout preview only. This journey is not available in the static harness.",
      );
      return;
    }
    await stat(file);
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": type });
    res.end(req.method === "HEAD" ? undefined : body);
  } catch {
    res.writeHead(404);
    res.end("Local review asset unavailable");
  }
}).listen(3008, "127.0.0.1", () =>
  console.log(
    "Static layout review: http://127.0.0.1:3008/services?lang=en (no database, no submissions)",
  ),
);
