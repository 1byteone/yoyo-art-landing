import { ArrowRight } from 'lucide-react'

export function ClosingSection() {
  return (
    <section className="closing-wrap" id="contact" aria-labelledby="closing-title">
      <div className="closing">
        <span className="closing__eyebrow">YOYO / BUILD · CONNECT · GROW</span>
        <h2 id="closing-title">
          下一次，
          <br />
          <em>从一个模块，开始构建世界。</em>
        </h2>
        <p>让模块化视觉、清晰的空间秩序与前端交互共同塑造数字体验。</p>
        <a className="closing__button" href="#assets">
          探索 YOYO 资产 <ArrowRight size={15} aria-hidden="true" />
        </a>
        <span className="closing__seal" aria-hidden="true">
          Y
        </span>
      </div>
    </section>
  )
}
