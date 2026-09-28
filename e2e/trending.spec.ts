import { test, expect } from '@playwright/test';

test.describe('MCPA.ai Trending Radar Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/trending');
    await page.waitForLoadState('networkidle');
  });

  test('trending page loads with header, title and stats cards in default English', async ({ page }) => {
    // 检查顶栏 Logo 与 Navigation
    await expect(page.locator('header').getByText('MCPA.ai')).toBeVisible();
    await expect(page.locator('header a[href="/trending"]').first()).toBeVisible();

    // 默认展示英文标题与副标
    await expect(page.locator('h1')).toContainText('GitHub Trending Weekly');
    await expect(page.locator('text=MCPA Weekly Radar')).toBeVisible();

    // 默认展示英文核心指标统计卡片
    await expect(page.locator('text=Unique Projects')).toBeVisible();
    await expect(page.locator("text=Today's TOP8")).toBeVisible();
    await expect(page.locator("text=Weekly TOP8")).toBeVisible();
    await expect(page.locator("text=Monthly TOP8")).toBeVisible();
  });

  test('bilingual language toggle works between EN and ZH', async ({ page }) => {
    // 默认英文
    await expect(page.locator('h1')).toContainText('GitHub Trending Weekly');
    await expect(page.locator('text=Weekly Engineering Insights')).toBeVisible();

    // 切换到中文
    await page.locator('button:has-text("中文")').click();
    await page.waitForLoadState('networkidle');

    // 验证中文界面生效
    await expect(page.locator('h1')).toContainText('GitHub Trending 周报');
    await expect(page.locator('text=本期深度洞察 (Insights)')).toBeVisible();
    await expect(page.locator('text=独立项目 (去重)')).toBeVisible();

    // 切回英文
    await page.locator('button:has-text("English")').click();
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1')).toContainText('GitHub Trending Weekly');
  });

  test('tab switching works for today, week, and month lists', async ({ page }) => {
    // 默认在 Weekly 榜
    const weekTab = page.locator('button:has-text("Weekly Trending")');
    await expect(weekTab).toHaveClass(/bg-mi-black/);

    // 切换到 Daily 榜
    const todayTab = page.locator('button:has-text("Daily Trending")');
    await todayTab.click();
    await expect(todayTab).toHaveClass(/bg-mi-black/);
    await expect(weekTab).not.toHaveClass(/bg-mi-black/);

    // 检查今日第一名（vectorize-io/hindsight）展示正常
    await expect(page.locator('text=vectorize-io/hindsight')).toBeVisible();

    // 切换到 Monthly 榜
    const monthTab = page.locator('button:has-text("Monthly Trending")');
    await monthTab.click();
    await expect(monthTab).toHaveClass(/bg-mi-black/);
  });

  test('repo cards display tags, facts, cross-listing badges and star delta', async ({ page }) => {
    const hindsightCard = page.locator('div.group:has-text("vectorize-io/hindsight")').first();
    await expect(hindsightCard).toBeVisible();

    // 检查语言标签与英文 Tag
    await expect(hindsightCard.locator('text=Python')).toBeVisible();
    await expect(hindsightCard.locator('text=Agent Memory')).toBeVisible();

    // 检查 Star 增长数据
    await expect(hindsightCard.locator('text=stars / period')).toBeVisible();
    await expect(hindsightCard.locator('span:has-text("▲")')).toBeVisible();
  });

  test('archive period dropdown switches dates correctly', async ({ page }) => {
    const periodSelect = page.locator('select');
    await expect(periodSelect).toBeVisible();

    // 切换到 2026-09-13
    await periodSelect.selectOption('2026-09-13');
    await page.waitForLoadState('networkidle');

    // 检查 09-13 期的特色项目展示
    await expect(page.locator('text=bilawalsidhu/gods-eye-view')).toBeVisible();
  });

  test('header navigation link navigates between home and trending', async ({ page }) => {
    // 在 Trending 点击顶栏 Logo 返回首页
    await page.locator('header a[href="/"]').first().click();
    await page.waitForURL('**/');
    await expect(page.locator('h1')).toContainText('MCP Server Index');

    // 在首页点击 Trending 导航按钮回到 /trending
    await page.locator('header a[href="/trending"]').first().click();
    await page.waitForURL('**/trending');
    await expect(page.locator('h1')).toContainText('GitHub Trending Weekly');
  });
});
