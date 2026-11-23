import { Images, Pause, Play } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { yoyoAssets } from '../data/yoyo-assets'
import type { PreviewItem } from './ArtworkPreview'

const marqueeRows = [
  { id: 'upper', direction: 'left', speed: 36, indexes: [0, 1, 2, 3, 4, 5, 6] },
  { id: 'middle', direction: 'right', speed: 32.3, indexes: [7, 8, 9, 10, 11, 12, 13] },
  { id: 'lower', direction: 'left', speed: 36, indexes: [14, 15, 0, 1, 2, 3, 4] },
] as const

const foregroundVariants = [
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

interface HeroImageWallProps {
  onPreview: (item: PreviewItem) => void
}

function MarqueeTile({
  asset,
  onPreview,
  duplicate = false,
}: {
  asset: (typeof yoyoAssets)[number]
  onPreview: HeroImageWallProps['onPreview']
  duplicate?: boolean
}) {
  const content = (
    <>
      <img src={asset.path} alt="" width={asset.width} height={asset.height} draggable={false} />
      <span className="hero-marquee__tile-caption">
        <span>{asset.id.toUpperCase()}</span>
        <strong>{asset.title}</strong>
      </span>
    </>
  )

  if (duplicate) {
    return (
      <div className="hero-marquee__tile" aria-hidden="true">
        {content}
      </div>
    )
  }

  return (
    <button
      type="button"
      className="hero-marquee__tile"
      aria-label={'打开场景详情：' + asset.title}
      onClick={() =>
        onPreview({
          title: asset.title,
          description: asset.content,
          image: asset.path,
          imageAlt: asset.content,
          label: asset.id.toUpperCase() + ' / ' + asset.category,
          details: [
            { label: 'Source', value: asset.fileName },
            { label: 'Canvas', value: asset.width + ' × ' + asset.height },
            { label: 'Recommended', value: 'object-fit: ' + asset.objectFit },
          ],
        })
      }
    >
      {content}
    </button>
  )
}

export function HeroImageWall({ onPreview }: HeroImageWallProps) {
  const wallRef = useRef<HTMLDivElement>(null)
  const [foregroundIndex, setForegroundIndex] = useState(1)
  const [isPaused, setIsPaused] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const foreground = foregroundVariants[foregroundIndex]

  useEffect(() => {
    const wall = wallRef.current
    if (!wall) return

    const tracks = [...wall.querySelectorAll<HTMLElement>('.hero-marquee__track')]
    const updateDurations = () => {
      tracks.forEach((track) => {
        const group = track.querySelector<HTMLElement>('.hero-marquee__group')
        const width = group?.offsetWidth ?? 0
        const speed = Number(track.dataset.speed) || 36
        if (!width) return
        const projectedDistance = width * Math.cos((8 * Math.PI) / 180)
        track.style.setProperty('--marquee-duration', projectedDistance / speed + 's')
      })
    }

    const resizeObserver = new ResizeObserver(updateDurations)
    tracks.forEach((track) => {
      const group = track.querySelector<HTMLElement>('.hero-marquee__group')
      if (group) resizeObserver.observe(group)
    })
    updateDurations()

    return () => resizeObserver.disconnect()
  }, [])

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
    const syncPreference = () => setReducedMotion(preference.matches)
    syncPreference()
    preference.addEventListener('change', syncPreference)
    return () => preference.removeEventListener('change', syncPreference)
  }, [])

  return (
    <div
      className={'hero-marquee' + (isPaused || reducedMotion ? ' hero-marquee--paused' : '')}
      role="region"
      aria-label="YOYO 模块化场景滑动画廊"
      data-testid="hero-marquee"
    >
      <div className="hero-marquee__wall" data-scroll-parallax="16" ref={wallRef}>
        {marqueeRows.map((row) => (
          <div className="hero-marquee__row" key={row.id}>
            <div
              className={'hero-marquee__track hero-marquee__track--' + row.direction}
              data-testid={'hero-marquee-track-' + row.id}
              data-direction={row.direction}
              data-speed={row.speed}
            >
              <div className="hero-marquee__group hero-marquee__group--primary">
                {row.indexes.map((index) => (
                  <MarqueeTile
                    key={yoyoAssets[index].id}
                    asset={yoyoAssets[index]}
                    onPreview={onPreview}
                  />
                ))}
              </div>
              <div
                className="hero-marquee__group hero-marquee__group--duplicate"
                aria-hidden="true"
              >
                {row.indexes.map((index, itemIndex) => (
                  <MarqueeTile
                    key={yoyoAssets[index].id + '-duplicate-' + itemIndex}
                    asset={yoyoAssets[index]}
                    onPreview={onPreview}
                    duplicate
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <img
        id="hero-foreground-image"
        className={'hero-marquee__foreground hero-marquee__foreground--' + (foregroundIndex + 1)}
        data-testid="hero-foreground"
        data-variant={foregroundIndex + 1}
        src={foreground.src}
        alt=""
        width={foreground.width}
        height={foreground.height}
        draggable={false}
      />

      <div className="hero-marquee__controls" aria-label="主视觉控制">
        <button
          className="icon-button hero-marquee__control"
          type="button"
          aria-label="切换前景图"
          title={'当前前景：' + foreground.label + '（' + (foregroundIndex + 1) + '/3）'}
          aria-controls="hero-foreground-image"
          onClick={() => setForegroundIndex((index) => (index + 1) % foregroundVariants.length)}
        >
          <Images size={16} aria-hidden="true" />
          <span className="hero-marquee__variant">{foregroundIndex + 1}/3</span>
        </button>
        <button
          className="icon-button hero-marquee__control hero-marquee__motion-control"
          type="button"
          aria-label={
            reducedMotion ? '系统设置已减少动态效果' : isPaused ? '继续图片滑动' : '暂停图片滑动'
          }
          title={
            reducedMotion ? '系统设置已减少动态效果' : isPaused ? '继续图片滑动' : '暂停图片滑动'
          }
          aria-pressed={isPaused || reducedMotion}
          disabled={reducedMotion}
          onClick={() => setIsPaused((paused) => !paused)}
        >
          {isPaused ? (
            <Play size={16} aria-hidden="true" />
          ) : (
            <Pause size={16} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  )
}
