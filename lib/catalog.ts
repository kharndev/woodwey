import data from './catalog-data.json'

export const catalogCategories = ['All','Home','Interiors','Corporate','Office','Custom','Metal Works'] as const
export type CatalogCategory = Exclude<(typeof catalogCategories)[number], 'All'>
export type CatalogVideo = { src:string; poster:string; title:string }
export type CatalogItem = {
  id:string
  name:string
  category:CatalogCategory
  subcategory:string
  spaces:string[]
  description:string
  images:string[]
  videos:CatalogVideo[]
  featured:boolean
  ratio:'portrait'|'landscape'|'square'
  metadata:{ collection:string; specification:string }
}

export const catalog = data as CatalogItem[]

export const categoryStories:Record<CatalogCategory,{title:string;description:string;image:string}> = {
  Home:{title:'Furniture for living well.',description:'Residential furniture, dining and fitted storage.',image:'/images/IMG-20260813-WA0162.jpg'},
  Interiors:{title:'Designed around the space.',description:'Fitted systems and complete interior environments.',image:'/images/IMG-20260813-WA0146.jpg'},
  Corporate:{title:'Made for shared decisions.',description:'Boardrooms, reception and executive environments.',image:'/images/IMG-20260813-WA0151.jpg'},
  Office:{title:'A more composed work day.',description:'Office furniture and adaptable workspace solutions.',image:'/images/IMG-20260813-WA0134.jpg'},
  Custom:{title:'Made to measure.',description:'One-off pieces resolved for a particular place.',image:'/images/IMG-20260813-WA0135.jpg'},
  'Metal Works':{title:'Architectural structure and detail.',description:'Gates and fabricated elements made with precision.',image:'/images/IMG-20260813-WA0059.jpg'},
}
