import { ArrowUpRight, X } from 'lucide-react'
import { useEffect, useRef } from 'react'

export interface PreviewItem {
  title: string
  description: string
  image: string | null
  imageAlt: string
  label?: string
  details?: Array<{ label: string; value: string }>
}

interface ArtworkPreviewProps {
  item: PreviewItem | null
  onClose: () => void
}

export function ArtworkPreview({ item, onClose }: ArtworkPreviewProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    if (item && !dialog.open) dialog.showModal()
    if (!item && dialog.open) dialog.close()
  }, [item])

  return (
    <dialog
      ref={dialogRef}
      className="artwork-dialog"
      aria-labelledby="artwork-dialog-title"
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose()
      }}
    >
      {item && (
        <div className="artwork-dialog__layout">
          <button
            className="icon-button artwork-dialog__close"
            type="button"
            aria-label="关闭预览"
            onClick={onClose}
          >
            <X size={19} />
          </button>
          <div
            className={
              item.image ? 'artwork-dialog__image-wrap' : 'artwork-dialog__image-wrap is-empty'
            }
          >
            {item.image ? (
              <img src={item.image} alt={item.imageAlt} width="384" height="256" />
            ) : (
              <span>主视觉素材待补</span>
            )}
          </div>
          <div className="artwork-dialog__copy">
            {item.label && <span className="eyebrow">{item.label}</span>}
            <h2 id="artwork-dialog-title">{item.title}</h2>
            <p>{item.description}</p>
            {item.details && item.details.length > 0 && (
              <dl className="artwork-dialog__details">
                {item.details.map((detail) => (
                  <div key={detail.label}>
                    <dt>{detail.label}</dt>
                    <dd>{detail.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <a href="#applications" onClick={onClose}>
              查看应用方向 <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      )}
    </dialog>
  )
}
