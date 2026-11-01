import { test } from "node:test";
import assert from "node:assert/strict";
import { bundle,form } from "./helpers.mjs";
import React from "react";
import {renderToStaticMarkup} from "react-dom/server";
const seo=await bundle("lib/seo.ts");
test("security routes retain language-specific self-canonicals and reciprocal hreflang",()=>{
 for(const route of ["/","/services/cctv","/services/electric-fence","/services/gate-motors","/contact"]){
  const en=seo.pageMetadata(route,"en");const sw=seo.pageMetadata(route,"sw");
  assert.equal(en.alternates.canonical,"https://www.bmcontractorstz.com"+route);
  assert.equal(sw.alternates.canonical,en.alternates.canonical+"?lang=sw");
  assert.deepEqual(en.alternates.languages,sw.alternates.languages);assert.notEqual(en.description,sw.description);
 }
});
test("incomplete SW content stays self-canonical and accessible but is not indexed or advertised as translated",()=>{
 const result=seo.pageMetadata("/products/fixture","sw",["Fixture","Maelezo"],false);
 assert.match(result.alternates.canonical,/lang=sw/);assert.equal(result.robots.index,false);assert.deepEqual(result.alternates.languages,{});
 assert.equal(seo.pageMetadata("/admin/login","en").robots.index,false);
 assert.equal(seo.pageMetadata("/contact/success","sw").robots.index,false);
});
const links=await bundle("lib/i18n/links.ts");
test("language links preserve selected products and other enquiry context",()=>{
 const url=links.switchLanguageHref("/request-site-survey","selectedProduct=Fixture&lang=en","sw");
 assert.match(url,/selectedProduct=Fixture/);assert.match(url,/lang=sw/);
});
const validation=await bundle("lib/enquiries/validation.ts");
test("public inputs reject missing contacts, invalid email, oversized payloads and honeypot",()=>{
 for(const values of [{fullName:"Test",message:"Test"},{fullName:"Test",message:"Test",email:"bad"},{fullName:"Test",phone:"0700000001",message:"x".repeat(3001)},{fullName:"Test",phone:"0700000001",message:"Test",website:"bot"}])
 assert.throws(()=>validation.parseEnquiry(form(values),"contact"));
 assert.equal(validation.parseEnquiry(form({fullName:"Test",phone:"0700000001",message:"Test"}),"contact").fullName,"Test");
});
const catalogue=await bundle("components/sections/CatalogSection.tsx");
test("catalogue shows real product data and separate package links without invented brand or price",()=>{
 const html=renderToStaticMarkup(React.createElement(catalogue.default,{lang:"en",t:{packagesLabel:"Packages",packagesTitle:"Packages",productsLabel:"Products",productsTitle:"Products",productsText:"Browse",viewAll:"View all"},
 packages:[{slug:"fixture-package",titleEn:"Fixture Package",titleSw:null,descriptionEn:null,descriptionSw:null,cameras:4,priceFrom:null,includedItems:[]}],
 products:[{slug:"fixture-product",name:"Fixture Product",brand:null,price:null,imageUrl:null,description:"Description",category:null}]}));
 assert.match(html,/Fixture Product/);assert.match(html,/\/products\/fixture-product/);assert.match(html,/\/cctv-packages\/fixture-package/);
 assert.doesNotMatch(html,/\/products\/fixture-package|Hikvision|TZS ---/);assert.match(html,/Request price/);
});
let calls=0,notifications=0,isNew=true;
globalThis.__bmTest={persist:async()=>{calls++;return {id:"fixture-id",isNew}},notify:async()=>{notifications++;}};
const mocks={
 "@/lib/enquiries/store":"export class EnquiryRateError extends Error{}; export const persistEnquiry=(...args)=>globalThis.__bmTest.persist(...args);",
 "@/lib/africasTalking":"export const notifyBmOffice=(...args)=>globalThis.__bmTest.notify(...args);"
};
for(const [path,name,kind] of [["app/contact/actions.ts","createContactMessage","contact"],["app/request-site-survey/actions.ts","createSiteSurveyRequest","survey"]]){
 const action=(await bundle(path,mocks))[name];
 test(kind+" validates before writes and keeps SW errors/success; duplicate sends no SMS",async()=>{
  calls=0;notifications=0;
  assert.deepEqual(await action({},form({lang:"sw",fullName:"Test"})),{error:"invalid"});assert.equal(calls,0);
  isNew=true;
  const data=form({lang:"sw",fullName:"Test",phone:"0700000001",location:"Fixture",message:"Test"});
  await assert.rejects(()=>action({},data),/REDIRECT:.*lang=sw/);assert.equal(notifications,1);
  isNew=false;await assert.rejects(()=>action({},data),/REDIRECT:.*lang=sw/);assert.equal(notifications,1);
 });
}

const contacts=await bundle("data/site.ts");
test("approved WhatsApp label, raw number and destination agree",()=>{
const whatsapp=contacts.siteConfig.whatsapp;
assert.equal(whatsapp.label.replace(/\D/g,""),"255745778821");assert.equal(whatsapp.raw,"+255745778821");assert.equal(whatsapp.url,"https://wa.me/255745778821");
});
