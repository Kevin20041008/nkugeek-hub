import { expect, test } from "@playwright/test";
import {
  communityProjects,
  communitySnapshot,
  effectiveProjectState,
  projectReady,
  taskKinds,
  tasks,
  taskStatus,
  taskUrl,
  showcases,
  failures,
  archivedEvents,
} from "../src/data/community";
import { paperCatalog } from "../src/data/papers";
import sitemap from "../src/app/sitemap";

test("community records have provenance and consistent relationships", () => {
  expect(Date.parse(communitySnapshot.checkedAt)).not.toBeNaN();
  for (const event of communitySnapshot.activity) {
    expect(event.url).toContain("/commit/" + event.id);
    expect(Date.parse(event.date)).toBeLessThanOrEqual(
      Date.parse(communitySnapshot.checkedAt),
    );
  }
  expect(new Set(tasks.map((t) => t.id)).size).toBe(tasks.length);
  expect(new Set(tasks.map((t) => t.kind))).toEqual(new Set(taskKinds));
  for (const task of tasks) {
    expect(communityProjects.some((p) => p.slug === task.project)).toBeTruthy();
    if (task.paper)
      expect(paperCatalog.some((p) => p.slug === task.paper)).toBeTruthy();
    const url = new URL(taskUrl(task));
    expect(url.protocol).toBe("https:");
    if (task.issue)
      expect(url.pathname).toBe(
        "/Kevin20041008/nkugeek-hub/issues/" + task.issue,
      );
    else {
      expect(taskStatus(task)).toBe("提案");
      expect(url.pathname.endsWith("/issues/new")).toBeTruthy();
      expect(url.searchParams.get("body")).toContain(task.outcome);
    }
  }
  for (const project of communityProjects) {
    for (const paper of project.papers)
      expect(paperCatalog.some((p) => p.slug === paper)).toBeTruthy();
    if (!["Ideas", "Archived"].includes(effectiveProjectState(project)))
      expect(projectReady(project)).toBeTruthy();
  }
  const active = communityProjects[0];
  expect(effectiveProjectState({ ...active, owner: undefined })).toBe("Ideas");
  expect(effectiveProjectState({ ...active, repo: undefined })).toBe("Ideas");
  expect(effectiveProjectState({ ...active, milestone: undefined })).toBe(
    "Ideas",
  );
  expect(effectiveProjectState({ ...active, effort: undefined })).toBe("Ideas");
  expect(effectiveProjectState({ ...active, slug: "no-tasks" })).toBe("Ideas");
  expect(effectiveProjectState({ ...active, state: "Archived" })).toBe(
    "Archived",
  );
  for (const work of showcases) {
    expect(work.source).toMatch(/^https:\/\//);
    if (work.project)
      expect(
        communityProjects.some((p) => p.slug === work.project),
      ).toBeTruthy();
  }
  for (const failure of failures) expect(failure.source).toMatch(/github\.com/);
  expect(archivedEvents).toEqual([]);
});

const routes = [
  "/tasks",
  "/research",
  "/community",
  "/contributors",
  "/members",
  "/events/archive",
  "/failures",
  "/learn/foundations",
  "/showcase",
  ...showcases.map((s) => "/showcase/" + s.slug),
  ...communityProjects.flatMap((p) => [
    "/projects/" + p.slug,
    "/projects/" + p.slug + "/assets",
  ]),
];
for (const route of routes)
  test("new route " + route, async ({ request }) => {
    const result = await request.get(route);
    expect(result.ok()).toBeTruthy();
    expect(await result.text()).not.toContain("github.com/NKUGeek");
    expect(sitemap().some((entry) => entry.url.endsWith(route))).toBeTruthy();
  });

test("task filters distinguish real Issues from proposals", async ({
  page,
}) => {
  await page.goto("/tasks");
  await page.getByLabel("任务状态", { exact: true }).selectOption("待认领");
  await expect(page.locator("main article")).toHaveCount(4);
  await expect(
    page.getByRole("link", { name: "认领任务", exact: true }).first(),
  ).toHaveAttribute("href", /\/issues\/1$/);
  await page.getByRole("button", { name: "重置筛选" }).click();
  await page.getByLabel("任务类型", { exact: true }).selectOption("Paper");
  await expect(page.locator("main article")).toHaveCount(1);
  await expect(
    page.getByRole("link", { name: "认领任务", exact: true }),
  ).toHaveCount(0);
  await expect(page.getByRole("link", { name: "讨论提案" })).toHaveAttribute(
    "href",
    /\/issues\/new\?/,
  );
  await page.getByLabel("搜索任务或技能").fill("missing-task-xyz");
  await expect(
    page.getByRole("heading", { name: "暂无匹配任务" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "重置筛选" }).click();
  await expect(page.locator("main article")).toHaveCount(tasks.length);
});

test("incomplete projects are only in Ideas", async ({ page }) => {
  await page.goto("/projects");
  await expect(page.locator("main article")).toHaveCount(1);
  await expect(page.locator("main article")).toContainText("Next milestone");
  await page.getByLabel("孵化阶段").selectOption("Ideas");
  await expect(page.locator("main article")).toHaveCount(3);
  await expect(page.locator("main article").first()).toContainText("待确认");
  await page.getByLabel("孵化阶段").selectOption("Archived");
  await expect(
    page.getByRole("heading", { name: "这个阶段暂无项目" }),
  ).toBeVisible();
});

test("showcase filters and sources do not invent demos", async ({ page }) => {
  await page.goto("/showcase");
  await page.getByLabel("作品分类").selectOption("Robotics");
  await expect(
    page.getByRole("heading", { name: "这个方向还没有收录作品" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "重置筛选" }).click();
  await expect(page.locator("main article")).toHaveCount(3);
  await page.goto("/showcase/nkuwiki");
  await expect(
    page.getByRole("link", { name: "Demo", exact: true }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("link", { name: "Repo", exact: true }),
  ).toHaveAttribute("href", "https://github.com/nkuwiki-weapp/Nkuwiki");
  await expect(
    page.getByText("外部公开项目，非社区团队。", { exact: false }),
  ).toBeVisible();
});

test("Learn, Projects, Papers, Issues and Showcase form a navigation loop", async ({
  page,
}) => {
  await page.goto("/papers/dino");
  await page
    .getByRole("link", { name: "前置知识不足？先学习 ViT Track", exact: false })
    .click();
  await expect(page).toHaveURL(/\/learn\/foundations\/?#vit$/);
  await page
    .getByRole("link", { name: "下一步：阅读 DINO 与复现边界" })
    .click();
  await page
    .getByRole("link", { name: "参与论文复现开放计划", exact: false })
    .click();
  await expect(page).toHaveURL(/\/projects\/paper-reproduction-lab\/?$/);
  await page
    .getByRole("link", { name: "相关论文：ResNet", exact: false })
    .click();
  await expect(page).toHaveURL(/\/papers\/resnet\/?$/);
  await page.goto("/learn/python-engineering");
  await page
    .getByRole("link", { name: "认领课程扩展任务", exact: false })
    .click();
  await expect(page).toHaveURL(/\/tasks\/?$/);
  await page.goto("/showcase/nkugeek-hub");
  await page
    .getByRole("link", { name: "加入项目与开放任务", exact: false })
    .click();
  await expect(page).toHaveURL(/\/projects\/nkugeek-hub\/?$/);
});

test("five navigation entries, mobile menu, honest home and governance", async ({
  page,
}) => {
  await page.goto("/");
  await expect(
    page
      .getByRole("navigation", { name: "主导航", exact: true })
      .getByRole("link"),
  ).toHaveText(["Learn", "Build", "Research", "Community", "Showcase"]);
  const main = page.locator("main");
  for (const name of ["开始学习", "找一个任务", "加入项目", "参加科研复现"])
    await expect(
      main.getByRole("link", { name, exact: true }).first(),
    ).toBeVisible();
  await expect(main).not.toContainText(
    /120\+|300\+|500 contributors|已有 \d 人/,
  );
  await expect(
    page.getByRole("navigation", { name: "社区治理" }).getByRole("link"),
  ).toHaveCount(6);
  await page.setViewportSize({ width: 320, height: 740 });
  const menu = page.getByRole("button", { name: "打开导航" });
  await menu.click();
  await expect(page.getByRole("button", { name: "关闭导航" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await page
    .getByRole("navigation", { name: "移动导航" })
    .getByRole("link", { name: "Build", exact: true })
    .click();
  await expect(page.getByRole("navigation", { name: "移动导航" })).toHaveCount(
    0,
  );
  await expect(page).toHaveURL(/\/projects\/?$/);
});

test("desktop and mobile pages have no overflow or runtime errors", async ({
  page,
}) => {
  test.setTimeout(90_000);
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const width of [1440, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/",
      "/tasks",
      "/projects",
      "/community",
      "/showcase",
      "/showcase/nkugeek-hub",
      "/events/archive",
    ]) {
      await page.goto(route, { waitUntil: "networkidle" });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      if (
        width !== 320 &&
        ["/", "/tasks", "/showcase/nkugeek-hub"].includes(route)
      ) {
        await page.screenshot({
          path:
            "test-results/community-" +
            width +
            "-" +
            (route.replaceAll("/", "-") || "home") +
            ".png",
          fullPage: true,
          caret: "initial",
        });
      }
    }
  }
  expect(errors).toEqual([]);
});
