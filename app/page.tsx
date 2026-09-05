import Image from 'next/image'
import Link from 'next/link'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { BackgroundMotif } from '@/components/background-motif'
import { Footer, Header, ButtonLink, Eyebrow } from '@/components/site-shell'
import { InquiryForm } from '@/components/inquiry-form'
import { StoryCarousel, type StorySlide } from '@/components/home-carousel'

const image=(n:string)=>`/images/IMG-20260813-WA${n}.jpg`
const collections=[
  {name:'Home',copy:'Furniture for the rituals of everyday life.',image:'0162'},
  {name:'Office',copy:'Focused rooms with a quieter confidence.',image:'0134'},
  {name:'Education',copy:'Durable spaces made for discovery.',image:'0178'},
  {name:'Commercial',copy:'Distinctive interiors that welcome people in.',image:'0233'},
]
const aboutImages=[
  ['0137','Warm timber furniture detail'],['0162','Finished dining furniture'],['0196','Custom bedroom storage'],['0146','Architectural media wall'],
  ['0208','Contemporary office installation'],['0059','Wide custom metal entrance gate'],['0151','Bespoke boardroom furniture'],['0183','Custom collaborative table'],
  ['0116','Full-height fitted wardrobe'],['0233','Commercial reception interior'],['0178','Furniture for a learning space'],['0055','Finished louvred metal entrance gate'],
]
const work:StorySlide[]=[
  {title:'Executive Suite',category:'Corporate',description:'A composed setting for focused leadership.',image:image('0134'),href:'/projects'},
  {title:'Gathered Living',category:'Residential',description:'Warm timber and furniture shaped for daily life.',image:image('0165'),href:'/projects'},
  {title:'Learning Together',category:'Education',description:'Practical furniture built for shared discovery.',image:image('0178'),href:'/projects'},
  {title:'The Meeting Table',category:'Workspace',description:'A clear centre for collaborative work.',image:image('0183'),href:'/projects'},
  {title:'First Impression',category:'Commercial',description:'An arrival space with material presence.',image:image('0233'),href:'/projects'},
  {title:'Made to Secure',category:'Metal Works',description:'A tailored entrance defined by rhythm and strength.',image:image('0059'),href:'/projects'},
  {title:'Living Wall',category:'Interiors',description:'Storage, display and technology composed as one.',image:image('0146'),href:'/projects'},
]
const details:StorySlide[]=[
  {title:'Edge & Grain',category:'Material study',description:'Careful alignment brings calm to every surface.',image:image('0166'),href:'/catalog'},
  {title:'Quiet Joinery',category:'Craftsmanship',description:'Connections resolved to feel effortless.',image:image('0137'),href:'/catalog'},
  {title:'Integrated Detail',category:'Function',description:'Power, storage and hardware disappear into the piece.',image:image('0207'),href:'/catalog'},
  {title:'Meeting Edge',category:'Furniture detail',description:'A substantial surface resolved with visual ease.',image:image('0106'),href:'/catalog'},
  {title:'Gathered Grain',category:'Texture',description:'Timber selected to bring warmth and continuity.',image:image('0183'),href:'/catalog'},
  {title:'Material Rhythm',category:'Interior detail',description:'Repeated lines give a complete wall its presence.',image:image('0146'),href:'/catalog'},
  {title:'Made to Fit',category:'Custom storage',description:'Every proportion belongs to its room.',image:image('0116'),href:'/catalog'},
  {title:'Dining Detail',category:'Furniture detail',description:'A quiet profile made for daily gathering.',image:image('0162'),href:'/catalog'},
  {title:'Louvred Steel',category:'Metal detail',description:'Strength expressed through controlled horizontal geometry.',image:image('0055'),href:'/catalog'},
  {title:'Gate Rhythm',category:'Metal Works',description:'Spacing and finish make security part of the architecture.',image:image('0072'),href:'/catalog'},
  {title:'Soft Structure',category:'Upholstery',description:'Comfort shaped into a controlled silhouette.',image:image('0175'),href:'/catalog'},
]

