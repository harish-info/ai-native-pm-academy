import { expect, test, type Page } from '@playwright/test'

async function answerEveryFieldset(page: Page) {
  const sets = page.locator('fieldset')
  const n = await sets.count()
  for (let i = 0; i < n; i++) {
    const radios = sets.nth(i).getByRole('radio')
    if (await radios.count()) await radios.first().check()
  }
}

/** Reads the saved learner record straight from IndexedDB. */
function storedData(page: Page) {
  return page.evaluate(
    () =>
      new Promise<Record<string, unknown> | undefined>((resolve, reject) => {
        const open = indexedDB.open('ai-native-pm-academy')
        open.onerror = () => reject(open.error)
        open.onsuccess = () => {
          const req = open.result.transaction('kv').objectStore('kv').get('learner')
          req.onsuccess = () => {
            open.result.close()
            resolve(req.result)
          }
          req.onerror = () => reject(req.error)
        }
      }),
  )
}

test('landing page loads at the base path', async ({ page }) => {
  await page.goto('')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('knows what to build')
  await expect(page.getByRole('link', { name: 'Start with a 10-minute diagnostic' })).toBeVisible()
})

test('onboarding produces a personalized path', async ({ page }) => {
  await page.goto('#/onboarding')
  await page.getByRole('button', { name: 'Continue' }).click()
  await expect(page.getByRole('alert')).toContainText('Please answer')

  await answerEveryFieldset(page)
  await page.getByRole('button', { name: 'Continue' }).click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('How confident are you today?')
  await answerEveryFieldset(page)
  await page.getByRole('button', { name: 'Continue' }).click()
  await answerEveryFieldset(page)
  await page.getByRole('button', { name: 'See my results' }).click()

  await expect(page.getByRole('heading', { level: 1 })).toContainText(/here is your path/i)
  await expect(page.getByText('Recommended start')).toBeVisible()
  await expect(page.getByRole('link', { name: /Start session/ })).toBeVisible()

  await page.goto('')
  await expect(page).toHaveURL(/#\/dashboard$/)
})

test('a session completes only with evidence and stays complete after refresh', async ({
  page,
}) => {
  await page.goto('#/lessons/s1')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  const complete = page.getByRole('button', { name: 'Mark complete' })
  await expect(complete).toBeDisabled()

  for (const box of await page.getByRole('checkbox').all()) await box.check()
  await page
    .getByLabel('Reflection', { exact: true })
    .fill('Tokens are chunks of text, and long contexts degrade in the middle.')
  await page.getByLabel('Artifact reference').fill('learning/how-llms-work.md')
  await page.getByLabel('Minutes').fill('45')
  await page.getByRole('button', { name: 'Add time' }).click()
  await expect(page.getByText(/Logged for this item/)).toContainText('45')

  await complete.click()
  await expect(page.getByText(/Completed on/)).toBeVisible()
  // Reloading mid-write aborts the IndexedDB transaction, so wait for the save to land first.
  await expect
    .poll(async () => {
      const data = await storedData(page)
      return (data?.lessons as Record<string, { completedAt?: string }> | undefined)?.s1
        ?.completedAt
    })
    .toBeTruthy()
  await page.reload()
  await expect(page.getByText(/Completed on/)).toBeVisible()
})

test('the study plan starts today, switches pace and keeps both after a refresh', async ({
  page,
}) => {
  await page.goto('#/plan')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('starting when you are ready')
  await page.getByRole('button', { name: 'Start Week 1 today' }).click()
  await expect(page.locator('#main').getByText('This week', { exact: true })).toBeVisible()
  await page.getByRole('radio', { name: /Light: 12 weeks/ }).check()
  await expect
    .poll(async () => ((await storedData(page))?.settings as Record<string, unknown>)?.planPace)
    .toBe('light')
  await page.reload()
  await expect(page.getByRole('radio', { name: /Light: 12 weeks/ })).toBeChecked()
  await expect(page.getByLabel('Start date', { exact: true })).not.toHaveValue('')
  const settings = (await storedData(page))?.settings as Record<string, unknown>
  expect(settings.planPace).toBe('light')
  expect(settings.planStart).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  await expect(page.getByText('What the mentor does:')).toHaveCount(8)
})

test('nested routes survive a refresh', async ({ page }) => {
  await page.goto('#/levels/3')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Discover and decide')
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Discover and decide')
  await page.goto('#/does-not-exist')
  await expect(page.getByText('Page not found')).toBeVisible()
})

test('export and import round-trip progress', async ({ page }, testInfo) => {
  await page.goto('#/lessons/s1')
  const bookmark = page.getByRole('button', { name: /Bookmark: / })
  await bookmark.first().click()
  await expect(page.getByRole('button', { name: /Bookmarked: / }).first()).toBeVisible()

  await page.goto('#/settings')
  const downloadPromise = page.waitForEvent('download')
  await page.getByRole('button', { name: 'Download backup' }).click()
  const download = await downloadPromise
  expect(download.suggestedFilename()).toMatch(
    /^ai-native-pm-academy-backup-\d{4}-\d{2}-\d{2}\.json$/,
  )
  const file = testInfo.outputPath('backup.json')
  await download.saveAs(file)
  // The first backup earns the "Safe keeping" milestone, which opens a modal.
  await page.getByRole('dialog').getByRole('button', { name: 'Keep going' }).click()
  await expect(page.getByRole('dialog')).toHaveCount(0)

  await page.goto('#/lessons/s1')
  await page
    .getByRole('button', { name: /Bookmarked: / })
    .first()
    .click()
  await expect(page.getByRole('button', { name: /Bookmarked: / })).toHaveCount(0)

  await page.goto('#/settings')
  const input = page.getByLabel('Backup file (.json)')
  await input.setInputFiles({
    name: 'bad.json',
    mimeType: 'application/json',
    buffer: Buffer.from('{oops'),
  })
  await expect(page.getByText('The file is not valid JSON.')).toBeVisible()

  await input.setInputFiles(file)
  await page.getByRole('button', { name: 'Confirm import' }).click()
  await expect(page.getByText(/Import complete/)).toBeVisible()

  await page.goto('#/lessons/s1')
  await expect(page.getByRole('button', { name: /Bookmarked: / }).first()).toBeVisible()
})

test('demo mode uses sample progress and can be exited', async ({ page }) => {
  await page.goto('')
  await page.getByRole('button', { name: 'Explore with sample progress' }).click()
  await expect(page.getByText(/You are looking at sample progress/)).toBeVisible()
  await page.getByRole('button', { name: 'Exit demo' }).click()
  await expect(page.getByText(/You are looking at sample progress/)).toHaveCount(0)
})

test('mobile navigation opens, navigates and closes', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'mobile only')
  await page.goto('#/levels')
  const menu = page.getByRole('button', { name: 'Menu' })
  await expect(menu).toHaveAttribute('aria-expanded', 'false')
  await menu.click()
  const nav = page.locator('#mobile-nav')
  await expect(nav).toBeVisible()
  await nav.getByRole('link', { name: 'Resources' }).click()
  await expect(page).toHaveURL(/#\/resources$/)
  await expect(nav).toHaveCount(0)
  await expect(page.getByRole('button', { name: 'Menu' })).toHaveAttribute('aria-expanded', 'false')
})

test('keyboard users can skip to content and operate the quiz', async ({ page }) => {
  await page.goto('#/levels')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await page.keyboard.press('Tab')
  const skip = page.getByRole('link', { name: 'Skip to content' })
  await expect(skip).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.locator('main#main')).toBeFocused()
  await expect(page).toHaveURL(/#\/levels$/)

  await page.goto('#/levels/1/quiz')
  const firstRadio = page.getByRole('radio').first()
  await firstRadio.focus()
  await page.keyboard.press('Space')
  await expect(firstRadio).toBeChecked()
})
