import type { Metadata } from "next";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  ExternalLink,
  GitFork,
  GitBranch,
  GitPullRequest,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { communityRoles, contributionSteps } from "@/data/open-source";

export const metadata: Metadata = { title: "参与贡献" };

const workflow = [
  {
    icon: MessageSquare,
    title: "在 Issue 留言",
    description: "说明你准备解决什么、打算如何验证，并等待维护者确认任务边界。",
  },
  {
    icon: GitFork,
    title: "Fork 并创建分支",
    description:
      "使用 feature/、fix/、docs/ 或 design/ 前缀，让分支目的容易识别。",
  },
  {
    icon: CheckCircle2,
    title: "完成本地检查",
    description: "运行 lint、build 和 smoke test；涉及实验时附带环境与结果。",
  },
  {
    icon: GitPullRequest,
    title: "提交 Pull Request",
    description: "描述做了什么、如何验证、相关截图以及尚未解决的问题。",
  },
];

export default function ContributePage() {
  return (
    <main>
      <PageHero
        eyebrow="CONTRIBUTE"
        title="无需申请加入，用一次贡献成为社区成员"
        description="NKUGeek Hub 不建立站内注册和人工审核门槛。讨论发生在 Issue，修改通过 Pull Request 提交，成长记录来自公开且可验证的成果。"
        actions={
          <>
            <Button
              className="bg-[#7a1731] text-white hover:bg-[#641228]"
              asChild
            >
              <a
                href="https://github.com/Kevin20041008/nkugeek-hub"
                target="_blank"
                rel="noreferrer"
              >
                <GitBranch className="mr-2 h-4 w-4" />
                访问 GitHub
              </a>
            </Button>
            <Button
              variant="outline"
              className="border-zinc-300 bg-white"
              asChild
            >
              <Link href="/tasks">查看开放任务</Link>
            </Button>
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-px border border-zinc-200 bg-zinc-200 md:grid-cols-4">
          {contributionSteps.map((item) => (
            <div key={item.step} className="bg-white p-6">
              <p className="font-mono text-sm font-medium text-[#7a1731]">
                {item.step}
              </p>
              <h2 className="mt-4 font-semibold text-zinc-950">{item.title}</h2>
              <p className="mt-2 text-sm leading-7 text-zinc-600">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div
          id="claim"
          className="mt-12 grid scroll-mt-28 gap-10 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div>
            <Badge
              variant="outline"
              className="border-[#7a1731]/25 text-[#7a1731]"
            >
              WORKFLOW
            </Badge>
            <h2 className="mt-4 text-2xl font-semibold text-zinc-950">
              认领与提交
            </h2>
            <p className="mt-3 leading-7 text-zinc-600">
              保持任务小、讨论公开、验证明确。第一次贡献不必很大，但应该能够被别人复现和检查。
            </p>
          </div>
          <div className="grid gap-4">
            {workflow.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="flex gap-4 border-b border-zinc-200 pb-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f2efe8] text-[#7a1731]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-medium text-zinc-950">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          id="issue"
          className="mt-14 grid scroll-mt-28 gap-6 lg:grid-cols-2"
        >
          <div className="border border-zinc-200 bg-white p-6">
            <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-950">
              <BookOpen className="h-5 w-5 text-[#7a1731]" />
              Issue 任务规范
            </h2>
            <div className="mt-5 grid gap-3 text-sm text-zinc-600">
              {[
                "背景：为什么需要这个任务",
                "范围：这次做什么、不做什么",
                "验收：怎样判断任务已经完成",
                "输出：代码、文档、实验或工程文件",
                "风险：会影响哪些页面、数据或使用者",
              ].map((item) => (
                <p
                  key={item}
                  className="border-l-2 border-zinc-200 pl-3 leading-6"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>
          <div
            id="docs"
            className="scroll-mt-28 border border-zinc-200 bg-white p-6"
          >
            <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-950">
              <ShieldCheck className="h-5 w-5 text-[#2d7d69]" />
              内容与文档贡献
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-600">
              教程、文章、实验日志和页面文案都跟随代码仓库版本管理。修改
              Markdown 后直接提交 PR，不经过站内草稿与文章审核系统。
            </p>
            <Button
              variant="outline"
              className="mt-5 border-zinc-300 bg-white"
              asChild
            >
              <a
                href="https://github.com/Kevin20041008/nkugeek-hub"
                target="_blank"
                rel="noreferrer"
              >
                打开内容仓库 <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>

        <div className="mt-14">
          <h2 className="text-2xl font-semibold text-zinc-950">
            社区角色来自贡献，不来自注册
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {communityRoles.map((item) => (
              <div
                key={item.role}
                className="border-t-2 border-[#7a1731] bg-[#fbfbfd] p-5"
              >
                <p className="font-mono text-sm font-semibold text-zinc-950">
                  {item.role}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
