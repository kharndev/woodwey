export type Category = 'Residential' | 'Office' | 'Corporate' | 'Education' | 'Hospitality' | 'Furniture' | 'Custom'
export type MediaItem = { id:string; type:'image'|'video'; src:string; poster?:string; category:Category; title:string; description:string; featured?:boolean; ratio:'portrait'|'landscape'|'square' }
export type CatalogItem = { id:string; name:string; category:'Chairs'|'Sofas'|'Tables'|'Workstations'|'Office Furniture'|'Home Furniture'|'School Furniture'|'Custom Furniture'|'Full Interior Design'; image:string; alt:string; ratio:'portrait'|'landscape'|'square' }
const curated:Record<string,string>={
  '0063':'0175','0066':'0234','0070':'0236','0077':'0235','0068':'0182','0074':'0195','0087':'0175',
  '0133':'0178','0150':'0233','0226':'0195','0229':'0233','0246':'0236','0247':'0235','0249':'0236','0251':'0175','0256':'0106',
}
const image = (n:string) => `/images/IMG-20260813-WA${curated[n]||n}.jpg`
const video = (n:string) => `/videos/VID-20260813-WA${n}.mp4`
export const projects = [
  { name:'Executive Suite', category:'Corporate', image:image('0066'), alt:'Custom executive office with warm timber furniture' },
  { name:'The Gathered Home', category:'Residential', image:image('0077'), alt:'Finished residential interior with custom Woodwey furniture' },
  { name:'Quiet Focus', category:'Office', image:image('0096'), alt:'Contemporary workspace installation' },
  { name:'A Place to Meet', category:'Workspace', image:image('0150'), alt:'Custom meeting and collaboration furniture' },
]
export const catalog: CatalogItem[] = [
  {id:'sculpted-lounge',name:'Sculpted Lounge Chair',category:'Chairs',image:image('0063'),alt:'Woodwey lounge chair',ratio:'portrait'},
  {id:'executive-desk',name:'Executive Work Desk',category:'Office Furniture',image:image('0066'),alt:'Woodwey executive desk',ratio:'landscape'},
  {id:'gather-sofa',name:'Gather Sofa',category:'Sofas',image:image('0077'),alt:'Woodwey upholstered sofa',ratio:'landscape'},
  {id:'boardroom-table',name:'Boardroom Table',category:'Tables',image:image('0070'),alt:'Woodwey boardroom table',ratio:'landscape'},
  {id:'focus-station',name:'Focus Workstation',category:'Workstations',image:image('0096'),alt:'Woodwey workstation',ratio:'portrait'},
  {id:'media-console',name:'Linear Media Console',category:'Home Furniture',image:image('0106'),alt:'Woodwey media console',ratio:'square'},
  {id:'learning-suite',name:'Learning Suite',category:'School Furniture',image:image('0133'),alt:'Woodwey learning furniture',ratio:'landscape'},
  {id:'reception-form',name:'Reception Form',category:'Custom Furniture',image:image('0150'),alt:'Woodwey custom reception furniture',ratio:'portrait'},
  {id:'dining-collection',name:'Dining Collection',category:'Tables',image:image('0226'),alt:'Woodwey dining collection',ratio:'portrait'},
  {id:'complete-interior',name:'Complete Interior',category:'Full Interior Design',image:image('0247'),alt:'Complete Woodwey interior installation',ratio:'landscape'},
  {id:'soft-lounge',name:'Soft Lounge',category:'Sofas',image:image('0246'),alt:'Custom Woodwey lounge seating',ratio:'square'},
  {id:'tailored-chair',name:'Tailored Chair',category:'Chairs',image:image('0251'),alt:'Tailored Woodwey chair',ratio:'portrait'},
]
export const projectMedia: MediaItem[] = [
  {id:'m1',type:'image',src:image('0066'),category:'Corporate',title:'Executive Suite',description:'Tailored furniture for focused leadership.',featured:true,ratio:'landscape'},
  {id:'m2',type:'image',src:image('0077'),category:'Residential',title:'Gathered Living',description:'A warm setting made for everyday life.',featured:true,ratio:'portrait'},
  {id:'m3',type:'image',src:image('0070'),category:'Office',title:'The Meeting Table',description:'A centre for collaborative work.',ratio:'landscape'},
  {id:'m4',type:'video',src:video('0243'),poster:image('0247'),category:'Custom',title:'Made to Measure',description:'From material to finished space.',ratio:'portrait'},
  {id:'m5',type:'image',src:image('0096'),category:'Office',title:'Quiet Focus',description:'A calmer way to work.',ratio:'portrait'},
  {id:'m6',type:'image',src:image('0106'),category:'Furniture',title:'Material Study',description:'Form, grain and considered detail.',ratio:'square'},
  {id:'m7',type:'image',src:image('0133'),category:'Education',title:'Learning Together',description:'Durable pieces for shared discovery.',ratio:'landscape'},
  {id:'m8',type:'image',src:image('0150'),category:'Corporate',title:'First Impression',description:'A custom reception statement.',featured:true,ratio:'portrait'},
  {id:'m9',type:'video',src:video('0262'),poster:image('0226'),category:'Furniture',title:'In the Detail',description:'Craft seen up close.',ratio:'landscape'},
  {id:'m10',type:'image',src:image('0226'),category:'Residential',title:'Dining Ritual',description:'A generous table for gathering.',ratio:'portrait'},
  {id:'m11',type:'image',src:image('0247'),category:'Hospitality',title:'Welcome In',description:'Furniture and atmosphere in balance.',featured:true,ratio:'landscape'},
  {id:'m12',type:'image',src:image('0246'),category:'Residential',title:'Soft Geometry',description:'Comfort shaped with intention.',ratio:'square'},
  {id:'m13',type:'image',src:image('0251'),category:'Furniture',title:'The Tailored Seat',description:'Upholstery with a precise silhouette.',ratio:'portrait'},
  {id:'m14',type:'image',src:image('0256'),category:'Custom',title:'Built Around You',description:'A one-off response to a singular brief.',ratio:'landscape'},
  {id:'m15',type:'image',src:image('0068'),category:'Office',title:'Working Landscape',description:'An adaptable office environment.',ratio:'landscape'},
  {id:'m16',type:'image',src:image('0074'),category:'Corporate',title:'Boardroom Study',description:'Material confidence at scale.',ratio:'portrait'},
  {id:'m17',type:'image',src:image('0087'),category:'Furniture',title:'Object and Grain',description:'A closer view of the making.',ratio:'square'},
  {id:'m18',type:'video',src:video('0257'),poster:image('0249'),category:'Custom',title:'Installation Day',description:'The final pieces coming together.',ratio:'portrait'},
  {id:'m19',type:'image',src:image('0229'),category:'Residential',title:'Room to Pause',description:'A comfortable composition for daily life.',ratio:'landscape'},
  {id:'m20',type:'image',src:image('0249'),category:'Hospitality',title:'Shared Atmosphere',description:'A welcoming commercial interior.',ratio:'portrait'},
]
export const projectCategories = ['All','Residential','Office','Corporate','Education','Hospitality','Furniture','Custom'] as const
