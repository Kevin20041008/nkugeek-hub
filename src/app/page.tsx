import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  BookOpen,
  FlaskConical,
  GitPullRequest,
  Hammer,
} from "lucide-react";
import { ActivityFeed, SectionTitle } from "@/components/community/primitives";
import {
  ProjectCard,
  ShowcaseCard,
  TaskCard,
} from "@/components/community/cards";
import {
  communityProjects,
  effectiveProjectState,
  showcases,
  tasks,
  taskStatus,
} from "@/data/community";

export default function HomePage() {
  const actions = [
    { label: "开始学习", href: "/learn", icon: BookOpen },
    { label: "找一个任务", href: "/tasks", icon: GitPullRequest },
    { label: "加入项目", href: "/projects", icon: Hammer },
    { label: "参加科研复现", href: "/research", icon: FlaskConical },
  ];
  return (
    <main className="bg-white">
      <section className="border-b border-zinc-200">
        <div className="hub-container py-12">
          <h1 className="text-2xl font-semibold text-[#7a1731]">NKUGeek Hub</h1>
          <p className="mt-4 max-w-3xl text-4xl font-semibold leading-tight">
            Learn. Build.
            <br className="sm:hidden" /> Research. Contribute.
          </p>
          <p className="mt-5 text-base leading-7 text-zinc-600">
            南开学生的技术学习、开源协作与科研社区。
          </p>
          <div className="mt-7 grid max-w-3xl grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            {actions.map((a, i) => (
              <Link
                key={a.href}
                href={a.href}
                className={"hub-button " + (!i ? "hub-primary" : "")}
              >
                <a.icon className="h-4 w-4 shrink-0" />
                {a.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="hub-container">
        <section className="hub-section">
          <SectionTitle title="Start Here" href="/learn" link="选择学习起点" />
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              [
                "完成一个工具",
                "Python 工程实践：交付 CSV 分析器与测试。",
                "/learn/python-engineering",
              ],
              [
                "提交第一个 PR",
                "从一个有验收边界的 Good First Issue 开始。",
                "/tasks",
              ],
              [
                "做一份复现报告",
                "先补基础，再选论文与评估协议。",
                "/learn/foundations#paper",
              ],
            ].map(([title, desc, href]) => (
              <Link
                key={href}
                href={href}
                className="border-l-2 border-[#28705b] py-1 pl-4"
              >
                <h3 className="text-sm font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">{desc}</p>
              </Link>
            ))}
          </div>
        </section>
        <section className="hub-section">
          <SectionTitle title="Open Tasks" href="/tasks" />
          <div className="grid gap-4 md:grid-cols-3">
            {tasks
              .filter((t) => taskStatus(t) === "待认领")
              .slice(0, 3)
              .map((t) => (
                <TaskCard key={t.id} task={t} />
              ))}
          </div>
        </section>
        <section className="hub-section">
          <SectionTitle title="Active Projects" href="/projects" />
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              {communityProjects
                .filter((p) =>
                  ["Building", "Recruiting"].includes(effectiveProjectState(p)),
                )
                .slice(0, 1)
                .map((p) => (
                  <ProjectCard key={p.slug} project={p} />
                ))}
            </div>
            <figure className="self-center">
              <Link href="/learn/python-engineering">
                <Image
                  src={
                    (process.env.NEXT_PUBLIC_BASE_PATH ?? "") +
                    "/geek-lab-preview.png"
                  }
                  alt="Python 工程实践课程的实际页面与代码示例"
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded border border-zinc-200"
                  unoptimized
                />
              </Link>
              <figcaption className="mt-3 text-xs text-zinc-500">
                项目产出：可运行的 Python 工程实践课程
              </figcaption>
            </figure>
          </div>
        </section>
        <section className="hub-section">
          <SectionTitle title="Research Sprint" href="/research" />
          <div className="border-l-2 border-amber-500 pl-5">
            <p className="text-xs font-medium text-amber-800">
              提案阶段 · 暂无已启动 Sprint
            </p>
            <h3 className="mt-3 text-lg font-semibold">
              从 ResNet 的小规模基线开始
            </h3>
            <p className="mt-2 text-sm leading-7 text-zinc-500">
              先确认数据、算力和对齐协议；没有已验证的社区指标或完成报告。
            </p>
            <div className="mt-4 flex flex-wrap gap-5">
              <Link href="/papers/resnet" className="hub-link text-sm">
                阅读论文与计划
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/learn/foundations#pytorch"
                className="text-sm text-zinc-600 underline underline-offset-4"
              >
                先补 PyTorch 基础
              </Link>
            </div>
          </div>
        </section>
        <section className="hub-section">
          <SectionTitle
            title="Latest Showcase · Made at NKU"
            href="/showcase"
          />
          <div className="grid gap-4 md:grid-cols-3">
            {showcases.map((s) => (
              <ShowcaseCard key={s.slug} item={s} />
            ))}
          </div>
        </section>
        <section className="py-9">
          <SectionTitle
            title="Community Activity"
            href="/community#activity"
            link="社区动态"
          />
          <ActivityFeed />
        </section>
      </div>
    </main>
  );
}
