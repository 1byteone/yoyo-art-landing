import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'

const links = [
  { href: '#style', label: '视觉基因' },
  { href: '#composition', label: '空间构图' },
  { href: '#applications', label: '行业方向' },
  { href: '#experiments', label: '创意实验' },
]

export function SiteNavigation() {
  const [menuOpen, setMenuOpen] = useState(false)
  const closeMenu = () => setMenuOpen(false)

  return (
    <header className="site-header">
      <a className="wordmark" href="#top" aria-label="YOYO，返回首页" onClick={closeMenu}>
        <span className="wordmark__symbol" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        <span>
          YOYO<span className="wordmark__period">.</span>
        </span>
      </a>
      <button
        className="icon-button site-header__menu-toggle"
        type="button"
        aria-label={menuOpen ? '关闭导航菜单' : '打开导航菜单'}
        aria-expanded={menuOpen}
        aria-controls="primary-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={18} /> : <Menu size={18} />}
      </button>
      <nav
        id="primary-navigation"
        className={menuOpen ? 'site-nav is-open' : 'site-nav'}
        aria-label="主导航"
      >
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={closeMenu}>
            {link.label}
          </a>
        ))}
        <a className="site-nav__contact" href="#assets" onClick={closeMenu}>
          浏览资产 <ArrowUpRight size={13} aria-hidden="true" />
        </a>
      </nav>
    </header>
  )
}
