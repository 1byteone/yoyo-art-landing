import { ArrowUpRight, Check, Layers3 } from 'lucide-react'
import { useState } from 'react'
import { applications } from '../data/applications'

type ComparisonMode = 'unified' | 'scattered'

export function ApplicationsShowcase() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [comparison, setComparison] = useState<ComparisonMode>('unified')
  const active = applications[activeIndex]

  return (
    <section className="application-section" id="applications" aria-labelledby="application-title">
      <div className="application-section__inner">
        <div className="application-section__copy">
          <span className="eyebrow">04 / ONE SYSTEM, MANY EXPRESSIONS</span>
          <h2 id="application-title">
            一套视觉语言，
            <br />
            <em>适配不同数字场景。</em>
          </h2>
          <p className="application-section__description">
            同一套模块规则可以进入品牌官网、创意工作流、资产管理、软件架构和协作空间；每个场景都保留自己的构图节奏。
          </p>

          <div className="comparison-switch" role="group" aria-label="切换页面视觉对比">
            <button
              type="button"
              className={comparison === 'unified' ? 'is-active' : ''}
              aria-pressed={comparison === 'unified'}
              onClick={() => setComparison('unified')}
            >
              <Check size={13} aria-hidden="true" /> 整页同一画风
            </button>
            <button
              type="button"
              className={comparison === 'scattered' ? 'is-active' : ''}
              aria-pressed={comparison === 'scattered'}
              onClick={() => setComparison('scattered')}
            >
              对比模块失配
            </button>
          </div>

          <div className="industry-list" role="tablist" aria-label="选择产品行业方向">
            {applications.map((application, index) => (
              <button
                key={application.id}
                id={'industry-tab-' + application.id}
                className={activeIndex === index ? 'industry-tab is-active' : 'industry-tab'}
                type="button"
                role="tab"
                aria-selected={activeIndex === index}
                aria-controls="industry-panel"
                onClick={() => setActiveIndex(index)}
              >
                <span>{application.index}</span>
                <strong>{application.label}</strong>
                <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>

        <div
          className={
            'application-preview application-preview--' +
            comparison +
            ' application-preview--' +
            active.id
          }
          id="industry-panel"
          data-reveal
          role="tabpanel"
          aria-labelledby={'industry-tab-' + active.id}
          data-testid="application-preview"
          key={active.id + comparison}
        >
          <div className="application-preview__toolbar">
            <span className="application-preview__brand">
              <i /> YOYO / {active.index}
            </span>
            <span>{active.composition.toUpperCase()}</span>
            <span className="application-preview__window">
              <i />
              <i />
              <i />
            </span>
          </div>
          <div className="application-preview__canvas">
            <div className="application-preview__art">
              <img
                src={active.image}
                alt={active.imageAlt}
                width="384"
                height="256"
                loading="lazy"
              />
              <span className="application-preview__art-label">{active.label}</span>
            </div>
            <div className="application-preview__interface">
              <span className="application-preview__overline">
                {active.index} / {active.label}
              </span>
              <h3>{active.title}</h3>
              <p>{active.description}</p>
              <span className="application-preview__composition">{active.composition}</span>
              <a className="application-preview__cta" href="#experiments">
                查看对应实验 <ArrowUpRight size={13} />
              </a>
            </div>
            <div className="application-preview__folio">
              <Layers3 size={15} aria-hidden="true" />
              <span>{active.index} — 05</span>
              <strong>{active.label}</strong>
            </div>
          </div>
          <div className="application-preview__caption">
            <span>03 / 应用方向</span>
            <p>{active.description}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
