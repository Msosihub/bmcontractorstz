import { createHash } from "node:crypto";
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
  const results=await Promise.all([store.persistEnquiry("contact",input),store.persistEnquiry("contact",input)]);
  assert.equal(results.filter(result=>result.isNew).length,1);assert.equal(results[0].id,results[1].id);
  assert.equal(await prisma.contactMessage.count({where:{phone:input.phone}}),1);
  await store.persistEnquiry("contact",{...input,message:"Second fixture"});
  await store.persistEnquiry("survey",{...input,message:"Third fixture"});
  await assert.rejects(()=>store.persistEnquiry("contact",{...input,message:"Fourth fixture"}),/rate/);
  assert.equal(await prisma.enquirySubmission.count({where:{senderHash:createHash("sha256").update(input.phone.replace(/^0/,"255")).digest("hex")}}),3);
 }finally{await prisma.$disconnect();}
});
