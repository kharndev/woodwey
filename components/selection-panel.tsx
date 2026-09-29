'use client'

import Image from 'next/image'
import { FormEvent, useCallback, useEffect, useId, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, ArrowUpRight, BookmarkCheck, Check, LoaderCircle, Phone, X } from 'lucide-react'
import { catalog } from '@/lib/catalog'
import { saveSelection, useSelection } from '@/lib/selection'

const OPEN_SELECTION = 'woodwey:open-selection'
const phoneHref = 'tel:+2348032973402'
type Stage = 'selection' | 'project' | 'contact'
type Status = 'idle' | 'sending' | 'error' | 'success'
const emptyDetails = { name: '', phone: '', email: '', company: '' }

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
  const [stage, setStage] = useState<Stage>('selection')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState('')
  const [project, setProject] = useState('')
  const [details, setDetails] = useState(emptyDetails)
  const selected = useSelection()
  const titleId = useId()
  const descriptionId = useId()
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const previousFocus = useRef<HTMLElement | null>(null)
  const submitting = useRef(false)
  const completed = useRef(false)
  const items = selected.map(id => catalog.find(item => item.id === id)).filter((item): item is (typeof catalog)[number] => Boolean(item))

  const close = useCallback(() => {
    if (submitting.current) return
    setOpen(false)
    if (completed.current) {
      completed.current = false
      setStage('selection')
      setStatus('idle')
      setProject('')
      setDetails(emptyDetails)
      setError('')
    }
  }, [])

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
      if (event.key === 'Escape') close()
      if (event.key !== 'Tab') return
      const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), a[href]')
      if (!focusable?.length) return
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
  }, [open, close])

  useEffect(() => {
    if (open && status === 'success') requestAnimationFrame(() => closeRef.current?.focus())
  }, [open, status])

  const next = () => {
    if (!project.trim()) {
      setError('Please tell us what you would like Woodwey to create.')
      return
    }
    setError('')
    setStage('contact')
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting.current) return
    if (!items.length) {
      setError('Your selected references are no longer available. Please choose a piece from the catalog.')
      setStage('selection')
      return
    }
    if (!project.trim()) {
      setError('Please tell us what you would like Woodwey to create.')
      setStage('project')
      return
    }
    const name = details.name.trim()
    const phone = details.phone.trim()
    const email = details.email.trim()
    if (!name || !/^[+\d][\d\s().-]{6,}$/.test(phone) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter your name, a valid phone number and a valid email address.')
      return
    }

    submitting.current = true
    setStatus('sending')
    setError('')
    const payload = new FormData()
    payload.set('inquiryType', 'selection_project')
    payload.set('name', name)
    payload.set('phone', phone)
    payload.set('email', email)
    payload.set('company', details.company.trim())
    payload.set('projectDetails', project.trim())
    payload.set('selection', items.map(item => `${item.name} (${item.category}; reference ${item.id})`).join('\n'))
    try {
      const response = await fetch('/api/inquiry', { method: 'POST', body: payload })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'Your project details could not be sent. Please try again.')
      completed.current = true
      setStatus('success')
    } catch (reason) {
      setStatus('error')
      setError(reason instanceof Error ? reason.message : 'Your project details could not be sent. Please try again.')
    } finally {
      submitting.current = false
    }
  }

  if (!open) return null
  if (status === 'success') return <div className="drawer-backdrop selection-success-backdrop" role="presentation" onMouseDown={event => event.target === event.currentTarget && close()}>
    <div ref={dialogRef} className="selection-success-dialog" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId}>
      <button ref={closeRef} type="button" className="selection-close" onClick={close} aria-label="Close confirmation"><X /></button>
      <span className="selection-success-icon" aria-hidden="true"><Check /></span>
      <p className="eyebrow">Project enquiry received</p>
      <h2 id={titleId}>All Set</h2>
      <p id={descriptionId}>Your project information has been sent to Woodwey. We’ve received your selected references and project details, and our team will be in touch.</p>
      <div className="selection-call"><span>Need to speak with us now?</span><a href={phoneHref}><Phone size={17} aria-hidden="true" />Call Woodwey?</a></div>
      <button type="button" className="selection-continue" onClick={close}>Continue exploring</button>
    </div>
  </div>

  return <div className="drawer-backdrop" role="presentation" onMouseDown={event => event.target === event.currentTarget && close()}>
    <div ref={dialogRef} className="selection-drawer" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId}>
      <div className="selection-drawer-head"><div><p className="eyebrow">Project enquiry · {stage === 'selection' ? '01' : stage === 'project' ? '02' : '03'} / 03</p><h2 id={titleId}>{stage === 'selection' ? <>Your selected references <span>({items.length})</span></> : stage === 'project' ? 'Tell Us More About Your Project' : 'Your Details'}</h2></div><button ref={closeRef} type="button" onClick={close} disabled={status === 'sending'} aria-label="Close selection"><X /></button></div>
      <p id={descriptionId} className="selection-stage-intro">{stage === 'selection' ? 'Use these pieces as a starting point for your project.' : stage === 'project' ? 'Tell us what you have in mind in relation to the references you selected. You can describe what you need, the pieces you’re looking for, the space, or anything else that will help us understand your project.' : 'Tell us how to reach you about your project.'}</p>

      {stage === 'selection' ? <>
        <div className="selection-drawer-list">{items.length ? items.map(item => <div key={item.id} className="selection-drawer-item">
          <div data-protected-media><Image src={item.images[0]} alt="" width={88} height={108} draggable={false} /></div>
          <div><p>{item.name}</p><small>{item.category} · {item.subcategory}</small></div>
          <button type="button" onClick={() => saveSelection(selected.filter(id => id !== item.id))} aria-label={`Remove ${item.name}`}><X size={16} /></button>
        </div>) : <div className="selection-empty"><p>Your selection is waiting.</p><span>Save the pieces and spaces you want to discuss.</span></div>}</div>
        {items.length > 0 && <button type="button" onClick={() => { setError(''); setStage('project') }} className="catalog-primary-action selection-quote">Tell Us About Your Project <ArrowUpRight size={17} /></button>}
        <button type="button" onClick={close} className="selection-continue">Continue browsing</button>
      </> : <>
        <div className="selection-reference-summary"><span>Your selected references</span><p>{items.map(item => item.name).join(' · ') || 'No references selected'}</p><button type="button" onClick={() => { setError(''); setStage('selection') }}>Edit selection</button></div>
        {stage === 'project' ? <>
          <label className="selection-field selection-project-field"><span>What would you like us to create for your project?</span><textarea value={project} onChange={event => { setProject(event.target.value); setError('') }} rows={8} required placeholder="Tell us about what you need, the pieces you’re interested in, your space, quantities, preferred materials, dimensions, or any other details you’d like us to know…" /></label>
          {error && <p className="selection-error" role="alert">{error}</p>}
          <div className="selection-stage-actions"><button type="button" className="selection-back" onClick={() => { setError(''); setStage('selection') }}><ArrowLeft size={17} />Back</button><button type="button" className="catalog-primary-action" onClick={next}>Next <ArrowRight size={17} /></button></div>
        </> : <form className="selection-contact-form" onSubmit={submit}>
          <label className="selection-field"><span>Name</span><input autoComplete="name" value={details.name} onChange={event => { setDetails({ ...details, name: event.target.value }); setError('') }} required /></label>
          <label className="selection-field"><span>Phone Number</span><input type="tel" inputMode="tel" autoComplete="tel" value={details.phone} onChange={event => { setDetails({ ...details, phone: event.target.value }); setError('') }} required /></label>
          <label className="selection-field"><span>Email</span><input type="email" autoComplete="email" value={details.email} onChange={event => { setDetails({ ...details, email: event.target.value }); setError('') }} required /></label>
          <label className="selection-field"><span>Company Name <small>(optional)</small></span><input autoComplete="organization" value={details.company} onChange={event => { setDetails({ ...details, company: event.target.value }); setError('') }} /></label>
          {error && <p className="selection-error" role="alert">{error}</p>}
          <div className="selection-stage-actions"><button type="button" className="selection-back" onClick={() => { setError(''); setStage('project') }} disabled={status === 'sending'}><ArrowLeft size={17} />Back</button><button type="submit" className="catalog-primary-action" disabled={status === 'sending'}>{status === 'sending' ? <><LoaderCircle className="spin" size={17} />Sending…</> : <>Send Project Details <ArrowUpRight size={17} /></>}</button></div>
        </form>}
      </>}
    </div>
  </div>
}
