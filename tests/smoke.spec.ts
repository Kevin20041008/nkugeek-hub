import { expect, test } from "@playwright/test";

const routes = [
  { path: "/", text: "NKUGeek Hub" },
  { path: "/learn", text: "Geek Lab" },
  { path: "/learn/python-engineering", text: "最终交付" },
  { path: "/learn/python-engineering/data-validation", text: "数据建模与输入校验" },
  { path: "/learn/python-engineering/csv-pipeline", text: "CSV 读取与数据汇总" },
  { path: "/learn/python-engineering/command-line", text: "命令行工具与文件输出" },
  { path: "/learn/python-engineering/regression-and-pr", text: "回归测试与第一次贡献" },
  { path: "/challenges", text: "开放挑战" },
  { path: "/contribute", text: "无需申请加入" },
  { path: "/projects", text: "开放项目" },
  { path: "/projects/nkugeek-hub", text: "参与项目贡献" },
  { path: "/projects/nkugeek-hub/assets", text: "工程资料库" },
  { path: "/articles/new", text: "公开贡献流程" },
  { path: "/competitions", text: "竞赛广场" },
  { path: "/events", text: "前往报名讨论" },
  { path: "/members", text: "技能筛选" },
  { path: "/questions", text: "最佳答案" },
  { path: "/dashboard", text: "公开贡献流程" },
  { path: "/login", text: "公开贡献流程" },
  { path: "/admin", text: "公开贡献流程" },
  { path: "/viewer", text: "工程文件阅览器" },
  { path: "/papers/segment-anything", text: "复现空间" },
];

test.describe("page smoke checks", () => {
  for (const route of routes) {
    test(`${route.path} renders`, async ({ request }) => {
      const response = await request.get(route.path);
      const html = await response.text();

      expect(response.ok()).toBeTruthy();
      expect(html).toContain(route.text);
    });
  }
});
