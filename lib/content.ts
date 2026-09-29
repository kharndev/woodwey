export type Category = 'Home' | 'Interiors' | 'Corporate' | 'Office' | 'Custom' | 'Metal Works'
export type MediaItem = { id:string; type:'image'|'video'; src:string; poster?:string; category:Category; title:string; description:string; featured?:boolean; ratio:'portrait'|'landscape'|'square' }
export { catalog, type CatalogItem } from './catalog'

const image=(n:string)=>`/images/IMG-20260813-WA${n}.jpg`
const video=(n:string)=>`/videos/VID-20260813-WA${n}.mp4`

export const projects=[
  {name:'Executive Suite',category:'Corporate',image:image('0134'),alt:'Custom executive office with warm timber furniture'},
  {name:'The Gathered Home',category:'Home',image:image('0165'),alt:'Finished Woodwey seating in a residential setting'},
  {name:'Quiet Focus',category:'Office',image:image('0208'),alt:'Contemporary Woodwey workspace installation'},
  {name:'A Place to Learn',category:'Interiors',image:image('0178'),alt:'Durable custom furniture made for a learning space'},
]

export const projectMedia:MediaItem[]=[
  {id:'m1',type:'image',src:image('0134'),category:'Corporate',title:'Executive Suite',description:'Tailored furniture for focused leadership.',featured:true,ratio:'landscape'},
  {id:'m2',type:'image',src:image('0165'),category:'Home',title:'Gathered Living',description:'A warm setting made for everyday life.',featured:true,ratio:'portrait'},
  {id:'m3',type:'image',src:image('0208'),category:'Office',title:'Quiet Focus',description:'A calmer way to work.',ratio:'landscape'},
  {id:'m4',type:'video',src:video('0243'),poster:image('0166'),category:'Custom',title:'Made to Measure',description:'From material to finished space.',ratio:'portrait'},
  {id:'m5',type:'image',src:image('0182'),category:'Office',title:'Working Landscape',description:'An adaptable workspace environment.',ratio:'portrait'},
  {id:'m6',type:'image',src:image('0088'),category:'Custom',title:'Material Study',description:'Form, grain and considered detail.',ratio:'square'},
  {id:'m7',type:'image',src:image('0048'),category:'Interiors',title:'Fitted Interior',description:'',ratio:'landscape'},
  {id:'m8',type:'image',src:image('0233'),category:'Corporate',title:'First Impression',description:'A custom reception statement.',featured:true,ratio:'portrait'},
  {id:'m9',type:'video',src:video('0262'),poster:image('0166'),category:'Custom',title:'In the Detail',description:'Craft seen up close.',ratio:'landscape'},
  {id:'m10',type:'image',src:image('0006'),category:'Home',title:'Timber Media Console',description:'Geometric storage for the living room.',ratio:'portrait'},
  {id:'m11',type:'image',src:image('0234'),category:'Interiors',title:'Welcome In',description:'Furniture and atmosphere in balance.',featured:true,ratio:'landscape'},
  {id:'m12',type:'image',src:image('0195'),category:'Home',title:'Soft Geometry',description:'Comfort shaped with intention.',ratio:'square'},
  {id:'m13',type:'image',src:image('0089'),category:'Custom',title:'Tailored Joinery',description:'',ratio:'portrait'},
  {id:'m14',type:'image',src:image('0146'),category:'Custom',title:'Built Around You',description:'A one-off response to a singular brief.',ratio:'landscape'},
  {id:'m15',type:'image',src:image('0183'),category:'Office',title:'The Meeting Table',description:'A centre for collaborative work.',ratio:'landscape'},
  {id:'m16',type:'image',src:image('0014'),category:'Corporate',title:'Boardroom Study',description:'',ratio:'portrait'},
  {id:'m17',type:'image',src:image('0137'),category:'Custom',title:'Object and Grain',description:'A closer view of the making.',ratio:'square'},
  {id:'m18',type:'video',src:video('0257'),poster:image('0207'),category:'Custom',title:'Installation Day',description:'The final pieces coming together.',ratio:'portrait'},
  {id:'m19',type:'image',src:image('0196'),category:'Home',title:'Room to Pause',description:'A comfortable composition for daily life.',ratio:'landscape'},
  {id:'m20',type:'image',src:image('0114'),category:'Office',title:'Shared Focus',description:'',ratio:'portrait'},
  {id:'m21',type:'image',src:image('0059'),category:'Metal Works',title:'The Architectural Gate',description:'Security resolved as a confident part of the facade.',featured:true,ratio:'landscape'},
  {id:'m24',type:'image',src:image('0072'),category:'Metal Works',title:'Ribbed Entry',description:'A durable gate with a calm horizontal grain.',ratio:'landscape'},
  {id:'m27',type:'image',src:image('0055'),category:'Metal Works',title:'Dark Threshold',description:'A clean, robust gate tailored to its setting.',ratio:'landscape'},
  {id:'m28',type:'image',src:image('0144'),category:'Custom',title:'Wall in Relief',description:'Storage and display given architectural depth.',ratio:'landscape'},
  {id:'m29',type:'image',src:image('0120'),category:'Home',title:'Private Storage',description:'Fitted joinery shaped around daily rituals.',ratio:'portrait'},
  {id:'m30',type:'image',src:image('0013'),category:'Office',title:'Leadership Table',description:'A precise surface for focus and conversation.',ratio:'square'},
  {id:'m31',type:'image',src:image('0012'),category:'Corporate',title:'Boardroom',description:'',ratio:'landscape'},
  {id:'m32',type:'image',src:image('0041'),category:'Interiors',title:'Timber Corridor',description:'',ratio:'portrait'},
  {id:'m33',type:'image',src:image('0077'),category:'Metal Works',title:'Metal Entry',description:'',ratio:'landscape'},
  {id:'m34',type:'image',src:image('0091'),category:'Home',title:'Fitted Kitchen',description:'',ratio:'portrait'},
  {id:'m35',type:'image',src:image('0105'),category:'Corporate',title:'Reception Desk',description:'',ratio:'landscape'},
  {id:'m36',type:'image',src:image('0111'),category:'Office',title:'Shared Workspace',description:'',ratio:'landscape'},
  {id:'m37',type:'image',src:image('0127'),category:'Home',title:'Fitted Wardrobes',description:'',ratio:'portrait'},
  {id:'m38',type:'image',src:image('0155'),category:'Interiors',title:'Timber Wall',description:'',ratio:'square'},
  {id:'m39',type:'image',src:image('0079'),category:'Metal Works',title:'Architectural Gate',description:'',ratio:'landscape'},
  {id:'m40',type:'image',src:image('0141'),category:'Office',title:'Composed Workspace',description:'',ratio:'portrait'},
  {id:'m41',type:'image',src:image('0162'),category:'Home',title:'Dining Setting',description:'',ratio:'landscape'},
  {id:'m42',type:'image',src:image('0196'),category:'Interiors',title:'Bedroom Joinery',description:'',ratio:'portrait'},
  {id:'m43',type:'image',src:image('0206'),category:'Office',title:'Dark Workroom',description:'',ratio:'landscape'},
  {id:'m44',type:'image',src:image('0236'),category:'Corporate',title:'Timber Feature Wall',description:'',ratio:'landscape'},
  {id:'m45',type:'image',src:image('0246'),category:'Office',title:'Open Office',description:'',ratio:'landscape'},
  {id:'m46',type:'image',src:image('0129'),category:'Custom',title:'Stair Storage',description:'',ratio:'portrait'},
  {id:'m47',type:'image',src:image('0056'),category:'Metal Works',title:'Fabricated Gate',description:'',ratio:'landscape'},
  {id:'m48',type:'image',src:image('0049'),category:'Interiors',title:'Fitted Hallway',description:'',ratio:'portrait'},
  {id:'m49',type:'image',src:image('0207'),category:'Custom',title:'Floating Console',description:'',ratio:'square'},
  {id:'m50',type:'image',src:image('0138'),category:'Home',title:'Living Interior',description:'',ratio:'landscape'},
  {id:'m51',type:'image',src:image('0181'),category:'Office',title:'Office Desks',description:'',ratio:'landscape'},
  {id:'m52',type:'image',src:image('0107'),category:'Corporate',title:'Corporate Workroom',description:'',ratio:'landscape'},
  {id:'m53',type:'image',src:image('0094'),category:'Custom',title:'Tailored Console',description:'',ratio:'portrait'},
  {id:'m54',type:'image',src:image('0080'),category:'Metal Works',title:'Metal Detail',description:'',ratio:'portrait'},
  {id:'m55',type:'image',src:image('0116'),category:'Home',title:'Bedroom Storage',description:'',ratio:'portrait'},
  {id:'m56',type:'image',src:image('0039'),category:'Office',title:'Executive Office',description:'',ratio:'landscape'},
  {id:'m57',type:'image',src:image('0160'),category:'Interiors',title:'Interior Screen',description:'',ratio:'portrait'},
  {id:'m58',type:'image',src:image('0097'),category:'Corporate',title:'Meeting Room',description:'',ratio:'landscape'},
  {id:'m59',type:'image',src:image('0095'),category:'Custom',title:'Made to Measure',description:'',ratio:'portrait'},
  {id:'m60',type:'image',src:image('0076'),category:'Metal Works',title:'Entry Gate',description:'',ratio:'landscape'},
]

export const projectCategories=['All','Home','Interiors','Corporate','Office','Custom','Metal Works'] as const
