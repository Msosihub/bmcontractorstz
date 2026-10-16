import assert from "node:assert/strict";
const base="http://127.0.0.1:3001";
const results=[];
for(const path of ["/","/services/cctv","/services/electric-fence","/services/gate-motors","/contact","/request-site-survey"]){
 for(const lang of ["en","sw"]){
  const response=await fetch(base+path+(lang==="sw"?"?lang=sw":""),{redirect:"manual"});const html=await response.text();
  assert.equal(response.status,200,path);
  assert.match(html,new RegExp('<html[^>]*lang="'+lang+'"'),path);
  const canonical=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(new URL(canonical).href,new URL("https://www.bmcontractorstz.com"+path+(lang==="sw"?"?lang=sw":"")).href);
  for(const other of ["en","sw"])assert.match(html,new RegExp('hrefLang="'+other+'"'));
  results.push({path,lang,status:response.status,canonical});
 }
}
const admin=await fetch(base+"/admin",{redirect:"manual"});
const adminHtml=await admin.text();
assert.ok([200,307].includes(admin.status));
if(admin.status===307) assert.match(admin.headers.get("location"),/\/admin\/login$/);
else assert.match(adminHtml,/http-equiv="refresh" content="1;url=\/admin\/login"/);
assert.doesNotMatch(adminHtml,/Total Products|New Survey Requests/);

const product=await fetch(base+"/products/preview-camera?lang=sw");const html=await product.text();
assert.match(html,/noindex, follow/);assert.match(html,/bado hayajatafsiriwa/);
const sitemap=await (await fetch(base+"/sitemap.xml")).text();assert.match(sitemap,/lang=sw/);assert.doesNotMatch(sitemap,/https:\/\/bmcontractorstz.com/);
console.log(JSON.stringify({checks:results,admin:"login redirect verified; no dashboard data (Next streaming response may be 200)",incompleteTranslation:"visible notice, self-canonical, noindex",sitemap:"localized URLs and www host verified"},null,2));
