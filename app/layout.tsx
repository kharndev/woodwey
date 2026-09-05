import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Manrope } from 'next/font/google'
import { WhatsApp } from '@/components/site-shell'
import './globals.css'
import './premium.css'

const sans=Manrope({subsets:['latin'],variable:'--font-manrope'})
const serif=Cormorant_Garamond({subsets:['latin'],weight:['400','500','600'],variable:'--font-cormorant'})

export const metadata:Metadata={metadataBase:new URL('https://woodweyng.com'),title:{default:'WOODWEY — Furniture, Interiors & Metal Works',template:'%s — WOODWEY'},description:'Custom furniture manufacturing, architectural metalwork and complete interior solutions for homes, offices, schools and commercial spaces in Lagos, Nigeria.',icons:{icon:{url:'/logos/svg.svg',type:'image/svg+xml'}},robots:{index:true,follow:true},openGraph:{title:'WOODWEY — Furniture, Interiors & Metal Works',description:'Custom furniture, architectural metalwork and complete interiors, thoughtfully designed and proudly made in Nigeria.',url:'https://woodweyng.com',siteName:'WOODWEY',type:'website',images:[{url:'/images/IMG-20260813-WA0234.jpg',alt:'A completed Woodwey commercial interior'}]},twitter:{card:'summary_large_image',title:'WOODWEY — Furniture, Interiors & Metal Works',description:'Custom furniture, architectural metalwork and complete interiors, proudly made in Nigeria.',images:['/images/IMG-20260813-WA0234.jpg']}}
export const viewport:Viewport={themeColor:'#171512',colorScheme:'light',width:'device-width',initialScale:1}

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" data-scroll-behavior="smooth"><body id="main-content" className={`${sans.variable} ${serif.variable} font-sans antialiased`}>{children}<WhatsApp/>{process.env.NODE_ENV==='production'&&<Analytics/>}</body></html>}
