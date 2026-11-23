import { Pause, Play } from 'lucide-react'
import { useEffect, useState } from 'react'
import { yoyoAssets } from '../data/yoyo-assets'

const posterAssets = [yoyoAssets[8], yoyoAssets[10], yoyoAssets[15], yoyoAssets[1]]

export function MotionPoster() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const activeAsset = posterAssets[activeIndex]

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference = () => {
      setReducedMotion(preference.matches)
      if (preference.matches) setPlaying(false)
    }
    syncPreference()
    preference.addEventListener('change', syncPreference)
    return () => preference.removeEventListener('change', syncPreference)
  }, [])

  return (
    <section className="motion-poster" id="motion-poster" aria-labelledby="motion-poster-title">
      <div className="motion-poster__inner">
        <div className="motion-poster__copy">
          <span className="eyebrow">EXPERIMENT 04 / MOTION POSTER</span>
          <h2 id="motion-poster-title">
            让画面呼吸，
            <br />
            <em>而不是不停旋转。</em>
          </h2>
          <p>以轻微的尺度与位移表现空间层次。动画可播放、暂停，也可切换为静态海报预览。</p>
          <button
            className="brand-button brand-button--dark"
            type="button"
            aria-label={
              reducedMotion ? '系统设置已减少动态效果' : playing ? '暂停海报动画' : '播放海报动画'
            }
            aria-pressed={playing}
            disabled={reducedMotion}
            onClick={() => setPlaying((current) => !current)}
          >
            {playing ? (
              <Pause size={16} aria-hidden="true" />
            ) : (
              <Play size={16} aria-hidden="true" />
            )}
            {reducedMotion ? '动效已关闭' : playing ? '暂停海报' : '播放海报'}
          </button>
        </div>
        <div
          className={playing ? 'poster-stage is-playing' : 'poster-stage'}
          data-testid="poster-stage"
          data-playing={playing}
          data-reveal
        >
          <div className="poster-stage__frame">
            <img
              src={activeAsset.path}
              alt={activeAsset.content}
              width={activeAsset.width}
              height={activeAsset.height}
            />
            <span className="poster-stage__title">{activeAsset.title}</span>
            <span className="poster-stage__mark">
              YOYO
              <br />
              {activeAsset.id.toUpperCase()}
            </span>
            <span className="poster-stage__line" aria-hidden="true" />
          </div>
          <div className="poster-stage__selector" role="group" aria-label="选择动态海报素材">
            {posterAssets.map((asset, index) => (
              <button
                type="button"
                key={asset.id}
                aria-pressed={activeIndex === index}
                aria-label={'海报 ' + String(index + 1) + '：' + asset.title}
                className={activeIndex === index ? 'is-active' : ''}
                onClick={() => {
                  setActiveIndex(index)
                  setPlaying(false)
                }}
              >
                <img src={asset.path} alt="" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
