import { ArrowRight, Check } from 'lucide-react'
import { useState } from 'react'
import { workflowSteps } from '../data/landing-content'
import { yoyoAssets } from '../data/yoyo-assets'

export function WorkflowScene() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = workflowSteps[activeIndex]
  const activeAsset = yoyoAssets.find((asset) => asset.id === active.asset)
  if (!activeAsset) return null

  return (
    <section className="workflow-scene" id="workflow-scene" aria-labelledby="workflow-title">
      <div className="workflow-scene__inner">
        <div className="workflow-scene__heading">
          <span className="eyebrow">EXPERIMENT 05 / WORKFLOW SCENE</span>
          <h2 id="workflow-title">
            把流程关系，
            <br />
            <em>搭成可以阅读的空间。</em>
          </h2>
        </div>
        <div className="workflow-board" data-reveal>
          <div className="workflow-board__steps" role="tablist" aria-label="选择工作流步骤">
            {workflowSteps.map((step, index) => (
              <button
                type="button"
                role="tab"
                key={step.id}
                id={'workflow-tab-' + step.id}
                aria-selected={activeIndex === index}
                aria-controls="workflow-panel"
                className={activeIndex === index ? 'workflow-step is-active' : 'workflow-step'}
                onClick={() => setActiveIndex(index)}
              >
                <span>{step.number}</span>
                <strong>{step.title}</strong>
                {index < workflowSteps.length - 1 && <ArrowRight size={14} aria-hidden="true" />}
              </button>
            ))}
          </div>
          <div
            className="workflow-board__detail"
            id="workflow-panel"
            role="tabpanel"
            aria-labelledby={'workflow-tab-' + active.id}
            data-testid="workflow-panel"
          >
            <div className="workflow-board__copy">
              <span className="workflow-board__step">STEP {active.number} / 04</span>
              <h3>{active.label}</h3>
              <p>{active.description}</p>
              <span className="workflow-board__asset">
                <Check size={13} aria-hidden="true" /> {activeAsset.id.toUpperCase()} ·{' '}
                {activeAsset.title}
              </span>
            </div>
            <div className="workflow-board__image">
              <img
                src={activeAsset.path}
                alt={activeAsset.content}
                width={activeAsset.width}
                height={activeAsset.height}
              />
            </div>
          </div>
          <div className="workflow-board__footer">
            <span>COLLECT / COMPOSE / CONNECT / PUBLISH</span>
            <span>
              {activeIndex + 1} OF {workflowSteps.length}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
