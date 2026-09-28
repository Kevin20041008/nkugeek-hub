import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock3, Download, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseProgress } from "@/components/lab/lab-progress";
import { coursePath, labLessons, plannedCourses } from "@/data/geek-lab";
import { CodeBlock } from "@/components/lab/code-block";
import { readLabFiles } from "@/lib/lab-files";

export const metadata: Metadata = { title: "Geek Lab · 项目实验室", description: "从学习路线到可运行的实验课程。完成 Python 工程实践，运行代码、验证测试并提交真实贡献。" };
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export default async function LearnPage() {
  const [sample, report] = await readLabFiles(["sessions.csv", "expected.json"]);
  return (
    <main className="bg-white">
      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-5 py-9 lg:px-8">
          <p className="flex items-center gap-2 text-sm font-medium text-[#7a1731]"><FlaskConical className="h-4 w-4" />项目实验室</p>
          <h1 className="mt-3 text-4xl font-semibold">Geek Lab</h1>
          <p className="mt-3 max-w-2xl leading-7 text-zinc-600">从一份可运行的代码开始，完成实验、验证结果，再把改进贡献给社区。</p>
        </div>
      </section>
      <section id="open-source-foundation" className="mx-auto max-w-7xl scroll-mt-28 px-5 py-10 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="flex flex-wrap items-center gap-3 text-xs font-medium"><span className="text-[#28705b]">已开放 · 完整课程</span><span className="text-zinc-500">PYTHON / 01</span></div>
            <h2 className="mt-4 text-3xl font-semibold">Python 工程实践</h2>
            <p className="mt-4 max-w-xl leading-8 text-zinc-600">把学习记录 CSV 做成可测试的命令行分析器。四个递进实验，走完输入校验、文件处理、JSON 输出和开源贡献。</p>
            <div className="mt-5 flex flex-wrap gap-5 text-sm text-zinc-600"><span className="flex items-center gap-2"><BookOpen className="h-4 w-4" />4 个实验</span><span className="flex items-center gap-2"><Clock3 className="h-4 w-4" />约 3–4 小时</span><span>24 个测试</span></div>
            <p className="mt-4 text-sm text-zinc-500">前置：Python 变量、函数与字典 · Python 3.11+ · 无第三方依赖</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="h-10"><Link href={coursePath}>进入课程<ArrowRight className="h-4 w-4" /></Link></Button>
              <Button asChild variant="outline" className="h-10"><a href={basePath + "/labs/python-engineering.zip"} download><Download className="h-4 w-4" />下载课程包</a></Button>
            </div>
            <div className="mt-8 max-w-sm"><CourseProgress /></div>
          </div>
          <div className="min-w-0">
            <p className="mb-3 text-xs font-medium text-zinc-500">本课程的实际输入与输出 · 教学样例</p>
            <CodeBlock label={sample.name} code={sample.content} />
            <div className="py-2 text-center text-xs text-[#28705b]">校验 → 汇总 → JSON</div>
            <CodeBlock label="report.json" code={report.content} />
          </div>
        </div>
        <div className="mt-10 border-y border-zinc-200">
          {labLessons.map((lesson) => (
            <Link key={lesson.slug} href={coursePath + "/" + lesson.slug} className="grid items-center gap-3 border-b border-zinc-100 py-5 last:border-0 hover:bg-zinc-50 sm:grid-cols-[52px_1fr_auto]">
              <span className="font-mono text-sm text-[#7a1731]">{lesson.number}</span>
              <div><h3 className="font-medium">{lesson.title}</h3><p className="mt-1 text-sm leading-6 text-zinc-500">{lesson.description}</p></div>
              <span className="flex items-center gap-3 text-sm text-zinc-500">{lesson.duration}<ArrowRight className="h-4 w-4" /></span>
            </Link>
          ))}
        </div>
      </section>
      <section className="border-t border-zinc-200 bg-zinc-50">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <h2 className="text-xl font-semibold">筹备中的课程</h2>
          <p className="mt-2 text-sm text-zinc-500">尚未开放实验。</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">{plannedCourses.map((course) => (
            <div key={course.title} className="border-t-2 border-zinc-300 pt-4"><p className="text-xs text-zinc-500">筹备中</p><h3 className="mt-2 font-semibold">{course.title}</h3><p className="mt-2 text-sm leading-7 text-zinc-600">{course.topic}</p><p className="mt-3 text-xs text-zinc-500">前置：{course.prerequisite}</p></div>
          ))}</div>
        </div>
      </section>
    </main>
  );
}
