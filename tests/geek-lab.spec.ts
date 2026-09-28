import { expect, test } from "@playwright/test";
import { readFile } from "node:fs/promises";
import { unzipSync, strFromU8 } from "fflate";

const course = "/learn/python-engineering";
const firstLab = course + "/data-validation";

test("lesson progress survives reload and resumes at the next lesson", async ({ page }) => {
  await page.goto(firstLab);
  const checks = page.locator("#completion").getByRole("checkbox");
  for (const checkbox of await checks.all()) await checkbox.check();
  await expect(page.getByRole("progressbar", { name: "已完成实验" })).toHaveAttribute("value", "1");
  await page.reload();
  await expect(checks.first()).toBeChecked();
  await page.getByRole("link", { name: "继续实验", exact: true }).click();
  await expect(page).toHaveURL(/\/csv-pipeline\/?$/);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("CSV 读取与数据汇总");
});

test("commands switch OS and copy the actual command", async ({ page, context }) => {
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto(firstLab);
  await page.getByLabel("操作系统").selectOption("linux");
  const command = page.getByLabel("运行实验", { exact: true });
  await expect(command).toContainText("./.venv/bin/python -X utf8 lab01.py");
  await page.getByRole("button", { name: "复制 运行实验", exact: true }).click();
  await expect.poll(() => page.evaluate(() => navigator.clipboard.readText())).toBe("./.venv/bin/python -X utf8 lab01.py");
  await page.getByLabel("操作系统").selectOption("windows");
  await expect(command).toContainText(".\\.venv\\Scripts\\python.exe");
});

test("invalid saved progress is ignored and mobile content fits", async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("geek-lab:python-engineering:v1", '{"data-validation":[-1,88,"0"]}'));
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(firstLab);
  await expect(page.getByRole("progressbar")).toHaveAttribute("value", "0");
  await expect(page.locator("#completion").getByRole("checkbox").first()).not.toBeChecked();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(390);
  await page.screenshot({ path: "test-results/geek-lab-mobile.png", fullPage: true });
});

test("download contains real runnable sources, data and tests", async ({ request }) => {
  const response = await request.get("/labs/python-engineering.zip");
  expect(response.ok()).toBeTruthy();
  const archive = unzipSync(await response.body());
  expect(Object.keys(archive)).toHaveLength(10);
  for (const name of ["lab01.py", "lab02.py", "lab03.py", "test_regression.py", "sessions.csv", "expected.json"]) {
    const source = await readFile("public/labs/python-engineering/" + name, "utf8");
    expect(strFromU8(archive["python-engineering/" + name])).toBe(source);
  }
});

test("all lessons expose the complete course sections and a real issue", async ({ page }) => {
  for (const slug of ["data-validation", "csv-pipeline", "command-line", "regression-and-pr"]) {
    await page.goto(course + "/" + slug);
    for (const section of ["goals", "prerequisites", "environment", "source", "tests", "errors", "issue"]) {
      await expect(page.locator("#" + section)).toBeAttached();
    }
    await expect(page.locator("#issue").getByRole("link")).toHaveAttribute("href", /github\.com\/Kevin20041008\/nkugeek-hub\/issues\/\d+/);
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(course);
  await page.screenshot({ path: "test-results/geek-lab-desktop.png", fullPage: true });
});
