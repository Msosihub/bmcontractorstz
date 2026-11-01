import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';import {assertEquipmentMediaPublication} from '../lib/equipment-media-policy.mjs';
const manifest=JSON.parse(await readFile('data/electric-fence-product-images.json','utf8'));
test('owner-approved catalogue assets pass publication while uncleared copies fail closed',()=>{
 assert.equal(manifest.assets.length,8);assert.equal(new Set(manifest.assets.map(x=>x.id)).size,8);
 for(const env of [{VERCEL:'1',VERCEL_ENV:'preview'},{VERCEL_ENV:'production'},{BM_CLEAN_PRODUCTION:'1'}]){
  assert.doesNotThrow(()=>assertEquipmentMediaPublication(env,manifest));
  const uncleared=structuredClone(manifest);uncleared.assets[0].productionApproved=false;
  assert.throws(()=>assertEquipmentMediaPublication(env,uncleared),{code:'ERR_EQUIPMENT_MEDIA_RIGHTS'});
 }
});
test('photo publication requires both explicit clearance and recorded evidence for every asset',()=>{
 const fixture={assets:[{productionApproved:true,permissionEvidence:'SYNTHETIC TEST permission evidence, not actual approval'}]};assert.doesNotThrow(()=>assertEquipmentMediaPublication({VERCEL:'1'},fixture));
 for(const invalid of [{assets:[]},{},{assets:[{productionApproved:false,permissionEvidence:'SYNTHETIC TEST permission evidence'}]},{assets:[{productionApproved:true,permissionEvidence:''}]}])assert.throws(()=>assertEquipmentMediaPublication({VERCEL:'1'},invalid),{code:'ERR_EQUIPMENT_MEDIA_RIGHTS'});
});
