'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, ImageIcon, Search, Video, X } from 'lucide-react'
import { catalog, catalogCategories, categoryStories, type CatalogCategory, type CatalogItem } from '@/lib/catalog'
import { saveSelection, useSelection } from '@/lib/selection'
import { CatalogRequestButton } from './catalog-request'
import { SmartVideo } from './smart-video'

type DetailMedia={type:'image';src:string;label:string}|{type:'video';src:string;poster:string;label:string}

export function CatalogExperience(){
  const [category,setCategory]=useState<(typeof catalogCategories)[number]>('All')
  const [query,setQuery]=useState('')
  const [limit,setLimit]=useState(8)
  const [active,setActive]=useState<CatalogItem|null>(null)
  const [activeMedia,setActiveMedia]=useState(0)
  const [drawer,setDrawer]=useState(false)
  const selected=useSelection()

  useEffect(()=>{const value=new URLSearchParams(window.location.search).get('category');if(!value||!catalogCategories.includes(value as (typeof catalogCategories)[number]))return;const timer=window.setTimeout(()=>setCategory(value as (typeof catalogCategories)[number]),0);return()=>window.clearTimeout(timer)},[])
  useEffect(()=>{if(!active&&!drawer)return;const close=(event:KeyboardEvent)=>{if(event.key==='Escape'){setActive(null);setDrawer(false)}};document.body.style.overflow='hidden';addEventListener('keydown',close);return()=>{document.body.style.overflow='';removeEventListener('keydown',close)}},[active,drawer])

  const filtered=useMemo(()=>catalog.filter(item=>{
    const term=query.trim().toLowerCase()
    const categoryMatch=category==='All'||item.category===category
    const searchMatch=!term||`${item.name} ${item.category} ${item.subcategory} ${item.spaces.join(' ')} ${item.description}`.toLowerCase().includes(term)
    return categoryMatch&&searchMatch
  }),[category,query])
  const visible=filtered.slice(0,limit)
  const toggle=(id:string)=>saveSelection(selected.includes(id)?selected.filter(item=>item!==id):[...selected,id])
  const open=(item:CatalogItem)=>{setActive(item);setActiveMedia(0)}
  const chooseCategory=(value:(typeof catalogCategories)[number],scroll=false)=>{setCategory(value);setLimit(8);if(scroll)requestAnimationFrame(()=>document.getElementById('catalog-results')?.scrollIntoView({behavior:'smooth',block:'start'}))}
  const currentStory=category==='All'?null:categoryStories[category as CatalogCategory]

  return <>
    <section className="catalog-index" aria-labelledby="catalog-index-heading">
      <div className="catalog-index-head"><div><p className="eyebrow">Collection index</p><h2 id="catalog-index-heading">Explore by space or search by name.</h2></div><CatalogRequestButton compact>Request full catalog</CatalogRequestButton></div>
      <div className="catalog-tools">
        <div className="catalog-filter-row no-scrollbar" aria-label="Filter by collection">{catalogCategories.map(item=><button key={item} onClick={()=>chooseCategory(item)} className={category===item?'active':''} aria-pressed={category===item}>{item}</button>)}</div>
        <label className="catalog-search"><Search size={16}/><span className="sr-only">Search catalog</span><input value={query} onChange={event=>{setQuery(event.target.value);setLimit(8)}} placeholder="Search pieces and spaces"/></label>
      </div>
    </section>

    <section className="catalog-category-section" aria-labelledby="catalog-categories-heading">
      <div className="catalog-category-heading"><p className="eyebrow">Collections</p><h2 id="catalog-categories-heading">Six ways into the work.</h2></div>
      <div className="catalog-category-grid">{catalogCategories.slice(1).map((item,index)=>{const story=categoryStories[item as CatalogCategory];return <button key={item} onClick={()=>chooseCategory(item,true)} className={`catalog-category-card catalog-category-${index+1} protected-media wm-${String.fromCharCode(97+(index%4))}`} data-protected-media><Image src={story.image} alt={`${item} collection by Woodwey`} fill loading={index===0?'eager':'lazy'} draggable={false} className="object-cover" sizes="(min-width:1100px) 28vw,(min-width:640px) 50vw,82vw"/><span className="media-watermark" aria-hidden="true">WOODWEY</span><span className="catalog-category-shade"/><span className="catalog-category-copy"><small>{String(index+1).padStart(2,'0')}</small><strong>{item}</strong><em>{story.title}</em></span></button>})}</div>
    </section>

    <section id="catalog-results" className="catalog-collection" aria-labelledby="catalog-collection-heading">
      <div className="catalog-collection-intro"><div><p className="eyebrow">{category==='All'?'The complete collection':`${category} collection`}</p><h2 id="catalog-collection-heading">{category==='All'?'Objects and interiors, made for place.':currentStory?.title}</h2></div><div><p>{category==='All'?'Furniture, fitted interiors and architectural metalwork by Woodwey.':currentStory?.description}</p><p className="catalog-result-count" aria-live="polite">{filtered.length} {filtered.length===1?'reference':'references'}</p></div></div>
      {visible.length?<div className="catalog-editorial-grid">{visible.map((item,index)=><article key={item.id} className={`catalog-product catalog-product-${(index%6)+1} ${item.featured?'is-featured':''}`}>
        <button onClick={()=>open(item)} className="catalog-product-media protected-media" data-protected-media aria-label={`View ${item.name}`}>
          <span className="catalog-product-main"><Image src={item.images[0]} alt={`${item.name} by Woodwey`} fill draggable={false} className="object-cover" sizes="(min-width:1200px) 54vw,(min-width:700px) 62vw,100vw"/></span>
          {item.images[1]&&<span className="catalog-product-support support-one"><Image src={item.images[1]} alt="" fill draggable={false} className="object-cover" sizes="(min-width:900px) 20vw,40vw"/></span>}
          {item.images[2]&&<span className="catalog-product-support support-two"><Image src={item.images[2]} alt="" fill draggable={false} className="object-cover" sizes="(min-width:900px) 16vw,34vw"/></span>}
          <span className={`media-watermark wm-${String.fromCharCode(97+(index%4))}`} aria-hidden="true">WOODWEY</span>
          <span className="catalog-media-icon" aria-hidden="true">{item.videos.length?<Video/>:<ImageIcon/>}</span>
        </button>
        <div className={`catalog-product-copy position-${(index%4)+1}`}><p>{item.category}</p><h3>{item.name}</h3><span>{item.description}</span><div><button onClick={()=>open(item)}>View details <ArrowUpRight/></button><button onClick={()=>toggle(item.id)} className={selected.includes(item.id)?'is-selected':''}>{selected.includes(item.id)?<Check/>:<span>+</span>}{selected.includes(item.id)?'Selected':'Add to selection'}</button></div></div>
      </article>)}</div>:<div className="catalog-empty"><h2>No matching references.</h2><p>Try another collection or a broader search.</p></div>}
      {limit<filtered.length&&<div className="catalog-load-more"><button onClick={()=>setLimit(value=>value+6)}>Load more references</button></div>}
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
  return <div className="catalog-detail" role="dialog" aria-modal="true" aria-label={`${item.name} details`}><header><div><p>{item.category} · {item.subcategory}</p><strong>{item.name}</strong></div><button onClick={onClose} aria-label="Close product details" autoFocus><X/></button></header><div className="catalog-detail-layout"><div className="catalog-detail-gallery"><div className="catalog-detail-stage protected-media wm-b" data-protected-media>{current.type==='image'?<Image src={current.src} alt={current.label} fill draggable={false} className="object-contain" sizes="(min-width:900px) 68vw,100vw" priority/>:<SmartVideo key={current.src} src={current.src} poster={current.poster} className="h-full w-full object-contain"/>}<span className="media-watermark" aria-hidden="true">WOODWEY</span>{media.length>1&&<><button onClick={()=>move(-1)} className="catalog-detail-prev" aria-label="Previous media"><ArrowLeft/></button><button onClick={()=>move(1)} className="catalog-detail-next" aria-label="Next media"><ArrowRight/></button></>}</div><div className="catalog-thumbnails no-scrollbar">{media.map((entry,index)=><button key={`${entry.src}-${index}`} onClick={()=>setMediaIndex(index)} className={mediaIndex===index?'active':''} aria-label={`View ${entry.label}`} data-protected-media>{entry.type==='image'?<Image src={entry.src} alt="" fill draggable={false} className="object-cover" sizes="96px"/>:<><Image src={entry.poster} alt="" fill draggable={false} className="object-cover" sizes="96px"/><span><Video size={13}/></span></>}</button>)}</div></div><aside className="catalog-detail-copy"><p className="eyebrow">{item.metadata.collection} collection</p><h2>{item.name}</h2><p className="catalog-detail-description">{item.description}</p><div className="catalog-detail-meta"><div><span>Designed for</span><p>{item.spaces.join(' · ')}</p></div><div><span>Project specification</span><p>{item.metadata.specification}</p></div></div><p className="catalog-made-note">Made to order in Lagos, Nigeria. Final dimensions, finishes and timing are developed for each project.</p><div className="catalog-detail-actions"><button onClick={onToggle} className="catalog-primary-action">{selected?<Check size={17}/>:<span>+</span>}{selected?'Added to Selection':'Add to Selection'}</button><Link href="/#contact" onClick={onClose} className="catalog-secondary-action">Request a Quote <ArrowUpRight size={17}/></Link></div></aside></div></div>
}

