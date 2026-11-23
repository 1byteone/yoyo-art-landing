import { useEffect } from 'react'

export function ScrollReveal() {
  useEffect(() => {
    const revealNodes = [...document.querySelectorAll<HTMLElement>('[data-reveal]')]
    const parallaxNodes = [...document.querySelectorAll<HTMLElement>('[data-scroll-parallax]')]
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let observer: IntersectionObserver | null = null
    let animationFrame = 0

    const updateParallax = () => {
      animationFrame = 0
      const viewportCenter = window.innerHeight / 2
      parallaxNodes.forEach((node) => {
        const rect = node.getBoundingClientRect()
        const distance =
          (rect.top + rect.height / 2 - viewportCenter) / (viewportCenter + rect.height / 2)
        const progress = Math.max(-1, Math.min(1, distance))
        const strength = Number(node.dataset.scrollParallax) || 0
        node.style.setProperty('--scroll-offset', (-progress * strength).toFixed(2) + 'px')
      })
    }

    const scheduleParallax = () => {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(updateParallax)
    }

    const stopMotion = () => {
      observer?.disconnect()
      observer = null
      window.removeEventListener('scroll', scheduleParallax)
      window.removeEventListener('resize', scheduleParallax)
      if (animationFrame) window.cancelAnimationFrame(animationFrame)
      animationFrame = 0
      parallaxNodes.forEach((node) => node.style.removeProperty('--scroll-offset'))
    }

    const startMotion = () => {
      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(
          (entries, currentObserver) => {
            entries.forEach((entry) => {
              if (!entry.isIntersecting) return
              entry.target.classList.add('is-revealed')
              currentObserver.unobserve(entry.target)
            })
          },
          { threshold: 0.08, rootMargin: '0px 0px -32px 0px' },
        )
        revealNodes.forEach((node) => observer?.observe(node))
      } else {
        revealNodes.forEach((node) => node.classList.add('is-revealed'))
      }
      window.addEventListener('scroll', scheduleParallax, { passive: true })
      window.addEventListener('resize', scheduleParallax)
      scheduleParallax()
    }

    const syncMotionPreference = () => {
      stopMotion()
      if (reduceMotion.matches) {
        revealNodes.forEach((node) => node.classList.add('is-revealed'))
      } else {
        startMotion()
      }
    }

    syncMotionPreference()
    reduceMotion.addEventListener('change', syncMotionPreference)
    return () => {
      stopMotion()
      reduceMotion.removeEventListener('change', syncMotionPreference)
    }
  }, [])

  return null
}
