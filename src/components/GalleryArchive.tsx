import { ArrowUpRight } from 'lucide-react'
import { useMemo, useState } from 'react'
import { galleryCategories, galleryItems } from '../data/gallery'
import { yoyoAssets } from '../data/yoyo-assets'
import type { PreviewItem } from './ArtworkPreview'
import { SectionHeading } from './SectionHeading'

interface GalleryArchiveProps {
  onPreview: (item: PreviewItem) => void
}

export function GalleryArchive({ onPreview }: GalleryArchiveProps) {
  const [activeCategory, setActiveCategory] =
    useState<(typeof galleryCategories)[number]['id']>('all')
  const visibleItems = useMemo(
    () =>
      activeCategory === 'all'
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  )

  return (
    <section className="gallery-archive" id="gallery" aria-labelledby="gallery-title">
      <div className="gallery-archive__inner">
        <div className="gallery-archive__head">
          <SectionHeading
            id="gallery-title"
            eyebrow="05 / INTERACTIVE SHOWCASE"
            title={
              <>
                十六个场景，
                <br />
                同一套视觉语法。
              </>
            }
            description="每一件作品都来自同一套模块规则。按视觉方向筛选，打开详情查看画面内容与资产属性。"
            number="16 SCENES"
          />
          <div className="gallery-archive__index" aria-hidden="true">
            <span>YOYO</span>
            <strong>01—16</strong>
          </div>
        </div>

        <div className="filter-row" role="group" aria-label="筛选作品类别">
          {galleryCategories.map((category) => {
            const count =
              category.id === 'all'
                ? galleryItems.length
                : galleryItems.filter((item) => item.category === category.id).length
            return (
              <button
                key={category.id}
                className={
                  activeCategory === category.id ? 'filter-button is-active' : 'filter-button'
                }
                type="button"
                aria-pressed={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
                <span>{count}</span>
              </button>
            )
          })}
          <span className="filter-row__count" aria-live="polite">
            {String(visibleItems.length).padStart(2, '0')} / {galleryItems.length} 件作品
          </span>
        </div>

        {visibleItems.length > 0 ? (
          <div className="gallery-grid" aria-live="polite" data-testid="gallery-grid" data-reveal>
            {visibleItems.map((item) => {
              const asset = yoyoAssets[item.index - 1]
              return (
                <button
                  className={'gallery-tile gallery-tile--' + item.index}
                  type="button"
                  key={item.id}
                  onClick={() =>
                    onPreview({
                      title: item.title,
                      description: item.description,
                      image: item.image,
                      imageAlt: item.alt,
                      label: item.categoryLabel + ' · ' + asset.id.toUpperCase(),
                      details: [
                        { label: '项目类别', value: item.categoryLabel },
                        { label: '视觉资产', value: asset.fileName },
                        { label: '构图方式', value: asset.usage },
                        { label: '交互方式', value: '分类筛选 / 键盘可访问详情' },
                      ],
                    })
                  }
                >
                  <span className="gallery-tile__image">
                    <img
                      src={item.image}
                      alt={item.alt}
                      width={asset.width}
                      height={asset.height}
                      loading="lazy"
                    />
                    <span className="gallery-tile__open" aria-hidden="true">
                      <ArrowUpRight size={18} />
                    </span>
                  </span>
                  <span className="gallery-tile__meta">
                    <span>
                      {String(item.index).padStart(2, '0')} / {item.categoryLabel}
                    </span>
                    <strong>{item.title}</strong>
                  </span>
                </button>
              )
            })}
          </div>
        ) : (
          <p className="gallery-empty">没有找到匹配的场景。</p>
        )}
      </div>
    </section>
  )
}
