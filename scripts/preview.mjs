import { cp, mkdir, symlink, readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";
import pg from "pg";
const root=process.cwd();
const destination=process.argv[3];
if(!destination || !path.isAbsolute(destination) || destination===root) throw new Error("Provide a separate absolute preview directory.");
const mode=process.argv[2];
export const localUrl="postgresql://postgres:postgres@127.0.0.1:55439/postgres";
const env={
 PATH:process.env.PATH, TMPDIR:process.env.TMPDIR, LANG:"en_US.UTF-8",
 DATABASE_URL:localUrl, ADMIN_ALLOWED_PHONES:"+255700000001",
 BM_DISABLE_NOTIFICATIONS:"1", BM_ISOLATED_PREVIEW:"1", NEXT_TELEMETRY_DISABLED:"1",
 NODE_ENV:"production",
};
if(mode==="prepare" || mode==="sync"){
 await mkdir(destination,{recursive:true});
 await cp(root,destination,{recursive:true,filter:source=>{
  const relative=path.relative(root,source);
  return !relative.split(path.sep).some(part=>[".git","node_modules",".next",".test-cache"].includes(part)||part.startsWith(".env"));
 }});
 await symlink(path.join(root,"node_modules"),path.join(destination,"node_modules"),"dir").catch(error=>{if(error.code!=="EEXIST")throw error});
 if(mode==="prepare"){
 const client=new pg.Client({connectionString:localUrl});await client.connect();
 try{
  const existing=await client.query("SELECT count(*) FROM information_schema.tables WHERE table_schema='public'");
  if(Number(existing.rows[0].count)!==0) throw new Error("Preview database must be freshly started in memory; no existing tables will be overwritten.");
  for(const name of ["20260704193720_init","20261016080000_reconcile_auth_and_intake"]) await client.query(await readFile(path.join(root,"prisma/migrations",name,"migration.sql"),"utf8"));
  await client.query(`INSERT INTO "Product" ("id","slug","name","description","updatedAt") VALUES
   ('preview-camera','preview-camera','PREVIEW ONLY — Camera fixture','Test fixture only. Not an actual offer.',CURRENT_TIMESTAMP);
   INSERT INTO "CctvPackage" ("id","slug","titleEn","titleSw","cameras","descriptionEn","descriptionSw","includedItems","updatedAt") VALUES
   ('preview-package','preview-package','PREVIEW ONLY — CCTV fixture','MAJARIBIO TU — Kifurushi cha CCTV',4,'Test fixture only.','Taarifa za majaribio pekee.','["Test camera"]',CURRENT_TIMESTAMP);`);
 }finally{await client.end();}
 }
 console.log("Isolated source snapshot ready; no env files copied. Database initialization only in prepare mode.");
}else if(mode==="build"||mode==="start"){
 const args=mode==="build"?["build","--webpack"]:["start","--hostname","127.0.0.1","--port","3001"];
 const child=spawn(process.execPath,[path.join(root,"node_modules/next/dist/bin/next"),...args],{cwd:destination,env,stdio:"inherit"});
 child.on("exit",code=>process.exit(code||0));child.on("error",error=>{console.error(error.message);process.exit(1)});
}else throw new Error("Use prepare, build or start.");
