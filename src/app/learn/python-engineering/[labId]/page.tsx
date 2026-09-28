import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, GitPullRequest } from "lucide-react";
import { CourseShell } from "@/components/lab/course-shell";
import { CodeBlock } from "@/components/lab/code-block";
import { EnvironmentSetup } from "@/components/lab/environment-setup";
import { LessonChecklist } from "@/components/lab/lab-progress";
import { Button } from "@/components/ui/button";
import { coursePath, labLessons, labRepository } from "@/data/geek-lab";
import { readLabFiles } from "@/lib/lab-files";

type Props = { params: Promise<{ labId: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return labLessons.map((lesson) => ({ labId: lesson.slug })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { labId } = await params;
  const lesson = labLessons.find((item) => item.slug === labId);
  return { title: lesson ? lesson.title + " · Geek Lab" : "实验不存在", description: lesson?.description };
}
const sections = [
  ["goals", "学习目标"], ["prerequisites", "前置知识"], ["environment", "环境配置"],
  ["practice", "实验步骤"], ["source", "完整代码"], ["tests", "测试用例"],
  ["errors", "常见错误"], ["completion", "验收清单"], ["issue", "贡献任务"],
];
export default async function LabPage({ params }: Props) {
  const { labId } = await params;
  const index = labLessons.findIndex((item) => item.slug === labId);
  if (index < 0) notFound();
  const lesson = labLessons[index];
  const [sources, tests] = await Promise.all([readLabFiles(lesson.sourceFiles), readLabFiles(lesson.testFiles)]);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const fileUrl = (name: string) => basePath + "/labs/python-engineering/" + name;
  return (
    <CourseShell active={lesson.slug}>
      <p className="text-xs font-medium text-[#28705b]">实验 {lesson.number} / 04 · {lesson.duration}</p>
      <h1 className="mt-3 text-3xl font-semibold leading-tight sm:text-4xl">{lesson.title}</h1>
      <p className="mt-4 leading-8 text-zinc-600">{lesson.description}</p>
      <nav aria-label="本页章节" className="mt-6 flex flex-wrap gap-x-4 gap-y-3 border-y border-zinc-200 py-4 text-xs text-zinc-500">{sections.map(([id, label]) => <a key={id} href={"#" + id} className="hover:text-[#7a1731]">{label}</a>)}</nav>
      <section id="goals" className="mt-9 scroll-mt-36">
        <h2 className="text-xl font-semibold">学习目标</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-700">{lesson.goals.map((goal) => <li key={goal}>{goal}</li>)}</ul>
      </section>
      <section id="prerequisites" className="mt-9 scroll-mt-36">
        <h2 className="text-xl font-semibold">前置知识</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-700">{lesson.prerequisites.map((item) => <li key={item}>{item}</li>)}</ul>
        {index > 0 ? <Link href={coursePath + "/" + labLessons[index - 1].slug} className="mt-3 inline-block text-sm text-[#7a1731]">回顾实验 {labLessons[index - 1].number}：{labLessons[index - 1].title}</Link> : null}
      </section>
      <section id="environment" className="mt-10 scroll-mt-36 border-t border-zinc-200 pt-7">
        <h2 className="mb-5 text-xl font-semibold">环境配置与运行</h2>
        <EnvironmentSetup run={lesson.run} test={lesson.test} />
        <div className="mt-5"><CodeBlock label="预期结果" code={lesson.expected} /></div>
      </section>
      <section id="practice" className="mt-10 scroll-mt-36 border-t border-zinc-200 pt-7">
        <h2 className="text-xl font-semibold">实验步骤</h2>
        <ol className="mt-5 space-y-6">{lesson.steps.map((step, stepIndex) => (
          <li key={step.title} className="flex gap-4"><span className="pt-1 font-mono text-sm text-[#7a1731]">0{stepIndex + 1}</span><div><h3 className="font-medium">{step.title}</h3><p className="mt-2 text-sm leading-7 text-zinc-600">{step.body}</p></div></li>
        ))}</ol>
        <div className="mt-7 space-y-5 border-l-2 border-[#28705b] pl-5">{lesson.concepts.map((concept) => <div key={concept.title}><h3 className="text-sm font-semibold">{concept.title}</h3><p className="mt-2 text-sm leading-7 text-zinc-600">{concept.body}</p></div>)}</div>
      </section>
      <section id="source" className="mt-10 scroll-mt-36 border-t border-zinc-200 pt-7">
        <h2 className="text-xl font-semibold">完整代码</h2>
        <p className="mt-3 text-sm leading-7 text-zinc-500">以下为课程包中的实际源码。后续实验复用前序模块，首次运行请下载完整课程包。</p>
        <div className="mt-5 grid min-w-0 gap-5">{sources.map((file) => <CodeBlock key={file.name} label={file.name} code={file.content} download={fileUrl(file.name)} />)}</div>
      </section>
      <section id="tests" className="mt-10 scroll-mt-36 border-t border-zinc-200 pt-7">
        <h2 className="text-xl font-semibold">测试用例</h2>
        <p className="mt-3 text-sm leading-7 text-zinc-600">执行上面的测试命令，应看到 {lesson.testCount} 个测试通过和 OK。先理解断言，再尝试引入错误验证测试有效。</p>
        <div className="mt-5 space-y-4">{tests.map((file) => (
          <details key={file.name} open={tests.length === 1} className="min-w-0">
            <summary className="mb-3 cursor-pointer break-all text-sm font-medium text-[#7a1731]">{file.name}</summary>
            <CodeBlock label={file.name} code={file.content} download={fileUrl(file.name)} />
          </details>
        ))}</div>
      </section>
      <section id="errors" className="mt-10 scroll-mt-36 border-t border-zinc-200 pt-7">
        <h2 className="text-xl font-semibold">常见错误</h2>
        <div className="mt-4 divide-y divide-zinc-200">{lesson.errors.map((error) => (
          <details key={error.symptom} className="py-4"><summary className="cursor-pointer break-words text-sm font-medium">{error.symptom}</summary><p className="mt-3 text-sm leading-7 text-zinc-600">{error.fix}</p></details>
        ))}</div>
      </section>
      <section id="completion" className="mt-10 scroll-mt-36 border-t border-zinc-200 pt-7"><h2 className="mb-5 text-xl font-semibold">验收清单</h2><LessonChecklist slug={lesson.slug} /></section>
      <section id="issue" className="mt-9 scroll-mt-36 border-y border-zinc-200 py-7">
        <p className="flex items-center gap-2 text-xs font-medium text-[#28705b]"><GitPullRequest className="h-4 w-4" />从实验到贡献</p>
        <h2 className="mt-3 text-xl font-semibold">{lesson.issue.title}</h2>
        <p className="mt-3 text-sm leading-7 text-zinc-600">这是完成基线后的扩展任务。先查看 Issue 当前状态和留言，与维护者确认认领范围。</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-600">{lesson.issue.acceptance.map((item) => <li key={item}>{item}</li>)}</ul>
        {lesson.issue.number ? <Button asChild className="mt-5 h-10"><a href={labRepository + "/issues/" + lesson.issue.number} target="_blank" rel="noreferrer">查看并认领 Issue #{lesson.issue.number}<ExternalLink className="h-4 w-4" /></a></Button> : <p className="mt-4 text-sm text-zinc-500">贡献任务准备中</p>}
      </section>
      <div className="mt-6 flex flex-wrap gap-4 text-xs text-zinc-500">{lesson.references.map((ref) => <a key={ref.url} href={ref.url} target="_blank" rel="noreferrer" className="underline underline-offset-4">{ref.title}</a>)}</div>
      <nav aria-label="实验翻页" className="mt-9 grid gap-4 sm:grid-cols-2">
        <Link href={index ? coursePath + "/" + labLessons[index - 1].slug : coursePath} className="flex min-w-0 items-center gap-3 rounded-md border border-zinc-200 p-4 text-sm hover:bg-zinc-50"><ArrowLeft className="h-4 w-4 shrink-0" /><span>{index ? labLessons[index - 1].title : "课程概览"}</span></Link>
        <Link href={index < labLessons.length - 1 ? coursePath + "/" + labLessons[index + 1].slug : "/contribute"} className="flex min-w-0 items-center justify-between gap-3 rounded-md border border-zinc-200 p-4 text-sm text-[#7a1731] hover:bg-zinc-50"><span>{index < labLessons.length - 1 ? labLessons[index + 1].title : "完成课程，参与社区贡献"}</span><ArrowRight className="h-4 w-4 shrink-0" /></Link>
      </nav>
    </CourseShell>
  );
}
