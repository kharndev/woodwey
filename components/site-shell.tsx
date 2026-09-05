'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ArrowUpRight, Menu, MessageCircle, X } from 'lucide-react'

const links=[['Home','/'],['Catalog','/catalog'],['Projects','/projects'],['Request a Quote','/#contact']]
const socials=[['Instagram',process.env.NEXT_PUBLIC_INSTAGRAM_URL],['Facebook',process.env.NEXT_PUBLIC_FACEBOOK_URL],['LinkedIn',process.env.NEXT_PUBLIC_LINKEDIN_URL]].filter((x):x is [string,string]=>Boolean(x[1]))

export function Header(){
  const [open,setOpen]=useState(false)
  const [scrolled,setScrolled]=useState(false)
  const [count,setCount]=useState(0)
  const pathname=usePathname()
  useEffect(()=>{const sync=()=>setScrolled(scrollY>20);sync();addEventListener('scroll',sync,{passive:true});return()=>removeEventListener('scroll',sync)},[])
  useEffect(()=>{const sync=()=>{try{setCount(JSON.parse(localStorage.getItem('woodwey-selection')||'[]').length)}catch{setCount(0)}};sync();addEventListener('woodwey-selection',sync);return()=>removeEventListener('woodwey-selection',sync)},[])
  useEffect(()=>{if(!open)return;const close=(event:KeyboardEvent)=>event.key==='Escape'&&setOpen(false);document.body.style.overflow='hidden';addEventListener('keydown',close);return()=>{document.body.style.overflow='';removeEventListener('keydown',close)}},[open])
  const solid=scrolled||open||pathname!=='/'
  return <header className={`site-header ${solid?'is-scrolled':''}`}><a href="#main-content" className="skip-link">Skip to content</a><div className="shell header-inner"><Link href="/" aria-label="Woodwey home" className="brand-mark"><Image src="/logos/svg.svg" alt="Woodwey" width={184} height={78} priority/></Link><nav className="desktop-nav" aria-label="Primary">{links.slice(0,3).map(([label,href])=><Link key={label} href={href} aria-current={pathname===href?'page':undefined}>{label}</Link>)}{count>0&&<Link href="/catalog" className="selection-nav">Selection <b>{count}</b></Link>}<ButtonLink href="/#contact" compact>Request a quote</ButtonLink></nav><button className="menu-toggle" onClick={()=>setOpen(!open)} aria-controls="mobile-navigation" aria-expanded={open} aria-label={open?'Close menu':'Open menu'}>{open?<X/>:<Menu/>}</button></div>{open&&<nav id="mobile-navigation" className="mobile-menu" aria-label="Mobile">{links.map(([label,href],index)=><Link key={label} href={href} onClick={()=>setOpen(false)}><small>0{index+1}</small><span>{label}</span><ArrowUpRight/></Link>)}{count>0&&<Link href="/catalog" onClick={()=>setOpen(false)}><small>+</small><span>My selection ({count})</span><ArrowUpRight/></Link>}</nav>}</header>
}

export function ButtonLink({href,children,tone='dark',variant='fill',compact=false}:{href:string;children:React.ReactNode;tone?:'dark'|'light';variant?:'fill'|'outline';compact?:boolean}){return <Link href={href} className={`ww-button ${tone==='light'?'on-dark':''} ${variant==='outline'?'outline':''} ${compact?'compact':''}`}><span>{children}</span><i><ArrowUpRight/></i></Link>}

export function Footer(){return <footer className="site-footer"><div className="footer-watermark">WOODWEY</div><div className="shell footer-content"><div className="footer-top"><div><Image src="/logos/svg.svg" alt="Woodwey" width={190} height={84} className="footer-logo"/><p className="footer-statement">Furniture, interiors and metalwork<br/>made for real life.</p></div><div className="footer-columns"><FooterColumn title="Explore" links={links}/><FooterColumn title="Company" links={[['About Woodwey','/#about'],...socials]}/><div><p className="footer-title">Visit & contact</p><p className="footer-contact">Lagos, Nigeria<br/><a href="mailto:hello@woodweyng.com">hello@woodweyng.com</a><br/><a href="tel:+2348032973402">+234 803 297 3402</a><br/><a href="https://wa.me/2348032973402" target="_blank" rel="noreferrer">Talk to Woodwey</a></p></div></div></div><div className="footer-bottom"><p>© {new Date().getFullYear()} Woodwey Furniture & Metal Works Ltd.</p><p>Proudly designed and made in Nigeria.</p></div></div></footer>}

function FooterColumn({title,links}:{title:string;links:string[][]}){return <div><p className="footer-title">{title}</p><div className="footer-links">{links.map(([label,href])=><Link key={label} href={href}>{label}</Link>)}</div></div>}

export function WhatsApp(){return <a className="whatsapp" href="https://wa.me/2348032973402?text=Hello%20Woodwey%2C%20I%27d%20like%20to%20discuss%20a%20furniture%2C%20interior%20or%20metalwork%20project." target="_blank" rel="noreferrer" aria-label="Talk to Woodwey on WhatsApp"><MessageCircle/><span>Talk to Woodwey</span></a>}
export function Eyebrow({children}:{children:React.ReactNode}){return <p className="eyebrow">{children}</p>}
export function TextLink({href,children}:{href:string;children:React.ReactNode}){return <ButtonLink href={href} variant="outline">{children}</ButtonLink>}
