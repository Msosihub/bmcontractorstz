import {test} from 'node:test';
import assert from 'node:assert/strict';
import {assertRestrictedIdentity} from '../lib/preview-database.mjs';
const env={BM_PREVIEW_DB_NAME:'bm_preview_fixture',BM_PREVIEW_DB_ROLE:'bm_preview_runtime_fixture'};
const safe={database:env.BM_PREVIEW_DB_NAME,role:env.BM_PREVIEW_DB_ROLE,rolsuper:false,rolcreatedb:false,rolcreaterole:false,rolbypassrls:false,member:false,ddl:false};
test('restricted database identity passes',()=>assert.doesNotThrow(()=>assertRestrictedIdentity(safe,env)));
for(const key of ['rolsuper','rolcreatedb','rolcreaterole','rolbypassrls','member','ddl'])test('rejects elevated database privilege '+key,()=>assert.throws(()=>assertRestrictedIdentity({...safe,[key]:true},env)));
test('rejects inherited database and unexpected role',()=>{assert.throws(()=>assertRestrictedIdentity({...safe,database:'neondb'},env));assert.throws(()=>assertRestrictedIdentity({...safe,role:'neondb_owner'},env));assert.throws(()=>assertRestrictedIdentity(undefined,env));});
