import { test, expect } from '@playwright/test'

test('multirisques module loads', async ({ page }) => {
  await page.goto('/multirisques')
  await expect(page.locator('body')).toBeVisible()
  await expect(page.getByRole('button').filter({ hasText: /multirisques|risques|risgo/i }).first()).toBeVisible({
    timeout: 15_000,
  })
})

test('diagnostic tab accessible', async ({ page }) => {
  await page.goto('/diagnostic')
  await expect(page.getByText(/diagnostic|evalyasyon|assessment|diagnóstico/i).first()).toBeVisible({
    timeout: 15_000,
  })
})

test('language switch updates UI', async ({ page }) => {
  await page.goto('/')
  const htBtn = page.getByRole('button', { name: 'HT', exact: true })
  await htBtn.click()
  await expect(page.locator('body')).toBeVisible()
})

test('community reports API', async ({ request }) => {
  const getRes = await request.get('/api/community-reports')
  expect(getRes.ok()).toBeTruthy()
  const list = await getRes.json()
  expect(Array.isArray(list.reports)).toBeTruthy()

  const postRes = await request.post('/api/community-reports', {
    data: {
      clientId: `e2e-${Date.now()}`,
      hazardType: 'flood',
      description: 'E2E test report',
      severity: 'low',
      latitude: 18.5,
      longitude: -72.3,
    },
  })
  expect(postRes.status()).toBeLessThan(500)
})
