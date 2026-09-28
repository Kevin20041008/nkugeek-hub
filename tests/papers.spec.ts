import { expect, test } from "@playwright/test";
import { paperCatalog, paperDomains, paperReadingPaths, paperProposalUrl, paperUrl, paperPdfUrl } from "../src/data/papers";
import { getPaperReproductionDetail } from "../src/services/reproductions";
import sitemap from "../src/app/sitemap";

test("catalog metadata is unique, sourced and broadly distributed", async () => {
  expect(paperCatalog.length).toBeGreaterThanOrEqual(50);
  for (const key of ["slug", "title", "arxivId"] as const) expect(new Set(paperCatalog.map((paper) => paper[key])).size).toBe(paperCatalog.length);
  for (const domain of Object.keys(paperDomains)) expect(paperCatalog.filter((paper) => paper.domain === domain).length).toBeGreaterThanOrEqual(8);
  for (const paper of paperCatalog) {
    expect(paper.slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    expect(paper.arxivId).toMatch(/^\d{4}\.\d{4,5}$/);
    expect(paper.year).toBe(2000 + Number(paper.arxivId.slice(0, 2)));
    for (const value of [paper.title, paper.authors, paper.summary, paper.goal, paper.dataset, paper.caution]) expect(value.length).toBeGreaterThan(5);
    expect(paper.metrics.length).toBeGreaterThan(0);
    expect(new URL(paperUrl(paper)).hostname).toBe("arxiv.org");
    expect(new URL(paperPdfUrl(paper)).pathname).toBe("/pdf/" + paper.arxivId);
    if (paper.resource) expect(new URL(paper.resource.url).protocol).toBe("https:");
    const proposal = new URL(paperProposalUrl(paper));
    expect(proposal.pathname).toBe("/Kevin20041008/nkugeek-hub/issues/new");
    expect(proposal.searchParams.get("body")).toContain(paperUrl(paper));
    expect(proposal.searchParams.get("body")).toContain(paper.goal);
    expect(sitemap().some((entry) => entry.url.endsWith("/papers/" + paper.slug))).toBeTruthy();
  }
  for (const path of paperReadingPaths) for (const slug of path.slugs) expect(paperCatalog.some((paper) => paper.slug === slug && paper.domain === path.domain)).toBeTruthy();
  expect(await getPaperReproductionDetail("does-not-exist")).toBeUndefined();
});

test.describe("every paper has a real static detail page", () => {
  for (const paper of paperCatalog) test(paper.slug, async ({ request }) => {
    const response = await request.get("/papers/" + paper.slug);
    expect(response.ok()).toBeTruthy();
    const html = await response.text();
    expect(html).toContain(paper.arxivId);
    expect(html).toContain(paper.name);
    expect(html).toContain("社区状态：待认领");
    expect(html).toContain("暂无已验证结果");
    expect(html).not.toContain("84.7");
  });
});

test("search and combined filters can be reset from an empty state", async ({ page }) => {
  await page.goto("/papers");
  await expect(page.getByRole("status")).toHaveText("60 篇论文 · 第 1 / 5 页");
  await page.getByRole("searchbox", { name: "搜索论文" }).fill("BERT Jacob");
  await expect(page.getByTestId("paper-row")).toHaveCount(1);
  await expect(page.getByTestId("paper-row")).toContainText("Jacob Devlin");
  await page.getByRole("button", { name: "重置筛选", exact: true }).click();
  await page.getByRole("button", { name: /^具身智能/ }).click();
  await page.getByRole("combobox", { name: "实践方式", exact: true }).selectOption("仿真实验");
  await page.getByRole("combobox", { name: "首次预印本年份", exact: true }).selectOption("2023");
  await expect(page.getByTestId("paper-row")).toHaveCount(3);
  await page.getByRole("searchbox").fill("不存在的论文-xyz");
  await expect(page.getByRole("heading", { name: "没有匹配的论文" })).toBeVisible();
  await page.getByRole("button", { name: "重置全部筛选" }).click();
  await expect(page.getByTestId("paper-row")).toHaveCount(12);
  await page.getByRole("combobox", { name: "建议难度", exact: true }).selectOption("入门");
  for (const row of await page.getByTestId("paper-row").all()) await expect(row).toContainText("入门");
});

test("pagination reaches every paper and sort does not strand the page", async ({ page }) => {
  await page.goto("/papers");
  const links = new Set<string>();
  for (let index = 1; index <= 5; index++) {
    await expect(page.getByRole("status")).toContainText("第 " + index + " / 5 页");
    for (const link of await page.getByTestId("paper-row").locator("h3 a").all()) links.add((await link.getAttribute("href"))!);
    if (index < 5) await page.getByRole("button", { name: "下一页", exact: true }).click();
  }
  expect(links.size).toBe(60);
  await expect(page.getByRole("button", { name: "下一页", exact: true })).toBeDisabled();
  await page.getByRole("combobox", { name: "排序", exact: true }).selectOption("newest");
  await expect(page.getByRole("status")).toContainText("第 1 / 5 页");
  await expect(page.getByTestId("paper-row").first()).toContainText("2025");
});

test("details expose real sources and editable Issue proposals", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/papers/openvla");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("OpenVLA: An Open-Source Vision-Language-Action Model");
  await expect(page.getByRole("link", { name: "论文原文与版本记录" })).toHaveAttribute("href", "https://arxiv.org/abs/2406.09246");
  await expect(page.getByRole("link", { name: "阅读 PDF" })).toHaveAttribute("href", "https://arxiv.org/pdf/2406.09246");
  const proposal = await page.getByRole("link", { name: "提交复现计划" }).getAttribute("href");
  expect(new URL(proposal!).searchParams.get("title")).toBe("[论文复现] OpenVLA");
  await page.getByRole("link", { name: "返回论文目录" }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("论文共读与复现");
  expect(errors).toEqual([]);
});

test("desktop and mobile catalog and long titles remain within the viewport", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/papers", { waitUntil: "networkidle" });
  await page.screenshot({ path: "test-results/papers-desktop.png" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("searchbox").fill("QLoRA");
  await expect(page.getByTestId("paper-row")).toHaveCount(1);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.screenshot({ path: "test-results/papers-mobile.png", fullPage: true });
  await page.goto("/papers/bart");
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.screenshot({ path: "test-results/paper-detail-mobile.png" });
});
