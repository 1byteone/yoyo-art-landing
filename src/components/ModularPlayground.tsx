import { RotateCcw } from 'lucide-react'
import { useState } from 'react'

const palette = [
  { id: 'purple', label: 'Purple', value: '#7139E8' },
  { id: 'lime', label: 'Lime', value: '#B8F32F' },
  { id: 'paper', label: 'Paper', value: '#FFFFFF' },
] as const

const initialModules = [
  false,
  true,
  false,
  true,
  true,
  false,
  false,
  true,
  false,
  true,
  false,
  false,
]

export function ModularPlayground() {
  const [modules, setModules] = useState(initialModules)
  const [colorIndex, setColorIndex] = useState(0)
  const activeColor = palette[colorIndex]
  const placedCount = modules.filter(Boolean).length

  const toggleModule = (index: number) => {
    setModules((current) =>
      current.map((placed, itemIndex) => (itemIndex === index ? !placed : placed)),
    )
  }

  return (
    <section
      className="modular-playground"
      id="modular-playground"
      aria-labelledby="modular-playground-title"
    >
      <div className="modular-playground__inner">
        <div className="modular-playground__copy">
          <span className="eyebrow">EXPERIMENT 06 / MODULAR PLAYGROUND</span>
          <h2 id="modular-playground-title">
            一个模块，
            <br />
            <em>就能改变整体节奏。</em>
          </h2>
          <p>选择色彩并放置模块。每个单元都可以单独加入或移除，重置后恢复初始构图。</p>
          <div className="module-palette" role="group" aria-label="选择模块颜色">
            {palette.map((color, index) => (
              <button
                type="button"
                key={color.id}
                aria-label={color.label}
                aria-pressed={colorIndex === index}
                className={colorIndex === index ? 'is-active' : ''}
                onClick={() => setColorIndex(index)}
              >
                <span style={{ backgroundColor: color.value }} />
              </button>
            ))}
            <strong>{activeColor.label.toUpperCase()}</strong>
          </div>
          <div className="module-playground__actions">
            <span>
              {placedCount} / {modules.length} MODULES
            </span>
            <button type="button" className="text-link" onClick={() => setModules(initialModules)}>
              <RotateCcw size={14} aria-hidden="true" /> 重置构图
            </button>
          </div>
        </div>
        <div
          className="module-board"
          data-testid="module-board"
          data-color={activeColor.id}
          data-reveal
        >
          {modules.map((placed, index) => (
            <button
              type="button"
              key={index}
              className={placed ? 'module-cell is-placed' : 'module-cell'}
              style={{ '--module-color': activeColor.value } as React.CSSProperties}
              aria-label={
                '模块位置 ' + String(index + 1).padStart(2, '0') + (placed ? '，已放置' : '，空位')
              }
              aria-pressed={placed}
              onClick={() => toggleModule(index)}
            >
              <span aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            </button>
          ))}
          <span className="module-board__axis module-board__axis--x" aria-hidden="true">
            X
          </span>
          <span className="module-board__axis module-board__axis--y" aria-hidden="true">
            Y
          </span>
        </div>
      </div>
    </section>
  )
}
