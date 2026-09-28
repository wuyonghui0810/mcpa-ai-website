import { test, expect } from '@playwright/test';

test.describe('MCPA.ai Trending Radar Feature', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/trending');
    await page.waitForLoadState('networkidle');
  });

  test('trending page loads with header, title and stats cards', async ({ page }) => {
    // 检查顶栏 Logo 与 Navigation
    await expect(page.locator('header').getByText('MCPA.ai')).toBeVisible();
    await expect(page.locator('header a[href="/trending"]').first()).toBeVisible();

    // 检查主标题与副标题
    await expect(page.locator('h1')).toContainText('GitHub Trending 周报');
    await expect(page.locator('text=MCPA Weekly Radar')).toBeVisible();

    // 检查 4 个核心统计指标卡片
    await expect(page.locator('text=独立项目 (去重)')).toBeVisible();
    await expect(page.locator('text=今日 TOP8 爆发')).toBeVisible();
    await expect(page.locator('text=本周 TOP8 新增')).toBeVisible();
    await expect(page.locator('text=本月 TOP8 沉淀')).toBeVisible();
  });

  test('depth insights box is rendered with key findings', async ({ page }) => {
    // 检查本期深度洞察面板
    const insightsBox = page.locator('text=本期深度洞察 (Insights)');
    await expect(insightsBox).toBeVisible();

    // 检查至少存在 2 条以上观点
    const insightItems = page.locator('div:has(> strong.text-mi-black)');
    await expect(insightItems.first()).toBeVisible();
    const count = await insightItems.count();
    expect(count).toBeGreaterThanOrEqual(2);
  });

  test('tab switching works for today, week, and month lists', async ({ page }) => {
    // 默认在“本周榜”
    const weekTab = page.locator('button:has-text("本周榜")');
    await expect(weekTab).toHaveClass(/bg-mi-black/);

    // 切换到“今日榜”
    const todayTab = page.locator('button:has-text("今日榜")');
    await todayTab.click();
    await expect(todayTab).toHaveClass(/bg-mi-black/);
    await expect(weekTab).not.toHaveClass(/bg-mi-black/);

    // 检查今日第一名（vectorize-io/hindsight）展示正常
    await expect(page.locator('text=vectorize-io/hindsight')).toBeVisible();

    // 切换到“本月榜”
    const monthTab = page.locator('button:has-text("本月榜")');
    await monthTab.click();
    await expect(monthTab).toHaveClass(/bg-mi-black/);
    await expect(page.locator('text=tt-a1i/archify')).toBeVisible();
  });

  test('repo cards display tags, facts, cross-listing badges and star delta', async ({ page }) => {
    // 检查仓库卡片元素完整性
    const hindsightCard = page.locator('div.group:has-text("vectorize-io/hindsight")').first();
    await expect(hindsightCard).toBeVisible();

    // 检查语言标签、Tag、以及事实列表
    await expect(hindsightCard.locator('text=Python')).toBeVisible();
    await expect(hindsightCard.locator('text=Agent 记忆')).toBeVisible();
    await expect(hindsightCard.locator('text=LongMemEval')).toBeVisible();

    // 检查 Star 增长数据
    await expect(hindsightCard.locator('text=stars / 时段')).toBeVisible();
    await expect(hindsightCard.locator('span:has-text("▲")')).toBeVisible();
  });

  test('archive period dropdown switches dates correctly', async ({ page }) => {
    const periodSelect = page.locator('select');
    await expect(periodSelect).toBeVisible();

    // 切换到 2026-09-13
    await periodSelect.selectOption('2026-09-13');
    await page.waitForLoadState('networkidle');

    // 检查 09-13 期的特色项目（如 gods-eye-view 或 colibri）已展示
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
    await expect(page.locator('h1')).toContainText('GitHub Trending 周报');
  });
});
