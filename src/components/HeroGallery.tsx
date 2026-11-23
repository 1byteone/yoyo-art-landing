import { ArrowDownRight, ArrowRight } from 'lucide-react'
import type { PreviewItem } from './ArtworkPreview'
import { HeroImageWall } from './HeroImageWall'

interface HeroGalleryProps {
  onPreview: (item: PreviewItem) => void
}

export function HeroGallery({ onPreview }: HeroGalleryProps) {
  return (
    <section className="hero-brand" id="top" aria-labelledby="hero-title">
      <div className="hero-brand__inner">
        <div className="hero-brand__copy">
          <span className="eyebrow">01 / ENTER THE YOYO WORLD</span>
          <p className="hero-brand__english">BUILD YOUR OWN VISUAL WORLD.</p>
          <h1 id="hero-title">
            让数字界面，
            <br />
            <em>拥有自己的视觉世界。</em>
          </h1>
          <p className="hero-brand__description">
            从模块化几何、空间构图到交互式视觉体验。YOYO
            将插画资产、界面设计与前端工程融合，构建具有识别度的数字体验。
          </p>
          <div className="hero-brand__actions">
            <a className="brand-button brand-button--dark" href="#style">
              探索视觉系统 <ArrowDownRight size={16} aria-hidden="true" />
            </a>
            <a className="brand-button brand-button--plain" href="#experiments">
              浏览创意实验 <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>
          <div className="hero-brand__notation" aria-label="视觉规范摘要">
            <span>2.5D ISOMETRIC</span>
            <span>MODULAR / 01—16</span>
          </div>
        </div>
      </div>
      <HeroImageWall onPreview={onPreview} />
      <span className="hero-brand__edge-note" aria-hidden="true">
        ART DIRECTION / INTERACTIVE SYSTEMS
      </span>
    </section>
  )
}
