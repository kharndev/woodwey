import Image from 'next/image'
import { BackgroundMotif } from '@/components/background-motif'
import { CatalogExperience } from '@/components/catalog-experience'
import { CatalogRequestButton } from '@/components/catalog-request'
import { Eyebrow, Footer, Header } from '@/components/site-shell'

export const metadata={title:'Furniture & Metal Works Catalog',description:'Explore Woodwey custom furniture, office furniture, fitted interiors and architectural metalwork made in Lagos, Nigeria.'}

export default function CatalogPage(){return <main className="page-enter"><Header/><section className="catalog-hero" data-protected-media><Image src="/images/IMG-20260813-WA0144.jpg" alt="A refined Woodwey fitted corporate interior" fill priority draggable={false} className="object-cover" sizes="100vw"/><span className="media-watermark wm-c" aria-hidden="true">WOODWEY</span><div className="catalog-hero-shade"/><BackgroundMotif variant="joinery" className="catalog-hero-motif"/><div className="shell catalog-hero-content"><Eyebrow>The Woodwey collection</Eyebrow><div className="catalog-hero-grid"><h1>Made for the way<br/>{' '}life happens.</h1><div className="catalog-hero-action"><CatalogRequestButton>Request full catalog</CatalogRequestButton><p>Controlled access for clients, specifiers and project teams.</p></div></div></div></section><div className="shell"><CatalogExperience/></div><Footer/></main>}
