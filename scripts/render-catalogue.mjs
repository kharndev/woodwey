import fs from 'node:fs'
import path from 'node:path'
import { pdf } from 'pdf-to-img'

const root = process.cwd()
const input = path.join(root,'output','pdf','Woodwey-E-Catalogue-2026.pdf')
const output = path.join(root,'tmp','pdfs','rendered')
fs.mkdirSync(output,{recursive:true})
for(const file of fs.readdirSync(output)) if(file.endsWith('.png')) fs.unlinkSync(path.join(output,file))

let page = 0
for await (const image of await pdf(input,{scale:1.15})) {
  page += 1
  fs.writeFileSync(path.join(output,`page-${String(page).padStart(2,'0')}.png`),image)
}
console.log(`${page} pages rendered to ${output}`)
