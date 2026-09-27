'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ArrowRight, ArrowUpRight, Check, Search, Video, X } from 'lucide-react'
import { catalog, catalogCategories, categoryStories, type CatalogCategory, type CatalogItem } from '@/lib/catalog'
import { galleryImages, type GalleryImage } from '@/lib/catalog-gallery'
import { saveSelection, useSelection } from '@/lib/selection'
import { CatalogRequestButton } from './catalog-request'
import { SmartVideo } from './smart-video'

type DetailMedia = { type: 'image'; src: string; label: string } | { type: 'video'; src: string; poster: string; label: string }
const itemById = new Map(catalog.map(item => [item.id, item]))

export function CatalogExperience() {
  const [category, setCategory] = useState<(typeof catalogCategories)[number]>('All')
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(9)
  const [active, setActive] = useState<{ item: CatalogItem; image: string } | null>(null)
  const [activeMedia, setActiveMedia] = useState(0)
  const selected = useSelection()

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get('category')
    if (!value || !catalogCategories.includes(value as (typeof catalogCategories)[number])) return
    const timer = window.setTimeout(() => setCategory(value as (typeof catalogCategories)[number]), 0)
    return () => window.clearTimeout(timer)
  }, [])
  useEffect(() => {
    if (!active) return
    const close = (event: KeyboardEvent) => { if (event.key === 'Escape') setActive(null) }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    addEventListener('keydown', close)
    return () => { document.body.style.overflow = previousOverflow; removeEventListener('keydown', close) }
  }, [active])

  const filtered = useMemo(() => galleryImages.filter(image => {
    const item = itemById.get(image.itemId)
    const term = query.trim().toLowerCase()
    const categoryMatch = category === 'All' || image.category === category
    const searchMatch = !term || `${item?.name ?? ''} ${image.category} ${item?.subcategory ?? ''} ${item?.spaces.join(' ') ?? ''} ${image.alt}`.toLowerCase().includes(term)
    return Boolean(item) && categoryMatch && searchMatch
  }), [category, query])
  const visible = filtered.slice(0, limit)
  const spreads = Array.from({ length: Math.ceil(visible.length / 9) }, (_, index) => visible.slice(index * 9, index * 9 + 9))
  const toggle = (id: string) => saveSelection(selected.includes(id) ? selected.filter(item => item !== id) : [...selected, id])
  const chooseCategory = (value: (typeof catalogCategories)[number], scroll = false) => {
    setCategory(value)
    setLimit(9)
    if (scroll) requestAnimationFrame(() => document.getElementById('catalog-results')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }
  const open = (image: GalleryImage) => {
    const item = itemById.get(image.itemId)
    if (!item) return
    setActive({ item, image: image.src })
    setActiveMedia(0)
  }

  return <>
    <section className="catalog-index" aria-labelledby="catalog-index-heading">
      <div className="catalog-index-head"><div><p className="eyebrow">Collection index</p><h2 id="catalog-index-heading">Explore the collection.</h2></div><CatalogRequestButton compact>Request full catalog</CatalogRequestButton></div>
      <div className="catalog-tools">
        <div className="catalog-filter-row no-scrollbar" aria-label="Filter by collection">{catalogCategories.map(item => <button key={item} type="button" onClick={() => chooseCategory(item)} className={category === item ? 'active' : ''} aria-pressed={category === item}>{item}</button>)}</div>
        <label className="catalog-search"><Search size={16} /><span className="sr-only">Search catalog</span><input value={query} onChange={event => { setQuery(event.target.value); setLimit(9) }} placeholder="Search pieces and spaces" /></label>
      </div>
    </section>

    <section className="catalog-category-section" aria-labelledby="catalog-categories-heading">
      <div className="catalog-category-heading"><p className="eyebrow">Collections</p><h2 id="catalog-categories-heading">Six ways into the work.</h2></div>
      <div className="catalog-category-grid">{catalogCategories.slice(1).map((item, index) => {
        const story = categoryStories[item as CatalogCategory]
        return <button key={item} type="button" onClick={() => chooseCategory(item, true)} className={`catalog-category-card catalog-category-${index + 1} protected-media wm-${String.fromCharCode(97 + index % 4)}`} data-protected-media><Image src={story.image} alt={`${item} collection by Woodwey`} fill loading={index === 0 ? 'eager' : 'lazy'} draggable={false} className="object-cover" sizes="(min-width:1100px) 28vw,(min-width:640px) 50vw,82vw" /><span className="media-watermark" aria-hidden="true">WOODWEY</span><span className="catalog-category-shade" /><span className="catalog-category-copy"><small>{String(index + 1).padStart(2, '0')}</small><strong>{item}</strong></span></button>
      })}</div>
    </section>

    <section id="catalog-results" className="catalog-collection" aria-labelledby="catalog-collection-heading">
      <div className="catalog-collection-intro"><div><p className="eyebrow">{category === 'All' ? 'The complete collection' : `${category} collection`}</p><h2 id="catalog-collection-heading">{category === 'All' ? 'Furniture. Interiors. Metal Works.' : category}</h2></div><p className="catalog-result-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? 'image' : 'images'}</p></div>
      {spreads.length ? <div className="catalog-gallery">{spreads.map((spread, spreadIndex) => <div className="catalog-gallery-spread" key={spreadIndex}>{spread.map((image, index) => {
        const item = itemById.get(image.itemId)!
        const isSelected = selected.includes(item.id)
        return <article key={`${image.category}-${image.src}`} className={`catalog-gallery-item gallery-${index + 1}`}>
          <button type="button" className="catalog-gallery-media protected-media" data-protected-media onClick={() => open(image)} aria-label={`View details for ${item.name}`}>
            <Image src={image.src} alt={image.alt} fill draggable={false} className="object-cover" sizes="(min-width:1100px) 56vw,(min-width:700px) 60vw,100vw" loading={spreadIndex === 0 && index === 0 ? 'eager' : 'lazy'} />
            <span className="media-watermark" aria-hidden="true">WOODWEY</span>
          </button>
          <div className="catalog-gallery-actions"><button type="button" onClick={() => open(image)}>View Details <ArrowUpRight size={16} /></button><button type="button" onClick={() => toggle(item.id)} aria-label={`${isSelected ? 'Remove' : 'Add'} ${item.name} ${isSelected ? 'from' : 'to'} Selection`} className={isSelected ? 'is-selected' : ''}>{isSelected ? <Check size={15} /> : <span aria-hidden="true">+</span>}{isSelected ? 'Selected' : 'Add to Selection'}</button></div>
        </article>
      })}</div>)}</div> : <div className="catalog-empty"><h2>No matching references.</h2><p>Try another collection or a broader search.</p></div>}
      {limit < filtered.length && <div className="catalog-load-more"><button type="button" onClick={() => setLimit(value => value + 9)}>Load more images</button></div>}
    </section>

    {active && createPortal(<ProductDetail item={active.item} initialImage={active.image} mediaIndex={activeMedia} setMediaIndex={setActiveMedia} selected={selected.includes(active.item.id)} onToggle={() => toggle(active.item.id)} onClose={() => setActive(null)} />, document.body)}
  </>
}

