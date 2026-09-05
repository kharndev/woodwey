import fs from 'node:fs'
import path from 'node:path'
import PDFDocument from 'pdfkit'
import catalog from '../lib/catalog-data.json' with { type:'json' }

const root=process.cwd()
const finalDirectory=path.join(root,'output','pdf')
const publicDirectory=path.join(root,'public','downloads')
fs.mkdirSync(finalDirectory,{recursive:true})
fs.mkdirSync(publicDirectory,{recursive:true})
const output=path.join(finalDirectory,'Woodwey-E-Catalogue-2026.pdf')
const stream=fs.createWriteStream(output)
const doc=new PDFDocument({size:'A4',margin:0,autoFirstPage:false,info:{Title:'Woodwey E-Catalogue 2026',Author:'Woodwey Furniture & Metal Works Ltd.',Subject:'Custom furniture, interior solutions and architectural metalwork'}})
doc.registerFont('Woodwey Sans','C:\\Windows\\Fonts\\arial.ttf')
doc.registerFont('Woodwey Serif','C:\\Windows\\Fonts\\georgia.ttf')
doc.pipe(stream)

const color={ink:'#181814',ivory:'#f7f4ee',orange:'#d47a3a',muted:'#706c65',line:'#c8c0b5'}
const absolute=(publicPath)=>path.join(root,'public',publicPath.replace(/^\//,''))
const addPage=(background=color.ivory)=>{doc.addPage();doc.rect(0,0,doc.page.width,doc.page.height).fill(background)}
const eyebrow=(text,x,y,tint=color.orange)=>doc.fillColor(tint).font('Woodwey Sans').fontSize(8).text(text.toUpperCase(),x,y,{characterSpacing:1.4})

addPage(color.ink)
doc.image(path.join(root,'public','logos','jpeg.jpg'),56,55,{fit:[145,70],align:'center',valign:'center'})
doc.fillColor(color.ivory).font('Woodwey Serif').fontSize(66).text('Furniture,\ninteriors &\nmetalwork',56,235,{lineGap:-8})
doc.fillColor(color.orange).fontSize(58).text('2026',56,485)
doc.moveTo(56,760).lineTo(539,760).strokeColor('#66665f').stroke()
doc.fillColor(color.ivory).font('Woodwey Sans').fontSize(8).text('WOODWEY E-CATALOGUE',56,776,{characterSpacing:1.2}).text('LAGOS, NIGERIA',420,776,{characterSpacing:1.2})

addPage()
eyebrow('A visual design library',56,60)
doc.fillColor(color.ink).font('Woodwey Serif').fontSize(50).text('Made for the way\nspaces are lived in.',56,180,{width:480,lineGap:-4})
doc.moveTo(56,385).lineTo(539,385).strokeColor(color.line).stroke()
doc.font('Woodwey Sans').fontSize(12).fillColor(color.ink).text('Woodwey creates custom furniture, complete interior solutions and architectural metalwork for homes, offices, workspaces, hospitality and commercial environments. Every reference is a starting point: proportions, materials and finishes are tailored to the project.',56,420,{width:220,lineGap:5})
doc.fontSize(9).fillColor(color.muted).text(`This is not a retail price list. Final specifications, quantities, timelines and quotations are developed after consultation.\n\n${catalog.length} curated references / Custom furniture / Interior solutions / Metal works / Project execution`,320,420,{width:210,lineGap:5})

const categories=[...new Set(catalog.map(item=>item.category))]
for(const [index,category] of categories.entries()){
  const members=catalog.filter(item=>item.category===category)
  addPage(color.ink)
  doc.save().rect(0,0,595,842).clip().image(absolute(members[0].images[0]),0,0,{cover:[595,842],align:'center',valign:'center'}).restore()
  doc.rect(0,0,595,842).fillOpacity(.58).fill(color.ink).fillOpacity(1)
  eyebrow(`Collection ${String(index+1).padStart(2,'0')}`,56,72,color.orange)
  doc.fillColor(color.ivory).font('Woodwey Serif').fontSize(72).text(category,56,320,{width:480})
  doc.font('Woodwey Sans').fontSize(10).text(`${members.length} ${members.length===1?'reference':'references'} / Designed and made in Lagos, Nigeria`,58,720,{characterSpacing:.4})
}

for(const [index,item] of catalog.entries()){
  addPage()
  doc.save().rect(0,0,345,842).clip().image(absolute(item.images[0]),0,0,{cover:[345,842],align:'center',valign:'center'}).restore()
  doc.fillColor(color.muted).font('Woodwey Sans').fontSize(7).text(`${String(index+1).padStart(2,'0')} / ${catalog.length}`,510,35)
  eyebrow(`${item.category} / ${item.subcategory}`,380,220)
  doc.fillColor(color.ink).font('Woodwey Serif').fontSize(28).text(item.name,380,255,{width:170,lineGap:0})
  doc.fontSize(14).text(item.description,380,385,{width:165,lineGap:4})
  doc.moveTo(380,540).lineTo(539,540).strokeColor(color.line).stroke()
  eyebrow('Designed for',380,568)
  doc.fillColor(color.ink).font('Woodwey Sans').fontSize(9).text(item.spaces.join(' / '),380,595,{width:165,lineGap:4})
  doc.fillColor(color.muted).fontSize(8).text(item.metadata.specification,380,700,{width:165,lineGap:3})
}

addPage(color.orange)
eyebrow('Begin a project',56,60,color.ink)
doc.fillColor(color.ink).font('Woodwey Serif').fontSize(62).text('Let us make\nsomething worth\nkeeping.',56,225,{width:480,lineGap:-7})
doc.moveTo(56,680).lineTo(539,680).strokeColor('#774521').stroke()
doc.font('Woodwey Sans').fontSize(10).text('Woodwey Furniture & Metal Works Ltd.\nLagos, Nigeria\nProudly made in Nigeria.',56,712,{lineGap:5})
doc.text('hello@woodweyng.com\n+234 803 297 3402\nwa.me/2348032973402',330,712,{lineGap:5})

doc.end()
await new Promise((resolve,reject)=>stream.on('finish',resolve).on('error',reject))
fs.copyFileSync(output,path.join(publicDirectory,path.basename(output)))
console.log(`${catalog.length} products across ${doc.bufferedPageRange().count||'all'} PDF pages: ${output}`)
