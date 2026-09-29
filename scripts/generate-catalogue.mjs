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
const coverImage = '/images/IMG-20260813-WA0234.jpg'
const indexImages = {
  Home: '/images/IMG-20260813-WA0009.jpg',
  Interiors: '/images/IMG-20260813-WA0043.jpg',
  Corporate: '/images/IMG-20260813-WA0014.jpg',
  Office: '/images/IMG-20260813-WA0246.jpg',
  Custom: '/images/IMG-20260813-WA0089.jpg',
  'Metal Works': '/images/IMG-20260813-WA0079.jpg',
}
const usedImages = new Set()
const page = (background = colors.ivory) => {
  doc.addPage()
  doc.rect(0, 0, doc.page.width, doc.page.height).fill(background)
}
function image(src, x, y, width, height, protectedImage = true) {
  if (usedImages.has(src)) throw new Error(`Catalogue image appears more than once: ${src}`)
  usedImages.add(src)
  const file = imageFile(src)
  if (!fs.existsSync(file)) throw new Error(`Missing catalogue image: ${src}`)
  doc.save().rect(x, y, width, height).clip().image(file, x, y, { cover: [width, height], align: 'center', valign: 'center' }).restore()
  if (!protectedImage) return
  const label = 'WOODWEY'
  doc.font('Woodwey Sans Bold').fontSize(100)
  const baseWidth = doc.widthOfString(label, { characterSpacing: 3 })
  const fontSize = Math.min(width * .77 * 100 / baseWidth, height * .19, 66)
  doc.fontSize(fontSize)
  const wordWidth = doc.widthOfString(label, { characterSpacing: fontSize * .03 })
  const wordX = x + (width - wordWidth) / 2
  const wordY = y + height * .48 - fontSize * .55
  doc.save().rect(x, y, width, height).clip()
  doc.fillOpacity(.18).fillColor('#ffffff').font('Woodwey Sans Bold').fontSize(fontSize)
    .text(label, wordX, wordY, { characterSpacing: fontSize * .03, lineBreak: false })
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
    .text('CLICK HERE TO SEE MORE ON WOODWEY  >', 36, 765, { link: url, underline: false, characterSpacing: .6 })
  doc.moveTo(36, 785).lineTo(559, 785).strokeColor(colors.line).lineWidth(.6).stroke()
}

let number = 1
page(colors.ink)
image(coverImage, 0, 0, 595, 842, false)
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
  image(indexImages[category], x, y, w, h, false)
  doc.save().fillOpacity(.68).rect(x, y + h - 32, w, 32).fill(colors.ink).restore()
  doc.fillColor(colors.ivory).font('Woodwey Sans Bold').fontSize(8)
    .text(category.toUpperCase(), x + 10, y + h - 22, { width: w - 20, characterSpacing: .8, link: `${siteBase}/catalog?category=${encodeURIComponent(category)}` })
})
footer(number++)

for (const [categoryIndex, category] of categories.entries()) {
  const images = galleries[category].map(entry => entry.src)
  if (images.length !== 9) throw new Error(`${category} must have nine curated images for this spread`)

  page()
  sectionLabel(category, 1)
  const firstLayouts = [
    [[36, 96, 333, 300], [379, 96, 180, 300], [36, 406, 170, 339], [216, 406, 170, 339], [396, 406, 163, 339]],
    [[36, 96, 160, 250], [206, 96, 183, 250], [399, 96, 160, 250], [36, 356, 230, 389], [276, 356, 283, 389]],
  ]
  images.slice(0, 5).forEach((src, index) => image(src, ...firstLayouts[categoryIndex % 2][index]))
  categoryLink(category)
  footer(number++)

  page()
  sectionLabel(category, 2)
  const secondLayouts = [
    [[36, 96, 250, 315], [296, 96, 263, 315], [36, 421, 310, 324], [356, 421, 203, 324]],
    [[36, 96, 523, 260], [36, 366, 164, 379], [210, 366, 165, 379], [385, 366, 174, 379]],
  ]
  images.slice(5, 9).forEach((src, index) => image(src, ...secondLayouts[categoryIndex % 2][index]))
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
