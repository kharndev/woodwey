import { Analytics } from '@vercel/analytics/next'
import type { Metadata,Viewport } from 'next'
import { Cormorant_Garamond,Manrope } from 'next/font/google'
import { WhatsApp } from '@/components/site-shell'
import './globals.css'
const sans=Manrope({subsets:['latin'],variable:'--font-manrope'});const serif=Cormorant_Garamond({subsets:['latin'],weight:['400','500','600'],variable:'--font-cormorant'})
export const metadata:Metadata={metadataBase:new URL('https://woodweyng.com'),title:{default:'WOODWEY — Furniture & Interior Solutions',template:'%s — WOODWEY'},description:'Premium custom furniture, interior fabrication and workspace solutions, designed and made in Nigeria.',icons:{icon:'/logos/png.png'},openGraph:{title:'WOODWEY',description:'Built for the spaces that matter.',type:'website'}}
export const viewport:Viewport={themeColor:'#171512',colorScheme:'light',width:'device-width',initialScale:1}
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body className={`${sans.variable} ${serif.variable} font-sans antialiased`}>{children}<WhatsApp/>{process.env.NODE_ENV==='production'&&<Analytics/>}</body></html>}
