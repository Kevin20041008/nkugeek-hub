import type { Metadata } from "next";
import Link from "next/link";
import {
  PageIntro,
  NextSteps,
  EmptyState,
  SectionTitle,
} from "@/components/community/primitives";
import { TaskCard } from "@/components/community/cards";
import { tasks } from "@/data/community";
export const metadata: Metadata = { title: "Research · 论文与复现" };
export default function ResearchPage() {
  return (
    <main className="bg-white">
      <PageIntro
        eyebrow="RESEARCH"
        title="让理解经得起复现"
        action={
          <>
            <Link href="/papers" className="hub-button hub-primary">
              浏览论文目录
            </Link>
            <Link href="/learn/foundations#paper" className="hub-button">
              复现前置知识
            </Link>
          </>
        }
      >
        从原文、实验协议到代码、日志和报告。目录收录不等于社区已完成实验。
      </PageIntro>
      <div className="hub-container py-8">
        <SectionTitle title="Research Sprint" />
        <EmptyState title="暂无已启动的科研 Sprint">
          当前处于提案阶段，尚未确认团队、周期与算力。不展示未经运行的指标或参与人数。
        </EmptyState>
        <section className="py-8">
          <SectionTitle title="下一份科研贡献" href="/tasks" />
          <div className="grid gap-4 md:grid-cols-2">
            {tasks
              .filter((t) => t.kind === "Paper" || t.kind === "Data")
              .map((t) => (
                <TaskCard key={t.id} task={t} />
              ))}
          </div>
        </section>
        <NextSteps
          items={[
            {
              label: "Learn：PyTorch 与 ViT 前置学习",
              href: "/learn/foundations#pytorch",
              description: "训练一个小模型，再尝试权重评估。",
            },
            {
              label: "Build：论文复现开放计划",
              href: "/projects/paper-reproduction-lab",
              description: "先提出最小范围、负责人和里程碑。",
            },
            {
              label: "Failure Archive：记录失败和修复",
              href: "/failures",
              description: "保留环境与证据，帮助下一个复现者。",
            },
            {
              label: "Showcase：把报告变成公开成果",
              href: "/showcase",
              description:
                "报告必须附协议、代码和真实日志；目前暂无已收录复现报告。",
            },
          ]}
        />
      </div>
    </main>
  );
}
