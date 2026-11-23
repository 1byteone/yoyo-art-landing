import { ArrowLeft, ArrowRight, ArrowUpRight, Search } from 'lucide-react'
import { useMemo, useState } from 'react'
import { auxiliaryAssetSummary, auxiliaryAssets } from '../data/assets'
import type { AssetStatus } from '../data/assets'
import { yoyoAssets } from '../data/yoyo-assets'
import type { PreviewItem } from './ArtworkPreview'

type Scope = 'all' | 'primary' | 'auxiliary'

interface AssetRecord {
  id: string
  name: string
  scope: 'primary' | 'auxiliary'
  group: string
  path: string | null
  dimensions: string
  format: string
  transparency: string
  source: string
  usage: string
  status: AssetStatus
  bytes?: number
  description: string
}

interface AssetExplorerProps {
  onPreview: (item: PreviewItem) => void
}

const primaryRecords: AssetRecord[] = yoyoAssets.map((asset) => ({
  id: asset.id.toUpperCase(),
  name: asset.title,
  scope: 'primary',
  group: asset.category,
  path: asset.path,
  dimensions: asset.width + ' × ' + asset.height,
  format: asset.format,
  transparency: 'No',
  source: asset.fileName,
  usage: asset.usage,
  status: 'Integrated',
  bytes: asset.bytes,
  description: asset.content,
}))

const auxiliaryRecords: AssetRecord[] = auxiliaryAssets.map((asset) => ({
  id: 'AUX-' + asset.id,
  name: asset.name,
  scope: 'auxiliary',
  group: asset.group,
  path: asset.paths[0] ?? null,
  dimensions: asset.dimensions ?? '未提供',
  format: asset.format ?? '未提供',
  transparency:
    asset.transparency === 'yes' ? 'Yes' : asset.transparency === 'no' ? 'No' : asset.transparency,
  source: asset.source ?? '尚无可验证文件',
  usage: asset.intendedSection + ' / ' + asset.layer,
  status: asset.status,
  description: asset.paths.length
    ? '当前项目中已登记此资产路径。该条目不代表它拥有独立于源素材的新图像文件。'
    : '当前项目中未找到该项独立素材；不使用相近图片代替。',
}))

const assetRecords = [...primaryRecords, ...auxiliaryRecords]
const scopes: Array<{ id: Scope; label: string }> = [
  { id: 'all', label: '全部资产' },
  { id: 'primary', label: '16 张主图' },
  { id: 'auxiliary', label: '49 项辅助' },
]
const statusLabels: AssetStatus[] = [
  'Available',
  'Integrated',
  'Needs Optimization',
  'Missing',
  'Rejected',
]

function statusLabel(status: AssetStatus) {
  const labels: Record<AssetStatus, string> = {
    Available: '可用',
    Integrated: '已接入',
    'Needs Optimization': '待优化',
    Missing: '缺失',
    Rejected: '不采用',
  }
  return labels[status]
}

