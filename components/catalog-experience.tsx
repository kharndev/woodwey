'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Film, Images, Search, X } from 'lucide-react'
import { catalog, catalogCategories, categoryStories, type CatalogCategory, type CatalogItem } from '@/lib/catalog'
import { saveSelection, useSelection } from '@/lib/selection'
import { SmartVideo } from './smart-video'

type MediaFilter='All'|'Photography'|'Film'
type DetailMedia={type:'image';src:string;label:string}|{type:'video';src:string;poster:string;label:string}

export function CatalogExperience(){
  const [category,setCategory]=useState<(typeof catalogCategories)[number]>('All')
  const [mediaFilter,setMediaFilter]=useState<MediaFilter>('All')
  const [query,setQuery]=useState('')
  const [limit,setLimit]=useState(9)
  const [active,setActive]=useState<CatalogItem|null>(null)
  const [activeMedia,setActiveMedia]=useState(0)
  const [drawer,setDrawer]=useState(false)
  const selected=useSelection()

  useEffect(()=>{if(!active&&!drawer)return;const close=(event:KeyboardEvent)=>{if(event.key==='Escape'){setActive(null);setDrawer(false)}};document.body.style.overflow='hidden';addEventListener('keydown',close);return()=>{document.body.style.overflow='';removeEventListener('keydown',close)}},[active,drawer])

  const filtered=useMemo(()=>catalog.filter(item=>{
    const term=query.trim().toLowerCase()
    const categoryMatch=category==='All'||item.category===category
    const mediaMatch=mediaFilter==='All'||mediaFilter==='Photography'||item.videos.length>0
    const searchMatch=!term||`${item.name} ${item.category} ${item.subcategory} ${item.spaces.join(' ')} ${item.description}`.toLowerCase().includes(term)
    return categoryMatch&&mediaMatch&&searchMatch
  }),[category,mediaFilter,query])
  const visible=filtered.slice(0,limit)
  const toggle=(id:string)=>saveSelection(selected.includes(id)?selected.filter(item=>item!==id):[...selected,id])
  const open=(item:CatalogItem)=>{setActive(item);setActiveMedia(0)}
  const chooseCategory=(value:(typeof catalogCategories)[number])=>{setCategory(value);setLimit(9);document.getElementById('catalog-collection')?.scrollIntoView({behavior:'smooth',block:'start'})}

  return <>
    <section className="catalog-category-section" aria-labelledby="catalog-categories-heading">
      <div className="flex items-end justify-between gap-6"><div><p className="eyebrow">Enter a collection</p><h2 id="catalog-categories-heading" className="display max-w-4xl">Designed around the way a space works.</h2></div><p className="hidden max-w-sm text-sm leading-6 text-muted-foreground lg:block">Each collection is a point of departure. Dimensions, finishes and details are resolved for your project.</p></div>
      <div className="catalog-category-grid">{catalogCategories.slice(1).map((item,index)=>{const story=categoryStories[item as CatalogCategory];return <button key={item} onClick={()=>chooseCategory(item)} className={`catalog-category-card catalog-category-${index+1}`}><Image src={story.image} alt={`${item} collection by Woodwey`} fill loading={index===0?'eager':'lazy'} className="object-cover" sizes="(min-width:1100px) 40vw,(min-width:640px) 50vw,100vw"/><span className="catalog-category-shade"/><span className="catalog-category-copy"><small>{String(index+1).padStart(2,'0')}</small><strong>{item}</strong><em>{story.title}</em></span></button>})}</div>
    </section>

    <section id="catalog-collection" className="catalog-collection" aria-labelledby="catalog-collection-heading">
      <div className="catalog-tools"><div className="no-scrollbar flex gap-2 overflow-x-auto pb-1" aria-label="Filter by collection">{catalogCategories.map(item=><button key={item} onClick={()=>{setCategory(item);setLimit(9)}} className={category===item?'active':''}>{item}</button>)}</div><label className="catalog-search"><Search size={16}/><span className="sr-only">Search catalogue</span><input value={query} onChange={event=>{setQuery(event.target.value);setLimit(9)}} placeholder="Search collection"/></label></div>
      <div className="catalog-collection-intro"><div><p className="eyebrow">{category==='All'?'The complete library':`${category} collection`}</p><h2 id="catalog-collection-heading">{category==='All'?'Objects and interiors, made for place.':categoryStories[category].title}</h2></div><div><p>{category==='All'?'Explore a curated selection of furniture, fitted elements and complete spaces by Woodwey.':categoryStories[category].description}</p><div className="catalog-media-filters" aria-label="Filter by media type">{(['All','Photography','Film'] as MediaFilter[]).map(item=><button key={item} onClick={()=>{setMediaFilter(item);setLimit(9)}} className={mediaFilter===item?'active':''}>{item==='Photography'?<Images size={14}/>:item==='Film'?<Film size={14}/>:null}{item}</button>)}</div></div></div>
      <p className="mb-6 text-[10px] uppercase tracking-[.18em] text-muted-foreground" aria-live="polite">Showing {Math.min(visible.length,filtered.length)} of {filtered.length} references</p>
      {visible.length?<div className="catalog-editorial-grid">{visible.map((item,index)=><article key={item.id} className={`catalog-product ${item.featured&&index%5===0?'is-featured':''}`}><button onClick={()=>open(item)} className="media-hover relative block w-full overflow-hidden text-left"><Image src={item.images[0]} alt={`${item.name} by Woodwey`} width={1400} height={item.ratio==='portrait'?1750:item.ratio==='landscape'?920:1400} className="catalog-product-image" sizes="(min-width:1200px) 40vw,(min-width:640px) 50vw,100vw"/><span className="media-caption">View collection</span>{item.videos.length>0&&<span className="catalog-film-mark"><Film size={13}/>Film</span>}</button><div className="catalog-product-copy"><button className="min-w-0 text-left" onClick={()=>open(item)}><p>{item.category} · {item.subcategory}</p><h3>{item.name}</h3><span>{item.description}</span></button><button onClick={()=>toggle(item.id)} className={`selection-toggle ${selected.includes(item.id)?'is-selected':''}`}>{selected.includes(item.id)?<Check size={15}/>:<span>+</span>}{selected.includes(item.id)?'Selected':'Add to Selection'}</button></div></article>)}</div>:<div className="border-y border-ink/15 py-20 text-center"><h2 className="font-serif text-4xl">No matching references.</h2><p className="mt-3 text-sm text-muted-foreground">Try another collection or a broader search.</p></div>}
      {limit<filtered.length&&<div className="mt-14 text-center"><button onClick={()=>setLimit(value=>value+6)} className="min-h-12 border border-ink px-8 py-3 text-sm">Load more references</button></div>}
    </section>

    <button onClick={()=>setDrawer(true)} className="selection-button">My Selection <span>{selected.length}</span></button>
    {active&&createPortal(<ProductDetail item={active} mediaIndex={activeMedia} setMediaIndex={setActiveMedia} selected={selected.includes(active.id)} onToggle={()=>toggle(active.id)} onClose={()=>setActive(null)}/>,document.body)}
    {drawer&&createPortal(<SelectionDrawer selected={selected} onRemove={toggle} onClose={()=>setDrawer(false)}/>,document.body)}
  </>
}

