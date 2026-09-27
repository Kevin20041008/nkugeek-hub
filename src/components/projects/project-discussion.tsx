import { CalendarDays, ExternalLink, MessageSquare } from "lucide-react";

import type { ProjectComment, ProjectUpdate } from "@/services/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProjectDiscussionProps {
  comments: ProjectComment[];
  updates: ProjectUpdate[];
  repositoryUrl: string;
}

export function ProjectDiscussion({ comments, updates, repositoryUrl }: ProjectDiscussionProps) {
  const repository = repositoryUrl.startsWith("http") ? repositoryUrl : `https://${repositoryUrl}`;

  return (
    <div className="grid gap-6">
      <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-[#7a1731]" />开发日志</CardTitle>
          <CardDescription className="text-zinc-600">版本进展、实验结论与下一步计划公开沉淀。</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {updates.map((update) => (
            <div key={update.id} className="border border-zinc-200 bg-[#fbfbfd] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="font-medium text-zinc-950">{update.title}</p>
                <Badge variant="outline" className="border-zinc-300 text-zinc-600">{formatDate(update.createdAt)}</Badge>
              </div>
              {update.content ? <p className="mt-2 text-sm leading-6 text-zinc-600">{update.content}</p> : null}
            </div>
          ))}
          <Button variant="outline" className="mt-1 w-fit border-zinc-300 bg-white" asChild>
            <a href={`${repository}/discussions`} target="_blank" rel="noreferrer">在 GitHub 发布进展 <ExternalLink className="ml-2 h-4 w-4" /></a>
          </Button>
        </CardContent>
      </Card>

      <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-[#7a1731]" />公开讨论</CardTitle>
          <CardDescription className="text-zinc-600">需求、技术方案与问题讨论统一回到仓库，避免知识散落。</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3">
          {comments.map((comment) => (
            <div key={comment.id} className="border border-zinc-200 bg-[#fbfbfd] p-4">
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <p className="font-medium text-zinc-950">{comment.author}</p>
                <span className="text-xs text-zinc-500">{formatDate(comment.createdAt)}</span>
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-600">{comment.content}</p>
            </div>
          ))}
          <Button variant="outline" className="mt-1 w-fit border-zinc-300 bg-white" asChild>
            <a href={`${repository}/issues`} target="_blank" rel="noreferrer">参与 Issue 讨论 <ExternalLink className="ml-2 h-4 w-4" /></a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function formatDate(value: string) {
  return value.includes("T") ? value.slice(0, 10) : value;
}
