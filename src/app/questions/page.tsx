import type { Metadata } from "next";
import { CheckCircle2, MessageSquare, Search, ThumbsUp } from "lucide-react";

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
import { questions } from "@/data/platform";

export const metadata: Metadata = {
  title: "问答讨论",
};

const bestAnswers = [
  "建议在首次登录后用 auth.users.id 初始化 profiles，并把公开资料、隐私设置和 GitHub 资料拆开维护。",
  "",
  "可以先把 Markdown 原文存入 articles.content，审核通过后再生成渲染缓存，避免编辑态和发布态互相污染。",
];

export default function QuestionsPage() {
  return (
    <main>
      <PageHero
        eyebrow="Q&A"
        title="技术问答讨论"
        description="围绕技术问题建立可检索、可采纳、可排序的问答知识库，让问题讨论不再沉没在聊天记录里。"
        actions={
          <Button className="bg-[#7a1731] text-white hover:bg-[#641228]">
            <MessageSquare className="mr-2 h-4 w-4" />
            发布问题
          </Button>
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 shadow-sm">
          <Search className="h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="搜索技术问题、标签或回答内容"
            className="h-14 w-full bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
          />
        </div>

        <div className="mt-8 grid gap-4">
          {questions.map((question, index) => {
            const bestAnswer = bestAnswers[index];

            return (
            <Card key={question.title} className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Badge
                    variant={question.status === "已解决" ? "secondary" : "outline"}
                    className={
                      question.status === "已解决"
                        ? "bg-[#eef7f4] text-[#245f51]"
                        : "border-zinc-300 text-zinc-600"
                    }
                  >
                    {question.status}
                  </Badge>
                  <div className="flex gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-3.5 w-3.5" />
                      {question.votes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      {question.answers} 个回答
                    </span>
                  </div>
                </div>
                <CardTitle className="pt-3 text-xl">{question.title}</CardTitle>
                <CardDescription className="text-zinc-600">
                  支持关注问题、点赞回答、采纳最佳答案和根据热度排序。
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {question.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-zinc-100 text-zinc-700">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {bestAnswer ? (
                  <div className="mt-5 rounded-lg border border-[#2d7d69]/20 bg-[#eef7f4] p-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#2d7d69]" />
                      <div>
                        <p className="text-sm font-medium text-zinc-950">最佳答案</p>
                        <p className="mt-1 text-sm leading-6 text-zinc-600">{bestAnswer}</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-5 rounded-lg border border-dashed border-zinc-300 bg-[#fbfbfd] p-4 text-sm text-zinc-600">
                    暂无最佳答案，问题仍在等待采纳。
                  </div>
                )}
                <Button
                  variant="ghost"
                  className="mt-5 text-zinc-700 hover:bg-[#fff6f0] hover:text-[#7a1731]"
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  参与回答
                </Button>
              </CardContent>
            </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
