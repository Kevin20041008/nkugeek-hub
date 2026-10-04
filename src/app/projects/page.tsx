import type { Metadata } from "next";
import Link from "next/link";
import { ProjectCatalog } from "@/components/community/catalogs";
import { PageIntro } from "@/components/community/primitives";
import { propose, repository } from "@/data/community";
export const metadata: Metadata = { title: "Build · 开放项目" };
export default function ProjectsPage() {
  return (
    <main className="bg-white">
      <PageIntro
        eyebrow="BUILD / PROJECT INCUBATOR"
        title="开放项目"
        action={
          <>
            <Link href="/tasks" className="hub-button hub-primary">
              找一个任务
            </Link>
            <a
              href={propose(
                "[项目提案] ",
                "负责人：\nRepo：\n当前状态：Ideas\nNext milestone：\n开放任务链接：\n预计时间投入：\n前置技能：",
              )}
              className="hub-button"
              target="_blank"
              rel="noreferrer"
            >
              提出项目
            </a>
          </>
        }
      >
        Ideas → Recruiting → Building → Released →
        Archived。每个项目从明确的下一步开始。
      </PageIntro>
      <section className="hub-container py-8">
        <ProjectCatalog />
        <div className="mt-9 flex flex-wrap gap-5 border-t border-zinc-200 pt-5 text-sm">
          <Link href="/viewer" className="hub-link">
            工程文件阅览器
          </Link>
          <Link href="/showcase" className="hub-link">
            已形成的成果
          </Link>
          <a
            href={repository + "/blob/main/docs/product/project-admission.md"}
            className="hub-link"
          >
            项目收录规范
          </a>
        </div>
      </section>
    </main>
  );
}
