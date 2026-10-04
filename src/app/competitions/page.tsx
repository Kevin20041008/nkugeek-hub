import type { Metadata } from "next";
import { PageIntro, EmptyState } from "@/components/community/primitives";
export const metadata: Metadata = { title: "竞赛广场" };
export default function CompetitionsPage() {
  return (
    <main className="bg-white">
      <PageIntro eyebrow="RESEARCH / COMPETITIONS" title="竞赛广场">
        仅收录有官方来源、明确截止时间与参与范围的比赛。
      </PageIntro>
      <section className="hub-container py-8">
        <EmptyState
          title="暂无经过核验的近期竞赛"
          href="/research"
          action="参与科研复现"
        >
          暂不展示示例招募队伍或未经核实的截止日期。
        </EmptyState>
      </section>
    </main>
  );
}
