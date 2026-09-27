"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Code2,
  Filter,
  GraduationCap,
  Search,
  Trophy,
} from "lucide-react";

import { EmptyState } from "@/components/empty-state";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MemberProfile {
  name: string;
  initials: string;
  college: string;
  grade: string;
  level: string;
  projects: number;
  contributions: number;
  direction: string;
  skills: string[];
}

interface MemberDirectoryProps {
  members: MemberProfile[];
}

export function MemberDirectory({ members }: MemberDirectoryProps) {
  const [query, setQuery] = useState("");
  const [activeSkill, setActiveSkill] = useState("全部");
  const skills = useMemo(
    () => ["全部", ...Array.from(new Set(members.flatMap((member) => member.skills)))],
    [members]
  );

  const filteredMembers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return members.filter((member) => {
      const skillMatched =
        activeSkill === "全部" || member.skills.includes(activeSkill);
      const queryMatched =
        !normalizedQuery ||
        [
          member.name,
          member.college,
          member.grade,
          member.level,
          member.direction,
          ...member.skills,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);

      return skillMatched && queryMatched;
    });
  }, [activeSkill, members, query]);

  return (
    <>
      <div className="mt-8 grid gap-4 rounded-lg border border-zinc-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-[#f8f9fb] px-4">
          <Search className="h-4 w-4 text-zinc-500" />
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索成员姓名、学院、研究方向或技术标签"
            className="h-12 w-full bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
          />
        </div>

        <div>
          <div className="mb-3 flex items-center gap-2 text-sm font-medium text-zinc-950">
            <Filter className="h-4 w-4 text-[#7a1731]" />
            技能筛选
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <Button
                key={skill}
                type="button"
                size="sm"
                variant={activeSkill === skill ? "default" : "outline"}
                className={
                  activeSkill === skill
                    ? "bg-[#7a1731] text-white hover:bg-[#641228]"
                    : "border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50"
                }
                onClick={() => setActiveSkill(skill)}
              >
                {skill}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {filteredMembers.length > 0 ? (
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredMembers.map((member) => (
            <Card
              key={member.name}
              className="group border-zinc-200 bg-white text-zinc-950 shadow-sm transition hover:border-[#7a1731]/30"
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <Avatar className="h-14 w-14 border border-zinc-200">
                    <AvatarFallback className="bg-[#f2efe8] text-[#7a1731]">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>

                  <div className="min-w-0">
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-zinc-100 text-zinc-700">
                        {member.college}
                      </Badge>
                      <Badge variant="outline" className="border-zinc-300 text-zinc-600">
                        {member.grade}
                      </Badge>
                    </div>
                  </div>
                </div>

                <CardDescription className="pt-3 leading-7 text-zinc-600">
                  {member.direction}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {member.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-[#eef7f4] text-[#245f51]">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="mt-5 grid gap-2 text-xs text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <Code2 className="h-3.5 w-3.5" />
                    参与 {member.projects} 个项目
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Trophy className="h-3.5 w-3.5" />
                    {member.contributions} 条贡献记录
                  </span>
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="h-3.5 w-3.5" />
                    {member.level}
                  </span>
                </div>

                <Button
                  variant="ghost"
                  className="mt-5 w-full justify-between text-zinc-700 hover:bg-[#fff6f0] hover:text-[#7a1731]"
                >
                  查看个人主页
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="mt-10">
          <EmptyState
            title="暂无匹配成员"
            description="换一个关键词或技能标签，后续接入数据库后可以按技术栈、学院、年级和研究方向组合筛选。"
            actionLabel="重置筛选"
          />
        </div>
      )}
    </>
  );
}
