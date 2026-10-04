import type { Metadata } from "next";
import { PageIntro, EmptyState } from "@/components/community/primitives";
import { archivedEvents, repository } from "@/data/community";
export const metadata: Metadata = { title: "Events Archive · 活动档案" };
export default function EventArchive() {
  return (
    <main className="bg-white">
      <PageIntro
        eyebrow="COMMUNITY / EVENTS ARCHIVE"
        title="活动结束，成果留下"
      >
        Slides · Video · Repo · Notes · Participants ·
        Outcomes。参与者仅保留主动同意的公开署名。
      </PageIntro>
      <section className="hub-container py-8">
        {!archivedEvents.length ? (
          <EmptyState
            title="暂无已核实的活动归档"
            href={repository + "/blob/main/docs/community/event-template.md"}
            action="查看活动归档模板"
          >
            旧的规划日期不是举办记录。待活动实际完成并提供来源后再收录。
          </EmptyState>
        ) : (
          archivedEvents.map((event) => (
            <article className="border-b border-zinc-200 py-6" key={event.id}>
              <h2 className="text-xl font-semibold">{event.title}</h2>
              <time className="mt-2 block text-sm text-zinc-500">
                {event.date}
              </time>
              <div className="mt-4 flex flex-wrap gap-5">
                {(["slides", "video", "repo", "notes"] as const).map((key) =>
                  event[key] ? (
                    <a
                      key={key}
                      href={event[key]!}
                      className="hub-link text-sm"
                    >
                      {key}
                    </a>
                  ) : (
                    <span className="text-xs text-zinc-500" key={key}>
                      {key}：未提供
                    </span>
                  ),
                )}
              </div>
              <h3 className="mt-5 text-sm font-semibold">Participants</h3>
              {event.participants.length ? (
                event.participants.map((p) => (
                  <a
                    key={p.url}
                    href={p.url}
                    className="hub-link mr-4 mt-2 text-sm"
                  >
                    {p.label}
                  </a>
                ))
              ) : (
                <p className="mt-2 text-sm text-zinc-500">未公开</p>
              )}
              <h3 className="mt-5 text-sm font-semibold">Outcomes</h3>
              {event.outcomes.length ? (
                event.outcomes.map((o) => (
                  <a
                    key={o.url}
                    href={o.url}
                    className="hub-link mr-4 mt-2 text-sm"
                  >
                    {o.label}
                  </a>
                ))
              ) : (
                <p className="mt-2 text-sm text-zinc-500">待补充</p>
              )}
              <a className="hub-link mt-4 text-xs" href={event.source}>
                活动来源
              </a>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