function ProductDetail({item,mediaIndex,setMediaIndex,selected,onToggle,onClose}:{item:CatalogItem;mediaIndex:number;setMediaIndex:(value:number)=>void;selected:boolean;onToggle:()=>void;onClose:()=>void}){
  const media:DetailMedia[]=[...item.images.map((src,index)=>({type:'image' as const,src,label:`${item.name} view ${index+1}`})),...item.videos.map(video=>({type:'video' as const,src:video.src,poster:video.poster,label:video.title}))]
  const current=media[mediaIndex]
  const move=(direction:number)=>setMediaIndex((mediaIndex+direction+media.length)%media.length)
  useEffect(()=>{const navigate=(event:KeyboardEvent)=>{if(event.key==='ArrowLeft')move(-1);if(event.key==='ArrowRight')move(1)};addEventListener('keydown',navigate);return()=>removeEventListener('keydown',navigate)})
  return <div className="catalog-detail" role="dialog" aria-modal="true" aria-label={`${item.name} details`}><header><div><p>{item.category} · {item.subcategory}</p><strong>{item.name}</strong></div><button onClick={onClose} aria-label="Close product details" autoFocus><X/></button></header><div className="catalog-detail-layout"><div className="catalog-detail-gallery"><div className="catalog-detail-stage">{current.type==='image'?<Image src={current.src} alt={current.label} fill className="object-contain" sizes="(min-width:900px) 68vw,100vw" priority/>:<SmartVideo key={current.src} src={current.src} poster={current.poster} className="h-full w-full object-contain"/>}{media.length>1&&<><button onClick={()=>move(-1)} className="catalog-detail-prev" aria-label="Previous media"><ArrowLeft/></button><button onClick={()=>move(1)} className="catalog-detail-next" aria-label="Next media"><ArrowRight/></button></>}</div><div className="catalog-thumbnails no-scrollbar">{media.map((entry,index)=><button key={`${entry.src}-${index}`} onClick={()=>setMediaIndex(index)} className={mediaIndex===index?'active':''} aria-label={`View ${entry.label}`}>{entry.type==='image'?<Image src={entry.src} alt="" fill className="object-cover" sizes="96px"/>:<><Image src={entry.poster} alt="" fill className="object-cover" sizes="96px"/><span><Film size={13}/></span></>}</button>)}</div></div><aside className="catalog-detail-copy"><p className="eyebrow">{item.metadata.collection} collection</p><h2>{item.name}</h2><p className="catalog-detail-description">{item.description}</p><div className="catalog-detail-meta"><div><span>Designed for</span><p>{item.spaces.join(' · ')}</p></div><div><span>Project specification</span><p>{item.metadata.specification}</p></div></div><p className="catalog-made-note">Made to order in Lagos, Nigeria. Final dimensions, finishes, timeline and quotation are developed for each project.</p><div className="grid gap-3"><button onClick={onToggle} className="catalog-primary-action">{selected?<Check size={17}/>:<span>+</span>}{selected?'Added to Selection':'Add to Selection'}</button><Link href="/#contact" onClick={onClose} className="catalog-secondary-action">Request a Quote <ArrowUpRight size={17}/></Link></div></aside></div></div>
}

