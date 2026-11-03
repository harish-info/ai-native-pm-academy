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
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'A practical guide to working with AI agents',
  )
  await expect(
    page.getByRole('link', { name: 'Start with a 10-minute skills check' }),
  ).toBeVisible()
})

test('quick check explains choices without completing a lesson', async ({ page }) => {
  await page.goto('#/lessons/s1')
  const exercise = page.getByRole('group', { name: 'Quick check answers' })
  await exercise.getByRole('button', { name: /two different tools said it/ }).click()
  await expect(page.getByText('Not quite')).toBeVisible()
  await expect(page.getByText(/Two matching guesses are still guesses/)).toBeVisible()
  const correct = exercise.getByRole('button', { name: /Ask finance managers/ })
  await correct.focus()
  await page.keyboard.press('Enter')
  await expect(correct).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByText('Right', { exact: true })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Mark complete' })).toBeDisabled()
  await expect(page.getByRole('link', { name: /AI capabilities and limitations/ })).toBeVisible()
  const lessonPrecedesSources = await page.locator('#step-learn').evaluate((section) => {
    const sources = section.querySelector('a[target="_blank"]')!
    const reader = section.querySelector('.lesson-reader')!
    return !!(reader.compareDocumentPosition(sources) & Node.DOCUMENT_POSITION_FOLLOWING)
  })
  expect(lessonPrecedesSources).toBe(true)
})

test('model guide separates model choice from effort and supports keyboard navigation', async ({
  page,
}) => {
  await page.goto('#/field-guide')
  const onPage = page.getByRole('navigation', { name: 'On this page' })
  const jump = onPage.getByRole('button', { name: 'Choose a model' })
  await jump.focus()
  await page.keyboard.press('Enter')
  const heading = page.getByRole('heading', { name: 'Choose a model', exact: true })
  await expect(heading).toBeFocused()
  await expect(page).toHaveURL(/#\/field-guide$/)
  await expect(page.getByRole('heading', { name: 'Claude Sonnet 5.5', exact: true })).toBeVisible()
  const labs = page.getByRole('tablist', { name: 'Model makers' })
  await labs.getByRole('tab', { name: 'Anthropic' }).focus()
  await page.keyboard.press('ArrowRight')
  await expect(labs.getByRole('tab', { name: 'OpenAI' })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('heading', { name: 'GPT-6.1 Sol', exact: true })).toBeVisible()

  const choices = page.getByRole('group', { name: 'Choose a PM task' })
  const example = page.locator('#fg-task-example')
  await choices.getByRole('button', { name: 'Challenge a PRD' }).focus()
  await page.keyboard.press('Enter')
  await expect(example).toContainText('Opus 5.5 or GPT-6 Astra')
  await expect(example).toContainText('High')
  await expect(example).toContainText('Check the result:')
  await choices.getByRole('button', { name: 'Build a prototype' }).click()
  await expect(example).toContainText('Sonnet 5.5 or GPT-6.1 Sol in a building agent')
  await expect(example).toContainText('Medium, then high if needed')
  await expect(choices.getByRole('button', { name: 'Challenge a PRD' })).toHaveAttribute(
    'aria-pressed',
    'false',
  )
  await expect(
    page.getByRole('link', { name: /Effort: response thoroughness/ }).first(),
  ).toBeVisible()
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
})

test('lesson illustrations explain changing inputs and respect reduced motion', async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.clock.install()
  await page.goto('#/lessons/s1')
  const agent = page.locator('[data-illustration="chat-agent"]')
  await expect(agent.getByRole('img', { name: /Claude Code, the agent application/ })).toBeVisible()
  await agent.getByRole('button', { name: 'Play example' }).click()
  await expect(agent.locator('[aria-current="step"]')).toContainText('Choose')
  const next = agent.getByRole('button', { name: 'Next step' })
  await next.focus()
  await page.keyboard.press('Enter')
  await page.clock.runFor(8000)
  await expect(agent.locator('[aria-current="step"]')).toContainText('Call the tool')

  await next.click()
  await expect(
    agent.getByText('The tool returns tasks.csv and notes.md.', { exact: false }),
  ).toBeVisible()
  await next.click()
  await expect(agent.locator('[aria-current="step"]')).toContainText('Choose again')
  await expect(
    agent.getByText('Filenames are not enough to answer.', { exact: false }),
  ).toBeVisible()

  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await agent.getByRole('button', { name: 'Play example' }).click()
  await expect(agent.locator('[aria-current="step"]')).toContainText('Set the goal')
  for (const label of [
    'Choose a tool',
    'Call the tool',
    'Read the result',
    'Choose again',
    'Call another tool',
    'Read the new result',
    'Respond',
  ]) {
    await page.clock.runFor(1400)
    await expect(agent.locator('[aria-current="step"]')).toContainText(label)
  }
  await page.clock.runFor(1400)
  await expect(agent.getByRole('button', { name: 'Play example' })).toBeVisible()

  await page.goto('#/lessons/s11')
  const funnel = page.locator('[data-illustration="funnel"]')
  await expect(funnel.getByText('40%', { exact: true })).toBeVisible()
  await funnel.getByRole('button', { name: 'Of all signups' }).click()
  await expect(funnel.getByText('20%', { exact: true })).toBeVisible()

  await page.goto('#/lessons/s13')
  const states = page.locator('[data-illustration="states"]')
  await states.getByRole('button', { name: 'Error', exact: true }).click()
  await expect(states.getByText('Could not load your items', { exact: true })).toBeVisible()
})

