'use client'
import { useEffect, useRef } from 'react'
export function SmartVideo({src,poster,className}:{src:string;poster?:string;className?:string}){const ref=useRef<HTMLVideoElement>(null);useEffect(()=>{const el=ref.current;if(!el)return;const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting)el.play().catch(()=>{});else el.pause()},{rootMargin:'120px'});observer.observe(el);return()=>observer.disconnect()},[]);return <video ref={ref} src={src} className={className} muted loop playsInline preload="none" poster={poster} aria-label="Woodwey project film" />}
