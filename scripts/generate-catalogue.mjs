import fs from 'node:fs'
import path from 'node:path'
import PDFDocument from 'pdfkit'
import galleries from '../lib/catalog-gallery.json' with { type: 'json' }

const root = process.cwd()
const outputDirectory = path.join(root, 'output', 'pdf')
fs.mkdirSync(outputDirectory, { recursive: true })
const output = path.join(outputDirectory, 'Woodwey-E-Catalogue-2026.pdf')
const stream = fs.createWriteStream(output)
const doc = new PDFDocument({
  size: 'A4',
  margin: 0,
  autoFirstPage: false,
  info: {
    Title: 'Woodwey Furniture, Interiors & Metal Works | The Collection',
    Author: 'Woodwey Furniture & Metal Works Ltd.',
    Subject: 'Private editorial furniture, interiors and metalwork catalogue',
  },
})
doc.registerFont('Woodwey Sans', 'C:\\Windows\\Fonts\\arial.ttf')
doc.registerFont('Woodwey Sans Bold', 'C:\\Windows\\Fonts\\arialbd.ttf')
doc.registerFont('Woodwey Serif', 'C:\\Windows\\Fonts\\georgia.ttf')
doc.pipe(stream)

const colors = { ink: '#181814', ivory: '#f7f4ee', orange: '#c65b18', line: '#c8c0b5' }
const categories = ['Home', 'Interiors', 'Corporate', 'Office', 'Custom', 'Metal Works']
const siteBase = (process.env.NEXT_PUBLIC_SITE_URL || 'https://woodweyng.com').replace(/\/$/, '')
const imageFile = publicPath => path.join(root, 'public', publicPath.replace(/^\//, ''))
const page = (background = colors.ivory) => {
  doc.addPage()
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(background)
}
const watermarkPositions = [
  [0.1, 0.35, -3], [0.24, 0.5, 2], [0.08, 0.64, -2],
  [0.22, 0.27, 3], [0.15, 0.48, -4],
]
function image(src, x, y, width, height, index = 0, protectedImage = true) {
  const file = imageFile(src)
  if (!fs.existsSync(file)) throw new Error(`Missing catalogue image: ${src}`)
  doc.save().rect(x, y, width, height).clip().image(file, x, y, { cover: [width, height], align: 'center', valign: 'center' }).restore()
  if (!protectedImage) return
  const [rx, ry, angle] = watermarkPositions[index % watermarkPositions.length]
  const fontSize = Math.min(55, Math.max(20, width / 5.8))
  doc.save().rect(x, y, width, height).clip()
  doc.fillOpacity(.35).fillColor('#ffffff').font('Woodwey Sans Bold').fontSize(fontSize)
    .rotate(angle, { origin: [x + width * rx, y + height * ry] })
    .text('WOODWEY', x + width * rx, y + height * ry, { characterSpacing: fontSize * .09, lineBreak: false })
  doc.restore()
  doc.save().fillOpacity(.88).fillColor('#ffffff').font('Woodwey Sans Bold').fontSize(7)
    .text('0803 297 3402', x + width - 95, y + height - 18, { width: 86, align: 'right', lineBreak: false })
  doc.restore()
}
function footer(number, tint = colors.ink) {
  doc.fillColor(tint).font('Woodwey Sans Bold').fontSize(7)
    .text('WOODWEYNG.COM', 36, 814, { link: siteBase, underline: false, characterSpacing: .8 })
    .text(String(number).padStart(2, '0'), 535, 814, { width: 24, align: 'right' })
}
function sectionLabel(category, count) {
  doc.fillColor(colors.orange).font('Woodwey Sans Bold').fontSize(9)
    .text(category.toUpperCase(), 36, 37, { characterSpacing: 1.7 })
  doc.fillColor(colors.ink).font('Woodwey Serif').fontSize(24)
    .text(category, 36, 49)
  doc.fillColor(colors.ink).font('Woodwey Sans').fontSize(7)
    .text(`WOODWEY FURNITURE & METAL WORKS LTD     /     ${String(count).padStart(2, '0')}`, 299, 47, { width: 260, align: 'right', characterSpacing: .4 })
  doc.moveTo(36, 81).lineTo(559, 81).strokeColor(colors.line).lineWidth(.6).stroke()
}
function categoryLink(category) {
  const url = `${siteBase}/catalog?category=${encodeURIComponent(category)}`
  doc.fillColor(colors.ink).font('Woodwey Sans Bold').fontSize(8)
    .text('CLICK HERE TO SEE MORE ON WOODWEY  →', 36, 765, { link: url, underline: false, characterSpacing: .6 })
  doc.moveTo(36, 785).lineTo(559, 785).strokeColor(colors.line).lineWidth(.6).stroke()
}

let number = 1
page(colors.ink)
image('/images/IMG-20260813-WA0234.jpg', 0, 0, 595, 842, 0, false)
doc.save().fillOpacity(.64).rect(0, 0, 595, 842).fill(colors.ink).restore()
doc.fillColor(colors.ivory).font('Woodwey Sans Bold').fontSize(14)
  .text('WOODWEY', 42, 44, { characterSpacing: 3.1 })
doc.fontSize(8.2).text('FURNITURE & METAL WORKS LTD', 42, 67, { characterSpacing: 1.25 })
doc.moveTo(42, 95).lineTo(553, 95).strokeColor('#aaa59d').lineWidth(.7).stroke()
doc.fillColor(colors.ivory).font('Woodwey Serif').fontSize(65)
  .text('Furniture.\nInteriors.\nMetal works.', 42, 220, { width: 510, lineGap: -7 })
doc.fillColor(colors.orange).font('Woodwey Sans Bold').fontSize(19)
  .text('THE COLLECTION', 44, 538, { characterSpacing: 1.9 })
doc.fillColor(colors.ivory).font('Woodwey Sans').fontSize(8)
  .text('LAGOS, NIGERIA', 42, 778, { characterSpacing: 1.3 })
  .text('PROUDLY MADE IN NIGERIA', 375, 778, { width: 178, align: 'right', characterSpacing: 1.1 })
footer(number++, colors.ivory)

page()
doc.fillColor(colors.orange).font('Woodwey Sans Bold').fontSize(9)
  .text('THE COLLECTION', 36, 35, { characterSpacing: 1.7 })
doc.fillColor(colors.ink).font('Woodwey Serif').fontSize(34).text('Explore the work.', 36, 48)
const indexLayout = [
  [36, 105, 254, 210], [299, 105, 260, 210],
  [36, 324, 167, 210], [212, 324, 171, 210], [392, 324, 167, 210],
  [36, 543, 523, 222],
]
categories.forEach((category, index) => {
  const [x, y, w, h] = indexLayout[index]
  image(galleries[category][0].src, x, y, w, h, index)
  doc.save().fillOpacity(.68).rect(x, y + h - 32, w, 32).fill(colors.ink).restore()
  doc.fillColor(colors.ivory).font('Woodwey Sans Bold').fontSize(8)
    .text(category.toUpperCase(), x + 10, y + h - 22, { width: w - 20, characterSpacing: .8, link: `${siteBase}/catalog?category=${encodeURIComponent(category)}` })
})
footer(number++)

for (const category of categories) {
  const images = galleries[category].map(entry => entry.src)
  if (images.length < 9) throw new Error(`${category} has fewer than nine curated images`)

  page()
  sectionLabel(category, 1)
  const firstLayout = [
    [36, 96, 319, 305], [364, 96, 195, 148], [364, 253, 195, 148],
    [36, 410, 244, 335], [289, 410, 270, 335],
  ]
  images.slice(0, 5).forEach((src, index) => image(src, ...firstLayout[index], index))
  categoryLink(category)
  footer(number++)

  page()
  sectionLabel(category, 2)
  const secondLayout = [
    [36, 96, 259, 306], [304, 96, 255, 306],
    [36, 411, 315, 334], [360, 411, 199, 334],
  ]
  images.slice(5, 9).forEach((src, index) => image(src, ...secondLayout[index], index + 5))
  categoryLink(category)
  footer(number++)
}

page(colors.orange)
doc.fillColor(colors.ink).font('Woodwey Sans Bold').fontSize(11)
  .text('WOODWEY FURNITURE & METAL WORKS LTD', 42, 48, { characterSpacing: 1.2 })
doc.font('Woodwey Serif').fontSize(61)
  .text('Let us make\nsomething worth\nkeeping.', 42, 210, { width: 510, lineGap: -7 })
doc.moveTo(42, 645).lineTo(553, 645).strokeColor('#7b421e').stroke()
doc.font('Woodwey Sans').fontSize(9).text('Lagos, Nigeria\nProudly made in Nigeria.', 42, 677, { lineGap: 5 })
doc.text('hello@woodweyng.com', 336, 677, { link: 'mailto:hello@woodweyng.com' })
doc.text('0803 297 3402', 336, 699, { link: 'tel:+2348032973402' })
doc.text('WOODWEYNG.COM', 336, 721, { link: siteBase, characterSpacing: .8 })
footer(number++)

doc.end()
await new Promise((resolve, reject) => stream.on('finish', resolve).on('error', reject))
console.log(`Private catalogue generated: ${output} (${number - 1} pages)`)
