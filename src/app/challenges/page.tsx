import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CircleDot, Clock3, GitPullRequest, PackageCheck } from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { openChallenges } from "@/data/open-source";

export const metadata: Metadata = { title: "开放挑战" };

export default function ChallengesPage() {
  return (
    <main>
      <PageHero
        eyebrow="OPEN CHALLENGES"
        title="选择一个任务，完成一次真实贡献"
        description="任务按难度、预计时间和交付物拆分。当前列表是首批任务模板，仓库上线后将与 GitHub Issues 保持一致。"
        actions={
          <Button className="bg-[#7a1731] text-white hover:bg-[#641228]" asChild>
            <Link href="/contribute">先阅读贡献流程</Link>
          </Button>
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-6">
          {["全部", "good first issue", "help wanted", "research", "智能硬件"].map((label, index) => (
            <Badge key={label} variant={index === 0 ? "default" : "outline"} className={index === 0 ? "bg-[#7a1731] text-white" : "border-zinc-300 bg-white text-zinc-700"}>{label}</Badge>
          ))}
        </div>

        <div className="mt-8 overflow-hidden border border-zinc-200 bg-white">
          {openChallenges.map((challenge, index) => (
            <article key={challenge.id} className={`p-6 ${index > 0 ? "border-t border-zinc-200" : ""}`}>
              <div className="grid gap-5 lg:grid-cols-[1fr_220px] lg:items-start">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="outline" className="border-zinc-300 font-mono text-zinc-600">{challenge.id}</Badge>
                    <Badge variant="secondary" className="bg-[#eef7f4] text-[#245f51]">{challenge.level}</Badge>
                    <span className="text-xs text-zinc-500">{challenge.type}</span>
                  </div>
                  <h2 className="mt-4 text-lg font-semibold text-zinc-950">{challenge.title}</h2>
                  <p className="mt-2 text-sm text-zinc-600">所属项目：{challenge.project}</p>
                  <div className="mt-4 flex flex-wrap gap-5 text-sm text-zinc-500">
                    <span className="flex items-center gap-2"><Clock3 className="h-4 w-4" />{challenge.estimate}</span>
                    <span className="flex items-center gap-2"><PackageCheck className="h-4 w-4" />{challenge.output}</span>
                    <span className="flex items-center gap-2"><CircleDot className="h-4 w-4" />{challenge.status}</span>
                  </div>
                </div>
                <div className="flex gap-2 lg:justify-end">
                  <Button variant="outline" className="border-zinc-300 bg-white" asChild>
                    <Link href="/contribute#claim">认领方法 <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 grid gap-6 border border-zinc-200 bg-[#f8f7f4] p-7 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="flex items-center gap-2 text-sm font-medium text-[#7a1731]"><GitPullRequest className="h-4 w-4" />没有合适的任务？</p>
            <h2 className="mt-2 text-xl font-semibold text-zinc-950">可以从补文档、复现问题或拆分新 Issue 开始</h2>
            <p className="mt-2 text-sm leading-6 text-zinc-600">好的任务本身也是贡献。请写清背景、范围、验收方式和可能影响的模块。</p>
          </div>
          <Button className="w-fit bg-[#7a1731] text-white hover:bg-[#641228]" asChild>
            <Link href="/contribute#issue">查看任务规范</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
