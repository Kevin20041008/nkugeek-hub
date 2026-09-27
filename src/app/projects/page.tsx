import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Code2,
  Filter,
  Gamepad2,
  GitBranch,
  GraduationCap,
  GitPullRequest,
  Search,
  Users,
} from "lucide-react";

import { EmptyState } from "@/components/empty-state";
import { PageHero } from "@/components/layout/page-hero";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProjectCards } from "@/services/projects";

export const metadata: Metadata = {
  title: "开放项目",
};

const categories = ["全部项目", "Web 平台", "人工智能", "开发工具", "科研实践", "游戏开发", "智能硬件"];
const projectIcons = [Code2, Bot, GitPullRequest, GraduationCap, Gamepad2, GitBranch];

export default async function ProjectsPage() {
  const projects = await getProjectCards();

  return (
    <main>
      <PageHero
        eyebrow="GEEK PROJECTS"
        title="开放项目与真实工程实践"
        description="每个项目公开仓库、学习入口、Issue、开发日志、版本成果与工程资料。找到一个能运行的项目，再从小任务开始贡献。"
        actions={
          <>
            <Button className="bg-[#7a1731] text-white hover:bg-[#641228]" asChild>
              <Link href="/challenges">
                <GitPullRequest className="mr-2 h-4 w-4" />
                查看开放任务
              </Link>
            </Button>

            <Button
              variant="outline"
              className="border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50"
              asChild
            >
              <Link href="/contribute">如何发起项目</Link>
            </Button>
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-4 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm lg:grid-cols-[1fr_auto]">
          <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-[#f8f9fb] px-4">
            <Search className="h-4 w-4 text-zinc-500" />

            <input
              type="text"
              placeholder="搜索项目名称、方向、技术栈或招募岗位"
              className="h-12 w-full bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
            />
          </div>

          <Button
            variant="outline"
            className="h-12 border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50"
          >
            <Filter className="mr-2 h-4 w-4" />
            筛选项目
          </Button>

          <div className="flex flex-wrap gap-2 lg:col-span-2">
            {categories.map((category, index) => (
              <Button
                key={category}
                type="button"
                size="sm"
                variant={index === 0 ? "default" : "outline"}
                className={
                  index === 0
                    ? "bg-[#7a1731] text-white hover:bg-[#641228]"
                    : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50"
                }
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {projects.length > 0 ? (
          <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => {
              const Icon = projectIcons[index % projectIcons.length];

              return (
                <Card
                  key={project.slug}
                  className="group border-zinc-200 bg-white text-zinc-950 shadow-sm transition hover:border-[#7a1731]/30"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f2efe8] text-[#7a1731]">
                        <Icon className="h-5 w-5" />
                      </div>

                      <Badge variant="secondary" className="bg-[#eef7f4] text-[#245f51]">
                        {project.status}
                      </Badge>
                    </div>

                    <div className="pt-4">
                      <p className="text-sm font-medium text-[#7a1731]">{project.category}</p>
                      <CardTitle className="mt-3 text-xl">{project.title}</CardTitle>
                      <CardDescription className="mt-3 leading-7 text-zinc-600">
                        {project.description}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center justify-between text-xs text-zinc-500">
                      <span className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        {project.members} 名成员
                      </span>
                      <span>上手难度：{project.difficulty}</span>
                    </div>

                    <p className="mb-3 mt-5 text-xs text-zinc-500">开放贡献方向</p>

                    <div className="flex flex-wrap gap-2">
                      {project.roles.slice(0, 3).map((role) => (
                        <Badge key={role} variant="secondary" className="bg-zinc-100 text-zinc-700">
                          {role}
                        </Badge>
                      ))}
                    </div>

                    <Button
                      variant="ghost"
                      className="mt-6 w-full justify-between text-zinc-700 hover:bg-[#fff6f0] hover:text-[#7a1731]"
                      asChild
                    >
                      <Link href={`/projects/${project.slug}`}>
                        查看项目详情
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState
              title="暂无项目"
              description="当第一个仓库开放后，这里会展示项目阶段、技术栈、开放任务和贡献入口。"
              actionLabel="查看贡献指南"
            />
          </div>
        )}
      </section>
    </main>
  );
}
