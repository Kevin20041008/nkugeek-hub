import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { CourseShell } from "@/components/lab/course-shell";
import { CodeBlock } from "@/components/lab/code-block";
import { Button } from "@/components/ui/button";
import { coursePath, labLessons } from "@/data/geek-lab";
import { readLabFiles } from "@/lib/lab-files";
import { NextSteps } from "@/components/community/primitives";

export const metadata: Metadata = {
  title: "Python 工程实践 · Geek Lab",
  description:
    "四个实验完成一个 CSV 学习记录分析器，包含完整源码、24 个测试和真实贡献任务。",
};
export default async function PythonCoursePage() {
  const [sample, report] = await readLabFiles([
    "sessions.csv",
    "expected.json",
  ]);
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <CourseShell>
      <p className="text-xs font-medium text-[#28705b]">
        完整课程 · 本地运行 · Python 3.11+
      </p>
      <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">
        Python 工程实践
      </h1>
      <p className="mt-5 text-lg leading-8 text-zinc-600">
        从一行学习记录，到一个可靠的命令行工具。
      </p>
      <p className="mt-4 leading-8 text-zinc-600">
        你将构建 Study Report：读取 CSV，验证数据，按项目汇总投入时间，并导出
        JSON。每个实验都包含目标、前置知识、环境配置、完整代码、测试、常见错误和贡献任务。
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild className="h-10">
          <Link href={coursePath + "/" + labLessons[0].slug}>
            开始第一个实验
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" className="h-10">
          <a href={basePath + "/labs/python-engineering.zip"} download>
            <Download className="h-4 w-4" />
            下载课程包
          </a>
        </Button>
      </div>
      <section className="mt-10 border-y border-zinc-200 py-6">
        <h2 className="text-xl font-semibold">开始前</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-600">
          <li>约 3–4 小时；已了解 Python 变量、函数、列表和字典。</li>
          <li>Windows、macOS 或 Linux，安装 Python 3.11 或更新版本。</li>
          <li>只使用标准库；解压课程包即可运行，不需要安装网站依赖。</li>
          <li>建议按顺序完成。后续实验会复用前面的模块，保留完整课程文件。</li>
        </ul>
      </section>
      <section className="mt-9">
        <h2 className="text-xl font-semibold">最终交付</h2>
        <p className="mt-3 text-sm leading-7 text-zinc-600">
          四条教学记录，汇总为 150 分钟。实验 03 将结果保存为 report.json，实验
          04 用完整测试验证结果。
        </p>
        <div className="mt-5 grid min-w-0 gap-4 xl:grid-cols-2">
          <CodeBlock label={sample.name} code={sample.content} />
          <CodeBlock label={report.name} code={report.content} />
        </div>
      </section>
      <section className="mt-10">
        <h2 className="text-xl font-semibold">实验目录</h2>
        <div className="mt-4 divide-y divide-zinc-200">
          {labLessons.map((lesson) => (
            <Link
              href={coursePath + "/" + lesson.slug}
              key={lesson.slug}
              className="flex items-start gap-4 py-5 hover:text-[#7a1731]"
            >
              <span className="font-mono text-sm text-[#7a1731]">
                {lesson.number}
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="font-medium">{lesson.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  {lesson.description}
                </p>
                <p className="mt-2 text-xs text-zinc-500">
                  {lesson.duration} · {lesson.testCount} 个验证测试
                </p>
              </div>
              <ArrowRight className="mt-1 h-4 w-4 shrink-0" />
            </Link>
          ))}
        </div>
      </section>
      <NextSteps
        items={[
          {
            label: "认领课程扩展任务",
            href: "/tasks",
            description: "把这个工具继续改进，提交第一份 PR。",
          },
          {
            label: "参与 NKUGeek Hub 项目",
            href: "/projects/nkugeek-hub",
            description: "查看负责人、里程碑与开放任务。",
          },
          {
            label: "准备 ResNet 复现：先补 PyTorch 基础",
            href: "/learn/foundations#pytorch",
            description:
              "Python 工程课程不包含深度学习训练，请先完成前置导学。",
          },
        ]}
      />
    </CourseShell>
  );
}
