import { test, expect } from '@playwright/test'

test('home page loads with SisAyiti branding', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('text=SisAyiti').first()).toBeVisible({ timeout: 15_000 })
})

test('health API responds', async ({ request }) => {
  const res = await request.get('/api/health')
  expect(res.ok()).toBeTruthy()
  const body = await res.json()
  expect(body.status).toBe('ok')
})

test('carte module route loads', async ({ page }) => {
  await page.goto('/carte')
  await expect(page.locator('body')).toBeVisible()
})
