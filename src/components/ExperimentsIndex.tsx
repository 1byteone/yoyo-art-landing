import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { experimentDirectory } from '../data/landing-content'

export function ExperimentsIndex() {
  return (
    <section className="experiments-index" id="experiments" aria-labelledby="experiments-title">
      <div className="experiments-index__inner">
        <div className="section-intro experiments-index__intro">
          <span className="eyebrow">05 / CREATIVE EXPERIMENTS</span>
          <div className="section-intro__row">
            <h2 id="experiments-title">
              让视觉资产，
              <br />
              <em>真正参与产品体验。</em>
            </h2>
            <p>
              六个可操作的实验，把构图、资产和交互状态放进真实浏览器体验。每项都可独立进入，不是静态示意卡片。
            </p>
          </div>
        </div>
        <nav className="experiment-index-list" aria-label="创意实验目录" data-reveal>
          {experimentDirectory.map((experiment) => (
            <a className="experiment-index-row" href={experiment.href} key={experiment.id}>
              <span className="experiment-index-row__number">{experiment.number}</span>
              <span className="experiment-index-row__title">
                <strong>{experiment.title}</strong>
                <small>{experiment.label}</small>
              </span>
              <span className="experiment-index-row__description">{experiment.description}</span>
              <span className="experiment-index-row__status">{experiment.status}</span>
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          ))}
        </nav>
        <a className="experiments-index__continue" href="#gallery">
          Enter the showcase <ArrowDownRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
