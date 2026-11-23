import { expect, test } from '@playwright/test'
import { mkdirSync } from 'node:fs'

const round = process.env.SCREENSHOT_ROUND ?? 'yoyo-rebuild'
const output = 'artifacts/after/' + round
const viewports = [
  { name: 'desktop-1920', width: 1920, height: 1080 },
  { name: 'desktop-1440', width: 1440, height: 900 },
  { name: 'desktop-1280', width: 1280, height: 800 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-390', width: 390, height: 844 },
]

test('YOYO editorial composition fits five target viewports and produces visual evidence', async ({
  page,
}) => {
  const pageErrors: string[] = []
  page.on('pageerror', (error) => pageErrors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') pageErrors.push(message.text())
  })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  mkdirSync(output, { recursive: true })

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })
    await page.goto('/')
    await page.evaluate(() => document.fonts.ready)
    await expect(page).toHaveTitle(/YOYO/)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('自己的视觉世界')
    await expect(page.getByRole('heading', { name: /每一个模块/ })).toBeAttached()
    await expect(page.getByRole('heading', { name: /不只是插画/ })).toBeAttached()
    await expect(page.getByRole('heading', { name: /适配不同数字场景/ })).toBeAttached()
    await expect(page.getByRole('heading', { name: /真正参与产品体验/ })).toBeAttached()

    await page
      .locator('.hero-marquee__group--primary img')
      .evaluateAll((images) =>
        Promise.all(images.map((image) => (image as HTMLImageElement).decode())),
      )
    await page
      .locator('#hero-foreground-image')
      .evaluate((image) => (image as HTMLImageElement).decode())

    const layout = await page.evaluate(() => {
      const selectors = [
        '.site-header',
        '.hero-brand',
        '.visual-dna',
        '.composition-section',
        '.application-section',
        '.experiments-index',
        '.gallery-archive',
        '.asset-explorer',
        '.motion-poster',
        '.workflow-scene',
        '.modular-playground',
        '.closing',
        '.site-footer',
      ]
      const sections = Object.fromEntries(
        selectors.map((selector) => {
          const node = document.querySelector<HTMLElement>(selector)
          if (!node) return [selector, null]
          const rect = node.getBoundingClientRect()
          return [
            selector,
            { x: rect.x, y: rect.y + window.scrollY, width: rect.width, height: rect.height },
          ]
        }),
      )
      const galleryGrid = document.querySelector<HTMLElement>('.gallery-grid')
      const heroMarquee = document.querySelector<HTMLElement>('.hero-marquee')
      const heroMarqueeBounds = heroMarquee?.getBoundingClientRect()
      const firstHeroRow = document.querySelector<HTMLElement>('.hero-marquee__row')
      return {
        viewport: window.innerWidth,
        viewportHeight: window.innerHeight,
        documentWidth: document.documentElement.scrollWidth,
        documentHeight: document.documentElement.scrollHeight,
        heroMarquee: heroMarqueeBounds
          ? {
              x: heroMarqueeBounds.x,
              y: heroMarqueeBounds.y,
              width: heroMarqueeBounds.width,
              firstRowTop: firstHeroRow?.getBoundingClientRect().top,
            }
          : null,
        gallery: galleryGrid
          ? {
              display: getComputedStyle(galleryGrid).display,
              columns: getComputedStyle(galleryGrid).gridTemplateColumns.split(' ').length,
              secondTileWidth: galleryGrid.children[1]?.getBoundingClientRect().width,
            }
          : null,
        sections,
      }
    })
    console.log(viewport.name + ' layout:', JSON.stringify(layout))
    expect(layout.documentWidth).toBeLessThanOrEqual(viewport.width)
    expect(layout.heroMarquee?.x).toBe(0)
    expect(layout.heroMarquee?.width).toBe(viewport.width)
    expect(layout.heroMarquee?.firstRowTop).toBeLessThan(viewport.height * 0.5)
    expect(layout.gallery?.display).toBe('grid')
    expect(layout.gallery?.columns).toBe(viewport.width <= 700 ? 2 : 12)
    expect(layout.gallery?.secondTileWidth).toBeLessThan(viewport.width * 0.7)
    for (const [selector, bounds] of Object.entries(layout.sections)) {
      expect(bounds, selector + ' should exist').not.toBeNull()
      if (bounds)
        expect(bounds.width, selector + ' should remain within the viewport').toBeLessThanOrEqual(
          viewport.width + 1,
        )
    }

    await page.locator('img').evaluateAll(async (nodes) => {
      const images = nodes as HTMLImageElement[]
      images.forEach((image) => (image.loading = 'eager'))
      await Promise.all(images.map((image) => image.decode()))
    })

    const screenshot = output + '/' + viewport.name + '.png'
    await page.screenshot({ path: screenshot, animations: 'disabled' })
    if (viewport.name === 'desktop-1440') {
      await page.screenshot({
        path: output + '/desktop-1440-fullpage.png',
        fullPage: true,
        animations: 'disabled',
      })
    }
    if (viewport.name === 'mobile-390') {
      await page.screenshot({
        path: output + '/mobile-390-fullpage.png',
        fullPage: true,
        animations: 'disabled',
      })
    }
  }
  expect(pageErrors).toEqual([])
})

test('all sixteen source scenes and three foreground files decode without destructive cropping', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')

  const heroImages = await page.locator('.hero-marquee__group--primary img').evaluateAll((nodes) =>
    nodes.map((node) => {
      const image = node as HTMLImageElement
      return {
        source: new URL(image.src).pathname,
        loaded: image.complete && image.naturalWidth > 0,
        fit: getComputedStyle(image).objectFit,
      }
    }),
  )
  expect(heroImages).toHaveLength(21)
  expect(new Set(heroImages.map((asset) => asset.source)).size).toBe(16)
  expect(heroImages.every((asset) => asset.loaded && asset.fit === 'contain')).toBe(true)

  for (const image of await page.locator('#gallery img').all()) {
    await image.scrollIntoViewIfNeeded()
    await image.evaluate((element) => (element as HTMLImageElement).decode())
  }

  const galleryAssets = await page.locator('#gallery img').evaluateAll((nodes) =>
    nodes.map((node) => {
      const image = node as HTMLImageElement
      return {
        source: new URL(image.src).pathname,
        loaded: image.complete && image.naturalWidth > 0,
        fit: getComputedStyle(image).objectFit,
      }
    }),
  )
  expect(galleryAssets).toHaveLength(16)
  expect(new Set(galleryAssets.map((asset) => asset.source)).size).toBe(16)
  expect(galleryAssets.every((asset) => asset.loaded && asset.fit === 'contain')).toBe(true)

  const foreground = page.getByTestId('hero-foreground')
  const toggle = page.getByRole('button', { name: '切换前景图' })
  const sources = new Set<string>()
  for (const variant of [3, 1, 2]) {
    await toggle.click()
    await expect(foreground).toHaveAttribute('data-variant', String(variant))
    await foreground.evaluate((image) => (image as HTMLImageElement).decode())
    sources.add(
      await foreground.evaluate((image) => new URL((image as HTMLImageElement).src).pathname),
    )
  }
  expect(sources).toEqual(
    new Set([
      '/assets/foreground/yoyo-modular-foreground.webp',
      '/assets/foreground/yoyo-foreground-variant-2.png',
      '/assets/foreground/yoyo-foreground-variant-3.png',
    ]),
  )
})
