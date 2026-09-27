import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, MessageSquare, Route, Users } from "lucide-react";

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

export const metadata: Metadata = {
  title: "技术社区",
};

const communityBlocks = [
  {
    title: "技术文章",
    description: "教程、项目总结、论文解读、环境配置、踩坑记录、比赛经验和学习笔记。",
    href: "/articles",
    icon: BookOpen,
    tags: ["Markdown", "代码高亮", "Pull Request"],
  },
  {
    title: "问题讨论",
    description: "简化版 Stack Overflow，支持标签、回答、点赞、采纳最佳答案和已解决标记。",
    href: "/questions",
    icon: MessageSquare,
    tags: ["技术标签", "最佳答案", "热度排序"],
  },
  {
    title: "学习路线",
    description: "把 AI、前端、后端、系统、网络安全、机器人等方向沉淀为可持续维护的路线。",
    href: "/learn",
    icon: Route,
    tags: ["路线图", "资源索引", "阶段任务"],
  },
];

const groups = [
  "AI 与大模型组",
  "CV 与多模态组",
  "系统与网络安全组",
  "开源软件组",
  "游戏开发组",
  "机器人与智能硬件组",
];

export default function CommunityPage() {
  return (
    <main>
      <PageHero
        eyebrow="GEEK COMMUNITY"
        title="围绕路线、项目和贡献形成技术共同体"
        description="讨论不以信息流为中心，而是服务于学习章节、开放任务和真实项目。文章、问答与活动最终都回到可复用的公开成果。"
        actions={
          <Button className="bg-[#7a1731] text-white hover:bg-[#641228]" asChild>
            <Link href="/learn">选择学习路线</Link>
          </Button>
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {communityBlocks.map((block) => {
            const Icon = block.icon;
            return (
              <Card key={block.title} className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
                <CardHeader>
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f2efe8] text-[#7a1731]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="pt-3 text-xl">{block.title}</CardTitle>
                  <CardDescription className="leading-7 text-zinc-600">
                    {block.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {block.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-zinc-100 text-zinc-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    className="mt-5 w-full justify-between text-zinc-700 hover:bg-[#fff6f0] hover:text-[#7a1731]"
                    asChild
                  >
                    <Link href={block.href}>
                      进入
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-[#7a1731]" />
            <h2 className="text-xl font-semibold text-zinc-950">技术兴趣小组</h2>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
            每个方向维护一组学习路线、项目仓库、开放 Issue、活动记录与工程资料。
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {groups.map((group) => (
              <div key={group} className="rounded-lg border border-zinc-200 bg-[#fbfbfd] p-4 text-sm font-medium text-zinc-800">
                {group}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
