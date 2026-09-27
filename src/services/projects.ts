import { projects } from "@/data/platform";

export async function getProjectCards() {
  return projects;
}

export async function getProjectDetail(slug: string) {
  return projects.find((project) => project.slug === slug) ?? projects[0];
}

export interface ProjectComment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

export interface ProjectUpdate {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}

export interface ProjectActivity {
  comments: ProjectComment[];
  updates: ProjectUpdate[];
}

export async function getProjectActivity(slug: string): Promise<ProjectActivity> {
  const project = projects.find((item) => item.slug === slug) ?? projects[0];

  return {
    comments: [
      {
        id: "community-discussion-1",
        author: "NKUGeek Contributor",
        content: "建议先从 good first issue 开始，并在提交前附上运行截图和测试结果。",
        createdAt: "2026-09-26",
      },
    ],
    updates: project.updates.map((update, index) => ({
      id: `project-update-${index}`,
      title: update,
      content: "进展记录已同步到项目仓库，下一步将继续拆分公开任务。",
      createdAt: "2026-09-26",
    })),
  };
}
