import type { Metadata } from "next";
import { PageIntro } from "@/components/community/primitives";
import { TaskCatalog } from "@/components/community/catalogs";
import { communitySnapshot } from "@/data/community";
export const metadata: Metadata = {
  title: "开放任务 · Issues",
  description: "项目、网站、论文复现、文档、数据与设计的统一贡献入口。",
};
export default function TasksPage() {
  return (
    <main className="bg-white">
      <PageIntro eyebrow="BUILD / OPEN TASKS" title="找一个任务">
        从一个小而完整的贡献开始。认领以 GitHub Issue
        当前状态和维护者确认为准；“提案”尚未立项。
      </PageIntro>
      <section className="hub-container py-8">
        <TaskCatalog />
        <p className="mt-7 text-xs leading-6 text-zinc-500">
          Issue 状态核验：
          {communitySnapshot.checkedAt.replace("T", " ").replace("Z", " UTC")}
          。耗时为编辑估计，并非完成承诺。
        </p>
      </section>
    </main>
  );
}
