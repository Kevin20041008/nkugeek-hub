import type { Metadata } from "next";
import { BookOpen, GitBranch, Layers3, ShieldCheck, Users } from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { communityRoles } from "@/data/open-source";
import { mvpFeatures, roadmap } from "@/data/platform";

export const metadata: Metadata = { title: "关于社区" };

const architecture = [
  "GitHub 仓库存放代码、教程、实验、Issue 与贡献记录",
  "Next.js 负责公开展示学习路线、项目、工程资产与复现成果",
  "GitHub Actions 自动运行 lint、build 和页面 Smoke Test",
  "页面数据来自仓库中的 TypeScript 与 Markdown 文件，提交 PR 即可更新",
];

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="ABOUT NKUGEEK"
        title="以真实贡献驱动的高校开源学习社区"
        description="NKUGeek Hub 借鉴优秀开源教育社区的实践方式：教程和代码同行，学习与任务相连，讨论与贡献公开，成员成长由可验证的作品记录。"
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-2 lg:px-8">
        <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers3 className="h-5 w-5 text-[#7a1731]" />
              第一阶段范围
            </CardTitle>
            <CardDescription className="leading-7 text-zinc-600">
              先打通学习、运行、认领、提交和沉淀，不建设站内账户与审核系统。
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2 sm:grid-cols-2">
            {mvpFeatures.map((feature) => (
              <div
                key={feature}
                className="border border-zinc-200 bg-[#fbfbfd] p-3 text-sm text-zinc-700"
              >
                {feature}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-[#7a1731]" />
              开放技术架构
            </CardTitle>
            <CardDescription className="leading-7 text-zinc-600">
              网站是仓库内容的公开入口，GitHub 是协作事实来源。
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            {architecture.map((item) => (
              <div
                key={item}
                className="border-l-2 border-zinc-200 pl-3 text-sm leading-6 text-zinc-700"
              >
                {item}
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-[#7a1731]" />
              社区角色
            </CardTitle>
            <CardDescription className="text-zinc-600">
              角色来自持续贡献与责任，而不是网站注册或积分。
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-px bg-zinc-200 sm:grid-cols-2 lg:grid-cols-4">
            {communityRoles.map((item) => (
              <div key={item.role} className="bg-white p-5">
                <Badge
                  variant="outline"
                  className="border-zinc-300 font-mono text-zinc-700"
                >
                  {item.role}
                </Badge>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {item.description}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#7a1731]" />
              演进路线
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {roadmap.map((phase) => (
              <div
                key={phase.title}
                className="border border-zinc-200 bg-[#fbfbfd] p-4"
              >
                <p className="text-sm font-medium text-[#7a1731]">
                  {phase.phase}
                </p>
                <p className="mt-2 font-semibold text-zinc-950">
                  {phase.title}
                </p>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {phase.items.join("、")}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex gap-3 border border-[#2d7d69]/20 bg-[#eef7f4] p-5 text-sm leading-7 text-zinc-700 lg:col-span-2">
          <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-[#2d7d69]" />
          所有公开任务都应说明许可、数据来源、验收方法与安全边界；涉及隐私或敏感实验室信息时，不进入公开仓库。
        </div>
      </section>
    </main>
  );
}
