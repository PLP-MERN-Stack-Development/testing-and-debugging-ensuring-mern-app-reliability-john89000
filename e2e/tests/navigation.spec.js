const { test, expect } = require('@playwright/test');

test('navigation and routing', async ({ page }) => {
  await page.goto('/');
  // Check that main nav links exist
  await expect(page.locator('nav')).toHaveCount(1);
  // Try navigating to About or Posts
  const postsLink = page.locator('a[href="/posts"]');
  if (await postsLink.count() > 0) {
    await postsLink.click();
    await expect(page).toHaveURL(/\/posts/);
  } else {
    test.skip();
  }
});
