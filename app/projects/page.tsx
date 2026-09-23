import Image from 'next/image'
import { BackgroundMotif } from '@/components/background-motif'
import { Eyebrow, Footer, Header } from '@/components/site-shell'
import { ProjectsExperience } from '@/components/projects-experience'

export const metadata={title:'Furniture, Interiors & Metal Works Projects',description:'Explore Woodwey custom furniture, interior and architectural metalwork projects for homes, offices and commercial spaces.'}

export default function ProjectsPage(){return <main className="page-enter"><Header/><section className="projects-hero"><div className="projects-hero-media protected-media wm-c" data-protected-media><Image src="/images/IMG-20260813-WA0134.jpg" alt="Woodwey executive office interior" fill priority draggable={false} className="object-cover" sizes="(min-width:900px) 62vw,100vw"/><span className="media-watermark" aria-hidden="true">WOODWEY</span></div><div className="projects-hero-copy"><BackgroundMotif variant="joinery" className="projects-hero-motif"/><Eyebrow>Project archive</Eyebrow><h1>Rooms with a life<br/>{' '}of their own.</h1><span>Furniture · Interiors · Metal Works</span></div></section><section className="projects-section"><div className="shell-wide"><ProjectsExperience/></div></section><Footer/></main>}
