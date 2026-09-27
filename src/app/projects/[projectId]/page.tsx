import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  FileArchive,
  GitBranch,
  ListChecks,
  Users,
} from "lucide-react";

import { ProjectApplicationFlow } from "@/components/project-application-flow";
import { ProjectAssetCenter } from "@/components/projects/project-asset-center";
import { ProjectDiscussion } from "@/components/projects/project-discussion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { projects } from "@/data/platform";
import { getProjectAssetCenter } from "@/services/project-assets";
import { getProjectActivity, getProjectDetail } from "@/services/projects";

export const metadata: Metadata = {
  title: "项目详情",
};

export function generateStaticParams() {
  return projects.map((project) => ({ projectId: project.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const project = await getProjectDetail(projectId);
  const [activity, assetCenter] = await Promise.all([
    getProjectActivity(project.slug),
    getProjectAssetCenter(project.slug),
  ]);
  const repositoryUrl = project.github.startsWith("http")
    ? project.github
    : `https://${project.github}`;

  return (
    <main>
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
          <Button
            variant="ghost"
            className="mb-8 text-zinc-700 hover:bg-zinc-100"
            asChild
          >
            <Link href="/projects">
              <ArrowLeft className="mr-2 h-4 w-4" />
              返回项目广场
            </Link>
          </Button>

          <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-[#f2efe8] text-[#7a1731]">
                  {project.category}
                </Badge>
                <Badge variant="secondary" className="bg-[#eef7f4] text-[#245f51]">
                  {project.status}
                </Badge>
                <Badge variant="outline" className="border-zinc-300 text-zinc-600">
                  {project.phase}
                </Badge>
              </div>

              <h1 className="mt-5 text-4xl font-semibold leading-tight text-zinc-950">
                {project.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-zinc-600">
                {project.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button className="bg-[#7a1731] text-white hover:bg-[#641228]" asChild>
                  <a href="#contribute">参与项目贡献</a>
                </Button>
                <Button
                  variant="outline"
                  className="border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50"
                  asChild
                >
                  <Link href={`/projects/${project.slug}/assets`}>
                    <FileArchive className="mr-2 h-4 w-4" />
                    工程资料库
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50"
                  asChild
                >
                  <a
                    href={repositoryUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <GitBranch className="mr-2 h-4 w-4" />
                    查看 GitHub
                  </a>
                </Button>
              </div>
            </div>

            <Card className="border-zinc-200 bg-[#fbfbfd] text-zinc-950 shadow-sm">
              <CardHeader>
                <CardTitle>项目档案</CardTitle>
                <CardDescription className="text-zinc-600">
                  负责人、成员规模、难度和仓库信息
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm text-zinc-600">
                <div className="flex items-center justify-between">
                  <span>负责人</span>
                  <span className="font-medium text-zinc-950">{project.owner}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>成员</span>
                  <span className="font-medium text-zinc-950">{project.members} 人</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>难度</span>
                  <span className="font-medium text-zinc-950">{project.difficulty}</span>
                </div>
                <div className="rounded-lg border border-zinc-200 bg-white p-3">
                  <p className="text-xs text-zinc-500">GitHub 仓库</p>
                  <p className="mt-1 break-all font-medium text-zinc-950">{project.github}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-5 py-12 lg:grid-cols-[1fr_0.95fr] lg:px-8">
        <div className="grid gap-6">
          <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
            <CardHeader>
              <CardTitle>项目概览</CardTitle>
              <CardDescription className="leading-7 text-zinc-600">
                {project.impact}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {project.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="bg-zinc-100 text-zinc-700">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <ProjectAssetCenter center={assetCenter} compact />

          <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ListChecks className="h-5 w-5 text-[#7a1731]" />
                任务看板
              </CardTitle>
              <CardDescription className="text-zinc-600">
                任务最终同步为 GitHub Issue，通过标签区分待认领、进行中、待合并和已完成。
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {project.tasks.map((task) => (
                  <div key={task.title} className="rounded-lg border border-zinc-200 bg-[#fbfbfd] p-4">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <p className="font-medium text-zinc-950">{task.title}</p>
                      <Badge variant="outline" className="border-zinc-300 text-zinc-600">
                        {task.status}
                      </Badge>
                    </div>
                    <p className="mt-2 flex items-center gap-2 text-sm text-zinc-500">
                      <Users className="h-4 w-4" />
                      负责人：{task.owner}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div id="contribute" className="grid scroll-mt-24 gap-6">
          <ProjectApplicationFlow
            projectTitle={project.title}
            roles={project.roles}
            owner={project.owner}
            initialMembers={[project.owner, "前端协作成员", "后端协作成员"]}
            repositoryUrl={repositoryUrl}
          />

          <ProjectDiscussion
            comments={activity.comments}
            updates={activity.updates}
            repositoryUrl={repositoryUrl}
          />
        </div>
      </section>
    </main>
  );
}
