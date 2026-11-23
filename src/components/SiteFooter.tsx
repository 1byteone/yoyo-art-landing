import { ArrowUpRight } from 'lucide-react'

const footerLinks = [
  { href: '#top', label: 'About' },
  { href: '#style', label: 'Visual System' },
  { href: '#experiments', label: 'Experiments' },
  { href: '#assets', label: 'Asset Library' },
  { href: '#applications', label: '应用方向' },
]

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <a className="wordmark wordmark--footer" href="#top" aria-label="YOYO，返回页面顶部">
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
        <nav className="site-footer__links" aria-label="页脚导航">
          {footerLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label} <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          ))}
        </nav>
        <span className="site-footer__copyright">
          © {new Date().getFullYear()} YOYO VISUAL SYSTEM
        </span>
      </div>
    </footer>
  )
}