test('team loop stays in its lesson and supports keyboard exploration', async ({ page }) => {
  await page.goto('#/levels')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(
    'From foundations to independent practice',
  )
  await expect(page.getByRole('tablist', { name: 'Product loop stages' })).toHaveCount(0)

  await page.goto('#/lessons/s20')
  const loop = page.locator('[data-illustration="team-loop"]')
  await expect(loop.getByRole('tab')).toHaveCount(6)
  await loop.getByRole('tab', { name: '1 Context' }).focus()
  await page.keyboard.press('ArrowLeft')
  await expect(loop.getByRole('tab', { name: '6 Learn' })).toBeFocused()
  await expect(loop.getByRole('tabpanel')).toContainText('user feedback')
  await page.keyboard.press('Home')
  await expect(loop.getByRole('tab', { name: '1 Context' })).toHaveAttribute(
    'aria-selected',
    'true',
  )

  await loop.getByRole('tab', { name: '2 Problem, together' }).click()
  await expect(loop.getByRole('tabpanel')).toContainText('as a whole team')
  await expect(loop.getByRole('tabpanel')).toContainText('PMs, designers and engineers')
  await loop.getByRole('tab', { name: '3 PRD, spec, prototype' }).click()
  await expect(loop.getByRole('tabpanel')).toContainText('grill-me')
  await expect(loop.getByRole('link', { name: 'Session 12' })).toHaveAttribute(
    'href',
    '#/lessons/s12',
  )
  await loop.getByRole('tab', { name: '3 PRD, spec, prototype' }).focus()
  await page.keyboard.press('End')
  await page.keyboard.press('ArrowRight')
  await expect(loop.getByRole('tab', { name: '1 Context' })).toBeFocused()
  const attention = page.locator('[data-illustration="team-attention"]')
  await expect(attention.getByText('Explore the problem together', { exact: true })).toBeVisible()
  await expect(attention.getByText('Learn into the next decision', { exact: true })).toBeVisible()

  const capacity = page.locator('[data-illustration="constraints"]')
  await expect(capacity.getByText('Whole-loop capacity: 2 items / week')).toBeVisible()
  await capacity.getByRole('button', { name: 'Build faster' }).click()
  await expect(capacity.getByText('Whole-loop capacity: 2 items / week')).toBeVisible()
  await capacity.getByRole('button', { name: 'Improve the loop' }).click()
  await expect(capacity.getByText('Whole-loop capacity: 4 items / week')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Mark complete' })).toBeDisabled()
  await page.goto('#/lessons/s9')
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Strategy and market')
  await expect(page.locator('[data-illustration="constraints"]')).toHaveCount(0)
})

test('onboarding shows where you stand and starts at session 1', async ({ page }) => {
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

  await expect(page.getByRole('heading', { level: 1 })).toContainText(/here is where you stand/i)
  await expect(page.getByRole('heading', { name: 'Where you stand in each level' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Start session 1' })).toBeVisible()

  await page.goto('')
  await expect(page).toHaveURL(/#\/dashboard$/)
})

test('case studies stay in their own area and never rename the workspace', async ({ page }) => {
  await page.goto('#/case-study')
  await page.getByText('Triage', { exact: true }).click()
  await expect(page.getByRole('radio', { name: 'Triage', exact: true })).toBeChecked()
  await expect(page.getByRole('heading', { name: 'Triage: the brief' })).toBeVisible()
  await page.goto('#/lessons/s17')
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.locator('main')).not.toContainText(/MoneyPilot|Triage|Steady/)
  await expect(page.locator('main')).toContainText('workspace')
  await page.goto('#/wiki')
  await expect(page.getByRole('heading', { name: 'Your workspace' })).toBeVisible()
  await expect(page.locator('main')).not.toContainText(/MoneyPilot|Triage|Steady/)
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
  const weekTiles = page.getByRole('navigation', { name: 'Weeks' }).getByRole('listitem')
  await expect(weekTiles).toHaveCount(12)
  await page.getByRole('radio', { name: /Standard: 8 weeks/ }).check()
  await expect(weekTiles).toHaveCount(8)
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
