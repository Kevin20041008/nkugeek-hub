import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Database,
  FileText,
  FlaskConical,
  GitCompareArrows,
} from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getPaperReproductionCards } from "@/services/reproductions";

export const metadata: Metadata = {
  title: "论文复现",
};

const reproductionFields = [
  "论文信息",
  "数据集",
  "实验环境",
  "原论文指标",
  "当前复现指标",
  "实验日志",
  "问题记录",
  "复现报告",
];

const workflow = [
  {
    icon: FileText,
    text: "登记论文条目，补齐 PDF、代码仓库、阅读状态和分享会时间。",
  },
  {
    icon: Database,
    text: "建立数据集、环境配置和指标表，避免复现实验只停留在笔记里。",
  },
  {
    icon: GitCompareArrows,
    text: "把每次实验、阻塞问题和报告沉淀成可审阅的复现流水线。",
  },
];

export default async function PapersPage() {
  const papers = await getPaperReproductionCards();
  const activeCount = papers.filter((paper) =>
    ["复现中", "实验中", "日志中"].includes(paper.status)
  ).length;

  return (
    <main>
      <PageHero
        eyebrow="PAPER REPRODUCTION"
        title="论文共读与复现流水线"
        description="每篇论文都可以形成独立复现空间，持续记录数据集、环境、指标、实验日志、问题和复现报告。"
        actions={
          <Button className="bg-[#7a1731] text-white hover:bg-[#641228]">
            <BookOpen className="mr-2 h-4 w-4" />
            发起共读
          </Button>
        }
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-[1fr_0.9fr] lg:px-8">
        <div className="grid gap-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <Summary label="论文空间" value={papers.length.toString()} />
            <Summary label="复现进行中" value={activeCount.toString()} />
            <Summary
              label="实验记录"
              value={papers.reduce((sum, paper) => sum + paper.experimentCount, 0).toString()}
            />
          </div>

          {papers.map((paper) => (
            <Card
              key={paper.slug}
              className="group border-zinc-200 bg-white text-zinc-950 shadow-sm transition hover:border-[#7a1731]/30"
            >
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="secondary" className="bg-[#f2efe8] text-[#7a1731]">
                    {paper.venue}
                  </Badge>
                  <Badge variant="secondary" className="bg-[#eef7f4] text-[#245f51]">
                    {paper.status}
                  </Badge>
                </div>
                <CardTitle className="pt-3 text-xl">{paper.title}</CardTitle>
                <CardDescription className="leading-7 text-zinc-600">
                  {paper.focus}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 text-sm text-zinc-600 sm:grid-cols-2">
                  <span>作者：{paper.authors}</span>
                  <span>负责人：{paper.owner}</span>
                  <span>实验记录：{paper.experimentCount}</span>
                  <span>指标：{paper.metricSummary}</span>
                </div>
                <Button
                  variant="ghost"
                  className="mt-5 w-full justify-between text-zinc-700 hover:bg-[#fff6f0] hover:text-[#7a1731]"
                  asChild
                >
                  <Link href={`/papers/${paper.slug}`}>
                    查看复现空间
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid gap-5">
          <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-[#7a1731]" />
                论文复现空间
              </CardTitle>
              <CardDescription className="leading-7 text-zinc-600">
                复现不是单次提交，而是一条从论文、数据、环境到报告的可追踪链路。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2">
                {reproductionFields.map((field) => (
                  <div
                    key={field}
                    className="rounded-lg border border-zinc-200 bg-[#fbfbfd] p-3 text-sm text-zinc-700"
                  >
                    {field}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
            <CardHeader>
              <CardTitle>复现流程</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 text-sm text-zinc-600">
              {workflow.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.text} className="flex items-start gap-3">
                    <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#7a1731]" />
                    <span>{item.text}</span>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
      <p className="text-2xl font-semibold text-zinc-950">{value}</p>
      <p className="mt-1 text-sm text-zinc-600">{label}</p>
    </div>
  );
}
