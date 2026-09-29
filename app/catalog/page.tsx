import Image from 'next/image'
import { BackgroundMotif } from '@/components/background-motif'
import { CatalogExperience } from '@/components/catalog-experience'
import { HeroTerms } from '@/components/hero-terms'
import { Eyebrow, Footer, Header } from '@/components/site-shell'

export const metadata={title:'Furniture & Metal Works Catalog',description:'Explore Woodwey custom furniture, office furniture, fitted interiors and architectural metalwork made in Lagos, Nigeria.'}

export default function CatalogPage(){return <main className="page-enter"><Header/><section className="catalog-hero" data-protected-media><Image src="/images/IMG-20260813-WA0144.jpg" alt="A refined Woodwey fitted corporate interior" fill loading="eager" fetchPriority="high" draggable={false} className="object-cover" sizes="100vw"/><div className="catalog-hero-shade"/><BackgroundMotif variant="joinery" className="catalog-hero-motif"/><div className="shell catalog-hero-content"><Eyebrow>The Woodwey collection</Eyebrow><div className="catalog-hero-grid"><HeroTerms/></div></div></section><div className="shell"><CatalogExperience/></div><Footer/></main>}
