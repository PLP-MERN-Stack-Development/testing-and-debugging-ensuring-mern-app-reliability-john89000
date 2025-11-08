const { test, expect } = require('@playwright/test');

test.describe('Auth flows (examples)', () => {
  test('registration page has expected fields', async ({ page, baseURL }) => {
    await page.goto('/register');
    // Basic checks — adapt selectors to your app
    await expect(page.locator('form')).toHaveCount(1);
    await expect(page.locator('input[name="username"]')).toHaveCount(1);
    await expect(page.locator('input[name="email"]')).toHaveCount(1);
    await expect(page.locator('input[name="password"]')).toHaveCount(1);
  });

  test('login flow (happy path) — example', async ({ page }) => {
    await page.goto('/login');
    // This test assumes a running backend with a test user; adjust as needed.
    await page.fill('input[name="email"]', 'test@example.com');
    await page.fill('input[name="password"]', 'password123');
    await page.click('button[type="submit"]');
    // Expect navigation to dashboard or root
    await expect(page).toHaveURL(/dashboard|\/$/i);
  });
});
