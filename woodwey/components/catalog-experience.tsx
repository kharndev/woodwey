'use client'

import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { Check, Search, X, ArrowLeft, ArrowRight } from 'lucide-react'
import { catalog, type CatalogItem } from '@/lib/content'

const categories = ['All', 'Living', 'Dining', 'Workspace', 'Bedroom', 'Storage'] as const

export function CatalogExperience() {
  const [category, setCategory] = useState<(typeof categories)[number]>('All')
  const [query, setQuery] = useState('')
  const [active, setActive] = useState<CatalogItem | null>(null)
  const [selected, setSelected] = useState<string[]>([])
  const [drawer, setDrawer] = useState(false)
  useEffect(() => { const saved = window.localStorage.getItem('woodwey-selection'); if (saved) setSelected(JSON.parse(saved)) }, [])
  useEffect(() => { window.localStorage.setItem('woodwey-selection', JSON.stringify(selected)) }, [selected])
  const items = useMemo(() => catalog.filter(item => (category === 'All' || item.category === category) && item.name.toLowerCase().includes(query.toLowerCase())), [category, query])
  const toggle = (id: string) => setSelected(s => s.includes(id) ? s.filter(x => x !== id) : [...s,id])
  const move = (amount:number) => { if (!active) return; const i = catalog.findIndex(x=>x.id===active.id); setActive(catalog[(i+amount+catalog.length)%catalog.length]) }
  useEffect(() => { const onKey=(e:KeyboardEvent)=>{if(!active)return;if(e.key==='Escape')setActive(null);if(e.key==='ArrowRight')move(1);if(e.key==='ArrowLeft')move(-1)}; window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey) })
  return <>
    <div className="mb-12 flex flex-col gap-7 border-y py-6 md:flex-row md:items-center md:justify-between"><div className="flex flex-wrap gap-2">{categories.map(c=><button key={c} onClick={()=>setCategory(c)} className={`px-4 py-2 text-sm transition ${category===c?'bg-ink text-ivory':'bg-sand hover:bg-muted'}`}>{c}</button>)}</div><label className="flex items-center gap-2 border-b py-2"><Search size={16}/><span className="sr-only">Search catalog</span><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search pieces" className="bg-transparent text-sm outline-none"/></label></div>
    <div className="columns-1 gap-6 md:columns-2 lg:columns-3">{items.map(item=><article key={item.id} className="mb-10 break-inside-avoid"><button onClick={()=>setActive(item)} className="group relative block w-full overflow-hidden text-left"><Image src={item.image} alt={item.alt} width={1000} height={item.ratio==='portrait'?1300:item.ratio==='landscape'?720:1000} className="w-full object-cover transition duration-700 group-hover:scale-[1.025]"/><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 p-5 pt-16 text-sm text-ivory opacity-0 transition group-hover:opacity-100">View piece</span></button><div className="mt-4 flex items-start justify-between"><div><h2 className="font-serif text-2xl">{item.name}</h2><p className="text-xs text-muted-foreground">{item.category}</p></div><button onClick={()=>toggle(item.id)} className="flex items-center gap-2 text-xs">{selected.includes(item.id)?<Check size={16}/>:<span className="text-lg">+</span>} Select</button></div></article>)}</div>
    <button onClick={()=>setDrawer(true)} className="fixed bottom-5 right-5 z-40 bg-orange px-5 py-4 text-sm text-ink shadow-xl">My selection ({selected.length})</button>
    {active && <div role="dialog" aria-modal="true" aria-label={active.name} className="fixed inset-0 z-[60] flex flex-col bg-ink text-ivory"><div className="flex items-center justify-between p-5"><p>{active.name} <span className="ml-3 text-xs text-ivory/50">{catalog.findIndex(x=>x.id===active.id)+1} / {catalog.length}</span></p><button onClick={()=>setActive(null)} aria-label="Close"><X/></button></div><div className="relative flex flex-1 items-center justify-center p-5"><Image src={active.image} alt={active.alt} fill className="object-contain p-12" sizes="100vw"/><button onClick={()=>move(-1)} aria-label="Previous" className="absolute left-5 rounded-full bg-ink/70 p-3"><ArrowLeft/></button><button onClick={()=>move(1)} aria-label="Next" className="absolute right-5 rounded-full bg-ink/70 p-3"><ArrowRight/></button></div><button onClick={()=>toggle(active.id)} className="m-5 border border-orange p-4">{selected.includes(active.id)?'Remove from selection':'Add to my selection'}</button></div>}
    {drawer && <div role="dialog" aria-modal="true" aria-label="My selection" className="fixed inset-0 z-[70] flex justify-end bg-ink/55"><div className="h-full w-full max-w-md overflow-y-auto bg-background p-6"><div className="flex items-center justify-between"><h2 className="font-serif text-3xl">My selection</h2><button onClick={()=>setDrawer(false)} aria-label="Close"><X/></button></div><div className="mt-8 flex flex-col gap-5">{selected.length===0?<p className="text-muted-foreground">Add pieces that speak to you. They&apos;ll stay here while you browse.</p>:selected.map(id=>{const item=catalog.find(x=>x.id===id)!;return <div key={id} className="flex gap-4"><Image src={item.image} alt="" width={90} height={110} className="aspect-[4/5] object-cover"/><div className="flex flex-1 items-start justify-between"><p className="font-serif text-lg">{item.name}</p><button onClick={()=>toggle(id)} aria-label={`Remove ${item.name}`}><X size={16}/></button></div></div>})}</div>{selected.length>0&&<a href="/#contact" className="mt-10 block bg-orange p-4 text-center text-sm">Request a quote with these references</a>}</div></div>}
  </>
}
