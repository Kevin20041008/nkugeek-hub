import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Bug,
  Database,
  FileText,
  FlaskConical,
  GitBranch,
  LineChart,
  TerminalSquare,
} from "lucide-react";

import { EmptyState } from "@/components/empty-state";
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
import {
  getPaperReproductionDetail,
  getStaticPaperSlugs,
  type MetricEntry,
} from "@/services/reproductions";

export const metadata: Metadata = {
  title: "论文复现空间",
};

const pipelineSteps = [
  "论文信息",
  "数据集",
  "实验环境",
  "指标对齐",
  "问题记录",
  "复现报告",
];

export function generateStaticParams() {
  return getStaticPaperSlugs().map((paperId) => ({ paperId }));
}

export default async function PaperReproductionPage({
  params,
}: {
  params: Promise<{ paperId: string }>;
}) {
  const { paperId } = await params;
  const paper = await getPaperReproductionDetail(paperId);

  return (
    <main>
      <PageHero
        eyebrow="REPRODUCTION PIPELINE"
        title={`${paper.title} 复现空间`}
        description={paper.focus}
        actions={
          <>
            <Button className="bg-[#7a1731] text-white hover:bg-[#641228]" asChild>
              <Link href="/papers">
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回论文列表
              </Link>
            </Button>
            {paper.codeUrl ? (
              <Button
                variant="outline"
                className="border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50"
                asChild
              >
                <a href={paper.codeUrl} target="_blank" rel="noreferrer">
                  <GitBranch className="mr-2 h-4 w-4" />
                  代码仓库
                </a>
              </Button>
            ) : null}
          </>
        }
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard label="会议/期刊" value={paper.venue} />
          <InfoCard label="状态" value={paper.status} />
          <InfoCard label="负责人" value={paper.owner} />
          <InfoCard label="分享时间" value={paper.shareAt} />
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-[#7a1731]" />
                论文与复现目标
              </CardTitle>
              <CardDescription className="leading-7 text-zinc-600">
                {paper.authors}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
              <div className="rounded-lg border border-zinc-200 bg-[#fbfbfd] p-4">
                <p className="text-sm font-medium text-zinc-950">实验环境</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{paper.environment}</p>
              </div>
              <div className="rounded-lg border border-zinc-200 bg-[#fbfbfd] p-4">
                <p className="text-sm font-medium text-zinc-950">数据集</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{paper.dataset}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {paper.pdfUrl ? (
                  <Button variant="outline" className="border-zinc-300 bg-white" asChild>
                    <a href={paper.pdfUrl} target="_blank" rel="noreferrer">
                      <FileText className="mr-2 h-4 w-4" />
                      论文 PDF
                    </a>
                  </Button>
                ) : null}
                {paper.reportUrl ? (
                  <Button variant="outline" className="border-zinc-300 bg-white" asChild>
                    <a href={paper.reportUrl} target="_blank" rel="noreferrer">
                      <LineChart className="mr-2 h-4 w-4" />
                      复现报告
                    </a>
                  </Button>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FlaskConical className="h-5 w-5 text-[#7a1731]" />
                流水线进度
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {pipelineSteps.map((step, index) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f2efe8] text-sm font-semibold text-[#7a1731]">
                      {index + 1}
                    </div>
                    <div className="h-px flex-1 bg-zinc-200" />
                    <span className="w-24 text-sm font-medium text-zinc-700">{step}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <MetricPanel
            title="原论文指标"
            metrics={paper.originalMetrics}
            empty="原论文指标待录入。"
          />
          <MetricPanel
            title="当前复现指标"
            metrics={paper.currentMetrics}
            empty="当前复现指标待录入。"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5 text-[#7a1731]" />
                数据集
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {paper.datasets.length > 0 ? (
                paper.datasets.map((dataset) => (
                  <div key={dataset.id} className="rounded-lg border border-zinc-200 bg-[#fbfbfd] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-medium text-zinc-950">{dataset.name}</p>
                      <Badge variant="outline" className="border-zinc-300 text-zinc-600">
                        {dataset.license}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm text-zinc-500">{dataset.split}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">{dataset.notes}</p>
                    {dataset.url ? (
                      <a
                        href={dataset.url}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-block text-sm font-medium text-[#7a1731] hover:underline"
                      >
                        数据集链接
                      </a>
                    ) : null}
                  </div>
                ))
              ) : (
                <EmptyState title="暂无数据集" description="记录数据来源、许可、划分和预处理说明后，这里会形成数据资产目录。" />
              )}
            </CardContent>
          </Card>

          <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TerminalSquare className="h-5 w-5 text-[#7a1731]" />
                实验日志
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {paper.experiments.length > 0 ? (
                paper.experiments.map((experiment) => (
                  <div key={experiment.id} className="rounded-lg border border-zinc-200 bg-[#fbfbfd] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-medium text-zinc-950">{experiment.title}</p>
                      <Badge variant="secondary" className="bg-[#eef7f4] text-[#245f51]">
                        {formatStatus(experiment.status)}
                      </Badge>
                    </div>
                    <div className="mt-3 grid gap-2 text-sm text-zinc-600 sm:grid-cols-2">
                      <span>Seed：{experiment.seed}</span>
                      <span>时间：{experiment.runAt}</span>
                      <span>{experiment.baselineMetric}</span>
                      <span>{experiment.currentMetric}</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-zinc-600">{experiment.log}</p>
                  </div>
                ))
              ) : (
                <EmptyState title="暂无实验日志" description="每次训练、推理、评估和失败尝试都可以记录为实验日志。" />
              )}
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bug className="h-5 w-5 text-[#7a1731]" />
                问题记录
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {paper.issues.length > 0 ? (
                paper.issues.map((issue) => (
                  <div key={issue.id} className="rounded-lg border border-zinc-200 bg-[#fbfbfd] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-medium text-zinc-950">{issue.title}</p>
                      <Badge variant="outline" className="border-amber-200 text-amber-800">
                        {issue.severity} · {issue.status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">{issue.notes}</p>
                  </div>
                ))
              ) : (
                <EmptyState title="暂无问题记录" description="把环境错误、指标差距和数据异常留下来，方便后续成员接手。" />
              )}
            </CardContent>
          </Card>

          <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#7a1731]" />
                复现报告
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3">
              {paper.reports.length > 0 ? (
                paper.reports.map((report) => (
                  <div key={report.id} className="rounded-lg border border-zinc-200 bg-[#fbfbfd] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-medium text-zinc-950">{report.title}</p>
                      <Badge variant="secondary" className="bg-[#eef7f4] text-[#245f51]">
                        {formatStatus(report.status)}
                      </Badge>
                    </div>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">{report.summary}</p>
                    {report.reportUrl ? (
                      <a
                        href={report.reportUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-3 inline-block text-sm font-medium text-[#7a1731] hover:underline"
                      >
                        打开报告
                      </a>
                    ) : null}
                  </div>
                ))
              ) : (
                <EmptyState title="暂无复现报告" description="报告可以汇总指标、环境、失败案例和后续计划。" />
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-sm text-zinc-500">{label}</p>
      <p className="mt-2 font-semibold text-zinc-950">{value || "待补充"}</p>
    </div>
  );
}

function MetricPanel({
  title,
  metrics,
  empty,
}: {
  title: string;
  metrics: MetricEntry[];
  empty: string;
}) {
  return (
    <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChart className="h-5 w-5 text-[#7a1731]" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {metrics.length > 0 ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {metrics.map((metric) => (
              <div key={metric.label} className="rounded-lg border border-zinc-200 bg-[#fbfbfd] p-4">
                <p className="text-xs text-zinc-500">{metric.label}</p>
                <p className="mt-2 text-2xl font-semibold text-zinc-950">{metric.value}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-zinc-300 bg-[#fbfbfd] p-6 text-center text-sm text-zinc-600">
            {empty}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function formatStatus(status: string) {
  const labels: Record<string, string> = {
    running: "实验中",
    review: "待审阅",
    published: "已发布",
    draft: "草稿",
    matched: "已对齐",
    improved: "已超越",
  };

  return labels[status] ?? status;
}
