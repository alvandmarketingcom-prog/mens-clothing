// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('smoke + stabilisation', () => {
  test('home loads without console crash', async ({ page }) => {
    const errors = [];
    page.on('pageerror', (e) => errors.push(String(e)));
    await page.goto('/');
    await page.waitForTimeout(2000);
    await expect(page.locator('body')).toBeVisible();
    const critical = errors.filter((e) => /is not defined|Cannot read|useAppApi/i.test(e));
    expect(critical, critical.join('\n')).toEqual([]);
  });

  test('shop deep link', async ({ page }) => {
    await page.goto('/?view=shop');
    await page.waitForTimeout(1500);
    await expect(page.locator('body')).toBeVisible();
  });

  test('localStorage backup keys writable', async ({ page }) => {
    await page.goto('/');
    const ok = await page.evaluate(() => {
      try {
        localStorage.setItem('__qa_backup_probe', JSON.stringify({ t: Date.now() }));
        const v = localStorage.getItem('__qa_backup_probe');
        localStorage.removeItem('__qa_backup_probe');
        return !!v;
      } catch {
        return false;
      }
    });
    expect(ok).toBeTruthy();
  });
});
