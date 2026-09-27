import data from './catalog-gallery.json'
import type { CatalogCategory } from './catalog'

export type GalleryImage = { src: string; itemId: string; alt: string; category: CatalogCategory }

export const galleryByCategory = data as Record<CatalogCategory, Omit<GalleryImage, 'category'>[]>
const entries = Object.entries(galleryByCategory) as [CatalogCategory, Omit<GalleryImage, 'category'>[]][]
const longestCollection = Math.max(...entries.map(([, images]) => images.length))

// Mix collections in the All view so the first screen shows Woodwey's range.
export const galleryImages: GalleryImage[] = Array.from({ length: longestCollection }, (_, index) =>
  entries.flatMap(([category, images]) => images[index] ? [{ ...images[index], category }] : []),
).flat()
