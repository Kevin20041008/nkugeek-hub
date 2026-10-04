import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/community/primitives";
import { failures, propose } from "@/data/community";
export const metadata: Metadata = { title: "Failure Archive · 排错档案" };
export default function FailuresPage() {
  return (
    <main className="bg-white">
      <PageIntro
        eyebrow="COMMUNITY / FAILURE ARCHIVE"
        title="让失败成为可复用的经验"
        action={
          <a
            className="hub-button"
            href={propose(
              "[排错记录] ",
              "问题：\n环境与版本：\n最小复现步骤：\n原因：\n解决方式：\n验证：\n证据链接：\n请删除日志中的密钥与个人数据。",
            )}
            target="_blank"
            rel="noreferrer"
          >
            提交排错记录
          </a>
        }
      >
        记录真实的问题、环境、原因和修复。每条记录都保留代码或提交依据。
      </PageIntro>
      <div className="hub-container py-8">
        {failures.map((f) => (
          <article
            id={f.id}
            key={f.id}
            className="scroll-mt-24 border-b border-zinc-200 py-7 first:pt-0"
          >
            <h2 className="text-xl font-semibold">{f.title}</h2>
            <dl className="mt-5 grid gap-5 md:grid-cols-2">
              {[
                ["问题", f.problem],
                ["环境", f.environment],
                ["原因", f.cause],
                ["解决方式", f.solution],
                ["如何验证", f.verification],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs font-semibold text-[#28705b]">
                    {label}
                  </dt>
                  <dd className="mt-2 text-sm leading-7 text-zinc-600">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 flex flex-wrap gap-6">
              <a
                href={f.source}
                target="_blank"
                rel="noreferrer"
                className="hub-link text-sm"
              >
                查看代码依据
              </a>
              <Link href={f.learn} className="hub-link text-sm">
                关联学习路径
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
