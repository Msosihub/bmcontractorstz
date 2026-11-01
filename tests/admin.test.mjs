import { test } from "node:test";
import assert from "node:assert/strict";
import { bundle, form } from "./helpers.mjs";
const phone="+255700000001";
process.env.ADMIN_ALLOWED_PHONES=phone;
let writes=0;
globalThis.__bmTest={token:"test",session:null};
const mutation=async()=>{writes++;return {slug:"test"};};
globalThis.__bmTest.prisma={
 adminSession:{findUnique:async()=>globalThis.__bmTest.session},
 ...Object.fromEntries(["product","productCategory","service","project","supportArticle","cctvPackage","contactMessage","siteSurveyRequest"].map(model=>[model,{create:mutation,upsert:mutation,update:mutation}])),
};
const values={name:"Fixture",titleEn:"Fixture",descriptionEn:"Description",categoryName:"Fixture",category:"Fixture",categoryEn:"Fixture",contentEn:"Content",cameras:4,price:"",priceFrom:"",status:"NEW",nextValue:"false",
 productId:"fixture",packageId:"fixture",serviceId:"fixture",projectId:"fixture",articleId:"fixture",messageId:"fixture",requestId:"fixture"};
for(const section of ["products","services","packages","projects","support","messages","site-surveys"]){
 const actions=await bundle("app/admin/(protected)/"+section+"/actions.ts");
 for(const [name,action] of Object.entries(actions)){
  test(name+" rejects missing, expired and revoked admin sessions with zero writes",async()=>{
   for(const session of [null,{phone,expiresAt:new Date(0)},{phone:"+255700000002",expiresAt:new Date(Date.now()+60000)}]){
    globalThis.__bmTest.session=session;writes=0;
    await assert.rejects(()=>action(form(values)),/Unauthorized/);assert.equal(writes,0);
   }
  });
  test(name+" allows an active allowlisted admin",async()=>{
   globalThis.__bmTest.session={phone,expiresAt:new Date(Date.now()+60000)};writes=0;
   await action(form(values));assert.ok(writes>=1);
  });
  test(name+" rejects oversized inputs before any mutation",async()=>{
   globalThis.__bmTest.session={phone,expiresAt:new Date(Date.now()+60000)};writes=0;
   await assert.rejects(()=>action(form({...values,name:"x".repeat(501)})),/length/);assert.equal(writes,0);
  });
 }
}
