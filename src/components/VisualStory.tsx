import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import { visualPrinciples } from '../data/landing-content'
import { yoyoAssets } from '../data/yoyo-assets'

const principleAssets = [0, 3, 14, 8, 5]
const colorTokens = [
  { id: 'purple', label: 'Primary purple', value: '#7139E8' },
  { id: 'lime', label: 'Accent lime', value: '#B8F32F' },
  { id: 'paper', label: 'Paper white', value: '#FFFFFF' },
  { id: 'ink', label: 'Ink black', value: '#171717' },
] as const

export function VisualStory() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [activeColor, setActiveColor] = useState(0)
  const activePrinciple = visualPrinciples[activeIndex]
  const activeAsset = yoyoAssets[principleAssets[activeIndex]]
  const activeToken = colorTokens[activeColor]

  return (
    <section className="visual-dna" id="style" aria-labelledby="visual-dna-title">
      <div className="visual-dna__inner">
        <div className="section-intro visual-dna__intro">
          <span className="eyebrow">02 / THE LANGUAGE OF YOYO</span>
          <div className="section-intro__row">
            <h2 id="visual-dna-title">
              每一个模块，
              <br />
              <em>都属于同一个视觉世界。</em>
            </h2>
            <p>
              YOYO
              不依赖随机素材拼贴，而是通过统一的几何语言、色彩关系和空间规则，建立能够持续扩展的视觉系统。
            </p>
          </div>
        </div>

        <div className="visual-dna__workspace" data-reveal>
          <div className="visual-dna__principles" role="tablist" aria-label="选择 YOYO 视觉原则">
            {visualPrinciples.map((principle, index) => (
              <button
                type="button"
                role="tab"
                key={principle.id}
                id={'visual-tab-' + principle.id}
                aria-selected={activeIndex === index}
                aria-controls="visual-principle-panel"
                className={
                  activeIndex === index
                    ? 'visual-dna__principle is-active'
                    : 'visual-dna__principle'
                }
                onClick={() => setActiveIndex(index)}
              >
                <span>{principle.number}</span>
                <strong>{principle.title}</strong>
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            ))}
          </div>

          <div
            className="visual-dna__sample"
            role="tabpanel"
            id="visual-principle-panel"
            aria-labelledby={'visual-tab-' + activePrinciple.id}
            data-testid="visual-principle-panel"
            style={{ '--visual-accent': activeToken.value } as React.CSSProperties}
          >
            <div className="visual-dna__sample-image">
              <img src={activeAsset.path} alt={activeAsset.content} width="384" height="256" />
              <span className="visual-dna__sample-index">{activePrinciple.number} / 05</span>
              <span className="visual-dna__sample-caption">{activeAsset.title}</span>
            </div>
            <div className="visual-dna__sample-copy">
              <span className="eyebrow">{activePrinciple.title}</span>
              <h3>{activePrinciple.name}</h3>
              <p>{activePrinciple.detail}</p>
              <div className="visual-dna__tokens" aria-label="选择颜色设计令牌">
                {colorTokens.map((token, index) => (
                  <button
                    type="button"
                    key={token.id}
                    className={activeColor === index ? 'visual-token is-active' : 'visual-token'}
                    aria-label={token.label + ' ' + token.value}
                    aria-pressed={activeColor === index}
                    onClick={() => setActiveColor(index)}
                  >
                    <span style={{ backgroundColor: token.value }} />
                    <strong>{token.value}</strong>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="visual-dna__footnote">
          <span>ART DIRECTION / 5 PRINCIPLES</span>
          <span>ACTIVE TOKEN / {activeToken.label.toUpperCase()}</span>
        </div>
      </div>
    </section>
  )
}
