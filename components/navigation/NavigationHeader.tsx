"use client";
import Image from "next/image";
import { siteConfig } from "@/data/site";
import { useEffect, useRef } from "react";
import { usePathname,useSearchParams } from "next/navigation";
import type { Language } from "@/lib/i18n/config";
import type { Destination, ResolvedGroup, ResolvedItem } from "@/lib/navigation/types";
import { navigationHref } from "@/lib/navigation/href";
import "./navigation.css";

export function NavigationHeader({lang,groups,quotation,degraded=false}:{lang:Language;groups:ResolvedGroup[];degraded?:boolean;quotation:Pick<Destination,"href"|"title">}) {
  const root=useRef<HTMLElement>(null),path=usePathname(),search=useSearchParams(),sw=lang==="sw";
  const activeGroup=path.startsWith('/catalogue')||path.startsWith('/products')?'equipment':path.startsWith('/services')?'services':path==='/'?null:'company';
  const href=(d:ResolvedItem)=>navigationHref(d.href!,lang);
  const language=(value:Language)=>{const q=new URLSearchParams(search.toString());q.set('lang',value);return path+'?'+q.toString();};
  useEffect(()=>{
    const header=root.current;if(!header)return;
    header.dataset.enhanced="true";
    const mobile=header.querySelector<HTMLDetailsElement>('.mn-mobile')!,desktop=header.querySelector<HTMLElement>('.mn-desktop')!;
    const primary=()=>Array.from(desktop.querySelectorAll<HTMLDetailsElement>('.mn-group'));
    const restore=()=>{document.body.style.overflow=oldOverflow;outside.forEach(([e,inert])=>{e.inert=inert;});outside=[];};
    let oldOverflow=document.body.style.overflow,outside:[HTMLElement,boolean][]=[];
    const close=(returnFocus=false)=>{const active=header.querySelector<HTMLDetailsElement>('.mn-group[open]');primary().forEach(d=>d.open=false);mobile.querySelectorAll<HTMLDetailsElement>('.mn-group').forEach(d=>d.open=false);mobile.open=false;restore();if(returnFocus)(active?.querySelector<HTMLElement>('summary')||mobile.querySelector<HTMLElement>('summary'))?.focus();};
    const toggle=(e:Event)=>{const d=e.target;if(!(d instanceof HTMLDetailsElement))return;
      if(d===mobile){if(mobile.open){oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';outside=Array.from(document.querySelectorAll<HTMLElement>('main,body > footer')).map(e=>[e,e.inert]);outside.forEach(([e])=>e.inert=true);header.style.setProperty('--mn-top',Math.max(0,header.getBoundingClientRect().bottom)+'px');}else restore();}
      if(d.classList.contains('mn-group')&&d.open){const nav=d.closest('nav');nav?.querySelectorAll<HTMLDetailsElement>('.mn-group').forEach(other=>{if(other!==d)other.open=false;});}
    };
    const key=(e:KeyboardEvent)=>{if(e.key==='Escape'){if(mobile.open){e.preventDefault();close();mobile.querySelector<HTMLElement>('summary')?.focus();}else if(primary().some(d=>d.open)){e.preventDefault();close(true);}}
      if(e.key==='Tab'&&mobile.open){const focusable=Array.from(mobile.querySelectorAll<HTMLElement>('summary,a[href],button')).filter(e=>e.getClientRects().length&&!e.hasAttribute('disabled'));const first=focusable[0],last=focusable.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last?.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first?.focus();}}
      if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)&&desktop.contains(e.target as Node)&&(e.target as HTMLElement).matches('.mn-group > summary')){const summaries=primary().map(d=>d.querySelector<HTMLElement>('summary')!),i=summaries.indexOf(e.target as HTMLElement);e.preventDefault();const n=e.key==='Home'?0:e.key==='End'?summaries.length-1:(i+(e.key==='ArrowRight'?1:-1)+summaries.length)%summaries.length;const open=primary().some(d=>d.open);primary().forEach((d,j)=>d.open=open&&j===n);summaries[n].focus();}
    };
    const pointer=(e:PointerEvent)=>{if(!header.contains(e.target as Node))close();};
    const focus=(e:FocusEvent)=>{if(!desktop.contains(e.target as Node)&&!mobile.open)primary().forEach(d=>d.open=false);};
    const media=matchMedia('(min-width:1101px)');let desktopMode=media.matches;const resize=()=>{if(media.matches!==desktopMode){close();desktopMode=media.matches;}else if(mobile.open)header.style.setProperty('--mn-top',Math.max(0,header.getBoundingClientRect().bottom)+'px');};
    header.addEventListener('toggle',toggle,true);document.addEventListener('keydown',key);document.addEventListener('pointerdown',pointer);document.addEventListener('focusin',focus);window.addEventListener('resize',resize);
    return ()=>{restore();header.removeEventListener('toggle',toggle,true);document.removeEventListener('keydown',key);document.removeEventListener('pointerdown',pointer);document.removeEventListener('focusin',focus);window.removeEventListener('resize',resize);delete header.dataset.enhanced;};
  },[path,search]);
  const link=(d:ResolvedItem)=><a key={d.id+JSON.stringify(d.title)} href={href(d)} aria-current={!d.href?.includes('#')&&path===d.href?.split('?')[0]?"page":undefined}><span>{d.title[lang]}</span>{d.description&&<small>{d.description[lang]}</small>}<span className="mn-link-arrow" aria-hidden="true">↗</span></a>;
  const panel=(g:ResolvedGroup,mobile=false)=><div className={`mn-panel mn-panel-${g.id}`}>
    <div className="mn-panel-heading"><div><span className="mn-kicker">BM / {g.title[lang]}</span><p>{g.intro[lang]}</p></div><a className="mn-directory" href={href(g.directory)}>{g.directory.id==='equipment'?(sw?'Vifaa vyote':'Equipment directory'):sw?'Angalia zaidi':'Explore more'} <span aria-hidden="true">↗</span></a></div>
    <div className={`mn-panel-body ${g.feature?'mn-has-feature':''}`}><div className="mn-sections">{g.sections.map(s=><section key={s.id}><h2>{s.title[lang]}</h2><ul>{s.items.map((d,i)=><li key={d.id+'-'+i}>{link(d)}</li>)}</ul></section>)}</div>{g.feature&&<a className="mn-feature" href={href(g.feature.destination)}><Image unoptimized src={g.feature.image} alt={g.feature.alt[lang]} width={480} height={360} sizes={mobile?'80vw':'240px'}/><div><span className="mn-kicker">{sw?'TUPANGE MFUMO WAKO':'MAKE THE SYSTEM WORK'}</span><strong>{g.feature.title[lang]}</strong><span>{sw?'Jadili mahitaji yako':'Discuss your requirements'} ↗</span></div></a>}</div>
    <div className="mn-panel-foot"><span>{sw?'Tathmini. Vifaa. Ufungaji. Msaada.':'Assessment. Equipment. Installation. Support.'}</span><a href={navigationHref(quotation.href!,lang)}>{quotation.title[lang]} ↗</a></div>
  </div>;
  return <div className="mn-shell">{degraded&&<div className="mn-availability" role="status"><span>{sw?"Baadhi ya viungo vya huduma havipatikani kwa sasa.":"Some service links are temporarily unavailable."}</span><a href={navigationHref("/services",lang)}>{sw?"Orodha ya huduma":"Service directory"}</a><a href={navigationHref("/products",lang)}>{sw?"Vifaa":"Equipment"}</a><a href={navigationHref("/contact",lang)}>{sw?"Wasiliana nasi":"Contact BM"}</a></div>}<div className="mn-topbar"><div><span className="mn-top-offices">{sw?'Ofisi Moshi na Arusha':'Offices in Moshi & Arusha'}<i aria-hidden="true">·</i></span><span>{sw?'Huduma Tanzania nzima':'Available across Tanzania'}</span></div><a href={"tel:"+siteConfig.sales.raw}><span className="mn-top-label">{sw?'Miradi na mauzo':'National project enquiries'} <i aria-hidden="true">/</i> </span>{siteConfig.sales.label}</a></div>
  <header ref={root} className="site-header mn-header"><a className="brand mn-brand" href={'/?lang='+lang}><Image src="/assets/official-logo.png" width={42} height={46} alt="BM Contractors"/><span>BM CONTRACTORS<small>ENGINEERING · TANZANIA</small></span></a>
  <nav className="mn-desktop" aria-label={sw?'Menyu kuu':'Main navigation'}>{groups.map(g=><details className="mn-group" data-group={g.id} data-active={g.id===activeGroup?"true":undefined} key={g.id}><summary>{g.title[lang]}<span className="mn-chevron" aria-hidden="true">⌄</span></summary>{panel(g)}</details>)}</nav>
  <div className="mn-actions"><div className="languages"><a lang="en" href={language('en')} aria-current={lang==='en'?'page':undefined}>EN</a><span>/</span><a lang="sw" href={language('sw')} aria-current={sw?'page':undefined}>SW</a></div><a className="mn-quote" href={navigationHref(quotation.href!,lang)}>{quotation.title[lang]} <span aria-hidden="true">↗</span></a>
  <details className="mn-mobile"><summary className="mn-mobile-toggle" aria-label={sw?'Fungua au funga menyu':'Open or close navigation'}><span className="mn-open-icon" aria-hidden="true">☰</span><span className="mn-close-icon" aria-hidden="true">×</span></summary><div className="mn-drawer"><div className="mn-mobile-intro"><span className="mn-kicker">BM CONTRACTORS</span><p>{sw?'Tafuta huduma inayofaa.':'Find your way forward.'}</p></div><nav aria-label={sw?'Menyu kuu ya simu':'Mobile main navigation'}>{groups.map(g=><details className="mn-group" data-group={g.id} data-active={g.id===activeGroup?"true":undefined} key={g.id}><summary><span className="mn-back" aria-hidden="true">‹ {sw?'Rudi':'Back'} / </span>{g.title[lang]}<span className="mn-chevron" aria-hidden="true">↗</span></summary>{panel(g,true)}</details>)}</nav><a className="mn-mobile-quote" href={navigationHref(quotation.href!,lang)}>{quotation.title[lang]} ↗</a><a className="mn-mobile-call" href={"tel:"+siteConfig.sales.raw}>{sw?'Piga simu':'Call'} {siteConfig.sales.label}</a></div></details></div>
  </header></div>;
}
