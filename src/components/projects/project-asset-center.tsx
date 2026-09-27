import Link from "next/link";
import {
  Box,
  Code2,
  Cpu,
  FileArchive,
  FileText,
  GitCompareArrows,
  MessageSquare,
  PackageCheck,
  TriangleAlert,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { EmptyState } from "@/components/empty-state";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type {
  ProjectAsset,
  ProjectAssetCenterData,
  ProjectAssetType,
} from "@/services/project-assets";

interface ProjectAssetCenterProps {
  center: ProjectAssetCenterData;
  compact?: boolean;
}

const assetTypeLabels: Record<ProjectAssetType, string> = {
  code: "代码",
  pcb: "PCB",
  cad: "CAD",
  dataset: "数据集",
  doc: "文档",
  release: "版本包",
  other: "其他",
};

const assetTypeIcons: Record<ProjectAssetType, LucideIcon> = {
  code: Code2,
  pcb: Cpu,
  cad: Box,
  dataset: FileArchive,
  doc: FileText,
  release: PackageCheck,
  other: FileArchive,
};

export function ProjectAssetCenter({
  center,
  compact = false,
}: ProjectAssetCenterProps) {
  const visibleAssets = compact ? center.assets.slice(0, 3) : center.assets;
  const conversionCount = center.assets.filter(
    (asset) => asset.previewStatus === "needs_conversion"
  ).length;
  const openCommentCount = center.comments.filter(
    (comment) => comment.status === "open"
  ).length;

  return (
    <div className="grid gap-6">
      <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileArchive className="h-5 w-5 text-[#7a1731]" />
                工程资料库
              </CardTitle>
              <CardDescription className="mt-2 leading-7 text-zinc-600">
                代码、PCB、CAD、文档和版本发布统一归档，并和任务、开发日志、Demo 版本连接。
              </CardDescription>
            </div>
            {compact ? (
              <Button
                variant="outline"
                className="border-zinc-300 bg-white text-zinc-900"
                asChild
              >
                <Link href={`/projects/${center.projectSlug}/assets`}>打开资料库</Link>
              </Button>
            ) : null}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-4">
            <MetricCard label="工程文件" value={center.assets.length.toString()} />
            <MetricCard label="版本发布" value={center.releases.length.toString()} />
            <MetricCard label="待处理评论" value={openCommentCount.toString()} />
            <MetricCard label="CAD 转换队列" value={conversionCount.toString()} />
          </div>

          <div className="mt-5 grid gap-3">
            {visibleAssets.length > 0 ? (
              visibleAssets.map((asset) => <AssetRow key={asset.id} asset={asset} />)
            ) : (
              <EmptyState
                title="暂无工程资料"
                description="项目负责人上传代码、PCB、CAD 或文档后，这里会显示可预览文件、版本和评论。"
                actionLabel="等待项目资料"
              />
            )}
          </div>
        </CardContent>
      </Card>

      {!compact ? (
        <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
          <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GitCompareArrows className="h-5 w-5 text-[#7a1731]" />
                Diff 与版本变化
              </CardTitle>
              <CardDescription className="text-zinc-600">
                代码 Diff、PCB 改版、CAD 模型调整可以在这里沉淀审阅记录。
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {center.diffs.length > 0 ? (
                center.diffs.map((diff) => (
                  <div key={diff.id} className="rounded-lg border border-zinc-200 bg-[#fbfbfd] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="font-medium text-zinc-950">{diff.assetName}</p>
                        <p className="mt-1 text-xs text-zinc-500">
                          {diff.fromVersion} → {diff.toVersion}
                        </p>
                      </div>
                      <Badge variant="secondary" className="bg-[#eef7f4] text-[#245f51]">
                        {diff.changedFiles} 个文件
                      </Badge>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-zinc-600">{diff.summary}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs">
                      <Badge variant="outline" className="border-green-200 text-green-700">
                        +{diff.addedLines}
                      </Badge>
                      <Badge variant="outline" className="border-red-200 text-red-700">
                        -{diff.removedLines}
                      </Badge>
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState
                  title="暂无 Diff 记录"
                  description="新版本发布后，可以记录代码行变更、PCB 图层变更或 CAD 模型变更。"
                />
              )}
            </CardContent>
          </Card>

          <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-[#7a1731]" />
                文件评论
              </CardTitle>
              <CardDescription className="text-zinc-600">
                文件级、行级或模型部位评论可以和工程文件长期绑定。
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3">
              {center.comments.length > 0 ? (
                center.comments.map((comment) => (
                  <div key={comment.id} className="rounded-lg border border-zinc-200 bg-[#fbfbfd] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                      <p className="font-medium text-zinc-950">{comment.assetName}</p>
                      <Badge variant="outline" className="border-zinc-300 text-zinc-600">
                        {comment.status === "open" ? "待处理" : comment.status}
                      </Badge>
                    </div>
                    <p className="mt-2 text-xs text-zinc-500">
                      {comment.anchor}
                      {comment.lineNumber ? ` · L${comment.lineNumber}` : ""}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">{comment.content}</p>
                  </div>
                ))
              ) : (
                <EmptyState
                  title="暂无文件评论"
                  description="成员可以围绕代码、PCB 网络、CAD 零件或文档段落发起审阅。"
                />
              )}
            </CardContent>
          </Card>
        </div>
      ) : null}

      {!compact ? (
        <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PackageCheck className="h-5 w-5 text-[#7a1731]" />
              项目版本发布
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3">
            {center.releases.length > 0 ? (
              center.releases.map((release) => (
                <div key={release.id} className="rounded-lg border border-zinc-200 bg-[#fbfbfd] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="font-medium text-zinc-950">{release.title}</p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {release.version} · {formatDate(release.releasedAt)}
                      </p>
                    </div>
                    <Badge variant="secondary" className="bg-[#eef7f4] text-[#245f51]">
                      {release.status === "published" ? "已发布" : release.status}
                    </Badge>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{release.summary}</p>
                  {release.demoUrl ? (
                    <Button
                      variant="ghost"
                      className="mt-3 h-8 px-0 text-[#7a1731] hover:bg-transparent"
                      asChild
                    >
                      <a href={release.demoUrl} target="_blank" rel="noreferrer">
                        查看 Demo / 仓库
                      </a>
                    </Button>
                  ) : null}
                </div>
              ))
            ) : (
              <EmptyState
                title="暂无版本发布"
                description="当项目进入 Demo Day 或阶段验收时，可以把工程文件、成果截图和发布说明打包成版本。"
              />
            )}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}

function AssetRow({ asset }: { asset: ProjectAsset }) {
  const Icon = assetTypeIcons[asset.fileType] ?? FileArchive;
  const needsConversion = asset.previewStatus === "needs_conversion";

  return (
    <div className="rounded-lg border border-zinc-200 bg-[#fbfbfd] p-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#f2efe8] text-[#7a1731]">
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="font-medium text-zinc-950">{asset.name}</p>
            <p className="mt-1 break-all text-xs text-zinc-500">{asset.path}</p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Badge variant="secondary" className="bg-white text-zinc-700">
                {assetTypeLabels[asset.fileType]}
              </Badge>
              <Badge variant="outline" className="border-zinc-300 text-zinc-600">
                {asset.format}
              </Badge>
              <Badge variant="outline" className="border-zinc-300 text-zinc-600">
                {asset.version}
              </Badge>
              <Badge variant="outline" className="border-zinc-300 text-zinc-600">
                {asset.size}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-2">
          <PreviewStatusBadge status={asset.previewStatus} />
          {asset.commentCount > 0 ? (
            <Badge variant="secondary" className="bg-[#eef7f4] text-[#245f51]">
              {asset.commentCount} 条评论
            </Badge>
          ) : null}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-200 pt-3 text-xs text-zinc-500">
        <span>{asset.linkedTo}</span>
        <div className="flex flex-wrap gap-2">
          {needsConversion ? (
            <span className="inline-flex items-center gap-1.5 text-amber-700">
              <TriangleAlert className="h-3.5 w-3.5" />
              等待转换为 STEP/STL/GLB
            </span>
          ) : null}
          {asset.storageUrl ? (
            <a
              href={asset.storageUrl}
              target="_blank"
              rel="noreferrer"
              className="font-medium text-[#7a1731] hover:underline"
            >
              打开源文件
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function MetricCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-[#fbfbfd] p-4">
      <p className="text-xs text-zinc-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-zinc-950">{value}</p>
    </div>
  );
}

function PreviewStatusBadge({ status }: { status: string }) {
  const labels: Record<string, string> = {
    ready: "可预览",
    needs_conversion: "待转换",
    unsupported: "暂不支持",
    processing: "处理中",
  };
  const className =
    status === "ready"
      ? "bg-[#eef7f4] text-[#245f51]"
      : status === "needs_conversion"
        ? "bg-amber-50 text-amber-800"
        : "bg-zinc-100 text-zinc-700";

  return (
    <Badge variant="secondary" className={className}>
      {labels[status] ?? status}
    </Badge>
  );
}

function formatDate(value: string) {
  return value.includes("T") ? value.slice(0, 10) : value;
}
