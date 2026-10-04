import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PageIntro,
  NextSteps,
  Status,
} from "@/components/community/primitives";
import { showcases } from "@/data/community";
export const dynamicParams = false;
type Props = { params: Promise<{ slug: string }> };
export function generateStaticParams() {
  return showcases.map((s) => ({ slug: s.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = showcases.find((s) => s.slug === slug);
  return { title: item?.title ?? "作品不存在", description: item?.description };
}
export default async function ShowcaseDetail({ params }: Props) {
  const { slug } = await params;
  const item = showcases.find((s) => s.slug === slug);
  if (!item) notFound();
  return (
    <main className="bg-white">
      <PageIntro
        eyebrow="MADE AT NKU"
        title={item.title}
        action={
          <>
            <Status>{item.external ? "公开项目收录" : "社区项目"}</Status>
            <a
              href={item.repo}
              className="hub-button"
              target="_blank"
              rel="noreferrer"
            >
              Repo
            </a>
            {item.demo && (
              <a
                href={item.demo}
                className="hub-button hub-primary"
                target="_blank"
                rel="noreferrer"
              >
                Demo
              </a>
            )}
          </>
        }
      >
        {item.description}
      </PageIntro>
      <div className="hub-container py-8">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <section>
            <h2 className="text-xl font-semibold">Story</h2>
            <p className="mt-4 text-sm leading-8 text-zinc-600">{item.story}</p>
            {item.image && (
              <Image
                src={(process.env.NEXT_PUBLIC_BASE_PATH ?? "") + item.image}
                alt={item.imageAlt ?? item.title}
                width={1440}
                height={900}
                className="mt-6 h-auto w-full rounded border border-zinc-200"
                unoptimized
              />
            )}
            <a
              href={item.source}
              target="_blank"
              rel="noreferrer"
              className="hub-link mt-5 text-sm"
            >
              查看原始来源
            </a>
          </section>
          <aside className="border-t border-zinc-200 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
            <h2 className="text-sm font-semibold">Contributors</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              {item.contributor}
            </p>
            <a
              href={item.repo + "/graphs/contributors"}
              className="hub-link mt-2 text-xs"
              target="_blank"
              rel="noreferrer"
            >
              原仓库贡献记录
            </a>
            <h2 className="mt-6 text-sm font-semibold">Tech stack</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-600">
              {item.stack.join(" / ")}
            </p>
            <h2 className="mt-6 text-sm font-semibold">Demo</h2>
            <p className="mt-3 text-sm leading-7 text-zinc-500">
              {item.demo ? "公开演示链接见上方" : "未收录可验证的在线演示"}
            </p>
            {item.external && (
              <p className="mt-6 text-xs leading-7 text-zinc-500">
                外部公开项目，非社区团队。仅链接原仓库，不复制作品文件；使用前请核对许可。
              </p>
            )}
          </aside>
        </div>
        <NextSteps
          items={
            item.project
              ? [
                  {
                    label: "加入项目与开放任务",
                    href: "/projects/" + item.project,
                    description: "从成果回到下一次贡献。",
                  },
                  {
                    label: "学习同项目的 Python 课程",
                    href: "/learn/python-engineering",
                    description: "交付一个可测试的工具。",
                  },
                ]
              : [
                  {
                    label: "浏览社区开放项目",
                    href: "/projects",
                    description: "收录作品不等于开放招募，请以原作者说明为准。",
                  },
                ]
          }
        />
        <Link href="/showcase" className="hub-link mt-6 text-sm">
          返回全部作品
        </Link>
      </div>
    </main>
  );
}
