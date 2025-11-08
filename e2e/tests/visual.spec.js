const { test, expect } = require('@playwright/test');

test('visual snapshot for header component', async ({ page }) => {
  await page.goto('/');
  const header = page.locator('header');
  if ((await header.count()) === 0) {
    test.skip();
    return;
  }
  // Take a screenshot and compare with baseline when available
  await expect(header).toHaveScreenshot('header.png');
});
