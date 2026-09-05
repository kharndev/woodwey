import Image from 'next/image'
import { Download } from 'lucide-react'
import { CatalogExperience } from '@/components/catalog-experience'
import { Eyebrow, Footer, Header } from '@/components/site-shell'

export const metadata={title:'Furniture & Metal Works Catalogue',description:'Explore Woodwey custom furniture, office furniture, fitted interiors, workspace systems and architectural metalwork made in Lagos, Nigeria.'}

export default function CatalogPage(){return <main className="page-enter"><Header/><section className="catalog-hero"><Image src="/images/IMG-20260813-WA0144.jpg" alt="A refined Woodwey fitted corporate interior" fill priority className="object-cover" sizes="100vw"/><div className="catalog-hero-shade"/><div className="shell catalog-hero-content"><Eyebrow>The Woodwey collection</Eyebrow><div className="catalog-hero-grid"><h1>Made for<br/>{' '}the way life happens.</h1><div><p>A considered library of custom furniture, fitted interiors and architectural metalwork—designed and manufactured in Lagos, Nigeria.</p><a href="/downloads/Woodwey-E-Catalogue-2026.pdf" download className="catalog-download"><Download/>Download PDF catalogue</a></div></div></div></section><div className="shell"><CatalogExperience/></div><Footer/></main>}
