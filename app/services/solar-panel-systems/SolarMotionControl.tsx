"use client";
import {useState} from "react";
import type {Language} from "@/lib/i18n/config";
export function SolarMotionControl({lang}:{lang:Language}){const [paused,setPaused]=useState(false);return <button type="button" className="se-motion-control" aria-pressed={paused} aria-label={lang==='sw'?(paused?'Endelea kuonyesha mtiririko':'Sitisha mwendo wa mtiririko'):(paused?'Resume energy animation':'Pause energy animation')} onClick={e=>{const next=!paused;e.currentTarget.closest('.se-flow')?.toggleAttribute('data-paused',next);setPaused(next);}}><svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true">{paused?<path d="m8 5 11 7-11 7Z" fill="currentColor"/>:<path d="M8 5v14M16 5v14" stroke="currentColor" strokeWidth="2.5"/>}</svg></button>}
