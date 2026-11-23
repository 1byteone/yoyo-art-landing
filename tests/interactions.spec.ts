import { expect, test } from '@playwright/test'

test('scroll reveals and image parallax follow scroll and reduced-motion preferences', async ({
  page,
}) => {
  await page.goto('/')

  const scene = page.locator('.hero-marquee__wall')
  const initialTranslate = await scene.evaluate((element) => getComputedStyle(element).translate)
  await page.evaluate(() => window.scrollTo(0, 260))
  await expect
    .poll(() => scene.evaluate((element) => getComputedStyle(element).translate))
    .not.toBe(initialTranslate)

  const revealTarget = page.locator('[data-reveal]').first()
  await revealTarget.scrollIntoViewIfNeeded()
  await expect(revealTarget).toHaveClass(/is-revealed/)

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect
    .poll(() => scene.evaluate((element) => getComputedStyle(element).translate))
    .toBe('none')
})

test('homepage hero keeps three moving image rails with pause and reduced-motion controls', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')

  const tracks = page.locator('.hero-marquee__track')
  await expect(tracks).toHaveCount(3)
  await expect(page.getByTestId('hero-marquee-track-upper')).toHaveAttribute(
    'data-direction',
    'left',
  )
  await expect(page.getByTestId('hero-marquee-track-middle')).toHaveAttribute(
    'data-direction',
    'right',
  )
  await expect(page.getByTestId('hero-marquee-track-lower')).toHaveAttribute(
    'data-direction',
    'left',
  )

  const upperTrack = page.getByTestId('hero-marquee-track-upper')
  const runningTransform = await upperTrack.evaluate(
    (element) => getComputedStyle(element).transform,
  )
  await expect
    .poll(() => upperTrack.evaluate((element) => getComputedStyle(element).transform))
    .not.toBe(runningTransform)

  const marquee = page.getByTestId('hero-marquee')
  const motionControl = marquee.locator('.hero-marquee__motion-control')
  await motionControl.click()
  await expect(motionControl).toHaveAttribute('aria-pressed', 'true')
  await expect
    .poll(() => upperTrack.evaluate((element) => getComputedStyle(element).animationPlayState))
    .toBe('paused')
  const pausedTransform = await upperTrack.evaluate(
    (element) => getComputedStyle(element).transform,
  )
  await page.waitForTimeout(180)
  await expect
    .poll(() => upperTrack.evaluate((element) => getComputedStyle(element).transform))
    .toBe(pausedTransform)

  await marquee.getByRole('button', { name: '继续图片滑动' }).click()
  await expect
    .poll(() => upperTrack.evaluate((element) => getComputedStyle(element).transform))
    .not.toBe(pausedTransform)

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(marquee.getByRole('button', { name: '系统设置已减少动态效果' })).toBeDisabled()
  await expect
    .poll(() => upperTrack.evaluate((element) => getComputedStyle(element).animationPlayState))
    .toBe('paused')
})