function SelectionDrawer({selected,onRemove,onClose}:{selected:string[];onRemove:(id:string)=>void;onClose:()=>void}){
  const items=selected.map(id=>catalog.find(item=>item.id===id)).filter((item):item is CatalogItem=>Boolean(item))
  return <div className="drawer-backdrop" role="dialog" aria-modal="true" aria-label="My Selection"><div className="selection-drawer"><div className="selection-drawer-head"><div><p className="eyebrow">Project references</p><h2>My Selection <span>({items.length})</span></h2></div><button onClick={onClose} aria-label="Close selection"><X/></button></div><div className="selection-drawer-list">{items.length?items.map(item=><div key={item.id} className="selection-drawer-item"><div data-protected-media><Image src={item.images[0]} alt="" width={88} height={108} draggable={false}/></div><div><p>{item.name}</p><small>{item.category} · {item.subcategory}</small></div><button onClick={()=>onRemove(item.id)} aria-label={`Remove ${item.name}`}><X size={16}/></button></div>):<div className="selection-empty"><p>Your selection is waiting.</p><span>Save the pieces and spaces that speak to your project.</span></div>}</div>{items.length>0&&<Link href="/#contact" onClick={onClose} className="catalog-primary-action selection-quote">Request a Quote <ArrowUpRight size={17}/></Link>}<button onClick={onClose} className="selection-continue">Continue browsing</button></div></div>
}
