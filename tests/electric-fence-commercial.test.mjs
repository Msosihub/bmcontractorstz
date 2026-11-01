import test from 'node:test';
import assert from 'node:assert/strict';
import { bundle } from './helpers.mjs';
const { fenceLinks } = await bundle('components/premium/electric-fence/links.ts');

test('fencing enquiry links preserve each application, language and safe bounded context',()=>{
  for(const lang of ['en','sw'])for(const context of ['Security fence — wall-top — 120 m','Farm perimeter — livestock & crops','Large perimeter / wildlife assessment','Repairs — existing fence','Replacement energizer — Druid 13LCD']){
    const x=fenceLinks(lang,context),q=new URL(x.quote,'https://example.invalid'),s=new URL(x.survey,'https://example.invalid'),w=new URL(x.whatsapp,'https://example.invalid');
    assert.equal(q.pathname,'/contact');assert.equal(s.pathname,'/request-site-survey');assert.equal(w.pathname,'/whatsapp');assert.equal(q.searchParams.get('lang'),lang);assert.equal(s.searchParams.get('lang'),lang);assert.equal(q.searchParams.get('subject'),context);assert.equal(s.searchParams.get('service'),context);assert(w.searchParams.get('text').includes(context));assert.equal(x.call,'tel:+255760111880');
  }
  const hostile='Fence & lang=sw # <script> / '+ 'x'.repeat(130);const q=new URL(fenceLinks('en',hostile).quote,'https://example.invalid');assert.equal(q.searchParams.get('subject'),hostile.slice(0,100));assert.equal(q.searchParams.get('lang'),'en');assert.equal([...q.searchParams].length,2);
});

test('electric fence route respects publication, metadata and original URL',async()=>{
  globalThis.__bmTest={prisma:{service:{findUnique:async()=>globalThis.__fenceRecord}}};
  const route=await bundle('app/services/electric-fence/page.tsx',{
    '@/components/premium/electric-fence/Page':'export function ElectricFenceCommercialPage(props){return props}',
    'next/navigation':"export function notFound(){throw Error('NOT_FOUND')}"
  });
  for(const lang of ['en','sw']){
    globalThis.__fenceRecord=null;
    const meta=await route.generateMetadata({searchParams:Promise.resolve({lang})});
    assert.equal(meta.alternates.canonical,'https://www.bmcontractorstz.com/services/electric-fence'+(lang==='sw'?'?lang=sw':''));
    assert.equal(meta.alternates.languages.en,'https://www.bmcontractorstz.com/services/electric-fence');assert.equal(meta.alternates.languages.sw,'https://www.bmcontractorstz.com/services/electric-fence?lang=sw');
    globalThis.__fenceRecord={isPublished:false};
    assert.deepEqual(await route.generateMetadata({searchParams:Promise.resolve({lang})}),{robots:{index:false,follow:false}});
    await assert.rejects(()=>route.default({searchParams:Promise.resolve({lang})}),/NOT_FOUND/);
    globalThis.__fenceRecord={isPublished:true,id:'synthetic-service'};
    const page=await route.default({searchParams:Promise.resolve({lang})});assert.equal(page.props.record.id,'synthetic-service');assert.equal(page.props.lang,lang);
  }
  delete globalThis.__fenceRecord;
});

test('fence-only footer copy removes image labels without changing other pages',async()=>{
  const React=await import('react'),{renderToStaticMarkup}=await import('react-dom/server');
  const {Footer}=await bundle('components/site/Footer.tsx',{'next/image':"import React from 'react';export default function Image(props){return React.createElement('img',props)}"});
  for(const lang of ['en','sw']){
    const normal=renderToStaticMarkup(React.createElement(Footer,{lang}));
    const fence=renderToStaticMarkup(React.createElement(Footer,{lang,imageNotice:false}));
    assert(normal.includes(lang==='en'?'Images labelled AI':'Picha zilizoainishwa'));
    assert(!fence.includes(lang==='en'?'Images labelled AI':'Picha zilizoainishwa'));
    for(const text of ['+255 760 111 880','Mianzini','Moshi'])assert(fence.includes(text));
  }
});
