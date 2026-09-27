import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Clock3, Eye, FileText, Search, User } from "lucide-react";

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
import { getArticleCards } from "@/services/articles";

export const metadata: Metadata = {
  title: "技术文章",
};

const categories = [
  "全部",
  "人工智能",
  "计算机视觉",
  "大模型",
  "前端开发",
  "后端开发",
  "系统开发",
  "科研经验",
  "竞赛经验",
];

export default async function ArticlesPage() {
  const articles = await getArticleCards();

  return (
    <main>
      <PageHero
        eyebrow="GEEK COMMUNITY"
        title="技术文章与经验沉淀"
        description="教程、项目总结、论文解读、环境配置与踩坑记录都作为仓库文档维护，通过 Pull Request 持续修订。"
        actions={
          <Button className="bg-[#7a1731] text-white hover:bg-[#641228]" asChild>
            <Link href="/contribute#docs">
              <FileText className="mr-2 h-4 w-4" />
              通过 GitHub 投稿
            </Link>
          </Button>
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-[#f8f9fb] px-4">
            <Search className="h-4 w-4 text-zinc-500" />

            <input
              type="text"
              placeholder="搜索文章标题、作者、技术方向或标签"
              className="h-12 w-full bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
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

        {articles.length > 0 ? (
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {articles.map((article) => (
              <Card
                key={article.title}
                className="group border-zinc-200 bg-white text-zinc-950 shadow-sm transition hover:border-[#7a1731]/30"
              >
                <CardHeader>
                  <div className="flex items-center justify-between gap-4">
                    <Badge
                      variant="outline"
                      className="border-[#7a1731]/20 bg-[#7a1731]/5 text-[#7a1731]"
                    >
                      {article.category}
                    </Badge>

                    <div className="flex items-center gap-1 text-xs text-zinc-500">
                      <Eye className="h-3.5 w-3.5" />
                      {article.views}
                    </div>
                  </div>

                  <CardTitle className="pt-3 text-xl leading-8">
                    {article.title}
                  </CardTitle>

                  <CardDescription className="leading-7 text-zinc-600">
                    {article.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {article.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="bg-zinc-100 text-zinc-700">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5" />
                      {article.author}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5" />
                      {article.readingTime}
                    </span>

                    <span>{article.date}</span>
                  </div>

                  <Button
                    variant="ghost"
                    className="mt-5 w-full justify-between text-zinc-700 hover:bg-[#fff6f0] hover:text-[#7a1731]"
                  >
                    阅读文章
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="mt-10">
            <EmptyState
              title="暂无文章"
              description="当第一篇仓库文档合并后，这里会展示标题、作者、标签和对应源码。"
              actionLabel="查看投稿方法"
            />
          </div>
        )}

        <div className="mt-10 rounded-lg border border-dashed border-zinc-300 bg-white p-8 text-center">
          <FileText className="mx-auto h-8 w-8 text-zinc-500" />
          <p className="mt-4 text-sm leading-7 text-zinc-600">
            内容采用 Markdown 与代码一起版本管理。修正错字、补充步骤和新增教程都可以通过 Pull Request 完成。
          </p>
          <Button
            variant="outline"
            className="mt-5 border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50"
            asChild
          >
            <Link href="/contribute#docs">查看内容贡献流程</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
