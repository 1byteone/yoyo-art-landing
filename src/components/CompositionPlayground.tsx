import { ArrowLeft, ArrowRight, Check, Layers3 } from 'lucide-react'
import { useState } from 'react'
import { yoyoAssets } from '../data/yoyo-assets'

const scenes = [yoyoAssets[0], yoyoAssets[3], yoyoAssets[14], yoyoAssets[6]]
const foregrounds = [
  {
    label: '方块岛屿',
    src: '/assets/foreground/yoyo-modular-foreground.webp',
    width: 1536,
    height: 1024,
  },
  {
    label: '花园平台',
    src: '/assets/foreground/yoyo-foreground-variant-2.png',
    width: 2135,
    height: 736,
  },
  {
    label: '产品平台',
    src: '/assets/foreground/yoyo-foreground-variant-3.png',
    width: 2135,
    height: 736,
  },
] as const

const layerOptions = [
  { id: 'background', label: 'Background', name: '背景' },
  { id: 'midground', label: 'Midground', name: '主体场景' },
  { id: 'foreground', label: 'Foreground', name: '前景' },
  { id: 'decoration', label: 'Annotation', name: '构图标记' },
] as const

type LayerId = (typeof layerOptions)[number]['id']

export function CompositionPlayground() {
  const [sceneIndex, setSceneIndex] = useState(0)
  const [foregroundIndex, setForegroundIndex] = useState(1)
  const [layers, setLayers] = useState<Record<LayerId, boolean>>({
    background: true,
    midground: true,
    foreground: true,
    decoration: true,
  })
  const scene = scenes[sceneIndex]
  const foreground = foregrounds[foregroundIndex]

  const toggleLayer = (layer: LayerId) => {
    setLayers((current) => ({ ...current, [layer]: !current[layer] }))
  }

  return (
    <section className="composition-section" id="composition" aria-labelledby="composition-title">
      <div className="composition-section__inner">
        <div className="section-intro composition-section__intro">
          <span className="eyebrow">03 / SPATIAL COMPOSITION</span>
          <div className="section-intro__row">
            <h2 id="composition-title">
              不只是插画，
              <br />
              <em>而是可以进入的空间。</em>
            </h2>
            <p>
              真实的主图与透明前景素材共同构成场景。切换图层，观察视觉焦点、遮挡和空间关系如何变化。
            </p>
          </div>
        </div>

        <div className="composition-workbench" data-reveal>
          <div className="composition-workbench__toolbar">
            <div className="composition-workbench__identity">
              <Layers3 size={17} aria-hidden="true" />
              <span>SCENE BUILDER</span>
              <i />
              <strong>{scene.id.toUpperCase()}</strong>
            </div>
            <div className="composition-workbench__scene-controls">
              <button
                type="button"
                className="icon-button"
                aria-label="切换到上一个空间场景"
                onClick={() =>
                  setSceneIndex((index) => (index + scenes.length - 1) % scenes.length)
                }
              >
                <ArrowLeft size={15} aria-hidden="true" />
              </button>
              <button
                type="button"
                className="icon-button"
                aria-label="切换到下一个空间场景"
                onClick={() => setSceneIndex((index) => (index + 1) % scenes.length)}
              >
                <ArrowRight size={15} aria-hidden="true" />
              </button>
            </div>
          </div>

          <div className="composition-workbench__body">
            <div
              className="composition-canvas"
              data-testid="composition-canvas"
              data-scene={scene.id}
            >
              <div
                className={
                  layers.background
                    ? 'composition-canvas__background is-visible'
                    : 'composition-canvas__background'
                }
              />
              <div
                className={
                  layers.midground
                    ? 'composition-canvas__midground is-visible'
                    : 'composition-canvas__midground'
                }
              >
                <img
                  src={scene.path}
                  alt={scene.content}
                  width="384"
                  height="256"
                  data-scroll-parallax="20"
                />
              </div>
              <div
                className={
                  layers.foreground
                    ? 'composition-canvas__foreground is-visible'
                    : 'composition-canvas__foreground'
                }
              >
                <img
                  src={foreground.src}
                  alt=""
                  width={foreground.width}
                  height={foreground.height}
                />
              </div>
              <div
                className={
                  layers.decoration
                    ? 'composition-canvas__annotation is-visible'
                    : 'composition-canvas__annotation'
                }
              >
                <span className="composition-canvas__marker composition-canvas__marker--one">
                  01 / SUBJECT
                </span>
                <span className="composition-canvas__marker composition-canvas__marker--two">
                  02 / DEPTH
                </span>
                <span className="composition-canvas__cross composition-canvas__cross--one" />
                <span className="composition-canvas__cross composition-canvas__cross--two" />
              </div>
              <div className="composition-canvas__coordinates" aria-hidden="true">
                X 00—100 / Z 00—04
              </div>
            </div>

            <aside className="composition-controls" aria-label="空间场景图层">
              <span className="eyebrow">LAYER STACK</span>
              <h3>{scene.title}</h3>
              <p>{scene.content}</p>
              <div className="composition-layer-list">
                {layerOptions.map((layer, index) => (
                  <button
                    type="button"
                    key={layer.id}
                    className={
                      layers[layer.id] ? 'composition-layer is-visible' : 'composition-layer'
                    }
                    aria-pressed={layers[layer.id]}
                    onClick={() => toggleLayer(layer.id)}
                  >
                    <span className="composition-layer__number">0{index + 1}</span>
                    <span className="composition-layer__copy">
                      <strong>{layer.name}</strong>
                      <small>{layer.label}</small>
                    </span>
                    <span className="composition-layer__check" aria-hidden="true">
                      {layers[layer.id] && <Check size={13} />}
                    </span>
                  </button>
                ))}
              </div>
              <div className="composition-controls__foreground">
                <span>前景素材</span>
                {foregrounds.map((item, index) => (
                  <button
                    type="button"
                    key={item.src}
                    className={foregroundIndex === index ? 'is-active' : ''}
                    aria-pressed={foregroundIndex === index}
                    aria-label={'选择前景：' + item.label}
                    onClick={() => setForegroundIndex(index)}
                  >
                    {index + 1}
                  </button>
                ))}
                <strong>{foreground.label}</strong>
              </div>
            </aside>
          </div>
          <div className="composition-workbench__footer">
            <span>
              ISOMETRIC ASSET / {scene.width} × {scene.height}
            </span>
            <span>
              TRANSPARENT FOREGROUND / {foreground.width} × {foreground.height}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
