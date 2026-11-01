import pg from 'pg';
import { Socket } from 'node:net';
import { assertRestrictedIdentity, verifyPreviewDatabase } from './preview-database.mjs';
import { isPreview } from './preview-safety.mjs';

// Reviewed independent clean project. Environment values cannot redefine this identity.
export const PRODUCTION_DATABASE = Object.freeze({
 host:'ep-nameless-bread-b7ki5wyv.c-13.us-east-1.aws.neon.tech',
 name:'bm_production_20261028', role:'bm_production_runtime_20261028',
});
export function isProduction(env=process.env){return env.VERCEL_ENV==='production'||env.BM_CLEAN_PRODUCTION==='1';}
export function assertProductionEnvironment(env=process.env){
 if(!isProduction(env))return;
 if(env.BM_CLEAN_PRODUCTION!=='1'||isPreview(env)||env.NEXT_PUBLIC_BM_PREVIEW==='1')throw Error('Clean Production configuration required.');
 if(!env.DATABASE_URL)throw Error('Production database URL required.');
 for(const key of ['DATABASE_URL','DIRECT_URL','DATABASE_URL_UNPOOLED','PRISMA_DATABASE_URL']){
  if(!env[key])continue;let url;try{url=new URL(env[key]);}catch{throw Error('Invalid Production database configuration.');}
  if(!['postgres:','postgresql:'].includes(url.protocol)||url.hostname.replace('-pooler.','.')!==PRODUCTION_DATABASE.host||url.pathname!=='/'+PRODUCTION_DATABASE.name||decodeURIComponent(url.username)!==PRODUCTION_DATABASE.role||url.searchParams.get('sslmode')!=='verify-full'||['host','hostaddr','user','password','database','dbname','options'].some(k=>url.searchParams.has(k)))throw Error('Production database target rejected.');
 }
}
export function productionPgOptions(env=process.env){
 if(!isProduction(env))return {};
 assertProductionEnvironment(env);
 return {max:3,connectionTimeoutMillis:15000,stream:()=>{
  const socket=new Socket();socket.connect=function(port,host){return Socket.prototype.connect.call(this,{port,host,autoSelectFamily:true,autoSelectFamilyAttemptTimeout:1000});};return socket;
 }};
}
export async function verifyDatabaseEnvironment(env=process.env){
 // Production must not be disguised as Preview by inherited flags.
 assertProductionEnvironment(env);
 if(!isProduction(env))return verifyPreviewDatabase(env);
 const c=new pg.Client({connectionString:env.DATABASE_URL,...productionPgOptions(env),query_timeout:10000});
 try{
  await c.connect();
  const result=await c.query("SELECT current_database() AS database,current_user AS role,rolsuper,rolcreatedb,rolcreaterole,rolbypassrls,EXISTS(SELECT 1 FROM pg_auth_members WHERE member=pg_roles.oid) AS member,has_schema_privilege(current_user,'public','CREATE') AS ddl FROM pg_roles WHERE rolname=current_user");
  assertRestrictedIdentity(result.rows[0],{BM_PREVIEW_DB_NAME:PRODUCTION_DATABASE.name,BM_PREVIEW_DB_ROLE:PRODUCTION_DATABASE.role});
  const schema=await c.query(`SELECT count(*)::int AS n FROM information_schema.tables WHERE table_schema='public' AND table_name=ANY($1)`,[['AdminUser','AdminOtp','AdminSession','SiteSetting','Page','Service','ProductCategory','Product','CctvPackage','CctvPackageItem','Project','SupportArticle','BrandPartner','ContactMessage','AppointmentRequest','SiteSurveyRequest','EnquirySubmission']]);
  const indexes=await c.query("SELECT count(*)::int AS n FROM pg_indexes WHERE schemaname='public' AND tablename='EnquirySubmission' AND indexname=ANY($1)",[['EnquirySubmission_createdAt_idx','EnquirySubmission_fingerprint_createdAt_idx','EnquirySubmission_senderHash_createdAt_idx']]);
  if(schema.rows[0].n!==17||indexes.rows[0].n!==3)throw Error('Incomplete application schema.');
 }catch{throw Error('Production database identity, privileges or schema rejected.');}
 finally{await c.end().catch(()=>{});}
}
