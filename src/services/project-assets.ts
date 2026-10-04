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
        id: "python-lab",
        name: "Python 工程实践源码",
        path: "public/labs/python-engineering",
        fileType: "code",
        format: "Python",
        size: "以仓库为准",
        version: "main",
        previewStatus: "ready",
        storageUrl:
          "https://github.com/Kevin20041008/nkugeek-hub/tree/main/public/labs/python-engineering",
        linkedTo: "Geek Lab / Issues #1–4",
        commentCount: 0,
      },
    ],
    diffs: [],
    comments: [],
    releases: [],
  },
};

export async function getProjectAssetCenter(
  projectSlug: string,
): Promise<ProjectAssetCenterData> {
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
