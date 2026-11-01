import { createHash } from "node:crypto";
import {spawnSync} from 'node:child_process';
// Explicit local-only integration test; run after scripts/preview.mjs prepare.
import {test} from "node:test";
import assert from "node:assert/strict";
import {PrismaClient} from "@prisma/client";
import {PrismaPg} from "@prisma/adapter-pg";
import {bundle} from "./helpers.mjs";
const adapter=new PrismaPg({connectionString:"postgresql://postgres:postgres@127.0.0.1:55439/postgres",max:1});
const prisma=new PrismaClient({adapter});
globalThis.__bmTest={prisma};
const store=await bundle("lib/enquiries/store.ts");
const input={fullName:"PREVIEW TEST",phone:"07"+String(Date.now()).slice(-8),email:"",message:"Fixture enquiry",subject:"",location:"Fixture",serviceType:"",propertyType:"",budgetRange:"",urgency:"",preferredContactMethod:"",selectedPackage:"",selectedProduct:""};
test("database-backed intake deduplicates simultaneous retries and enforces rate limit",async()=>{
 try{
  const oldId='expired-'+Date.now(),recentId='retained-'+Date.now();
  await prisma.enquirySubmission.createMany({data:[
   {id:oldId,fingerprint:oldId,senderHash:oldId,kind:'contact',recordId:'fixture-only',createdAt:new Date(Date.now()-25*60*60*1000)},
   {id:recentId,fingerprint:recentId,senderHash:recentId,kind:'contact',recordId:'fixture-only',createdAt:new Date(Date.now()-23*60*60*1000)},
  ]});
  const results=await Promise.all([store.persistEnquiry("contact",input),store.persistEnquiry("contact",input)]);
  assert.equal(await prisma.enquirySubmission.count({where:{id:oldId}}),0);
  assert.equal(await prisma.enquirySubmission.count({where:{id:recentId}}),1);
  assert.equal(results.filter(result=>result.isNew).length,1);assert.equal(results[0].id,results[1].id);
  assert.equal(await prisma.contactMessage.count({where:{phone:input.phone}}),1);
  await store.persistEnquiry("contact",{...input,message:"Second fixture"});
  await store.persistEnquiry("survey",{...input,message:"Third fixture"});
  await assert.rejects(()=>store.persistEnquiry("contact",{...input,message:"Fourth fixture"}),/rate/);
  assert.equal(await prisma.enquirySubmission.count({where:{senderHash:createHash("sha256").update(input.phone.replace(/^0/,"255")).digest("hex")}}),3);
  const scheduledId='scheduled-expiry-'+Date.now();
  await prisma.enquirySubmission.create({data:{id:scheduledId,fingerprint:scheduledId,senderHash:scheduledId,kind:'contact',recordId:results[0].id,createdAt:new Date(Date.now()-25*60*60*1000)}});
  const env={PATH:process.env.PATH,BM_RECEIPT_CLEANUP_DATABASE_URL:'postgresql://postgres:postgres@127.0.0.1:55439/postgres'};
  const dry=spawnSync(process.execPath,['scripts/cleanup-enquiry-receipts.mjs'],{env,encoding:'utf8'});
  assert.equal(dry.status,0,dry.stderr);assert.equal(JSON.parse(dry.stdout).mode,'dry-run');
  assert.equal(await prisma.enquirySubmission.count({where:{id:scheduledId}}),1);
  const apply=spawnSync(process.execPath,['scripts/cleanup-enquiry-receipts.mjs','--apply'],{env,encoding:'utf8'});
  assert.equal(apply.status,0,apply.stderr);assert.ok(JSON.parse(apply.stdout).deleted>=1);
  assert.equal(await prisma.enquirySubmission.count({where:{id:scheduledId}}),0);
  assert.equal(await prisma.contactMessage.count({where:{id:results[0].id}}),1);
 }finally{await prisma.$disconnect();}
});
