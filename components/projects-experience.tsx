'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useCallback,useEffect,useMemo,useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft,ArrowRight,ArrowUpRight,ImageIcon,Video,X } from 'lucide-react'
import { projectCategories,projectMedia,type MediaItem } from '@/lib/content'
import { SmartVideo } from './smart-video'

export function ProjectsExperience(){
  const[category,setCategory]=useState<(typeof projectCategories)[number]>('All')
  const[limit,setLimit]=useState(12)
  const[active,setActive]=useState<MediaItem|null>(null)
  const filtered=useMemo(()=>projectMedia.filter(item=>category==='All'||item.category===category),[category])
  const items=filtered.slice(0,limit)
  const move=useCallback((direction:number)=>{if(!active)return;const index=filtered.findIndex(x=>x.id===active.id);setActive(filtered[(index+direction+filtered.length)%filtered.length])},[active,filtered])
  useEffect(()=>{if(!active)return;const close=(event:KeyboardEvent)=>{if(event.key==='Escape')setActive(null);if(event.key==='ArrowRight')move(1);if(event.key==='ArrowLeft')move(-1)};document.body.style.overflow='hidden';addEventListener('keydown',close);return()=>{document.body.style.overflow='';removeEventListener('keydown',close)}},[active,move])

  return <>
    <div className="project-archive-head"><div><p className="eyebrow">Browse the work</p><h2>Furniture and spaces, made with intent.</h2></div><p>{filtered.length} {filtered.length===1?'project':'projects'}</p></div>
    <div className="project-filters no-scrollbar" aria-label="Filter projects">{projectCategories.map(item=><button key={item} className={category===item?'active':''} aria-pressed={category===item} onClick={()=>{setCategory(item);setLimit(12)}}>{item}</button>)}</div>
    <div className="project-masonry">{items.map((item,index)=><article key={item.id} className={`project-tile project-tile-${(index%8)+1} ${item.featured?'featured':''}`}><button className="project-media protected-media" data-protected-media onClick={()=>setActive(item)} aria-label={`View ${item.title} project`}>{item.type==='image'?<Image src={item.src} alt={`${item.title}. ${item.description}`} fill draggable={false} loading={index<4?'eager':'lazy'} className="object-cover" sizes="(min-width:1400px) 35vw,(min-width:768px) 50vw,100vw"/>:<SmartVideo src={item.src} poster={item.poster} className="h-full w-full object-cover"/>}<span className={`media-watermark wm-${String.fromCharCode(97+(index%4))}`} aria-hidden="true">WOODWEY</span><span className="project-media-icon" aria-hidden="true">{item.type==='video'?<Video/>:<ImageIcon/>}</span><span className="media-caption">View project <ArrowUpRight/></span></button><div className="project-meta"><p>{item.category}</p><h2>{item.title}</h2><span>{item.description}</span></div></article>)}</div>
    {limit<filtered.length&&<div className="load-more"><button onClick={()=>setLimit(v=>v+8)}>Load more work <ArrowRight/></button></div>}
    {active&&createPortal(<div className="lightbox project-dialog" role="dialog" aria-modal="true" aria-label={`${active.title} project detail`}><div className="lightbox-header"><div><p>{active.category}</p><h2>{active.title}</h2></div><button onClick={()=>setActive(null)} aria-label="Close project detail" autoFocus><X/></button></div><div className="project-dialog-layout"><div className="lightbox-stage protected-media wm-b" data-protected-media>{active.type==='image'?<Image src={active.src} alt={active.title} fill draggable={false} className="object-contain" sizes="(min-width:900px) 72vw,100vw" priority/>:<SmartVideo src={active.src} poster={active.poster} className="max-h-full max-w-full"/>}<span className="media-watermark" aria-hidden="true">WOODWEY</span><button className="lightbox-prev" onClick={()=>move(-1)} aria-label="Previous project"><ArrowLeft/></button><button className="lightbox-next" onClick={()=>move(1)} aria-label="Next project"><ArrowRight/></button></div><aside className="project-dialog-copy"><p className="eyebrow">{active.category}</p><h2>{active.title}</h2><p>{active.description}</p><Link href="/#contact" onClick={()=>setActive(null)} className="ww-button"><span>Request a similar project</span><i><ArrowUpRight/></i></Link><div className="related-work"><span>Related work</span>{projectMedia.filter(x=>x.category===active.category&&x.id!==active.id).slice(0,2).map(item=><button key={item.id} onClick={()=>setActive(item)}><span data-protected-media><Image src={item.type==='image'?item.src:item.poster!} alt="" width={120} height={90} draggable={false}/></span><b>{item.title}</b></button>)}</div></aside></div></div>,document.body)}
  </>
}
