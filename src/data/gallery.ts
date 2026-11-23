import { yoyoAssets } from './yoyo-assets'

export type GalleryCategory = 'illustration' | 'spatial' | 'identity' | 'experiments'

export interface GalleryItem {
  id: string
  index: number
  title: string
  description: string
  category: GalleryCategory
  categoryLabel: string
  image: string
  alt: string
}

const categoryLabels = {
  Illustration: ['illustration', '插画'],
  Spatial: ['spatial', '空间'],
  Identity: ['identity', '识别'],
  Experiments: ['experiments', '实验'],
} as const

export const galleryItems: GalleryItem[] = yoyoAssets.map((asset, index) => {
  const [category, categoryLabel] = categoryLabels[asset.category]
  return {
    id: asset.id,
    index: index + 1,
    title: asset.title,
    description: asset.content,
    category,
    categoryLabel,
    image: asset.path,
    alt: asset.content,
  }
})

export const galleryCategories = [
  { id: 'all', label: '全部' },
  { id: 'illustration', label: '插画' },
  { id: 'spatial', label: '空间' },
  { id: 'identity', label: '识别' },
  { id: 'experiments', label: '实验' },
] as const
