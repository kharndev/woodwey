export type Category = 'Residential' | 'Office' | 'Corporate' | 'Education' | 'Hospitality' | 'Workspace' | 'Furniture' | 'Custom' | 'Metal Works'
export type MediaItem = { id:string; type:'image'|'video'; src:string; poster?:string; category:Category; title:string; description:string; featured?:boolean; ratio:'portrait'|'landscape'|'square' }
export { catalog, type CatalogItem } from './catalog'

const image=(n:string)=>`/images/IMG-20260813-WA${n}.jpg`
const video=(n:string)=>`/videos/VID-20260813-WA${n}.mp4`

export const projects=[
  {name:'Executive Suite',category:'Corporate',image:image('0134'),alt:'Custom executive office with warm timber furniture'},
  {name:'The Gathered Home',category:'Residential',image:image('0162'),alt:'Finished residential dining setting with custom Woodwey furniture'},
  {name:'Quiet Focus',category:'Office',image:image('0208'),alt:'Contemporary Woodwey workspace installation'},
  {name:'A Place to Learn',category:'Education',image:image('0178'),alt:'Durable custom furniture made for a learning space'},
]

export const projectMedia:MediaItem[]=[
  {id:'m1',type:'image',src:image('0134'),category:'Corporate',title:'Executive Suite',description:'Tailored furniture for focused leadership.',featured:true,ratio:'landscape'},
  {id:'m2',type:'image',src:image('0162'),category:'Residential',title:'Gathered Living',description:'A warm setting made for everyday life.',featured:true,ratio:'portrait'},
  {id:'m3',type:'image',src:image('0208'),category:'Office',title:'Quiet Focus',description:'A calmer way to work.',ratio:'landscape'},
  {id:'m4',type:'video',src:video('0243'),poster:image('0166'),category:'Custom',title:'Made to Measure',description:'From material to finished space.',ratio:'portrait'},
  {id:'m5',type:'image',src:image('0182'),category:'Workspace',title:'Working Landscape',description:'An adaptable workspace environment.',ratio:'portrait'},
  {id:'m6',type:'image',src:image('0106'),category:'Furniture',title:'Material Study',description:'Form, grain and considered detail.',ratio:'square'},
  {id:'m7',type:'image',src:image('0178'),category:'Education',title:'Learning Together',description:'Durable pieces for shared discovery.',ratio:'landscape'},
  {id:'m8',type:'image',src:image('0233'),category:'Corporate',title:'First Impression',description:'A custom reception statement.',featured:true,ratio:'portrait'},
  {id:'m9',type:'video',src:video('0262'),poster:image('0106'),category:'Furniture',title:'In the Detail',description:'Craft seen up close.',ratio:'landscape'},
  {id:'m10',type:'image',src:image('0165'),category:'Residential',title:'Dining Ritual',description:'A generous table for gathering.',ratio:'portrait'},
  {id:'m11',type:'image',src:image('0234'),category:'Hospitality',title:'Welcome In',description:'Furniture and atmosphere in balance.',featured:true,ratio:'landscape'},
  {id:'m12',type:'image',src:image('0195'),category:'Residential',title:'Soft Geometry',description:'Comfort shaped with intention.',ratio:'square'},
  {id:'m13',type:'image',src:image('0175'),category:'Furniture',title:'The Tailored Seat',description:'Upholstery with a precise silhouette.',ratio:'portrait'},
  {id:'m14',type:'image',src:image('0146'),category:'Custom',title:'Built Around You',description:'A one-off response to a singular brief.',ratio:'landscape'},
  {id:'m15',type:'image',src:image('0183'),category:'Workspace',title:'The Meeting Table',description:'A centre for collaborative work.',ratio:'landscape'},
  {id:'m16',type:'image',src:image('0151'),category:'Corporate',title:'Boardroom Study',description:'Material confidence at scale.',ratio:'portrait'},
  {id:'m17',type:'image',src:image('0137'),category:'Furniture',title:'Object and Grain',description:'A closer view of the making.',ratio:'square'},
  {id:'m18',type:'video',src:video('0257'),poster:image('0207'),category:'Custom',title:'Installation Day',description:'The final pieces coming together.',ratio:'portrait'},
  {id:'m19',type:'image',src:image('0196'),category:'Residential',title:'Room to Pause',description:'A comfortable composition for daily life.',ratio:'landscape'},
  {id:'m20',type:'image',src:image('0209'),category:'Office',title:'Shared Focus',description:'A composed setting for everyday work.',ratio:'portrait'},
  {id:'m21',type:'image',src:image('0059'),category:'Metal Works',title:'The Architectural Gate',description:'Security resolved as a confident part of the facade.',featured:true,ratio:'landscape'},
  {id:'m24',type:'image',src:image('0072'),category:'Metal Works',title:'Ribbed Entry',description:'A durable gate with a calm horizontal grain.',ratio:'landscape'},
  {id:'m27',type:'image',src:image('0055'),category:'Metal Works',title:'Dark Threshold',description:'A clean, robust gate tailored to its setting.',ratio:'landscape'},
  {id:'m28',type:'image',src:image('0144'),category:'Custom',title:'Wall in Relief',description:'Storage and display given architectural depth.',ratio:'landscape'},
  {id:'m29',type:'image',src:image('0120'),category:'Residential',title:'Private Storage',description:'Fitted joinery shaped around daily rituals.',ratio:'portrait'},
  {id:'m30',type:'image',src:image('0104'),category:'Office',title:'Leadership Table',description:'A precise surface for focus and conversation.',ratio:'square'},
]

export const projectCategories=['All','Residential','Office','Corporate','Education','Hospitality','Workspace','Furniture','Custom','Metal Works'] as const
