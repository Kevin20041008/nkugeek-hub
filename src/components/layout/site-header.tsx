import Link from "next/link";
import { Code2, GitBranch } from "lucide-react";

import { Button } from "@/components/ui/button";
import { navigationItems, secondaryNavigationItems } from "@/data/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#7a1731]">
            <Code2 className="h-5 w-5 text-white" />
          </div>

          <div>
            <p className="font-semibold text-zinc-950">NKUGeek Hub</p>
            <p className="text-xs text-zinc-500">Learn, Build, Contribute</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {[...navigationItems, ...secondaryNavigationItems.slice(0, 3)].map(
            (item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-zinc-600 transition-colors hover:text-[#7a1731]"
              >
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="hidden border-zinc-300 bg-white text-zinc-800 hover:bg-zinc-50 sm:inline-flex"
            asChild
          >
            <a href="https://github.com/NKUGeek" target="_blank" rel="noreferrer">
              <GitBranch className="mr-1.5 h-4 w-4" />
              GitHub
            </a>
          </Button>
          <Button size="sm" className="bg-[#7a1731] text-white hover:bg-[#641228]" asChild>
            <Link href="/learn">开始学习</Link>
          </Button>
        </div>
      </div>

      <div className="border-t border-zinc-100 lg:hidden">
        <nav className="mx-auto flex max-w-7xl gap-4 overflow-x-auto px-5 py-3">
          {[...navigationItems, ...secondaryNavigationItems].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 text-xs text-zinc-600 transition-colors hover:text-[#7a1731]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
