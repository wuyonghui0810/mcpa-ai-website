import { test, expect } from '@playwright/test';

test.describe('MCPA.ai site', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('homepage loads with title and hero', async ({ page }) => {
    await expect(page).toHaveTitle(/MCP Server Index/);
    await expect(page.locator('h1')).toContainText('MCP Server Index');
    await expect(page.locator('text=500 servers indexed')).toBeVisible();
  });

  test('favicon is present', async ({ page }) => {
    const favicon = await page.request.get('/favicon.ico');
    expect(favicon.status()).toBe(200);

    const png32 = await page.request.get('/favicon-32x32.png');
    expect(png32.status()).toBe(200);

    const apple = await page.request.get('/apple-touch-icon.png');
    expect(apple.status()).toBe(200);

    const manifest = await page.request.get('/site.webmanifest');
    expect(manifest.status()).toBe(200);

    // Check HTML head contains icon links
    await expect(page.locator('link[rel="icon"][href*="favicon.ico"]')).toHaveAttribute('href', '/favicon.ico');
    await expect(page.locator('link[rel="apple-touch-icon"]')).toHaveAttribute('href', '/apple-touch-icon.png');
  });

  test('category cards are visible and clickable', async ({ page }) => {
    const databaseCard = page.locator('button:has-text("Database")').first();
    await expect(databaseCard).toBeVisible();
    await databaseCard.click();
    await expect(page.locator('text=Database Servers')).toBeVisible();
  });

  test('search filters server list', async ({ page }) => {
    const search = page.locator('input[placeholder*="Search"]');
    await search.fill('postgres');
    await page.getByTestId('search-submit').click();
    await page.waitForTimeout(300);
    await expect(page.locator('#servers')).toContainText(/postgres/i);
  });

  test('pagination is visible with multiple pages', async ({ page }) => {
    await expect(page.locator('button:has-text("Next")')).toBeVisible();
    await expect(page.getByRole('button', { name: '2', exact: true })).toBeVisible();
  });

  test('pagination changes page', async ({ page }) => {
    const firstCardOnPage1 = page.locator('#servers a h3').first();
    const name1 = await firstCardOnPage1.textContent();
    await page.getByRole('button', { name: '2', exact: true }).click();
    await page.waitForTimeout(300);
    const firstCardOnPage2 = page.locator('#servers a h3').first();
    const name2 = await firstCardOnPage2.textContent();
    expect(name2).not.toBe(name1);
  });

  test('about page has disclaimer', async ({ page }) => {
    await page.goto('/about');
    await expect(page.locator('text=Legal Disclaimer')).toBeVisible();
    await expect(page.locator('text=Linux Foundation')).toBeVisible();
  });

  test('privacy page loads', async ({ page }) => {
    await page.goto('/privacy');
    await expect(page.locator('h1').first()).toContainText('Privacy Policy');
  });

  test('mobile menu opens and closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const menuButton = page.locator('button:has([d="M4 5h16"])');
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await expect(page.locator('a:has-text("About")').nth(1)).toBeVisible();
  });

  test('footer disclaimer is present', async ({ page }) => {
    await expect(page.locator('text=Linux Foundation')).toBeVisible();
    await expect(page.locator('text=Agentic AI Foundation')).toBeVisible();
  });
});
