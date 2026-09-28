"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, RotateCcw, Search } from "lucide-react";
import { paperDomains, paperUrl, type Paper, type PaperDomain } from "@/data/papers";

const pageSize = 12;
const domainStyles: Record<PaperDomain, string> = {
  nlp: "text-[#7a1731] bg-rose-50",
  cv: "text-emerald-800 bg-emerald-50",
  multimodal: "text-sky-800 bg-sky-50",
  embodied: "text-amber-900 bg-amber-50",
  rl: "text-zinc-700 bg-zinc-100",
};

export function PaperCatalog({ papers }: { papers: Paper[] }) {
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState("all");
  const [year, setYear] = useState("all");
  const [difficulty, setDifficulty] = useState("all");
  const [mode, setMode] = useState("all");
  const [sort, setSort] = useState("reading");
  const [page, setPage] = useState(1);
  const years = [...new Set(papers.map((paper) => paper.year))].sort((a, b) => b - a);
  const filtered = useMemo(() => {
    const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
    const result = papers.filter((paper) => {
      const haystack = [paper.name, paper.title, paper.authors, paper.arxivId, paper.summary, ...paper.tags, paperDomains[paper.domain]].join(" ").toLocaleLowerCase();
      return (domain === "all" || paper.domain === domain)
        && (year === "all" || paper.year.toString() === year)
        && (difficulty === "all" || paper.difficulty === difficulty)
        && (mode === "all" || paper.mode === mode)
        && terms.every((term) => haystack.includes(term));
    });
    if (sort === "newest") result.sort((a, b) => b.year - a.year || a.name.localeCompare(b.name));
    if (sort === "oldest") result.sort((a, b) => a.year - b.year || a.name.localeCompare(b.name));
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [papers, query, domain, year, difficulty, mode, sort]);
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  function reset() {
    setQuery(""); setDomain("all"); setYear("all"); setDifficulty("all"); setMode("all"); setSort("reading"); setPage(1);
  }
  function changePage(next: number) {
    setPage(next);
    document.getElementById("catalog")?.scrollIntoView({ block: "start" });
  }
  const selectClass = "h-10 min-w-0 max-w-full rounded-md border border-zinc-300 bg-white px-3 text-sm text-zinc-800";
  return (
    <div id="catalog" className="scroll-mt-32">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h2 className="text-xl font-semibold">论文目录</h2>
        <label className="relative w-full sm:w-80">
          <span className="sr-only">搜索论文</span><Search aria-hidden="true" className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
          <input type="search" value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder="标题、作者、关键词或 arXiv ID" className="h-10 w-full rounded-md border border-zinc-300 bg-white pl-9 pr-3 text-sm" />
        </label>
      </div>
      <div role="group" aria-label="论文领域" className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-b border-zinc-200 pb-3">
        {[["all", "全部领域"], ...Object.entries(paperDomains)].map(([value, label]) => (
          <button key={value} type="button" aria-pressed={domain === value} onClick={() => { setDomain(value); setPage(1); }}
            className={"border-b-2 py-2 text-sm " + (domain === value ? "border-[#7a1731] font-semibold text-[#7a1731]" : "border-transparent text-zinc-500 hover:text-zinc-900")}>
            {label}<span className="ml-2 font-mono text-xs">{value === "all" ? papers.length : papers.filter((paper) => paper.domain === value).length}</span>
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 items-end gap-3 border-b border-zinc-200 py-4 sm:flex sm:flex-wrap">
        <label className="grid gap-1.5 text-xs text-zinc-500">首次预印本年份<select className={selectClass} value={year} onChange={(event) => { setYear(event.target.value); setPage(1); }}><option value="all">全部年份</option>{years.map((value) => <option key={value} value={value}>{value}</option>)}</select></label>
        <label className="grid gap-1.5 text-xs text-zinc-500">建议难度<select className={selectClass} value={difficulty} onChange={(event) => { setDifficulty(event.target.value); setPage(1); }}><option value="all">全部难度</option>{["入门", "进阶", "研究"].map((value) => <option key={value}>{value}</option>)}</select></label>
        <label className="grid gap-1.5 text-xs text-zinc-500">实践方式<select className={selectClass} value={mode} onChange={(event) => { setMode(event.target.value); setPage(1); }}><option value="all">全部方式</option>{["小规模训练", "权重评估", "仿真实验", "方案研读"].map((value) => <option key={value}>{value}</option>)}</select></label>
        <label className="grid gap-1.5 text-xs text-zinc-500">排序<select className={selectClass} value={sort} onChange={(event) => { setSort(event.target.value); setPage(1); }}><option value="reading">按主题编排</option><option value="newest">年份从新到旧</option><option value="oldest">年份从旧到新</option><option value="name">名称 A–Z</option></select></label>
        <button type="button" onClick={reset} title="重置筛选" aria-label="重置筛选" className="flex h-10 w-10 items-center justify-center rounded-md text-zinc-500 hover:bg-zinc-100"><RotateCcw className="h-4 w-4" /></button>
      </div>
      <p role="status" className="py-4 text-sm text-zinc-500">{filtered.length} 篇论文 · 第 {currentPage} / {pages} 页</p>
      {visible.length ? <div className="divide-y divide-zinc-200 border-y border-zinc-200">{visible.map((paper) => (
        <article key={paper.slug} data-testid="paper-row" className="grid min-w-0 gap-4 py-6 md:grid-cols-[minmax(0,1fr)_170px]">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs"><span className={"rounded px-2 py-1 " + domainStyles[paper.domain]}>{paperDomains[paper.domain]}</span><span className="font-mono text-zinc-500">{paper.year}</span><span className="text-zinc-400">/</span><span className="font-medium text-zinc-700">{paper.name}</span></div>
            <h3 className="mt-3 break-words text-lg font-semibold leading-7"><Link href={"/papers/" + paper.slug} className="hover:text-[#7a1731]">{paper.title}</Link></h3>
            <p className="mt-2 text-xs leading-6 text-zinc-500">{paper.authors}</p>
            <p className="mt-2 text-sm leading-7 text-zinc-600">{paper.summary}</p>
            <p className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs leading-6 text-zinc-500">{paper.tags.map((tag) => <span key={tag}>{tag}</span>)}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3 text-sm md:flex-col md:items-start md:border-l md:border-zinc-100 md:pl-5">
            <span className="text-zinc-600">{paper.difficulty} · {paper.mode}</span>
            <span className="text-xs text-zinc-500">待认领 · 暂无实验记录</span>
            <Link href={"/papers/" + paper.slug} className="inline-flex items-center gap-2 font-medium text-[#7a1731]" aria-label={"查看 " + paper.name + " 复现计划"}>复现计划<ArrowRight className="h-4 w-4" /></Link>
            <a href={paperUrl(paper)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-zinc-500" aria-label={"阅读 " + paper.name + " 原文"}>论文原文<ExternalLink className="h-3.5 w-3.5" /></a>
          </div>
        </article>
      ))}</div> : <div className="border-y border-dashed border-zinc-300 py-16 text-center"><h3 className="font-medium">没有匹配的论文</h3><p className="mt-2 text-sm text-zinc-500">试试更短的关键词，或清除部分筛选条件。</p><button type="button" onClick={reset} className="mt-5 inline-flex items-center gap-2 text-sm text-[#7a1731]"><RotateCcw className="h-4 w-4" />重置全部筛选</button></div>}
      <nav aria-label="论文分页" className="mt-6 flex items-center justify-between gap-4">
        <button type="button" disabled={currentPage <= 1} onClick={() => changePage(currentPage - 1)} className="inline-flex h-10 items-center gap-2 rounded-md border border-zinc-200 px-3 text-sm disabled:opacity-40"><ChevronLeft className="h-4 w-4" />上一页</button>
        <span className="text-sm tabular-nums text-zinc-500">{currentPage} / {pages}</span>
        <button type="button" disabled={currentPage >= pages} onClick={() => changePage(currentPage + 1)} className="inline-flex h-10 items-center gap-2 rounded-md border border-zinc-200 px-3 text-sm disabled:opacity-40">下一页<ChevronRight className="h-4 w-4" /></button>
      </nav>
    </div>
  );
}