export function AssetExplorer({ onPreview }: AssetExplorerProps) {
  const [scope, setScope] = useState<Scope>('all')
  const [query, setQuery] = useState('')
  const [group, setGroup] = useState('all')
  const [status, setStatus] = useState<'all' | AssetStatus>('all')
  const [page, setPage] = useState(0)
  const pageSize = 12

  const groups = useMemo(
    () => [
      ...new Set(
        assetRecords
          .filter((item) => scope === 'all' || item.scope === scope)
          .map((item) => item.group),
      ),
    ],
    [scope],
  )
  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase()
    return assetRecords.filter((item) => {
      const matchesScope = scope === 'all' || item.scope === scope
      const matchesGroup = group === 'all' || item.group === group
      const matchesStatus = status === 'all' || item.status === status
      const searchable = [item.id, item.name, item.source, item.usage, item.group]
        .join(' ')
        .toLocaleLowerCase()
      return (
        matchesScope &&
        matchesGroup &&
        matchesStatus &&
        (!normalizedQuery || searchable.includes(normalizedQuery))
      )
    })
  }, [group, query, scope, status])
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const visibleRecords = filtered.slice(page * pageSize, (page + 1) * pageSize)

  const changeScope = (nextScope: Scope) => {
    setScope(nextScope)
    setGroup('all')
    setPage(0)
  }

  const openAsset = (asset: AssetRecord) => {
    onPreview({
      title: asset.name,
      description: asset.description,
      image: asset.path,
      imageAlt: asset.path ? asset.name : '',
      label: asset.id + ' / ' + statusLabel(asset.status),
      details: [
        { label: '资产类别', value: asset.scope === 'primary' ? '主视觉' : asset.group },
        { label: '路径 / 来源', value: asset.path ?? asset.source },
        { label: '尺寸 / 格式', value: asset.dimensions + ' / ' + asset.format },
        { label: '透明通道', value: asset.transparency },
        { label: '用途 / 图层', value: asset.usage },
        { label: '接入状态', value: statusLabel(asset.status) },
        ...(asset.bytes
          ? [{ label: '文件大小', value: Math.round(asset.bytes / 1024) + ' KB' }]
          : []),
        ...(asset.scope === 'primary'
          ? [
              { label: 'object-fit', value: 'contain' },
              { label: '裁切建议', value: '不裁切，保持完整等距场景' },
            ]
          : []),
      ],
    })
  }

  return (
    <section className="asset-explorer" id="assets" aria-labelledby="asset-explorer-title">
      <div className="asset-explorer__inner">
        <div className="section-intro asset-explorer__intro">
          <span className="eyebrow">05 / VISUAL ASSET EXPLORER</span>
          <div className="section-intro__row">
            <h2 id="asset-explorer-title">
              每一项素材，
              <br />
              <em>都有来源与状态。</em>
            </h2>
            <p>
              主图和辅助资产共用可检索目录。路径、尺寸、透明度与接入状态基于当前项目文件核对；不存在的资源会明确显示为缺失。
            </p>
          </div>
        </div>

        <div className="asset-explorer__summary" aria-label="资产数量摘要">
          <div>
            <strong>{yoyoAssets.length}</strong>
            <span>PRIMARY ILLUSTRATIONS</span>
          </div>
          <div>
            <strong>{auxiliaryAssets.length}</strong>
            <span>AUXILIARY ENTRIES</span>
          </div>
          <div>
            <strong>{auxiliaryAssetSummary.Missing}</strong>
            <span>MISSING AUXILIARY</span>
          </div>
          <div>
            <strong>{auxiliaryAssetSummary.Integrated}</strong>
            <span>INTEGRATED AUXILIARY</span>
          </div>
        </div>

        <div className="asset-explorer__toolbar" data-reveal>
          <div className="asset-scope" role="group" aria-label="选择资产范围">
            {scopes.map((item) => (
              <button
                type="button"
                key={item.id}
                aria-pressed={scope === item.id}
                className={scope === item.id ? 'is-active' : ''}
                onClick={() => changeScope(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <label className="asset-search">
            <Search size={16} aria-hidden="true" />
            <span className="sr-only">搜索资产名称、ID、路径或用途</span>
            <input
              type="search"
              value={query}
              placeholder="搜索名称、ID、路径或用途"
              onChange={(event) => {
                setQuery(event.currentTarget.value)
                setPage(0)
              }}
            />
          </label>
          <label className="asset-select">
            <span>类别</span>
            <select
              value={group}
              onChange={(event) => {
                setGroup(event.currentTarget.value)
                setPage(0)
              }}
            >
              <option value="all">全部类别</option>
              {groups.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>
          <label className="asset-select">
            <span>状态</span>
            <select
              value={status}
              onChange={(event) => {
                setStatus(event.currentTarget.value as 'all' | AssetStatus)
                setPage(0)
              }}
            >
              <option value="all">全部状态</option>
              {statusLabels.map((item) => (
                <option key={item} value={item}>
                  {statusLabel(item)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="asset-explorer__results" aria-live="polite">
          <span>{filtered.length} 项匹配</span>
          <span>文件总量 19 个独立资源文件（不含源联系表）</span>
        </div>
        {visibleRecords.length ? (
          <div className="asset-grid" data-testid="asset-grid">
            {visibleRecords.map((asset) => (
              <button
                type="button"
                key={asset.id}
                className="asset-entry"
                data-testid="asset-entry"
                onClick={() => openAsset(asset)}
              >
                <span
                  className={
                    asset.path ? 'asset-entry__preview' : 'asset-entry__preview is-missing'
                  }
                >
                  {asset.path ? (
                    <img src={asset.path} alt="" loading="lazy" />
                  ) : (
                    <span>NO FILE</span>
                  )}
                  <span className="asset-entry__id">{asset.id}</span>
                </span>
                <span className="asset-entry__meta">
                  <strong>{asset.name}</strong>
                  <span>
                    {asset.group} · {asset.dimensions}
                  </span>
                  <span className="asset-status" data-status={asset.status}>
                    {statusLabel(asset.status)}
                  </span>
                </span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </button>
            ))}
          </div>
        ) : (
          <p className="asset-empty">没有符合条件的资产。调整搜索词或筛选条件。</p>
        )}

        <div className="asset-pagination">
          <span>
            PAGE {String(page + 1).padStart(2, '0')} / {String(pageCount).padStart(2, '0')}
          </span>
          <div>
            <button
              type="button"
              className="icon-button"
              aria-label="上一页资产"
              disabled={page === 0}
              onClick={() => setPage((current) => Math.max(0, current - 1))}
            >
              <ArrowLeft size={15} aria-hidden="true" />
            </button>
            <button
              type="button"
              className="icon-button"
              aria-label="下一页资产"
              disabled={page + 1 >= pageCount}
              onClick={() => setPage((current) => Math.min(pageCount - 1, current + 1))}
            >
              <ArrowRight size={15} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
