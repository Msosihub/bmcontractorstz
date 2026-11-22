"use client";
import { useState } from "react";
import type { Language } from "@/lib/i18n/config";
export function FlowMotionControl({lang}:{lang:Language}){const [paused,setPaused]=useState(false);return <button type="button" className="pb-motion" aria-pressed={paused} aria-label={lang==='sw'?(paused?'Endelea na mwendo wa mchoro':'Sitisha mwendo wa mchoro'):(paused?'Resume power animation':'Pause power animation')} onClick={e=>{const next=!paused;e.currentTarget.closest('.pb-flow')?.toggleAttribute('data-paused',next);setPaused(next);}}><svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">{paused?<path d="m8 5 11 7-11 7Z" fill="currentColor"/>:<path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="2.5"/>}</svg></button>;}
