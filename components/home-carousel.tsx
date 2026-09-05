'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'
import { SmartVideo } from './smart-video'

export type StorySlide={title:string;category:string;description:string;image:string;video?:string;href:string}

export function StoryCarousel({items,label}:{items:StorySlide[];label:string}){
  const track=useRef<HTMLDivElement>(null)
  const [active,setActive]=useState(0)
  const move=(direction:number)=>track.current?.scrollBy({left:direction*track.current.clientWidth*.72,behavior:'smooth'})
  const sync=()=>{const node=track.current;if(!node)return;const slides=[...node.children] as HTMLElement[];const nearest=slides.reduce((best,slide,index)=>Math.abs(slide.offsetLeft-node.scrollLeft)<Math.abs(slides[best].offsetLeft-node.scrollLeft)?index:best,0);setActive(nearest)}
  return <div className="story-carousel">
    <div className="carousel-controls"><span>{String(active+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}</span><div><button onClick={()=>move(-1)} aria-label={`Previous ${label}`}><ArrowLeft/></button><button onClick={()=>move(1)} aria-label={`Next ${label}`}><ArrowRight/></button></div></div>
    <div ref={track} onScroll={sync} onKeyDown={event=>{if(event.key==='ArrowLeft'){event.preventDefault();move(-1)}if(event.key==='ArrowRight'){event.preventDefault();move(1)}}} className="story-track no-scrollbar" role="region" aria-label={label} tabIndex={0}>{items.map((item,index)=><article className="story-slide" key={`${item.title}-${index}`}>
      <Link href={item.href} className="story-media">{item.video?<><SmartVideo src={item.video} poster={item.image} className="h-full w-full object-cover"/><span className="story-play"><Play size={14} fill="currentColor"/> Film</span></>:<Image src={item.image} alt={`${item.title}. ${item.description}`} fill className="object-cover" sizes="(min-width:900px) 38vw,82vw" loading={index<2?'eager':'lazy'}/>}<span className="story-gradient"/></Link>
      <div className="story-copy"><p>{item.category}</p><h3>{item.title}</h3><span>{item.description}</span></div>
    </article>)}</div>
    <div className="carousel-progress" aria-hidden="true"><span style={{width:`${((active+1)/items.length)*100}%`}}/></div>
  </div>
}
