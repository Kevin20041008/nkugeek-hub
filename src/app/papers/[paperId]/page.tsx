import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, BookOpen, ExternalLink, FileText, FlaskConical, GitPullRequest } from "lucide-react";
import { paperCatalog, paperCatalogReviewedAt, paperDomains, paperPdfUrl, paperProposalUrl, paperRepository, paperUrl } from "@/data/papers";
import { getPaperReproductionDetail, getStaticPaperSlugs } from "@/services/reproductions";

type Props = { params: Promise<{ paperId: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return getStaticPaperSlugs().map((paperId) => ({ paperId })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { paperId } = await params;
  const paper = await getPaperReproductionDetail(paperId);
  return { title: paper ? paper.name + " · 论文复现" : "论文不存在", description: paper?.summary };
}

export default async function PaperReproductionPage({ params }: Props) {
  const { paperId } = await params;
  const paper = await getPaperReproductionDetail(paperId);
  if (!paper) notFound();
  const related = paperCatalog.filter((item) => item.domain === paper.domain && item.slug !== paper.slug).slice(0, 4);
  const existingIssues = paperRepository + "/issues?q=" + encodeURIComponent("is:issue \"" + paper.name + "\"");
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-6 lg:px-8"><Link href="/papers" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-[#7a1731]"><ArrowLeft className="h-4 w-4" />返回论文目录</Link></div>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:px-8">
        <div className="min-w-0">
          <header className="border-b border-zinc-200 pb-7">
            <p className="text-xs font-medium text-[#28705b]">{paperDomains[paper.domain]} · {paper.year} · {paper.name}</p>
            <h1 className="mt-4 break-words text-2xl font-semibold leading-snug sm:text-3xl">{paper.title}</h1>
            <p className="mt-4 text-sm leading-7 text-zinc-500">{paper.authors}</p>
            <p className="mt-4 leading-8 text-zinc-700">{paper.summary}</p>
            <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-zinc-500">{paper.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <div className="mt-5 flex flex-wrap gap-5 text-sm text-[#7a1731] lg:hidden"><a href={paperUrl(paper)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2"><ExternalLink className="h-4 w-4" />阅读原文</a><a href={paperPdfUrl(paper)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2"><FileText className="h-4 w-4" />打开 PDF</a></div>
          </header>
          <section className="border-b border-zinc-200 py-7" aria-labelledby="goal-heading">
            <h2 id="goal-heading" className="flex items-center gap-2 text-xl font-semibold"><FlaskConical className="h-5 w-5 text-[#7a1731]" />复现空间 · 建议计划</h2>
            <p className="mt-3 text-xs leading-6 text-zinc-500">{paper.difficulty} · {paper.mode} · 编辑建议，尚未实测</p>
            <h3 className="mt-5 text-sm font-semibold">最小实验目标</h3><p className="mt-2 text-sm leading-7 text-zinc-700">{paper.goal}</p>
            <h3 className="mt-5 text-sm font-semibold">数据集 / 环境</h3><p className="mt-2 text-sm leading-7 text-zinc-700">{paper.dataset}</p>
            <h3 className="mt-5 text-sm font-semibold">评估项</h3><ul className="mt-2 list-disc space-y-1 pl-5 text-sm leading-7 text-zinc-700">{paper.metrics.map((metric) => <li key={metric}>{metric}</li>)}</ul>
            <div className="mt-6 border-l-2 border-amber-500 pl-4"><h3 className="text-sm font-semibold">边界与常见偏差</h3><p className="mt-2 text-sm leading-7 text-zinc-600">{paper.caution}</p></div>
          </section>
          <section className="border-b border-zinc-200 py-7" aria-labelledby="protocol-heading">
            <h2 id="protocol-heading" className="text-xl font-semibold">实验验收协议</h2>
            <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-zinc-600">
              <li>阅读原文，选定要对齐的具体表格、模型变体与数据划分；把缩小规模或替换组件单独列出。</li>
              <li>核对作者资源的许可与依赖，锁定代码 commit、权重版本、硬件、随机种子和完整运行命令。</li>
              <li>先完成数据与推理检查，再执行约定的实验；记录多次运行结果、资源消耗和失败案例。</li>
              <li>提交可核验的代码、配置、日志与报告。原论文数值须注明表格和协议，当前指标必须附实际运行证据。</li>
            </ol>
          </section>
          <section className="border-b border-zinc-200 py-7" aria-labelledby="records-heading">
            <h2 id="records-heading" className="text-xl font-semibold">实验记录</h2>
            <dl className="mt-5 grid gap-5 sm:grid-cols-2"><div><dt className="text-xs text-zinc-500">原论文对齐目标</dt><dd className="mt-2 text-sm">待认领后选定具体表格与评估条件</dd></div><div><dt className="text-xs text-zinc-500">社区复现指标</dt><dd className="mt-2 text-sm">暂无已验证结果</dd></div></dl>
            <p className="mt-5 text-sm leading-7 text-zinc-500">暂无实验日志与复现报告。收录此论文不表示社区已完成训练或评估；后续记录通过仓库 Issue 和 Pull Request 补充。</p>
          </section>
          <section className="pt-7"><h2 className="flex items-center gap-2 text-xl font-semibold"><BookOpen className="h-5 w-5 text-[#28705b]" />同方向阅读</h2><div className="mt-4 divide-y divide-zinc-100">{related.map((item) => <Link key={item.slug} href={"/papers/" + item.slug} className="flex items-center justify-between gap-3 py-3 text-sm hover:text-[#7a1731]"><span>{item.name} · {item.year}</span><ArrowRight className="h-4 w-4 shrink-0" /></Link>)}</div></section>
        </div>
        <aside className="min-w-0 self-start border-t border-zinc-200 pt-6 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <h2 className="text-sm font-semibold">原始来源</h2>
          <p className="mt-3 break-all font-mono text-xs text-zinc-500">arXiv:{paper.arxivId}</p>
          <p className="mt-2 text-xs leading-6 text-zinc-500">首次预印本：{paper.year}<br />目录校订：{paperCatalogReviewedAt}</p>
          <div className="mt-5 grid gap-4 text-sm">
            <a href={paperUrl(paper)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-[#7a1731]"><ExternalLink className="h-4 w-4 shrink-0" />论文原文与版本记录</a>
            <a href={paperPdfUrl(paper)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-zinc-600"><FileText className="h-4 w-4 shrink-0" />阅读 PDF</a>
            {paper.resource ? <a href={paper.resource.url} target="_blank" rel="noreferrer" className="inline-flex items-start gap-2 leading-6 text-zinc-600"><ExternalLink className="mt-1 h-4 w-4 shrink-0" />{paper.resource.label}</a> : <p className="text-xs leading-6 text-zinc-500">尚未收录经核对的代码入口；这不代表作者未发布代码。</p>}
          </div>
          <div className="mt-7 border-t border-zinc-200 pt-6"><h2 className="text-sm font-semibold">社区状态：待认领</h2><p className="mt-3 text-sm leading-7 text-zinc-500">暂无负责人或已验证实验。先查看现有讨论，再提交你的范围、资源与时间计划。</p><a href={existingIssues} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm text-zinc-600">查看相关 Issue<ExternalLink className="h-3.5 w-3.5" /></a><a href={paperProposalUrl(paper)} target="_blank" rel="noreferrer" className="mt-5 flex items-center justify-center gap-2 rounded-md bg-[#7a1731] px-4 py-3 text-sm font-medium text-white"><GitPullRequest className="h-4 w-4 shrink-0" />提交复现计划</a><p className="mt-3 text-xs leading-6 text-zinc-500">将打开 GitHub 预填表单，提交前可修改；不会自动认领或创建实验记录。</p></div>
        </aside>
      </div>
    </main>
  );
}
