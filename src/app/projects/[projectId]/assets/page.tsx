import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileArchive, UploadCloud } from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";
import { ProjectAssetCenter } from "@/components/projects/project-asset-center";
import { Button } from "@/components/ui/button";
import { EngineeringFileViewer } from "@/components/viewer/engineering-file-viewer";
import { projects } from "@/data/platform";
import { getProjectAssetCenter } from "@/services/project-assets";

export const metadata: Metadata = {
  title: "工程资料库",
};

export function generateStaticParams() {
  return projects.map((project) => ({ projectId: project.slug }));
}

export default async function ProjectAssetsPage({
  params,
}: {
  params: Promise<{ projectId: string }>;
}) {
  const { projectId } = await params;
  const center = await getProjectAssetCenter(projectId);

  return (
    <main>
      <PageHero
        eyebrow="PROJECT ASSETS"
        title={`${center.projectTitle} 工程资料库`}
        description="把代码、PCB、CAD、文档、Diff、评论和版本发布放进同一个项目资产中心，让项目成果可以被浏览、审阅和复用。"
        actions={
          <>
            <Button className="bg-[#7a1731] text-white hover:bg-[#641228]" asChild>
              <Link href={`/projects/${center.projectSlug}`}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                返回项目
              </Link>
            </Button>
            <Button
              variant="outline"
              className="border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50"
              asChild
            >
              <Link href="/viewer">
                <UploadCloud className="mr-2 h-4 w-4" />
                打开阅览器
              </Link>
            </Button>
          </>
        }
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:px-8">
        <ProjectAssetCenter center={center} />

        <div>
          <div className="mb-5 flex items-center gap-2">
            <FileArchive className="h-5 w-5 text-[#7a1731]" />
            <h2 className="text-xl font-semibold text-zinc-950">本地文件预览</h2>
          </div>
          <EngineeringFileViewer />
        </div>
      </section>
    </main>
  );
}
