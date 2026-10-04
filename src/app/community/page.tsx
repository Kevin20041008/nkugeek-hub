import type { Metadata } from "next";
import Link from "next/link";
import {
  ActivityFeed,
  PageIntro,
  SectionTitle,
} from "@/components/community/primitives";
import { repository } from "@/data/community";
export const metadata: Metadata = { title: "Community · 社区协作" };
export default function CommunityPage() {
  const areas = [
    ["Events", "活动与归档", "分享之后，代码、笔记和成果继续保留。", "/events"],
    ["Teams", "围绕项目协作", "已核实的项目与提案分开呈现。", "/projects"],
    [
      "Discussions",
      "公开讨论",
      "技术问题、任务范围与提案集中在 GitHub Issues。",
      repository + "/issues",
    ],
    [
      "Contributors",
      "贡献者档案",
      "记录可核验作品，不设积分或排名。",
      "/contributors",
    ],
  ];
  return (
    <main className="bg-white">
      <PageIntro eyebrow="COMMUNITY" title="一起做成一些东西">
        围绕任务、项目与研究展开协作。
      </PageIntro>
      <div className="hub-container">
        <section className="hub-section grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {areas.map(([en, title, desc, href]) => (
            <Link
              key={en}
              href={href}
              className="border-t-2 border-[#28705b] pt-4"
            >
              <p className="text-xs text-[#28705b]">{en}</p>
              <h2 className="mt-3 text-lg font-semibold">{title}</h2>
              <p className="mt-2 text-sm leading-7 text-zinc-500">{desc}</p>
            </Link>
          ))}
        </section>
        <section id="activity" className="hub-section scroll-mt-24">
          <SectionTitle title="Community Activity" />
          <ActivityFeed />
        </section>
        <section className="py-9">
          <SectionTitle title="把经验留给后来的人" />
          <div className="flex flex-wrap gap-5">
            <Link href="/failures" className="hub-link">
              Failure Archive · 排错档案
            </Link>
            <Link href="/events/archive" className="hub-link">
              Events Archive · 活动档案
            </Link>
            <Link href="/contribute" className="hub-link">
              贡献指南
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
