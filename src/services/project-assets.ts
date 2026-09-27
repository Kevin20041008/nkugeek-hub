import { projects } from "@/data/platform";

export type ProjectAssetType =
  | "code"
  | "pcb"
  | "cad"
  | "dataset"
  | "doc"
  | "release"
  | "other";

export interface ProjectAsset {
  id: string;
  name: string;
  path: string;
  fileType: ProjectAssetType;
  format: string;
  size: string;
  version: string;
  previewStatus: string;
  storageUrl: string;
  linkedTo: string;
  commentCount: number;
}

export interface ProjectAssetDiff {
  id: string;
  assetName: string;
  fromVersion: string;
  toVersion: string;
  summary: string;
  addedLines: number;
  removedLines: number;
  changedFiles: number;
}

export interface ProjectAssetComment {
  id: string;
  assetName: string;
  anchor: string;
  lineNumber: number | null;
  content: string;
  status: string;
  createdAt: string;
}

export interface ProjectRelease {
  id: string;
  title: string;
  version: string;
  summary: string;
  demoUrl: string;
  status: string;
  releasedAt: string;
}

export interface ProjectAssetCenterData {
  projectSlug: string;
  projectTitle: string;
  assets: ProjectAsset[];
  diffs: ProjectAssetDiff[];
  comments: ProjectAssetComment[];
  releases: ProjectRelease[];
}

const fallbackCenters: Record<string, ProjectAssetCenterData> = {
  "nkugeek-hub": {
    projectSlug: "nkugeek-hub",
    projectTitle: "NKUGeek Hub",
    assets: [
      {
        id: "home-source",
        name: "开源学习社区首页",
        path: "src/app/page.tsx",
        fileType: "code",
        format: "TSX",
        size: "19.2 KB",
        version: "v0.3-open-source",
        previewStatus: "ready",
        storageUrl: "https://github.com/NKUGeek/nkugeek-hub/blob/main/src/app/page.tsx",
        linkedTo: "学习路线与贡献入口",
        commentCount: 1,
      },
      {
        id: "badge-board",
        name: "NKUGeek Badge PCB",
        path: "hardware/nkugeek-badge.kicad_pcb",
        fileType: "pcb",
        format: "KiCad",
        size: "418.8 KB",
        version: "v0.1-board",
        previewStatus: "ready",
        storageUrl: "https://github.com/NKUGeek/nkugeek-hub/tree/main/hardware",
        linkedTo: "智能硬件路线",
        commentCount: 0,
      },
      {
        id: "demo-stand",
        name: "Demo 展示支架",
        path: "cad/demo-stand.sldprt",
        fileType: "cad",
        format: "SolidWorks",
        size: "2.3 MB",
        version: "v0.1-cad",
        previewStatus: "needs_conversion",
        storageUrl: "https://github.com/NKUGeek/nkugeek-hub/tree/main/cad",
        linkedTo: "开放硬件 Demo",
        commentCount: 0,
      },
    ],
    diffs: [
      {
        id: "home-diff",
        assetName: "开源学习社区首页",
        fromVersion: "v0.2-platform",
        toVersion: "v0.3-open-source",
        summary: "首页从账户型协作平台调整为学习路线、Issue 与 Pull Request 驱动的开放社区。",
        addedLines: 214,
        removedLines: 168,
        changedFiles: 12,
      },
    ],
    comments: [
      {
        id: "home-comment",
        assetName: "开源学习社区首页",
        anchor: "START HERE",
        lineNumber: 118,
        content: "学习路线应始终给出明确任务、验证方式和最终产出。",
        status: "open",
        createdAt: "2026-09-26",
      },
    ],
    releases: [
      {
        id: "open-source-release",
        title: "开源学习社区版本",
        version: "v0.3-open-source",
        summary: "上线学习路线、开放挑战、贡献指南与工程资料预览。",
        demoUrl: "https://github.com/NKUGeek/nkugeek-hub",
        status: "published",
        releasedAt: "2026-09-26",
      },
    ],
  },
};

export async function getProjectAssetCenter(projectSlug: string): Promise<ProjectAssetCenterData> {
  const project = projects.find((item) => item.slug === projectSlug);

  return (
    fallbackCenters[projectSlug] ?? {
      projectSlug,
      projectTitle: project?.title ?? "项目",
      assets: [],
      diffs: [],
      comments: [],
      releases: [],
    }
  );
}
