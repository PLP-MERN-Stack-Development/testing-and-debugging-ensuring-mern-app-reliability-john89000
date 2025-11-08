const { test, expect } = require('@playwright/test');

test.describe('CRUD flows (examples)', () => {
  test('create post flow (example)', async ({ page }) => {
    await page.goto('/posts/new');
    await expect(page.locator('form')).toHaveCount(1);
    await page.fill('input[name="title"]', 'E2E Test Post');
    await page.fill('textarea[name="content"]', 'Content created during E2E test');
    await page.click('button[type="submit"]');
    // After submit expect the post detail page or list
    await expect(page).toHaveURL(/posts\/\w+/);
  });

  test('edit and delete flow (example)', async ({ page }) => {
    // Navigate to a post list and click the first post
    await page.goto('/posts');
    const first = page.locator('a.post-link').first();
    if (await first.count() === 0) {
      test.skip();
      return;
    }
    await first.click();
    await expect(page.locator('button.edit')).toHaveCount(1);
    // This is an example — adapt to app structure
  });
});
