import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import {
  communityProjects,
  effectiveProjectState,
  taskStatus,
  taskUrl,
  type CommunityProject,
  type Task,
  type Showcase,
} from "@/data/community";
import { Status } from "./primitives";

export function TaskCard({ task }: { task: Task }) {
  const status = taskStatus(task);
  return (
    <article id={task.id} className="hub-card scroll-mt-24">
      <h3 className="text-base font-semibold leading-6">{task.title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-500">{task.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Status>{status}</Status>
        <Status>{task.difficulty}</Status>
        <Status>{task.kind}</Status>
      </div>
      <p className="mt-4 text-xs leading-6 text-zinc-500">
        {task.effort} · 编辑估时
        <br />
        {task.skills.join(" / ")}
      </p>
      <Link
        href={"/projects/" + task.project}
        className="mt-2 text-xs text-zinc-600 hover:underline"
      >
        来自：{communityProjects.find((p) => p.slug === task.project)?.title}
      </Link>
      {task.issue && task.difficulty === "Beginner" && (
        <p className="mt-3 text-xs font-medium text-[#28705b]">
          Good First Issue · #{task.issue}
        </p>
      )}
      <p className="mt-3 text-xs leading-6 text-zinc-500">
        交付：{task.outcome}
      </p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
        <a
          href={taskUrl(task)}
          target="_blank"
          rel="noreferrer"
          className="hub-link text-sm"
        >
          {status === "提案"
            ? "讨论提案"
            : status === "待认领"
              ? "认领任务"
              : "查看 Issue"}
          <ExternalLink className="h-3.5 w-3.5 shrink-0" />
        </a>
        <Link
          href={task.learn}
          className="text-xs text-zinc-500 underline underline-offset-4"
        >
          前置学习
        </Link>
        {task.paper && (
          <Link
            href={"/papers/" + task.paper}
            className="text-xs text-zinc-500 underline underline-offset-4"
          >
            论文详情
          </Link>
        )}
      </div>
    </article>
  );
}
export function ProjectCard({ project }: { project: CommunityProject }) {
  return (
    <article className="hub-card">
      <h3 className="text-lg font-semibold">{project.title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-500">
        {project.description}
      </p>
      <div className="mt-4">
        <Status>{effectiveProjectState(project)}</Status>
      </div>
      <p className="mt-4 text-xs leading-6 text-zinc-500">
        {project.skills.join(" / ")}
      </p>
      <dl className="mt-3 space-y-2 text-sm">
        <div>
          <dt className="text-xs text-zinc-500">负责人</dt>
          <dd className="mt-1">{project.owner ?? "待确认"}</dd>
        </div>
        <div>
          <dt className="text-xs text-zinc-500">Next milestone</dt>
          <dd className="mt-1 leading-6">
            {project.milestone ?? "待提出最小可验证成果"}
          </dd>
        </div>
      </dl>
      {project.effort && (
        <p className="mt-3 text-xs text-zinc-500">{project.effort}</p>
      )}
      {project.repo && (
        <a
          href={project.repo}
          className="hub-link mt-3 text-xs"
          target="_blank"
          rel="noreferrer"
        >
          Repo
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
      )}
      <Link
        href={"/projects/" + project.slug}
        className="hub-link mt-auto pt-5 text-sm"
      >
        查看项目与任务
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
export function ShowcaseCard({ item }: { item: Showcase }) {
  return (
    <article className="hub-card">
      <h3 className="text-lg font-semibold">{item.title}</h3>
      <p className="mt-2 text-sm leading-6 text-zinc-500">{item.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Status>{item.external ? "公开项目收录" : "社区项目"}</Status>
        {item.categories.map((c) => (
          <Status key={c}>{c}</Status>
        ))}
      </div>
      <p className="mt-4 text-xs leading-6 text-zinc-500">
        {item.stack.join(" / ")}
        <br />
        {item.contributor}
      </p>
      <Link
        href={"/showcase/" + item.slug}
        className="hub-link mt-auto pt-5 text-sm"
      >
        作品与故事
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  );
}
