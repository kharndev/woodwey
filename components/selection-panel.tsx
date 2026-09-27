'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, BookmarkCheck, X } from 'lucide-react'
import { catalog } from '@/lib/catalog'
import { saveSelection, useSelection } from '@/lib/selection'

const OPEN_SELECTION = 'woodwey:open-selection'

export function SelectionTrigger({ onOpen }: { onOpen?: () => void }) {
  const selected = useSelection()
  return <button type="button" className={`header-selection ${selected.length ? 'has-selection' : ''}`} aria-label={`My Selection, ${selected.length} items`} onClick={() => { onOpen?.(); window.dispatchEvent(new Event(OPEN_SELECTION)) }}>
    <BookmarkCheck aria-hidden="true" />
    <span>Selection</span>
    <b aria-hidden="true">{selected.length}</b>
  </button>
}

export function SelectionPanel() {
  const [open, setOpen] = useState(false)
  const selected = useSelection()
  const closeRef = useRef<HTMLButtonElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const items = selected.map(id => catalog.find(item => item.id === id)).filter((item): item is (typeof catalog)[number] => Boolean(item))

  useEffect(() => {
    const show = () => {
      previousFocus.current = document.activeElement as HTMLElement | null
      setOpen(true)
    }
    window.addEventListener(OPEN_SELECTION, show)
    return () => window.removeEventListener(OPEN_SELECTION, show)
  }, [])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
      if (event.key !== 'Tab') return
      const focusable = document.querySelectorAll<HTMLElement>('.selection-drawer button:not([disabled]), .selection-drawer a[href]')
      if (!focusable.length) return
      if (event.shiftKey && document.activeElement === focusable[0]) {
        event.preventDefault()
        focusable[focusable.length - 1].focus()
      } else if (!event.shiftKey && document.activeElement === focusable[focusable.length - 1]) {
        event.preventDefault()
        focusable[0].focus()
      }
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
      previousFocus.current?.focus()
    }
  }, [open])

  if (!open) return null
  return <div className="drawer-backdrop" role="presentation" onMouseDown={event => event.target === event.currentTarget && setOpen(false)}>
    <div className="selection-drawer" role="dialog" aria-modal="true" aria-label="My Selection">
      <div className="selection-drawer-head"><div><p className="eyebrow">Project references</p><h2>My Selection <span>({items.length})</span></h2></div><button ref={closeRef} type="button" onClick={() => setOpen(false)} aria-label="Close selection"><X /></button></div>
      <div className="selection-drawer-list">{items.length ? items.map(item => <div key={item.id} className="selection-drawer-item">
        <div data-protected-media><Image src={item.images[0]} alt="" width={88} height={108} draggable={false} /></div>
        <div><p>{item.name}</p><small>{item.category} · {item.subcategory}</small></div>
        <button type="button" onClick={() => saveSelection(selected.filter(id => id !== item.id))} aria-label={`Remove ${item.name}`}><X size={16} /></button>
      </div>) : <div className="selection-empty"><p>Your selection is waiting.</p><span>Save the pieces and spaces you want to discuss.</span></div>}</div>
      {items.length > 0 && <Link href="/#contact" onClick={() => setOpen(false)} className="catalog-primary-action selection-quote">Request a Quote <ArrowUpRight size={17} /></Link>}
      <button type="button" onClick={() => setOpen(false)} className="selection-continue">Continue browsing</button>
    </div>
  </div>
}
