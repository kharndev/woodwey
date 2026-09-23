'use client'

import { FormEvent, useCallback, useEffect, useId, useRef, useState } from 'react'
import { ArrowUpRight, Check, LoaderCircle, X } from 'lucide-react'

const OPEN_CATALOG_REQUEST = 'woodwey:open-catalog-request'
const successMessage = 'Thank you. Your catalog request has been received. Woodwey will be in touch shortly.'

export function CatalogRequestButton({
  children = 'Request full catalog',
  className = '',
  compact = false,
}: {
  children?: React.ReactNode
  className?: string
  compact?: boolean
}) {
  return (
    <button
      type="button"
      className={`catalog-request-trigger ${compact ? 'is-compact' : ''} ${className}`.trim()}
      onClick={() => window.dispatchEvent(new Event(OPEN_CATALOG_REQUEST))}
    >
      <span>{children}</span>
      <i aria-hidden="true"><ArrowUpRight /></i>
    </button>
  )
}

type LeadType = 'Individual' | 'Representing a company'

export function CatalogRequestModal() {
  const [open, setOpen] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const [leadType, setLeadType] = useState<LeadType>('Individual')
  const [fields, setFields] = useState({ name: '', phone: '', email: '', company: '' })
  const titleId = useId()
  const descriptionId = useId()
  const closeRef = useRef<HTMLButtonElement>(null)
  const restoreFocusRef = useRef<HTMLElement | null>(null)

  const close = useCallback(() => {
    setOpen(false)
    setTimeout(() => restoreFocusRef.current?.focus(), 0)
    setStatus('idle')
    setFields({ name: '', phone: '', email: '', company: '' })
    setLeadType('Individual')
    setError('')
  }, [])

  useEffect(() => {
    const show = () => {
      restoreFocusRef.current = document.activeElement as HTMLElement | null
      setOpen(true)
    }
    window.addEventListener(OPEN_CATALOG_REQUEST, show)
    return () => window.removeEventListener(OPEN_CATALOG_REQUEST, show)
  }, [])

  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (event.key !== 'Tab') return
      const modal = document.querySelector<HTMLElement>('.catalog-request-dialog')
      const focusable = modal?.querySelectorAll<HTMLElement>('button:not([disabled]), input:not([disabled]), a[href]')
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)
    requestAnimationFrame(() => closeRef.current?.focus())
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [close, open])

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('sending')
    setError('')
    const payload = new FormData()
    payload.set('inquiryType', 'catalog_request')
    payload.set('name', fields.name.trim())
    payload.set('phone', fields.phone.trim())
    payload.set('email', fields.email.trim())
    payload.set('leadType', leadType)
    payload.set('company', fields.company.trim())
    payload.set('space', 'Catalog request')
    payload.set('need', 'Full catalog')
    payload.set('details', `${leadType}${fields.company.trim() ? ` — ${fields.company.trim()}` : ''}`)
    try {
      const response = await fetch('/api/inquiry', { method: 'POST', body: payload })
      const result = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(result.error || 'Your catalog request could not be delivered.')
      setStatus('success')
    } catch (reason) {
      setStatus('error')
      setError(reason instanceof Error ? reason.message : 'Your catalog request could not be delivered.')
    }
  }

  if (!open) return null
  return (
    <div className="catalog-request-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && close()}>
      <section className="catalog-request-dialog" role="dialog" aria-modal="true" aria-labelledby={titleId} aria-describedby={descriptionId}>
        <button ref={closeRef} type="button" className="catalog-request-close" onClick={close} aria-label="Close catalog request"><X /></button>
        {status === 'success' ? (
          <div className="catalog-request-success" role="status">
            <span aria-hidden="true"><Check /></span>
            <p className="eyebrow">Request received</p>
            <h2 id={titleId}>Thank you.</h2>
            <p id={descriptionId}>{successMessage}</p>
            <button type="button" className="catalog-request-secondary" onClick={close}>Continue exploring</button>
          </div>
        ) : (
          <>
            <p className="eyebrow">Controlled catalog access</p>
            <h2 id={titleId}>Request the full catalog</h2>
            <p id={descriptionId} className="catalog-request-intro">Tell us where to reach you. Our team will follow up with the appropriate catalog access.</p>
            <form className="catalog-request-form" onSubmit={submit}>
              <fieldset>
                <legend>I am</legend>
                <div className="catalog-request-choice">
                  {(['Individual', 'Representing a company'] as LeadType[]).map((value) => (
                    <label key={value}>
                      <input type="radio" name="leadType" value={value} checked={leadType === value} onChange={() => setLeadType(value)} />
                      <span>{value}</span>
                    </label>
                  ))}
                </div>
              </fieldset>
              <div className="catalog-request-grid">
                <label><span>Full name</span><input autoComplete="name" value={fields.name} onChange={(event) => setFields({ ...fields, name: event.target.value })} required /></label>
                <label><span>Phone number</span><input type="tel" inputMode="tel" autoComplete="tel" value={fields.phone} onChange={(event) => setFields({ ...fields, phone: event.target.value })} required /></label>
                <label><span>Email address</span><input type="email" autoComplete="email" value={fields.email} onChange={(event) => setFields({ ...fields, email: event.target.value })} required /></label>
                <label><span>Company name <small>(optional)</small></span><input autoComplete="organization" value={fields.company} onChange={(event) => setFields({ ...fields, company: event.target.value })} /></label>
              </div>
              {status === 'error' && <p className="catalog-request-error" role="alert">{error}</p>}
              <div className="catalog-request-actions">
                <button type="submit" className="catalog-request-submit" disabled={status === 'sending'}>
                  <span>{status === 'sending' ? 'Sending request' : 'Request full catalog'}</span>
                  <i aria-hidden="true">{status === 'sending' ? <LoaderCircle className="spin" /> : <ArrowUpRight />}</i>
                </button>
                <p>Woodwey will review your request and contact you directly. No automatic download is provided.</p>
              </div>
            </form>
          </>
        )}
      </section>
    </div>
  )
}
