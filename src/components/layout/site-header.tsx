"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Code2, GitBranch, Menu, X } from "lucide-react";
import { navigationItems } from "@/data/navigation";
import { repository } from "@/data/community";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  function active(href: string) {
    if (href === "/projects")
      return /^\/(projects|tasks|challenges|viewer)(\/|$)/.test(pathname);
    if (href === "/research")
      return /^\/(research|papers|competitions)(\/|$)/.test(pathname);
    if (href === "/community")
      return /^\/(community|events|contributors|members|failures|contribute|articles|questions)(\/|$)/.test(
        pathname,
      );
    return pathname.startsWith(href);
  }
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:bg-white focus:p-3"
      >
        跳到正文
      </a>
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 lg:px-8">
        <Link
          href="/"
          onClick={() => setOpen(false)}
          className="flex shrink-0 items-center gap-2 font-semibold text-zinc-950"
        >
          <Code2 className="h-7 w-7 text-[#7a1731]" />
          NKUGeek Hub
        </Link>
        <nav aria-label="主导航" className="hidden items-center gap-7 md:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active(item.href) ? "page" : undefined}
              className="py-5 text-sm font-medium text-zinc-600 hover:text-[#7a1731] aria-[current=page]:text-[#7a1731]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={repository}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub 仓库"
            title="GitHub 仓库"
            className="hub-icon"
          >
            <GitBranch className="h-5 w-5" />
          </a>
          <button
            type="button"
            className="hub-icon md:hidden"
            aria-label={open ? "关闭导航" : "打开导航"}
            title={open ? "关闭导航" : "打开导航"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-navigation"
          aria-label="移动导航"
          className="grid border-t border-zinc-200 px-5 py-2 md:hidden"
        >
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={active(item.href) ? "page" : undefined}
              className="border-b border-zinc-100 py-3 text-sm font-medium last:border-0 aria-[current=page]:text-[#7a1731]"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
