import { Header, Footer, Eyebrow } from '@/components/site-shell'
import { CatalogExperience } from '@/components/catalog-experience'

export const metadata = { title: 'Catalog — WOODWEY', description: 'Explore custom furniture references by WOODWEY.' }

export default function CatalogPage(){
  return <main><Header/><section className="px-5 pb-20 pt-36 md:px-10 md:pt-44"><div className="mx-auto max-w-[1600px]"><Eyebrow>Furniture library</Eyebrow><div className="mb-20 flex flex-col gap-7 md:flex-row md:items-end md:justify-between"><h1 className="max-w-4xl text-balance font-serif text-6xl leading-none md:text-8xl">Find the beginning of your space.</h1><p className="max-w-md leading-relaxed text-muted-foreground">Browse forms, materials and possibilities—not off-the-shelf products. Select what resonates and we&apos;ll shape it for your project.</p></div><CatalogExperience/></div></section><Footer/></main>
}
