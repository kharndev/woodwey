'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ArrowUpRight } from 'lucide-react'

const links = [
  ['Home', '/'], ['Catalog', '/catalog'], ['Projects', '/projects'], ['About', '/#about'], ['Contact', '/#contact'],
]

export function Header() {
  const [open, setOpen] = useState(false)
  return <header className="fixed inset-x-0 top-0 z-50 border-b border-white/15 bg-ink/85 text-ivory backdrop-blur-md">
    <div className="mx-auto flex h-20 max-w-[1600px] items-center justify-between px-5 md:px-10">
      <Link href="/" className="relative flex items-center" aria-label="Woodwey home"><img src="/woodwey-logo.svg" alt="Woodwey" className="h-14 w-28 rounded-sm bg-ivory object-contain px-1" /></Link>
      <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
        {links.map(([label, href]) => <Link key={label} href={href} className="text-sm tracking-wide text-ivory/75 transition hover:text-ivory">{label}</Link>)}
        <Link href="/#contact" className="border border-orange px-5 py-3 text-sm text-ivory transition hover:bg-orange">Request a quote</Link>
      </nav>
      <button onClick={() => setOpen(!open)} className="p-2 md:hidden" aria-expanded={open} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
    </div>
    {open && <nav aria-label="Mobile" className="flex min-h-[calc(100vh-5rem)] flex-col justify-center gap-6 bg-ink px-7 pb-20">
      {links.map(([label, href], i) => <Link key={label} onClick={() => setOpen(false)} href={href} className="font-serif text-5xl text-ivory"><span className="mr-4 font-sans text-xs text-orange">0{i + 1}</span>{label}</Link>)}
    </nav>}
  </header>
}

export function Footer() {
  return <footer className="bg-ink px-5 py-12 text-ivory md:px-10"><div className="mx-auto flex max-w-[1600px] flex-col gap-8 border-t border-white/15 pt-8 md:flex-row md:items-end md:justify-between"><div><p className="font-serif text-4xl">Spaces, considered.</p><p className="mt-3 text-sm text-ivory/55">Custom furniture & interior solutions · Nigeria</p></div><div className="flex gap-6 text-sm"><a href="mailto:hello@woodweyng.com">hello@woodweyng.com</a><a href="https://wa.me/2340000000000" target="_blank" rel="noreferrer" className="flex items-center gap-1">WhatsApp <ArrowUpRight size={14} /></a></div></div></footer>
}

export function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.22em] text-muted-foreground before:block before:h-px before:w-8 before:bg-orange">{children}</p> }
