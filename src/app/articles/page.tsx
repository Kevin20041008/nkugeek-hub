import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/community/primitives";
import { repository } from "@/data/community";
export const metadata: Metadata = { title: "社区文档" };
export default function ArticlesPage() {
  return (
    <main className="bg-white">
      <PageIntro eyebrow="COMMUNITY / DOCUMENTATION" title="社区文档">
        已经公开的课程、设计记录和排错经验，不展示虚构阅读量。
      </PageIntro>
      <section className="hub-container grid gap-5 py-8">
        {[
          ["Python 工程实践", "/learn/python-engineering"],
          ["Failure Archive", "/failures"],
          [
            "论文目录与复现规范",
            repository + "/blob/main/docs/research/paper-catalog.md",
          ],
          ["参与贡献", "/contribute"],
        ].map(([title, href]) => (
          <Link
            className="hub-link border-b border-zinc-200 pb-5 text-base"
            href={href}
            key={href}
          >
            {title}
          </Link>
        ))}
      </section>
    </main>
  );
}
