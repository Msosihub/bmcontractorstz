/** Offline visual harness: actual public components, no database/client/provider imports. */
import { build } from "esbuild";
import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
const root = process.cwd();
if ((await readdir(root)).some((f) => f.startsWith(".env")))
  throw Error("Use the isolated worktree without .env files.");
const output = path.resolve(
  "../../outputs/trust-sections-20261026/visual-review",
);
await mkdir(output, { recursive: true });
const mocks = {
  "@/lib/prisma": "export const prisma={service:{findMany:async()=>[]}};",
  "next/navigation": `export function useRouter(){return {push(){throw Error('Static layout review: navigation handlers inactive')}}} export function usePathname(){return globalThis.__bmVisual.path} export function useSearchParams(){return new URLSearchParams({lang:globalThis.__bmVisual.lang})}`,
  "next/image": `import React from 'react';export default function Image({fill,preload,sizes,...props}){return React.createElement('img',{...props,loading:'lazy',style:fill?{position:'absolute',inset:0,width:'100%',height:'100%',...props.style}:props.style})}`,
};
for (const [route, file] of [
  ["services", "app/services/page.tsx"],
  ["about", "app/about/page.tsx"],
  ["home", "components/premium/Homepage.tsx"],
]) {
  const result = await build({
    entryPoints: [file],
    bundle: true,
    write: false,
    platform: "node",
    format: "esm",
    jsx: "automatic",
    external: ["react", "react/*", "react-dom", "react-dom/*"],
    plugins: [
      {
        name: "offline-visual-only",
        setup(b) {
          b.onResolve({ filter: /.*/ }, (args) =>
            Object.hasOwn(mocks, args.path)
              ? { path: args.path, namespace: "mock" }
              : undefined,
          );
          b.onLoad({ filter: /.*/, namespace: "mock" }, (args) => ({
            contents: mocks[args.path],
            loader: "js",
          }));
        },
      },
    ],
  });
  const target = path.join(root, ".test-cache", "visual-" + route + ".mjs");
  await mkdir(path.dirname(target), { recursive: true });
  await writeFile(target, result.outputFiles[0].text);
  const component = (await import(pathToFileURL(target).href)).default;
  for (const lang of ["en", "sw"]) {
    globalThis.__bmVisual = {
      path: route === "home" ? "/" : "/" + route,
      lang,
    };
    const rendered =
      route === "home"
        ? createElement(component, { lang })
        : await component({ searchParams: Promise.resolve({ lang }) });
    const cssFiles = (await readdir(".next/static/css")).filter((f) =>
      f.endsWith(".css"),
    );
    const baseCss = (
      await Promise.all(
        cssFiles.map((f) => readFile(".next/static/css/" + f, "utf8")),
      )
    ).join("\n");
    const markup = renderToStaticMarkup(rendered);
    const notice =
      lang === "sw"
        ? "MAPITIO YA MUUNDO TU · Hakuna muunganisho wa hifadhidata. Fomu na menyu za JavaScript hazifanyi kazi."
        : "STATIC LAYOUT REVIEW · No database connection. Forms and JavaScript menus are inactive.";
    const html =
      '<!DOCTYPE html><html lang="' +
      lang +
      '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex,nofollow,noarchive"><title>BM local layout review · ' +
      route +
      "</title><style>" +
      baseCss +
      "\n" +
      (await readFile("app/premium.css", "utf8")) +
      '\nhtml{scroll-behavior:auto!important}.static-review-notice{background:#e6dcc9;color:#242b29;padding:10px 6%;font:12px/1.6 Arial,sans-serif}.static-review-notice a{text-decoration:underline;margin-left:18px}.premium-site .site-header{position:relative}</style></head><body class="premium-site"><aside class="static-review-notice">' +
      notice +
      ' <a href="/services?lang=' +
      lang +
      '">Services</a><a href="/about?lang=' +
      lang +
      '">About</a><a href="/?lang=' +
      lang +
      '">Home</a></aside>' +
      markup +
      "</body></html>";
    await writeFile(path.join(output, route + "-" + lang + ".html"), html);
  }
}
console.log(
  "Six static EN/SW layout samples rendered. No database or provider requests.",
);
