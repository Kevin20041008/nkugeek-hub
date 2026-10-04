import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro, NextSteps } from "@/components/community/primitives";
import { repository } from "@/data/community";
export const metadata: Metadata = {
  title: "Contributor Profiles · 贡献者档案",
};
export default function ContributorsPage() {
  return (
    <main className="bg-white">
      <PageIntro eyebrow="COMMUNITY / CONTRIBUTORS" title="贡献者档案">
        作品与来源，而非分数或排名。仅展示公开署名，不推断真实姓名、学院或联系方式。
      </PageIntro>
      <div className="hub-container py-8">
        <article className="max-w-3xl border-y border-zinc-200 py-6">
          <a
            href="https://github.com/Kevin20041008"
            target="_blank"
            rel="noreferrer"
            className="hub-link text-xl"
          >
            Kevin20041008
          </a>
          <p className="mt-2 text-sm text-zinc-500">
            NKUGeek Hub 仓库所有者 / 维护入口
          </p>
          <dl className="mt-6 grid gap-6 sm:grid-cols-2">
            <div>
              <dt className="text-xs font-medium text-zinc-500">参与项目</dt>
              <dd className="mt-2">
                <Link href="/projects/nkugeek-hub" className="hub-link text-sm">
                  NKUGeek Hub
                </Link>
              </dd>
            </div>
            <div>
              <dt className="text-xs font-medium text-zinc-500">公开记录</dt>
              <dd className="mt-2">
                <a href={repository} className="hub-link text-sm">
                  仓库与维护记录
                </a>
              </dd>
            </div>
            {["Merged PR", "复现报告", "文章", "Talk"].map((label) => (
              <div key={label}>
                <dt className="text-xs font-medium text-zinc-500">{label}</dt>
                <dd className="mt-2 text-sm text-zinc-500">
                  尚未收录可核验的个人记录
                </dd>
              </div>
            ))}
          </dl>
        </article>
        <NextSteps
          items={[
            {
              label: "完成一次真实贡献",
              href: "/tasks",
              description: "在贡献被合并后，附 PR 或成果链接补充档案。",
            },
            {
              label: "查看公开作品",
              href: "/showcase",
              description: "外部收录作品的作者不自动成为社区成员。",
            },
          ]}
        />
      </div>
    </main>
  );
}
