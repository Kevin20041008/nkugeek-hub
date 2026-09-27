import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Clock3, Route, Terminal } from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { learningPaths } from "@/data/open-source";

export const metadata: Metadata = { title: "学习路线" };

export default function LearnPage() {
  return (
    <main>
      <PageHero
        eyebrow="LEARNING PATHS"
        title="沿着代码和任务学习，而不是只收藏资料"
        description="每条路线由若干可运行、可测试、可提交的章节组成。你可以从零开始，也可以直接进入与当前能力匹配的阶段。"
        actions={
          <Button className="bg-[#7a1731] text-white hover:bg-[#641228]" asChild>
            <Link href="#open-source-foundation">从 PATH 00 开始</Link>
          </Button>
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="mb-12 grid gap-4 border-y border-zinc-200 py-6 sm:grid-cols-3">
          {["章节有明确输入与产出", "代码与文档保持同一仓库", "完成路线后进入开放任务"].map((item) => (
            <div key={item} className="flex items-center gap-3 text-sm text-zinc-700">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-[#2d7d69]" />
              {item}
            </div>
          ))}
        </div>

        <div className="grid gap-14">
          {learningPaths.map((path) => (
            <article key={path.slug} id={path.slug} className="scroll-mt-28">
              <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
                <div>
                  <Badge variant="outline" className="border-[#7a1731]/25 font-mono text-[#7a1731]">{path.code}</Badge>
                  <h2 className="mt-4 text-2xl font-semibold text-zinc-950">{path.title}</h2>
                  <p className="mt-3 leading-7 text-zinc-600">{path.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-[#eef7f4] text-[#245f51]">{path.level}</Badge>
                    <Badge variant="secondary" className="bg-zinc-100 text-zinc-700">
                      <Clock3 className="mr-1.5 h-3.5 w-3.5" />{path.duration}
                    </Badge>
                  </div>
                  <div className="mt-6 border-l-2 border-[#7a1731] pl-4">
                    <p className="text-xs font-medium text-zinc-500">最终产出</p>
                    <p className="mt-1 text-sm font-medium leading-6 text-zinc-900">{path.outcome}</p>
                  </div>
                </div>

                <div className="overflow-hidden border border-zinc-200 bg-white">
                  {path.stages.map((stage, index) => (
                    <div key={stage.id} className={`grid gap-4 p-5 sm:grid-cols-[72px_1fr_1fr] ${index > 0 ? "border-t border-zinc-200" : ""}`}>
                      <div className="flex items-start gap-2 font-mono text-sm text-[#7a1731]">
                        <Route className="mt-0.5 h-4 w-4" />{stage.id}
                      </div>
                      <div>
                        <p className="font-medium text-zinc-950">{stage.title}</p>
                        <p className="mt-1 text-sm leading-6 text-zinc-600">{stage.task}</p>
                      </div>
                      <div className="text-sm text-zinc-600">
                        <p className="text-xs font-medium text-zinc-500">OUTPUT</p>
                        <p className="mt-1 leading-6">{stage.output}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex flex-col justify-between gap-5 bg-zinc-950 p-7 text-white sm:flex-row sm:items-center">
          <div>
            <p className="flex items-center gap-2 text-sm text-emerald-300"><Terminal className="h-4 w-4" />NEXT STEP</p>
            <h2 className="mt-2 text-xl font-semibold">完成一个章节后，去认领真实任务</h2>
          </div>
          <Button className="w-fit bg-white text-zinc-950 hover:bg-zinc-100" asChild>
            <Link href="/challenges">进入开放挑战 <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