function SelectionDrawer({selected,onRemove,onClose}:{selected:string[];onRemove:(id:string)=>void;onClose:()=>void}){
  const items=selected.map(id=>catalog.find(item=>item.id===id)).filter((item):item is CatalogItem=>Boolean(item))
  return <div className="drawer-backdrop" role="dialog" aria-modal="true" aria-label="My Selection"><div className="selection-drawer"><div className="flex items-start justify-between"><div><p className="eyebrow">Project references</p><h2 className="font-serif text-4xl">My Selection <span className="text-xl text-muted-foreground">({items.length})</span></h2></div><button onClick={onClose} aria-label="Close selection"><X/></button></div><div className="mt-10 grid gap-6">{items.length?items.map(item=><div key={item.id} className="grid grid-cols-[88px_1fr_auto] gap-4 border-b border-ink/15 pb-6"><Image src={item.images[0]} alt="" width={88} height={108} className="aspect-[4/5] object-cover"/><div><p className="font-serif text-xl leading-tight">{item.name}</p><p className="mt-1 text-[10px] uppercase tracking-[.15em] text-muted-foreground">{item.category} · {item.subcategory}</p></div><button onClick={()=>onRemove(item.id)} aria-label={`Remove ${item.name}`} className="self-start"><X size={16}/></button></div>):<div className="border-y border-ink/15 py-12"><p className="font-serif text-2xl">Your selection is waiting.</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Save the pieces and spaces that speak to your project.</p></div>}</div>{items.length>0&&<Link href="/#contact" onClick={onClose} className="catalog-primary-action mt-10 justify-between">Request a Quote <ArrowUpRight size={17}/></Link>}<button onClick={onClose} className="mt-4 min-h-12 w-full border border-ink px-5 text-sm">Continue browsing</button></div></div>
}
