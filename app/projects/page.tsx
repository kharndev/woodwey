import Image from 'next/image'
import { Eyebrow, Footer, Header } from '@/components/site-shell'
import { ProjectsExperience } from '@/components/projects-experience'

export const metadata={title:'Furniture, Interiors & Metal Works Projects',description:'Explore Woodwey custom furniture, interior and architectural metalwork projects for homes, offices, education and commercial spaces.'}

export default function ProjectsPage(){return <main className="page-enter"><Header/><section className="projects-hero"><div className="projects-hero-media"><Image src="/images/IMG-20260813-WA0134.jpg" alt="Woodwey executive office interior" fill priority className="object-cover" sizes="(min-width:900px) 58vw,100vw"/></div><div className="projects-hero-copy"><Eyebrow>Project archive</Eyebrow><h1>Rooms with<br/>{' '}a life of their own.</h1><p>A visual archive of furniture, metalwork, material and finished spaces across residential, workplace, education and commercial projects.</p><span>Furniture · Interiors · Metal Works · Installation</span></div></section><section className="projects-section"><div className="shell-wide"><ProjectsExperience/></div></section><Footer/></main>}