function ProductDetail({ item, initialImage, mediaIndex, setMediaIndex, selected, onToggle, onClose }: { item: CatalogItem; initialImage: string; mediaIndex: number; setMediaIndex: (value: number) => void; selected: boolean; onToggle: () => void; onClose: () => void }) {
  const images = [initialImage, ...item.images.filter(src => src !== initialImage)]
  const media: DetailMedia[] = [...images.map((src, index) => ({ type: 'image' as const, src, label: `${item.name} view ${index + 1}` })), ...item.videos.map(video => ({ type: 'video' as const, src: video.src, poster: video.poster, label: video.title }))]
  const current = media[mediaIndex]
  const move = (direction: number) => setMediaIndex((mediaIndex + direction + media.length) % media.length)
  useEffect(() => {
    const navigate = (event: KeyboardEvent) => { if (event.key === 'ArrowLeft') move(-1); if (event.key === 'ArrowRight') move(1) }
    addEventListener('keydown', navigate)
    return () => removeEventListener('keydown', navigate)
  })
  return <div className="catalog-detail" role="dialog" aria-modal="true" aria-label={`${item.name} details`}><header><div><p>{item.category} · {item.subcategory}</p><strong>{item.name}</strong></div><button onClick={onClose} aria-label="Close product details" autoFocus><X /></button></header><div className="catalog-detail-layout"><div className="catalog-detail-gallery"><div className="catalog-detail-stage protected-media wm-b" data-protected-media>{current.type === 'image' ? <Image src={current.src} alt={current.label} fill draggable={false} className="object-contain" sizes="(min-width:900px) 68vw,100vw" priority /> : <SmartVideo key={current.src} src={current.src} poster={current.poster} className="h-full w-full object-contain" />}<span className="media-watermark" aria-hidden="true">WOODWEY</span>{media.length > 1 && <><button onClick={() => move(-1)} className="catalog-detail-prev" aria-label="Previous media"><ArrowLeft /></button><button onClick={() => move(1)} className="catalog-detail-next" aria-label="Next media"><ArrowRight /></button></>}</div><div className="catalog-thumbnails no-scrollbar">{media.map((entry, index) => <button key={`${entry.src}-${index}`} onClick={() => setMediaIndex(index)} className={mediaIndex === index ? 'active' : ''} aria-label={`View ${entry.label}`} data-protected-media>{entry.type === 'image' ? <Image src={entry.src} alt="" fill draggable={false} className="object-cover" sizes="96px" /> : <><Image src={entry.poster} alt="" fill draggable={false} className="object-cover" sizes="96px" /><span><Video size={13} /></span></>}</button>)}</div></div><aside className="catalog-detail-copy"><p className="eyebrow">{item.metadata.collection} collection</p><h2>{item.name}</h2><p className="catalog-detail-description">{item.description}</p><div className="catalog-detail-meta"><div><span>Designed for</span><p>{item.spaces.join(' · ')}</p></div><div><span>Project specification</span><p>{item.metadata.specification}</p></div></div><p className="catalog-made-note">Made to order in Lagos, Nigeria. Final dimensions, finishes and timing are developed for each project.</p><div className="catalog-detail-actions"><button onClick={onToggle} className="catalog-primary-action">{selected ? <Check size={17} /> : <span>+</span>}{selected ? 'Added to Selection' : 'Add to Selection'}</button><Link href="/#contact" onClick={onClose} className="catalog-secondary-action">Request a Quote <ArrowUpRight size={17} /></Link></div></aside></div></div>
}
