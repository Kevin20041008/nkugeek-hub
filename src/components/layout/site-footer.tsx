import Link from "next/link";
import { repository } from "@/data/community";

export function SiteFooter() {
  const links = [
    ["Contributing", "/contribute"],
    ["Code of Conduct", repository + "/blob/main/CODE_OF_CONDUCT.md"],
    ["Community Guidelines", repository + "/blob/main/COMMUNITY_GUIDELINES.md"],
    ["Roadmap", repository + "/blob/main/docs/product/roadmap.md"],
    ["GitHub", repository],
    ["Contact", repository + "/issues/new?title=Community%20contact"],
  ];
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="hub-container py-8">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <Link href="/" className="font-semibold">
            NKUGeek Hub
          </Link>
          <nav
            aria-label="社区治理"
            className="flex flex-wrap gap-x-6 gap-y-3 text-xs text-zinc-600"
          >
            {links.map(([label, href]) => (
              <Link key={label} href={href} className="hover:text-[#7a1731]">
                {label}
              </Link>
            ))}
          </nav>
        </div>
        <p className="mt-5 text-xs leading-6 text-zinc-500">
          学生发起的开放社区 · 非学校官方平台 · 作品与贡献以公开来源为准
        </p>
      </div>
    </footer>
  );
}
