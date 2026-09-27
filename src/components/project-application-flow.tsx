import Link from "next/link";
import { CircleDot, GitBranch, GitPullRequest, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectApplicationFlowProps {
  projectTitle: string;
  roles: string[];
  owner: string;
  initialMembers: string[];
  repositoryUrl: string;
}

export function ProjectApplicationFlow({
  projectTitle,
  roles,
  owner,
  initialMembers,
  repositoryUrl,
}: ProjectApplicationFlowProps) {
  const repository = repositoryUrl.startsWith("http")
    ? repositoryUrl
    : `https://${repositoryUrl}`;

  return (
    <div className="border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-zinc-950">参与项目贡献</h2>
          <p className="mt-2 text-sm leading-6 text-zinc-600">
            不需要填写站内申请。选择一个方向，在仓库 Issue 中认领任务，完成后提交 Pull Request。
          </p>
        </div>
        <Badge variant="secondary" className="bg-[#eef7f4] text-[#245f51]">开放协作</Badge>
      </div>

      <div className="mt-5 grid gap-3">
        {[
          ["01", "阅读项目文档", `先跑通 ${projectTitle} 的环境、示例和测试。`],
          ["02", "选择贡献方向", "从代码、文档、实验、设计或工程资料中选择一项。"],
          ["03", "在 Issue 中认领", "说明实现思路与预计时间，和维护者确认任务边界。"],
          ["04", "提交 Pull Request", "附上验证结果，让贡献能够被公开复现和检查。"],
        ].map(([step, title, description]) => (
          <div key={step} className="grid grid-cols-[44px_1fr] gap-3 border-b border-zinc-100 pb-3 last:border-0 last:pb-0">
            <span className="font-mono text-sm font-medium text-[#7a1731]">{step}</span>
            <div>
              <p className="text-sm font-medium text-zinc-950">{title}</p>
              <p className="mt-1 text-sm leading-6 text-zinc-600">{description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <p className="mb-3 text-sm font-medium text-zinc-950">当前开放方向</p>
        <div className="flex flex-wrap gap-2">
          {roles.map((role) => (
            <Badge key={role} variant="outline" className="border-zinc-300 bg-[#fbfbfd] text-zinc-700">
              <CircleDot className="mr-1.5 h-3.5 w-3.5 text-[#2d7d69]" />{role}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button className="bg-[#7a1731] text-white hover:bg-[#641228]" asChild>
          <a href={`${repository}/issues`} target="_blank" rel="noreferrer">
            <GitBranch className="mr-2 h-4 w-4" />查看待认领 Issue
          </a>
        </Button>
        <Button variant="outline" className="border-zinc-300 bg-white" asChild>
          <Link href="/contribute">
            <GitPullRequest className="mr-2 h-4 w-4" />贡献指南
          </Link>
        </Button>
      </div>

      <div className="mt-6 border-t border-zinc-200 pt-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-950">
          <Users className="h-4 w-4 text-[#7a1731]" />维护者与贡献者
        </div>
        <div className="flex flex-wrap gap-2">
          {[owner, ...initialMembers.filter((member) => member !== owner)].map((member) => (
            <Badge key={member} variant="secondary" className="bg-zinc-100 text-zinc-700">{member}</Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
