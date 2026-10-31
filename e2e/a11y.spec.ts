import AxeBuilder from '@axe-core/playwright'
import { expect, test, type Page } from '@playwright/test'

const freshRoutes = ['#/welcome', '#/onboarding', '#/dashboard']
const demoRoutes = [
  '#/dashboard',
  '#/levels',
  '#/levels/2',
  '#/levels/4',
  '#/lessons/s6',
  '#/levels/2/quiz',
  '#/levels/2/project',
  '#/challenges/c1',
  '#/plan',
  '#/stats',
  '#/achievements',
  '#/resources',
  '#/workspace',
  '#/case-study',
  '#/wiki',
  '#/settings',
  '#/onboarding/result',
  '#/nope',
]

async function audit(page: Page, route: string) {
  await page.goto(route)
  await page.waitForLoadState('networkidle')
  // Secondary pages load lazily; audit the rendered page, not the loading state.
  await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible()
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze()
  const summary = result.violations.map(
    (v) => `${route} ${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`,
  )
  return summary
}

for (const scheme of ['light', 'dark'] as const) {
  test(`axe finds no WCAG AA violations (${scheme})`, async ({ page }) => {
    test.setTimeout(120_000)
    await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' })
    const found: string[] = []
    for (const r of freshRoutes) found.push(...(await audit(page, r)))
    await page.goto('')
    await page.getByRole('button', { name: 'Explore with sample progress' }).click()
    await page.waitForLoadState('networkidle')
    for (const r of demoRoutes) found.push(...(await audit(page, r)))
    expect(found).toEqual([])
  })
}
