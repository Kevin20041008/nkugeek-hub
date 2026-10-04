import type { Metadata } from "next";
import Link from "next/link";
import { EmptyState, PageIntro } from "@/components/community/primitives";
import { propose } from "@/data/community";
export const metadata: Metadata = { title: "Events · 社区活动" };
export default function EventsPage() {
  return (
    <main className="bg-white">
      <PageIntro
        eyebrow="COMMUNITY / EVENTS"
        title="社区活动"
        action={
          <>
            <Link href="/events/archive" className="hub-button">
              Events Archive
            </Link>
            <a
              href={propose(
                "[活动提案] ",
                "主题：\n组织者：\n时间与时区：\n地点：\n人数限制与报名方式：\n预期成果：\n材料与隐私约定：",
              )}
              className="hub-button"
              target="_blank"
              rel="noreferrer"
            >
              提出活动
            </a>
          </>
        }
      >
        技术分享、共读与实践，以公开计划和活动产出为准。
      </PageIntro>
      <section className="hub-container py-8">
        <EmptyState
          title="暂无已确认的近期活动"
          href="/events/archive"
          action="浏览活动档案"
        >
          尚未确认时间、组织者与报名入口，不展示示例人数或过期的“即将开始”。
        </EmptyState>
      </section>
    </main>
  );
}
