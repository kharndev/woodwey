import data from './catalog-data.json'

export const catalogCategories = ['All','Home','Office','Corporate','Dining','Workspace','Interiors','Custom','Metal Works'] as const
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
  Home:{title:'Furniture for living well.',description:'Fitted storage and considered pieces for the rooms that hold everyday life.',image:'/images/IMG-20260813-WA0120.jpg'},
  Office:{title:'A more composed workday.',description:'Desks, storage and complete rooms shaped around focused leadership.',image:'/images/IMG-20260813-WA0134.jpg'},
  Corporate:{title:'Made for shared decisions.',description:'Reception and meeting furniture with presence, clarity and purpose.',image:'/images/IMG-20260813-WA0151.jpg'},
  Dining:{title:'A place to gather.',description:'Tables and coordinated settings made for meals, meetings and long conversations.',image:'/images/IMG-20260813-WA0162.jpg'},
  Workspace:{title:'Systems that work beautifully.',description:'Adaptable workstations and technical surfaces planned around real teams.',image:'/images/IMG-20260813-WA0097.jpg'},
  Interiors:{title:'The room as one composition.',description:'Built-ins, fitted elements and furniture brought together from design to installation.',image:'/images/IMG-20260813-WA0146.jpg'},
  Custom:{title:'Made for one particular place.',description:'One-off responses to unusual dimensions, functions and ambitions.',image:'/images/IMG-20260813-WA0135.jpg'},
  'Metal Works':{title:'Made to secure and define.',description:'Custom gates and fabricated architectural elements built with precision and material confidence.',image:'/images/IMG-20260813-WA0059.jpg'},
}
