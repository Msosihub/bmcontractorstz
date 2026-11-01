import {test} from 'node:test';
import assert from 'node:assert/strict';
import {bundle} from './helpers.mjs';
test('expiry removes only old receipts and preserves recent dedupe and enquiry records',async()=>{
 let deleted;
 const receipt={findFirst:async()=>null,count:async()=>0,findMany:async args=>{
  assert.equal(args.take,500);assert.ok(args.where.createdAt.lt<Date.now()-10*60*1000);
  return [{id:'expired-receipt'}];
 },deleteMany:async args=>{deleted=args;},create:async()=>{}};
 const tx={enquirySubmission:receipt,$queryRaw:async()=>[],contactMessage:{create:async()=>({id:'new-enquiry'})}};
 globalThis.__bmTest={prisma:{$transaction:async fn=>fn(tx)}};
 const {persistEnquiry}=await bundle('lib/enquiries/store.ts');
 const result=await persistEnquiry('contact',{fullName:'Fixture',phone:'0700000001',email:'',message:'Fixture',subject:''});
 assert.deepEqual(deleted.where.id.in,['expired-receipt']);assert.equal(result.id,'new-enquiry');
 // No customer-record deletion API exists in the mock: any accidental deletion fails this test.
});
