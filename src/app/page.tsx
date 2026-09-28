import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  GitBranch,
  GitPullRequest,
  ListChecks,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { contributionSteps, openChallenges } from "@/data/open-source";
import { getProjectCards } from "@/services/projects";
import { coursePath, labLessons } from "@/data/geek-lab";


const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default async function HomePage() {
  const projects = await getProjectCards();
  const featuredProjects = projects.slice(0, 3);

  return (
    <main>
      <section className="overflow-hidden border-b border-zinc-200 bg-white">
        <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
          <div>
            <Badge variant="outline" className="border-[#7a1731]/25 bg-[#7a1731]/5 px-3 py-1 text-[#7a1731]">
              OPEN SOURCE LEARNING COMMUNITY
            </Badge>
            <h1 className="mt-6 text-5xl font-semibold leading-none text-zinc-950 sm:text-6xl lg:text-7xl">
              NKUGeek Hub
            </h1>
            <p className="mt-6 max-w-2xl text-xl font-medium leading-8 text-zinc-800 sm:text-2xl">
              从一条学习路线，到第一个合并的 Pull Request。
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-zinc-600">
              面向南开学生的开放技术学习与实践社区。阅读路线、运行代码、认领任务、提交贡献，所有成果都沉淀在公开仓库中。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="h-11 bg-[#7a1731] px-5 text-white hover:bg-[#641228]" asChild>
                <Link href="/learn">
                  进入 Geek Lab
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-11 border-zinc-300 bg-white px-5" asChild>
                <Link href="/challenges">
                  <ListChecks className="mr-2 h-4 w-4" />
                  认领开放任务
                </Link>
              </Button>
              <Button size="icon-lg" variant="ghost" className="text-zinc-700" asChild>
                <a href="https://github.com/NKUGeek" target="_blank" rel="noreferrer" aria-label="访问 NKUGeek GitHub">
                  <GitBranch className="h-5 w-5" />
                </a>
              </Button>
            </div>
            <p className="mt-6 flex items-center gap-2 text-sm text-zinc-500">
              <CheckCircle2 className="h-4 w-4 text-[#2d7d69]" />
              无需站内账号，使用 GitHub Issue 与 Pull Request 参与协作
            </p>
          </div>

          <div className="relative pl-4 lg:pl-12">
            <div className="absolute bottom-4 left-[35px] top-4 w-px bg-zinc-200 lg:left-[67px]" />
            <div className="space-y-6">
              {[
                ["01", "选择路线", "从 Python 工程实践开始"],
                ["02", "运行项目", "按文档完成环境、代码和测试"],
                ["03", "认领 Issue", "选择边界清晰、可以验证的开放任务"],
                ["04", "提交 PR", "让代码、实验和文档成为公开贡献"],
              ].map(([step, title, description]) => (
                <div key={step} className="relative flex gap-5">
                  <div className="z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-white font-mono text-xs font-semibold text-[#7a1731]">
                    {step}
                  </div>
                  <div className="pb-2">
                    <p className="font-semibold text-zinc-950">{title}</p>
                    <p className="mt-1 text-sm leading-6 text-zinc-600">{description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 bg-zinc-950 p-5 font-mono text-sm text-zinc-100">
              <p className="text-zinc-500">$ start-here</p>
              <p className="mt-2 text-emerald-300">路线 → 实践 → Issue → PR → Contributor</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200 bg-[#f6f7fb]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px bg-zinc-200 lg:grid-cols-4">
          {[
            ["1", "完整实验课程"],
            ["4", "开放挑战类型"],
            ["0", "站内登录门槛"],
            ["1", "完整贡献闭环"],
          ].map(([value, label]) => (
            <div key={label} className="bg-[#f6f7fb] px-5 py-7 text-center">
              <p className="text-3xl font-semibold text-zinc-950">{value}</p>
              <p className="mt-1 text-sm text-zinc-600">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
          <SectionHeader eyebrow="GEEK LAB" title="Python 工程实践" description="首门完整实验课程：用四个实验，把学习记录 CSV 做成可测试的命令行分析器。" />
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <span className="text-sm text-[#28705b]">4 个实验 · 24 个测试 · 完整源码</span>
            <Button asChild><Link href={coursePath}>进入实验室<ArrowRight className="h-4 w-4" /></Link></Button>
          </div>
          <div className="mt-7 divide-y divide-zinc-200 border-y border-zinc-200">
            {labLessons.map((lesson) => (
              <Link key={lesson.slug} href={coursePath + "/" + lesson.slug} className="flex items-center gap-4 py-5 hover:text-[#7a1731]">
                <span className="font-mono text-sm text-[#7a1731]">{lesson.number}</span>
                <span className="min-w-0 flex-1"><span className="block font-medium">{lesson.title}</span><span className="mt-1 block text-sm leading-6 text-zinc-500">{lesson.description}</span></span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-[#f6f7fb]">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="OPEN CHALLENGES"
              title="从一个边界清晰的任务开始"
              description="开放任务给出难度、预计投入和交付物。认领之前先在 Issue 中对齐方案，完成后用 PR 接受公开检视。"
            />
            <Button variant="outline" className="w-fit border-zinc-300 bg-white" asChild>
              <Link href="/challenges">查看全部任务 <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-10 overflow-hidden border border-zinc-200 bg-white">
            {openChallenges.slice(0, 3).map((challenge, index) => (
              <Link
                key={challenge.id}
                href="/challenges"
                className={`grid gap-4 p-5 transition hover:bg-[#fffaf6] md:grid-cols-[90px_1fr_auto] md:items-center ${index > 0 ? "border-t border-zinc-200" : ""}`}
              >
                <Badge variant="outline" className="w-fit border-zinc-300 font-mono text-zinc-600">{challenge.id}</Badge>
                <div>
                  <p className="font-medium text-zinc-950">{challenge.title}</p>
                  <p className="mt-1 text-sm text-zinc-500">{challenge.project} · {challenge.estimate}</p>
                </div>
                <Badge variant="secondary" className="w-fit bg-[#eef7f4] text-[#245f51]">{challenge.level}</Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:px-8">
          <div className="overflow-hidden border border-zinc-200 bg-[#fbfbfd]">
            <Image
              src={`${basePath}/engineering-viewer-preview.png`}
              alt="NKUGeek 代码、PCB 与 CAD 工程文件阅览器"
              width={1200}
              height={760}
              loading="eager"
              className="h-auto w-full"
            />
          </div>
          <div>
            <SectionHeader
              eyebrow="BUILD IN PUBLIC"
              title="真实项目就是最好的实验课"
              description="项目页面公开路线、任务、开发日志、版本与工程资料。代码、PCB、CAD 和实验记录都可以成为贡献，而不只是一份最终 Demo。"
            />
            <div className="mt-8 grid gap-3">
              {featuredProjects.map((project) => (
                <Link key={project.slug} href={`/projects/${project.slug}`} className="group flex items-center justify-between gap-4 border-b border-zinc-200 py-4">
                  <div>
                    <p className="font-medium text-zinc-950 group-hover:text-[#7a1731]">{project.title}</p>
                    <p className="mt-1 text-sm text-zinc-500">{project.category} · {project.status}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 shrink-0 text-zinc-400 transition group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
            <Button className="mt-7 bg-[#7a1731] text-white hover:bg-[#641228]" asChild>
              <Link href="/projects">浏览开放项目</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-zinc-200 bg-zinc-950 text-white">
        <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
          <SectionHeader
            eyebrow="CONTRIBUTION LOOP"
            title="学习结果，用一次真实贡献来验证"
            description="社区不依赖站内等级和积分。你的代码、文档、实验、设计与答疑，就是最清楚的成长记录。"
            dark
          />
          <div className="mt-10 grid gap-px bg-zinc-800 md:grid-cols-4">
            {contributionSteps.map((item) => (
              <div key={item.step} className="bg-zinc-950 p-6">
                <p className="font-mono text-sm text-emerald-300">{item.step}</p>
                <h3 className="mt-5 font-semibold text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{item.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button className="bg-white text-zinc-950 hover:bg-zinc-100" asChild>
              <Link href="/contribute"><GitPullRequest className="mr-2 h-4 w-4" />阅读贡献指南</Link>
            </Button>
            <Button variant="outline" className="border-zinc-700 bg-transparent text-white hover:bg-zinc-900" asChild>
              <a href="https://github.com/NKUGeek" target="_blank" rel="noreferrer">
                查看 GitHub 组织 <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionHeader({
  eyebrow,
  title,
  description,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  dark?: boolean;
}) {
  return (
    <div className="max-w-2xl">
      <p className={`text-sm font-medium ${dark ? "text-emerald-300" : "text-[#7a1731]"}`}>{eyebrow}</p>
      <h2 className={`mt-3 text-3xl font-semibold leading-tight sm:text-4xl ${dark ? "text-white" : "text-zinc-950"}`}>{title}</h2>
      <p className={`mt-4 leading-7 ${dark ? "text-zinc-400" : "text-zinc-600"}`}>{description}</p>
    </div>
  );
}
