import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  PageIntro,
  Status,
  NextSteps,
  EmptyState,
} from "@/components/community/primitives";
import { TaskCard } from "@/components/community/cards";
import {
  communityProjects,
  effectiveProjectState,
  propose,
  tasks,
} from "@/data/community";
import { paperCatalog } from "@/data/papers";
export const dynamicParams = false;
type Props = { params: Promise<{ projectId: string }> };
export function generateStaticParams() {
  return communityProjects.map((p) => ({ projectId: p.slug }));
}
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectId } = await params;
  const project = communityProjects.find((p) => p.slug === projectId);
  return { title: project?.title ?? "项目不存在" };
}
export default async function ProjectPage({ params }: Props) {
  const { projectId } = await params;
  const project = communityProjects.find((p) => p.slug === projectId);
  if (!project) notFound();
  const related = tasks.filter((t) => t.project === project.slug);
  return (
    <main className="bg-white">
      <PageIntro
        eyebrow="BUILD / PROJECT"
        title={project.title}
        action={
          <>
            <Status>{effectiveProjectState(project)}</Status>
            {project.repo && (
              <a
                href={project.repo}
                className="hub-button"
                target="_blank"
                rel="noreferrer"
              >
                Repo
              </a>
            )}
            <Link href="/projects" className="hub-button">
              所有项目
            </Link>
          </>
        }
      >
        {project.description}
      </PageIntro>
      <div className="hub-container py-8">
        <dl className="grid gap-6 border-b border-zinc-200 pb-7 md:grid-cols-3">
          <div>
            <dt className="text-xs text-zinc-500">负责人</dt>
            <dd className="mt-2 text-sm">{project.owner ?? "待确认"}</dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">Next milestone</dt>
            <dd className="mt-2 text-sm leading-7">
              {project.milestone ?? "提案阶段，待确定验收目标"}
            </dd>
          </div>
          <div>
            <dt className="text-xs text-zinc-500">预计投入</dt>
            <dd className="mt-2 text-sm">
              {project.effort ?? "待确认范围后估计"}
            </dd>
          </div>
        </dl>
        <section className="py-7">
          <h2 className="text-xl font-semibold">参与项目贡献</h2>
          <p className="mt-3 text-sm leading-7 text-zinc-500">
            {project.skills.join(" / ")} · 在真实 Issue
            中沟通认领，维护者确认后开始。提案不等于已立项任务。
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {related.map((t) => (
              <TaskCard key={t.id} task={t} />
            ))}
          </div>
          {!related.length && (
            <EmptyState
              title="暂无已发布任务"
              href={propose(
                "[项目讨论] " + project.title,
                "我的最小里程碑：\n预计投入：\n公开仓库：",
              )}
              action="讨论最小里程碑"
            >
              项目尚在 Ideas，欢迎先补齐负责人和仓库。
            </EmptyState>
          )}
        </section>
        <NextSteps
          items={[
            {
              label: "需要基础？去 Learn",
              href: project.learn,
              description: "先完成前置技能与一份可检查的产出。",
            },
            ...project.papers
              .filter((slug) => paperCatalog.some((p) => p.slug === slug))
              .map((slug) => ({
                label:
                  "相关论文：" +
                  paperCatalog.find((p) => p.slug === slug)!.name,
                href: "/papers/" + slug,
                description: "阅读原文，明确方法与实验边界。",
              })),
            {
              label: "项目工程资料库",
              href: "/projects/" + project.slug + "/assets",
              description: "公开源码与本地工程文件预览。",
            },
            ...(project.showcase
              ? [
                  {
                    label: "查看项目成果",
                    href: "/showcase/" + project.showcase,
                    description: "Demo、仓库与创作过程。",
                  },
                ]
              : [
                  {
                    label: "成果提交规范",
                    href: "/showcase",
                    description: "项目有可验证产出后再进入成果页。",
                  },
                ]),
          ]}
        />
      </div>
    </main>
  );
}
