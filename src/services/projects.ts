import { communityProjects } from "@/data/community";
export async function getProjectCards() {
  return communityProjects;
}
export async function getProjectDetail(slug: string) {
  return communityProjects.find((project) => project.slug === slug);
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
export async function getProjectActivity(): Promise<ProjectActivity> {
  return { comments: [], updates: [] };
}
