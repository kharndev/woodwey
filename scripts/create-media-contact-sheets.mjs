import fs from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const root=process.cwd()
const source=path.join(root,'public','images')
const output=path.join(root,'tmp','catalogue-media-review')
fs.mkdirSync(output,{recursive:true})
const files=fs.readdirSync(source).filter(file=>/\.(jpe?g|png|webp)$/i.test(file)).sort()
const width=1000,cellWidth=200,cellHeight=170,perSheet=30

for(let offset=0;offset<files.length;offset+=perSheet){
  const batch=files.slice(offset,offset+perSheet)
  const rows=Math.ceil(batch.length/5)
  const composites=[]
  for(let index=0;index<batch.length;index++){
    const file=batch[index]
    const image=await sharp(path.join(source,file)).rotate().resize(190,135,{fit:'cover',position:'attention'}).jpeg({quality:78}).toBuffer()
    const label=Buffer.from(`<svg width="190" height="26"><rect width="190" height="26" fill="#171713"/><text x="7" y="18" fill="#fff" font-family="Arial" font-size="12">${file.replace('IMG-20260813-WA','')}</text></svg>`)
    const tile=await sharp({create:{width:190,height:161,channels:3,background:'#f7f4ee'}}).composite([{input:image,top:0,left:0},{input:label,top:135,left:0}]).png().toBuffer()
    composites.push({input:tile,left:(index%5)*cellWidth+5,top:Math.floor(index/5)*cellHeight+5})
  }
  await sharp({create:{width,height:rows*cellHeight,channels:3,background:'#d9d4cb'}}).composite(composites).jpeg({quality:86}).toFile(path.join(output,`images-${String(offset/perSheet+1).padStart(2,'0')}.jpg`))
}
console.log(`${files.length} images across ${Math.ceil(files.length/perSheet)} sheets in ${output}`)
