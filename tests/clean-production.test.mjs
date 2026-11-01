import {test} from 'node:test';import assert from 'node:assert/strict';
import {assertProductionEnvironment,PRODUCTION_DATABASE,productionPgOptions} from '../lib/production-database.mjs';
import {assertPreviewEnvironment} from '../lib/preview-safety.mjs';
const safe={VERCEL_ENV:'production',BM_CLEAN_PRODUCTION:'1',DATABASE_URL:`postgresql://${PRODUCTION_DATABASE.role}:fixture@${PRODUCTION_DATABASE.host}/${PRODUCTION_DATABASE.name}?sslmode=verify-full`};
test('clean Production exact committed identity and finite connection budget',()=>{assert.doesNotThrow(()=>assertProductionEnvironment(safe));assert.equal(productionPgOptions(safe).connectionTimeoutMillis,15000);assert.equal(productionPgOptions(safe).max,3)});
for(const [name,change] of Object.entries({missingFlag:{BM_CLEAN_PRODUCTION:undefined},wrongHost:{DATABASE_URL:safe.DATABASE_URL.replace(PRODUCTION_DATABASE.host,'ep-late-resonance-abvpu8hv.eu-west-2.aws.neon.tech')},wrongDb:{DATABASE_URL:safe.DATABASE_URL.replace(PRODUCTION_DATABASE.name,'neondb')},owner:{DATABASE_URL:safe.DATABASE_URL.replace(PRODUCTION_DATABASE.role,'bm_schema_owner')},preview:{BM_ISOLATED_PREVIEW:'1'},banner:{NEXT_PUBLIC_BM_PREVIEW:'1'},tls:{DATABASE_URL:safe.DATABASE_URL.replace('verify-full','disable')},directOverride:{DIRECT_URL:safe.DATABASE_URL+'&host=other.example'}}))test('Production rejects '+name,()=>assert.throws(()=>assertProductionEnvironment({...safe,...change})));
test('new Preview identity accepted; neither old nor new Production may impersonate Preview',()=>{
 const env={VERCEL_ENV:'preview',BM_ISOLATED_PREVIEW:'1',BM_DISABLE_NOTIFICATIONS:'1',BM_PREVIEW_DB_HOST:'ep-dawn-breeze-b7yxn2j2.c-13.us-east-1.aws.neon.tech',BM_PREVIEW_DB_NAME:'bm_preview_20261028',BM_PREVIEW_DB_ROLE:'bm_preview_runtime_20261028',DATABASE_URL:'postgresql://bm_preview_runtime_20261028:fixture@ep-dawn-breeze-b7yxn2j2.c-13.us-east-1.aws.neon.tech/bm_preview_20261028?sslmode=verify-full'};
 assert.doesNotThrow(()=>assertPreviewEnvironment(env));assert.throws(()=>assertPreviewEnvironment({...env,DATABASE_URL:safe.DATABASE_URL}));assert.throws(()=>assertProductionEnvironment({...safe,...env}));
});

import pg from 'pg';
import {verifyDatabaseEnvironment} from '../lib/production-database.mjs';
const good={database:PRODUCTION_DATABASE.name,role:PRODUCTION_DATABASE.role,rolsuper:false,rolcreatedb:false,rolcreaterole:false,rolbypassrls:false,member:false,ddl:false};
for(const fault of ['none','database','role','rolsuper','rolcreatedb','rolcreaterole','rolbypassrls','member','ddl','tables','indexes'])test('Production startup query gate '+fault,async()=>{
 const Original=pg.Client;let ended=false;let reads=0;
 pg.Client=class{async connect(){}async query(sql){reads++;assert.match(sql,/^SELECT /);if(sql.includes('current_database()'))return {rows:[{...good,...(fault==='database'?{database:'wrong'}:fault==='role'?{role:'owner'}:['rolsuper','rolcreatedb','rolcreaterole','rolbypassrls','member','ddl'].includes(fault)?{[fault]:true}:{})}]};return {rows:[{n:sql.includes('information_schema')?(fault==='tables'?16:17):(fault==='indexes'?2:3)}]};}async end(){ended=true;}};
 try{if(fault==='none')await verifyDatabaseEnvironment(safe);else await assert.rejects(verifyDatabaseEnvironment(safe),/rejected/);assert(ended);assert(reads>0);}finally{pg.Client=Original;}
});