export default function Home(){return <main className="page-enter"><Header/>
  <section className="hero"><Image src={image('0234')} alt="A finished Woodwey corporate interior in warm timber" fill priority className="object-cover" sizes="100vw"/><div className="hero-shade"/><BackgroundMotif className="hero-motif"/><div className="shell hero-layout"><div className="hero-copy"><p className="hero-kicker">Woodwey · Lagos, Nigeria</p><h1>Custom furniture.<br/>{' '}<em>Complete spaces.</em></h1><p className="hero-intro">Furniture, interior solutions and architectural metalwork for homes, offices, schools and commercial spaces—designed and made in Nigeria.</p><p className="hero-services">Furniture <i/> Interiors <i/> Metal Works</p><div className="hero-actions"><ButtonLink href="/projects">Explore our work</ButtonLink><ButtonLink href="#contact" tone="light">Start a project</ButtonLink></div></div><Link href="/catalog" className="hero-discovery"><span>Explore the collection</span><strong>Furniture made<br/>for your space.</strong><ArrowUpRight/></Link><a href="#what-we-create" aria-label="Scroll to what we create" className="hero-scroll"><ArrowDown/></a></div></section>

  <section id="what-we-create" className="section collection-section"><div className="shell"><div className="section-heading"><div><Eyebrow>What we create</Eyebrow><h2 className="display">Spaces, considered<br/>from every angle.</h2></div><p>From one defining piece to a complete interior, Woodwey brings design, manufacturing and installation together.</p></div><div className="collection-grid">{collections.map((item,index)=><Link href="/catalog" className="collection-card" key={item.name}><Image src={image(item.image)} alt={`${item.name} furniture and interiors by Woodwey`} fill className="object-cover" sizes="(min-width:900px) 25vw,82vw"/><span className="collection-overlay"/><small>0{index+1}</small><div><h3>{item.name}</h3><p>{item.copy}</p><span>Discover <ArrowUpRight size={15}/></span></div></Link>)}</div></div></section>

  <section id="about" className="section about-section"><BackgroundMotif variant="joinery" className="about-motif"/><div className="shell"><div className="about-lead"><Eyebrow>About Woodwey</Eyebrow><h2 className="display">Made here.<br/><span>Designed to belong anywhere.</span></h2><div><p className="body-lg">Woodwey Furniture & Metal Works Ltd. is a Lagos-based company creating custom furniture, architectural metalwork and interior solutions for the spaces where people live, work, learn and gather.</p><p>Our designers, makers and installers work as one team—from early spatial thinking to fabrication and final installation. Each project is shaped around purpose, material and long-term use.</p><div className="button-row"><ButtonLink href="/projects">View our work</ButtonLink><ButtonLink href="/catalog" variant="outline">Explore collection</ButtonLink></div></div></div><div className="about-collage">{aboutImages.map(([src,alt],index)=><div key={src} className={`about-image about-image-${index+1}`}><Image src={image(src)} alt={alt} fill className="object-cover" sizes="(min-width:1200px) 28vw,(min-width:700px) 44vw,48vw"/></div>)}</div></div></section>

  <section className="section capabilities-section"><BackgroundMotif variant="metal" className="capabilities-motif"/><div className="shell"><div className="capabilities-head"><div><Eyebrow>Furniture & Metal Works</Eyebrow><h2 className="display">One workshop.<br/><span>Complete spaces.</span></h2></div><p>Wood and metal are developed together when the project calls for it—giving Woodwey tighter control over form, finish and installation.</p></div><div className="capabilities-layout"><div className="capabilities-list">{[
    ['01','Furniture','Custom pieces, fitted storage and workspace systems made around the people who use them.'],
    ['02','Interiors','Material, furniture and installation coordinated as one complete spatial response.'],
    ['03','Metal Works','Custom gates and fabricated architectural elements made with strength and precision.'],
  ].map(([number,title,copy])=><article key={number}><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div><div className="metal-collage"><div className="metal-image metal-image-main"><Image src={image('0059')} alt="Wide modern entrance gate fabricated by Woodwey" fill className="object-cover" sizes="(min-width:900px) 48vw,100vw"/></div><div className="metal-image metal-image-top"><Image src={image('0055')} alt="Finished louvred metal entrance gate" fill className="object-cover" sizes="(min-width:900px) 22vw,45vw"/></div><div className="metal-image metal-image-bottom"><Image src={image('0072')} alt="Finished ribbed sliding gate" fill className="object-cover" sizes="(min-width:900px) 22vw,45vw"/></div></div></div><div className="capabilities-action"><ButtonLink href="/catalog" tone="light">Explore Metal Works</ButtonLink></div></div></section>

  <section className="section work-section"><div className="shell"><div className="section-heading light"><div><Eyebrow>Selected work</Eyebrow><h2 className="display">Spaces with<br/>a point of view.</h2></div><p>A moving archive of places shaped through furniture, metal, material and thoughtful execution.</p></div><StoryCarousel items={work} label="Selected Woodwey projects"/><ButtonLink href="/projects" tone="light">Explore all projects</ButtonLink></div></section>

  <section className="section detail-section"><BackgroundMotif variant="joinery" className="detail-motif"/><div className="shell"><div className="section-heading"><div><Eyebrow>Object of interest</Eyebrow><h2 className="display">The detail<br/>makes the piece.</h2></div><p>Look closer. Grain direction, edge profiles, upholstery, welds and hardware are considered with the same care as the whole room.</p></div><StoryCarousel items={details} label="Furniture and metalwork details"/></div></section>

  <section className="section process-section"><div className="shell"><Eyebrow>How we work</Eyebrow><div className="process-intro"><h2 className="display">One team.<br/><span>From brief to room.</span></h2><p>Design, manufacturing and installation stay connected throughout the project.</p></div><div className="process-grid">{[['01','Listen','Understanding your space, needs and intent.','0233'],['02','Make','Turning the brief into carefully crafted furniture and metalwork.','0166'],['03','Install','Bringing the finished work into the space.','0208']].map(([number,title,copy,media])=><article className="process-card" key={number}><div className="process-media"><Image src={image(media)} alt={`${title}: ${copy}`} fill className="object-cover" sizes="(min-width:900px) 33vw,100vw"/></div><div><span>{number}</span><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div></section>

  <section id="contact" className="contact-section"><div className="contact-atmosphere"/><div className="shell contact-layout"><div className="contact-copy"><Eyebrow>Begin a project</Eyebrow><h2 className="display">Tell us about<br/>your space.</h2><p>Share the essentials first. We will ask only what we need, one considered step at a time.</p><div className="contact-note"><span>Before a conversation</span><a href="https://wa.me/2348032973402" target="_blank" rel="noreferrer">Talk to Woodwey</a></div></div><InquiryForm/></div></section><Footer/>
  </main>}