test('YOYO visual system and all six experiments are genuinely interactive', async ({ page }) => {
  const pageErrors: string[] = []
  page.on('pageerror', (error) => pageErrors.push(error.message))
  page.on('console', (message) => {
    if (message.type() === 'error') pageErrors.push(message.text())
  })

  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('让数字界面')

  await page.getByRole('tab', { name: /Modular geometry/ }).click()
  await expect(page.getByTestId('visual-principle-panel')).toContainText('可组合的几何模块')
  const accentToken = page.getByRole('button', { name: 'Accent lime #B8F32F' })
  await accentToken.click()
  await expect(accentToken).toHaveAttribute('aria-pressed', 'true')

  const compositionCanvas = page.getByTestId('composition-canvas')
  const backgroundLayer = page.getByRole('button', { name: /背景 Background/ })
  await expect(compositionCanvas.locator('.composition-canvas__background')).toHaveClass(
    /is-visible/,
  )
  await backgroundLayer.click()
  await expect(backgroundLayer).toHaveAttribute('aria-pressed', 'false')
  await expect(compositionCanvas.locator('.composition-canvas__background')).not.toHaveClass(
    /is-visible/,
  )
  await page.getByRole('button', { name: '切换到下一个空间场景' }).click()
  await expect(compositionCanvas).toHaveAttribute('data-scene', 'hero-04')
  await page.getByRole('button', { name: '选择前景：产品平台' }).click()
  await expect(page.locator('.composition-workbench__footer')).toContainText('2135 × 736')

  await page.getByRole('tab', { name: /协作空间/ }).click()
  await expect(page.getByRole('tabpanel', { name: /协作空间/ })).toContainText(
    '让每个参与者都在同一张图里。',
  )
  const inconsistentMode = page.getByRole('button', { name: '对比模块失配' })
  await inconsistentMode.click()
  await expect(inconsistentMode).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByTestId('application-preview')).toHaveClass(
    /application-preview--scattered/,
  )

  await page.getByRole('button', { name: /^空间/ }).click()
  await expect(page.locator('.gallery-tile')).toHaveCount(4)
  await page.locator('#gallery').getByRole('button', { name: /^全部/ }).click()
  await expect(page.locator('.gallery-tile')).toHaveCount(16)
  const heroMarquee = page.getByTestId('hero-marquee')
  await heroMarquee.getByRole('button', { name: '暂停图片滑动' }).click()
  await heroMarquee
    .getByRole('button', { name: /打开场景详情：模块化建造工坊/ })
    .first()
    .click()
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('heading', { name: '模块化建造工坊' })).toBeVisible()
  await expect(page.getByRole('dialog')).toContainText('object-fit')
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog')).not.toBeVisible()

  await page.getByRole('button', { name: '16 张主图' }).click()
  await expect(page.getByTestId('asset-entry')).toHaveCount(12)
  await expect(page.locator('.asset-explorer__results')).toContainText('16 项匹配')
  await page.getByRole('button', { name: '下一页资产' }).click()
  await expect(page.locator('.asset-entry')).toHaveCount(4)
  await page.getByRole('button', { name: '全部资产' }).click()
  await expect(page.locator('.asset-explorer__results')).toContainText('65 项匹配')
  await page.getByRole('searchbox', { name: '搜索资产名称、ID、路径或用途' }).fill('Warm Ivory')
  await expect(page.getByTestId('asset-entry')).toHaveCount(1)
  await page.getByTestId('asset-entry').click()
  await expect(page.getByRole('dialog')).toContainText('尚无可验证文件')
  await expect(page.getByRole('dialog').locator('img')).toHaveCount(0)
  await page.getByRole('button', { name: '关闭预览' }).click()

  await page
    .getByRole('searchbox', { name: '搜索资产名称、ID、路径或用途' })
    .fill('not-a-real-asset')
  await expect(page.getByText('没有符合条件的资产。调整搜索词或筛选条件。')).toBeVisible()
  await page.getByRole('searchbox', { name: '搜索资产名称、ID、路径或用途' }).clear()

  const poster = page.getByTestId('poster-stage')
  await page.getByRole('button', { name: '播放海报动画' }).click()
  await expect(poster).toHaveAttribute('data-playing', 'true')
  await page.getByRole('button', { name: /海报 2：交互展示舞台/ }).click()
  await expect(poster).toHaveAttribute('data-playing', 'false')
  await expect(poster).toContainText('交互展示舞台')

  await page.getByRole('tab', { name: '03 Connect' }).click()
  await expect(page.getByTestId('workflow-panel')).toContainText(
    '让模块和节点在一条清晰的关系路径上协作。',
  )
  await expect(page.getByTestId('workflow-panel')).toContainText('HERO-07')

  const board = page.getByTestId('module-board')
  const initialPlaced = await board.locator('.module-cell.is-placed').count()
  await board.getByRole('button', { name: /模块位置 01/ }).click()
  await expect(board.locator('.module-cell.is-placed')).toHaveCount(initialPlaced + 1)
  await page.getByRole('button', { name: 'Lime', exact: true }).click()
  await expect(board).toHaveAttribute('data-color', 'lime')
  await page.getByRole('button', { name: '重置构图' }).click()
  await expect(board.locator('.module-cell.is-placed')).toHaveCount(initialPlaced)

  const foreground = page.getByTestId('hero-foreground')
  const foregroundToggle = page.getByRole('button', { name: '切换前景图' })
  for (const variant of [3, 1, 2]) {
    await foregroundToggle.click()
    await expect(foreground).toHaveAttribute('data-variant', String(variant))
    await foreground.evaluate((image) => (image as HTMLImageElement).decode())
  }

  await expect(pageErrors).toEqual([])
})

test('motion and mobile navigation honor user controls', async ({ page }) => {
  await page.goto('/')
  await page.setViewportSize({ width: 390, height: 844 })

  const menu = page.locator('.site-header__menu-toggle')
  await menu.click()
  await expect(menu).toHaveAttribute('aria-expanded', 'true')
  await page
    .getByRole('navigation', { name: '主导航' })
    .getByRole('link', { name: '空间构图' })
    .click()
  await expect(page).toHaveURL(/#composition$/)
  await expect(menu).toHaveAttribute('aria-expanded', 'false')

  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(
    page.getByTestId('hero-marquee').getByRole('button', { name: '系统设置已减少动态效果' }),
  ).toBeDisabled()
  await expect(page.getByTestId('poster-stage')).toHaveAttribute('data-playing', 'false')
})

test('asset categories, status filters and source metadata stay truthful', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: '49 项辅助' }).click()
  await expect(page.locator('.asset-explorer__results')).toContainText('49 项匹配')

  await page.locator('.asset-select select').nth(1).selectOption('Missing')
  await expect(page.locator('.asset-explorer__results')).toContainText('22 项匹配')
  await expect(page.locator('.asset-status[data-status="Missing"]')).toHaveCount(12)
  await expect(page.getByTestId('asset-entry').first()).toContainText('缺失')

  await page.locator('.asset-select select').nth(1).selectOption('Integrated')
  await expect(page.locator('.asset-explorer__results')).toContainText('27 项匹配')
  await page.getByRole('button', { name: '16 张主图' }).click()
  await page.getByTestId('asset-entry').first().click()
  await expect(page.getByRole('dialog')).toContainText('384 × 256')
  await expect(page.getByRole('dialog')).toContainText('不裁切，保持完整等距场景')
})
