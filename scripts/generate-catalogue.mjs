import fs from 'node:fs'
import path from 'node:path'
import PDFDocument from 'pdfkit'
import catalog from '../lib/catalog-data.json' with { type:'json' }

const root=process.cwd()
const outputDirectory=path.join(root,'output','pdf')
fs.mkdirSync(outputDirectory,{recursive:true})
const output=path.join(outputDirectory,'Woodwey-E-Catalogue-2026.pdf')
const stream=fs.createWriteStream(output)
const doc=new PDFDocument({size:'A4',margin:0,autoFirstPage:false,info:{Title:'Woodwey Furniture, Interiors & Metal Works Catalog 2026',Author:'Woodwey Furniture & Metal Works Ltd.',Subject:'A controlled visual catalog of custom furniture, interiors and architectural metalwork'}})
doc.registerFont('Woodwey Sans','C:\\Windows\\Fonts\\arial.ttf')
doc.registerFont('Woodwey Sans Bold','C:\\Windows\\Fonts\\arialbd.ttf')
doc.registerFont('Woodwey Serif','C:\\Windows\\Fonts\\georgia.ttf')
doc.pipe(stream)

const color={ink:'#181814',ivory:'#f7f4ee',orange:'#c65b18',muted:'#706c65',line:'#c8c0b5'}
const categories=['Home','Interiors','Corporate','Office','Custom','Metal Works']
const siteBase=(process.env.NEXT_PUBLIC_SITE_URL||'https://woodweyng.com').replace(/\/$/,'')
const absolute=(publicPath)=>path.join(root,'public',publicPath.replace(/^\//,''))
const addPage=(background=color.ivory)=>{doc.addPage();doc.rect(0,0,doc.page.width,doc.page.height).fill(background)}
const eyebrow=(text,x,y,tint=color.orange)=>doc.fillColor(tint).font('Woodwey Sans Bold').fontSize(7).text(text.toUpperCase(),x,y,{characterSpacing:1.3})
const footer=(pageNumber,tint=color.ink)=>{
  doc.fillColor(tint).font('Woodwey Sans').fontSize(6.5).text('WOODWEYNG.COM',36,816,{link:siteBase,underline:false,characterSpacing:1})
  doc.text(String(pageNumber).padStart(2,'0'),540,816,{width:20,align:'right'})
}
const watermarkPositions=[
  [0.16,0.22,-4],
  [0.58,0.34,3],
  [0.39,0.68,-2],
  [0.65,0.72,4],
]
function addImage(src,x,y,width,height,watermarkIndex=0){
  doc.save().rect(x,y,width,height).clip().image(absolute(src),x,y,{cover:[width,height],align:'center',valign:'center'}).restore()
  const [rx,ry,rotation]=watermarkPositions[watermarkIndex%watermarkPositions.length]
  doc.save().fillOpacity(.26).fillColor('#ffffff').font('Woodwey Sans Bold').fontSize(Math.max(6,Math.min(10,width/26))).rotate(rotation,{origin:[x+width*rx,y+height*ry]}).text('WOODWEY',x+width*rx,y+height*ry,{characterSpacing:1.5}).restore()
}

let pageNumber=1
addPage(color.ink)
addImage('/images/IMG-20260813-WA0234.jpg',0,0,595,842,1)
doc.save().fillOpacity(.62).rect(0,0,595,842).fill(color.ink).restore()
eyebrow('Woodwey Furniture & Metal Works Ltd',42,48,color.ivory)
doc.fillColor(color.ivory).font('Woodwey Serif').fontSize(64).text('Furniture.\nInteriors.\nMetal works.',42,220,{width:500,lineGap:-9})
doc.fillColor(color.orange).fontSize(28).text('THE COLLECTION',44,520,{characterSpacing:.6})
doc.moveTo(42,760).lineTo(553,760).strokeColor('rgba(255,255,255,.45)').stroke()
doc.fillColor(color.ivory).font('Woodwey Sans').fontSize(7).text('LAGOS, NIGERIA',42,778,{characterSpacing:1.2}).text('PROUDLY MADE IN NIGERIA',394,778,{width:160,align:'right',characterSpacing:1.1})
footer(pageNumber++,color.ivory)

addPage()
eyebrow('Collection index',42,44)
doc.fillColor(color.ink).font('Woodwey Serif').fontSize(46).text('Made for the way\nlife happens.',42,80,{width:500,lineGap:-4})
const indexImages=categories.map(category=>catalog.find(item=>item.category===category)?.images[0]).filter(Boolean)
const indexLayout=[
  [42,220,245,155],[298,220,255,155],[42,386,158,174],[211,386,158,174],[380,386,173,174],[42,571,511,190],
]
indexImages.forEach((src,index)=>addImage(src,...indexLayout[index],index))
categories.forEach((category,index)=>{
  const [x,y,w,h]=indexLayout[index]
  doc.save().fillOpacity(.62).rect(x,y+h-33,w,33).fill(color.ink).restore()
  doc.fillColor(color.ivory).font('Woodwey Sans Bold').fontSize(7).text(category.toUpperCase(),x+10,y+h-21,{width:w-20,characterSpacing:1,link:`${siteBase}/catalog?category=${encodeURIComponent(category)}`})
})
footer(pageNumber++)

for(const [categoryIndex,category] of categories.entries()){
  const members=catalog.filter(item=>item.category===category)
  const images=members.flatMap(item=>item.images).filter((src,index,list)=>list.indexOf(src)===index).slice(0,4)
  while(images.length<3)images.push(images[0])
  addPage(color.ink)
  addImage(images[0],0,0,595,842,categoryIndex)
  doc.save().fillOpacity(.28).rect(0,0,595,842).fill(color.ink).restore()
  addImage(images[1],354,50,205,170,categoryIndex+1)
  addImage(images[2],382,236,177,145,categoryIndex+2)
  if(images[3])addImage(images[3],404,397,155,126,categoryIndex+3)
  const story={
    Home:'Furniture for living well.',
    Interiors:'Designed around the space.',
    Corporate:'Made for shared decisions.',
    Office:'A more composed work day.',
    Custom:'Made to measure.',
    'Metal Works':'Architectural structure and detail.',
  }[category]
  doc.save().fillOpacity(.92).roundedRect(34,486,330,270,7).fill(color.ivory).restore()
  eyebrow(category,55,510)
  const titleSize=category==='Metal Works'?27:32
  doc.fillColor(color.ink).font('Woodwey Serif').fontSize(titleSize)
  const titleHeight=doc.heightOfString(story,{width:275,lineGap:-1})
  doc.text(story,55,538,{width:275,lineGap:-1})
  const selected=members.slice(0,2)
  let itemY=Math.max(622,538+titleHeight+14)
  for(const item of selected){
    doc.fillColor(color.orange).font('Woodwey Sans Bold').fontSize(7.5).text(item.name.toUpperCase(),55,itemY,{width:270,characterSpacing:.6,link:`${siteBase}/catalog?category=${encodeURIComponent(category)}`})
    doc.fillColor(color.muted).font('Woodwey Sans').fontSize(7.5).text(item.description,55,itemY+15,{width:270,lineGap:2})
    itemY+=48
  }
  doc.fillColor(color.ink).font('Woodwey Sans Bold').fontSize(7).text('VIEW ON WOODWEY  →',55,728,{link:`${siteBase}/catalog?category=${encodeURIComponent(category)}`,underline:false,characterSpacing:.8})
  footer(pageNumber++,color.ivory)
}

addPage(color.orange)
eyebrow('Begin a project',42,48,color.ink)
doc.fillColor(color.ink).font('Woodwey Serif').fontSize(60).text('Let us make\nsomething worth\nkeeping.',42,205,{width:500,lineGap:-7})
doc.moveTo(42,645).lineTo(553,645).strokeColor('#7b421e').stroke()
doc.font('Woodwey Sans Bold').fontSize(8).text('WOODWEY FURNITURE & METAL WORKS LTD',42,675,{characterSpacing:.8})
doc.font('Woodwey Sans').fontSize(8).text('Lagos, Nigeria\nProudly made in Nigeria.',42,702,{lineGap:4})
doc.fillColor(color.ink).text('hello@woodweyng.com',340,675,{link:'mailto:hello@woodweyng.com',underline:false})
doc.text('+234 803 297 3402',340,697,{link:'tel:+2348032973402',underline:false})
doc.text('WOODWEYNG.COM',340,719,{link:siteBase,underline:false,characterSpacing:.8})
footer(pageNumber++,color.ink)

doc.end()
await new Promise((resolve,reject)=>stream.on('finish',resolve).on('error',reject))
console.log(`Private catalog generated: ${output} (${pageNumber-1} pages)`)
