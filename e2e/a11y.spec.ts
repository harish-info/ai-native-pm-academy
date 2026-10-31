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

async function chooseTheme(page: Page, scheme: 'light' | 'dark', demo = false) {
  await page.goto('#/settings')
  await page
    .getByRole('radio', { name: scheme === 'light' ? /Light Always/ : /Dark Always/ })
    .check()
  await expect(page.locator('html')).toHaveClass(scheme === 'dark' ? /dark/ : /^$/)
  // A document navigation can interrupt an IndexedDB write. Wait for the chosen theme to save.
  await expect
    .poll(() =>
      page.evaluate(
        (db) =>
          new Promise<string>((resolve, reject) => {
            const open = indexedDB.open(db)
            open.onerror = () => reject(open.error)
            open.onsuccess = () => {
              const req = open.result.transaction('kv').objectStore('kv').get('learner')
              req.onsuccess = () => {
                open.result.close()
                resolve(req.result?.settings.theme ?? 'dark')
              }
              req.onerror = () => reject(req.error)
            }
          }),
        demo ? 'ai-native-pm-academy-demo' : 'ai-native-pm-academy',
      ),
    )
    .toBe(scheme)
}

async function audit(page: Page, route: string, scheme: 'light' | 'dark') {
  await page.goto(route)
  await page.waitForLoadState('networkidle')
  // Secondary pages load lazily; audit the rendered page, not the loading state.
  await expect(page.getByRole('heading', { level: 1 }).first()).toBeVisible()
  await expect(page.locator('html')).toHaveClass(scheme === 'dark' ? /dark/ : /^$/)
  await expect(page.locator('body')).toHaveCSS(
    'color',
    scheme === 'dark' ? 'rgb(236, 238, 240)' : 'rgb(29, 33, 38)',
  )
  await expect(page.getByRole('heading', { level: 1 }).first()).toHaveCSS(
    'color',
    scheme === 'dark' ? 'rgb(236, 238, 240)' : 'rgb(29, 33, 38)',
  )
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
    .analyze()
  const summary = result.violations.map(
    (v) =>
      `${route} ${v.id}: ${v.nodes.map((n) => `${n.target.join(' ')} ${n.failureSummary}`).join(', ')}`,
  )
  return summary
}

for (const scheme of ['light', 'dark'] as const) {
  test(`axe finds no WCAG AA violations (${scheme})`, async ({ page }) => {
    test.setTimeout(120_000)
    await page.emulateMedia({ colorScheme: scheme, reducedMotion: 'reduce' })
    await chooseTheme(page, scheme)
    const found: string[] = []
    for (const r of freshRoutes) found.push(...(await audit(page, r, scheme)))
    await page.goto('')
    await page.getByRole('button', { name: 'Explore with sample progress' }).click()
    await page.waitForLoadState('networkidle')
    await chooseTheme(page, scheme, true)
    for (const r of demoRoutes) found.push(...(await audit(page, r, scheme)))
    expect(found).toEqual([])
  })
}
