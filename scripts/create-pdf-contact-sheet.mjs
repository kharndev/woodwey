import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const inputDirectory = path.resolve('tmp/pdfs/rendered')
const output = path.resolve('tmp/catalogue-pdf-contact-sheet.png')
const files = (await fs.readdir(inputDirectory))
  .filter((file) => file.endsWith('.png'))
  .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))

const columns = 5
const cellWidth = 220
const pageWidth = 190
const pageHeight = 269
const cellHeight = 300
const rows = Math.ceil(files.length / columns)
const composites = []

for (const [index, file] of files.entries()) {
  const page = await sharp(path.join(inputDirectory, file))
    .resize(pageWidth, pageHeight, { fit: 'contain', background: '#e8e3db' })
    .png()
    .toBuffer()
  composites.push({
    input: page,
    left: (index % columns) * cellWidth + 15,
    top: Math.floor(index / columns) * cellHeight + 22,
  })
}

await sharp({
  create: {
    width: columns * cellWidth,
    height: rows * cellHeight,
    channels: 4,
    background: '#c9c4bb',
  },
})
  .composite(composites)
  .png()
  .toFile(output)

console.log(`Created ${output} with ${files.length} pages.`)
