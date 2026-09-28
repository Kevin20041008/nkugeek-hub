import Link from "next/link";
import { ArrowLeft, Download, GitBranch } from "lucide-react";
import { CourseProgress, LessonNavigation } from "@/components/lab/lab-progress";
import { coursePath, courseSource } from "@/data/geek-lab";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export function CourseShell({ active, children }: { active?: string; children: React.ReactNode }) {
  return (
    <main className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-6 lg:px-8">
        <Link href="/learn" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-[#7a1731]"><ArrowLeft className="h-4 w-4" />Geek Lab</Link>
      </div>
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 lg:grid-cols-[256px_minmax(0,1fr)] lg:px-8">
        <aside className="min-w-0 border-b border-zinc-200 pb-6 lg:self-start lg:border-b-0 lg:border-r lg:pr-6">
          <Link href={coursePath} className="text-lg font-semibold">Python 工程实践</Link>
          <p className="mt-2 text-sm text-zinc-500">学习记录分析器 · 4 个实验</p>
          <div className="my-6"><CourseProgress /></div>
          <details className="lg:hidden">
            <summary className="mb-2 cursor-pointer text-xs font-semibold text-zinc-500">课程目录</summary>
            <LessonNavigation active={active} />
          </details>
          <div className="hidden lg:block"><LessonNavigation active={active} /></div>
          <div className="mt-6 grid gap-3 border-t border-zinc-200 pt-5 text-sm">
            <a href={basePath + "/labs/python-engineering.zip"} download className="flex items-center gap-2 text-[#7a1731]"><Download className="h-4 w-4" />下载完整课程包</a>
            <a href={courseSource} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-zinc-600"><GitBranch className="h-4 w-4" />查看课程源码</a>
          </div>
        </aside>
        <div className="min-w-0">{children}</div>
      </div>
    </main>
  );
}
