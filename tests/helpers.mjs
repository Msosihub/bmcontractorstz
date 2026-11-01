import { build } from "esbuild";
import { mkdir, writeFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import path from "node:path";
let index = 0;
export async function bundle(file, extra = {}) {
 const mocks = {
  "@/lib/prisma": "export const prisma = globalThis.__bmTest.prisma;",
  "next/headers": "export async function cookies(){ return {get(){return globalThis.__bmTest.token ? {value:globalThis.__bmTest.token}:undefined},set(){},delete(){}}; }",
  "next/cache": "export function revalidatePath(){}",
  "next/navigation": "export function redirect(url){throw new Error('REDIRECT:'+url)}",
  "next/link": "import React from 'react'; export default function Link({children,...props}){return React.createElement('a',props,children)}",
  ...extra,
 };
 const result = await build({entryPoints:[file],bundle:true,write:false,platform:"node",format:"esm",jsx:"automatic",external:["react","react/*","react-dom","react-dom/*"],plugins:[{name:"test-boundaries",setup(build){
  build.onResolve({filter:/.*/},args=>Object.hasOwn(mocks,args.path)?{path:args.path,namespace:"mock"}:undefined);
  build.onLoad({filter:/.*/,namespace:"mock"},args=>({contents:mocks[args.path],loader:"js"}));
 }}]});
 await mkdir(".test-cache",{recursive:true});
 const target = path.resolve(".test-cache/"+process.pid+"-"+index+++".mjs");
 await writeFile(target,result.outputFiles[0].text);
 return import(pathToFileURL(target).href);
}
export function form(values) { const data=new FormData(); for(const [key,value] of Object.entries(values))data.set(key,String(value));return data; }
