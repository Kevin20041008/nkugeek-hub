import Link from "next/link";
import { Code2, GitBranch } from "lucide-react";

import { navigationItems, secondaryNavigationItems } from "@/data/navigation";

export function SiteFooter() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#7a1731]">
                <Code2 className="h-5 w-5 text-white" />
              </div>

              <div>
                <p className="font-medium text-zinc-950">NKUGeek Hub</p>
                <p className="text-xs text-zinc-500">Build, Share, Research</p>
              </div>
            </Link>

            <p className="mt-5 max-w-md text-sm leading-7 text-zinc-600">
              面向南开大学学生的开放技术学习与实践社区。从学习路线出发，在真实项目中完成任务，并通过 GitHub 沉淀可验证的贡献。
            </p>
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-950">平台导航</p>

            <div className="mt-4 grid gap-3">
              {[...navigationItems, ...secondaryNavigationItems].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-zinc-600 transition hover:text-[#7a1731]"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-medium text-zinc-950">社区链接</p>

            <div className="mt-4 grid gap-3">
              <Link
                href="https://github.com/NKUGeek"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-sm text-zinc-600 transition hover:text-[#7a1731]"
              >
                <GitBranch className="h-4 w-4" />
                GitHub 开源组织
              </Link>

              <Link
                href="/contribute"
                className="text-sm text-zinc-600 transition hover:text-[#7a1731]"
              >
                贡献指南
              </Link>

              <Link href="/about" className="text-sm text-zinc-600 transition hover:text-[#7a1731]">
                关于社区
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-zinc-100 pt-6">
          <p className="text-sm text-zinc-500">
            NKUGeek Community · Open source, built by students.
          </p>
        </div>
      </div>
    </footer>
  );
}
