import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, GitPullRequest } from "lucide-react";
import { PaperCatalog } from "@/components/papers/paper-catalog";
import { paperCatalogReviewedAt, paperDomains, paperReadingPaths, paperRepository } from "@/data/papers";
import { getPaperReproductionCards } from "@/services/reproductions";

export const metadata: Metadata = {
  title: "论文共读与复现",
  description: "60 篇 NLP、计算机视觉、多模态、具身智能与强化学习论文，附原文、作者资源、分级阅读路线与复现计划。",
};

export default async function PapersPage() {
  const papers = await getPaperReproductionCards();
  return (
    <main className="bg-white">
      <header className="border-b border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-5 py-9 lg:px-8">
          <p className="text-xs font-medium text-[#28705b]">NKUGeek Research</p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-5">
            <h1 className="text-3xl font-semibold">论文共读与复现</h1>
            <a href={paperRepository + "/issues/new?title=" + encodeURIComponent("[论文推荐] ")} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-[#7a1731]"><GitPullRequest className="h-4 w-4" />推荐论文</a>
          </div>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-zinc-600">从基础方法到跨领域研究。{papers.length} 篇精选原文，5 个研究方向；先确定可验证的实验范围，再积累代码、日志与复现报告。</p>
          <p className="mt-3 text-xs leading-6 text-zinc-500">{Math.min(...papers.map((paper) => paper.year))}–{Math.max(...papers.map((paper) => paper.year))} · 年份按首次预印本 · 收录不代表已复现 · 校订 {paperCatalogReviewedAt}</p>
        </div>
      </header>
      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-8"><PaperCatalog papers={papers} /></section>
      <section className="border-y border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
          <h2 className="flex items-center gap-2 text-xl font-semibold"><BookOpen className="h-5 w-5 text-[#28705b]" />分方向阅读路线</h2>
          <div className="mt-5 divide-y divide-zinc-200">{paperReadingPaths.map((path) => (
            <div key={path.domain} className="grid gap-3 py-4 md:grid-cols-[190px_minmax(0,1fr)]"><h3 className="text-sm font-medium">{paperDomains[path.domain]}</h3><ol className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">{path.slugs.map((slug, index) => <li key={slug} className="flex items-center gap-3"><Link href={"/papers/" + slug} className="text-[#7a1731] hover:underline">{papers.find((paper) => paper.slug === slug)!.name}</Link>{index < path.slugs.length - 1 ? <ArrowRight aria-hidden="true" className="h-3 w-3 text-zinc-400" /> : null}</li>)}</ol></div>
          ))}</div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-8 text-sm leading-7 text-zinc-600 md:grid-cols-2 lg:px-8">
        <div><h2 className="font-semibold text-zinc-900">来源与收录原则</h2><p className="mt-2">参考 <a className="text-[#7a1731] underline underline-offset-4" href="https://spinningup.openai.com/en/latest/spinningup/keypapers.html" target="_blank" rel="noreferrer">Spinning Up · Key Papers in Deep RL</a> 的按主题组织方式，并扩展到语言、视觉、多模态与机器人。每篇均链接 arXiv 原文；清单不是全领域综述或排名。</p></div>
        <div><h2 className="font-semibold text-zinc-900">复现范围与证据</h2><p className="mt-2">难度、实践方式与实验目标是社区编辑建议，尚未逐篇实测。缩小训练、评估公开权重和复现原文全量结果需分别说明。没有可核验日志的项目，不填写成绩、负责人或完成状态。</p></div>
      </section>
    </main>
  );
}
