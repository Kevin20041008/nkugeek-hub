import type { Metadata } from "next";
import { CalendarDays, Trophy, Users } from "lucide-react";

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
import { researchItems } from "@/data/platform";

export const metadata: Metadata = {
  title: "竞赛广场",
};

export default function CompetitionsPage() {
  return (
    <main>
      <PageHero
        eyebrow="COMPETITIONS"
        title="竞赛广场与组队入口"
        description="收录近期比赛、截止时间、所需技能和社区参与队伍，帮助成员尽早找到队友。"
        actions={
          <Button className="bg-[#7a1731] text-white hover:bg-[#641228]">
            <Trophy className="mr-2 h-4 w-4" />
            发布竞赛组队
          </Button>
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {researchItems.map((item) => (
            <Card key={item.title} className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
              <CardHeader>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <Badge variant="secondary" className="bg-[#f2efe8] text-[#7a1731]">
                    {item.type}
                  </Badge>
                  <span className="flex items-center gap-1 text-xs text-zinc-500">
                    <CalendarDays className="h-3.5 w-3.5" />
                    {item.deadline}
                  </span>
                </div>
                <CardTitle className="pt-3 text-xl">{item.title}</CardTitle>
                <CardDescription className="leading-7 text-zinc-600">
                  {item.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-4 flex items-center gap-2 text-sm text-zinc-600">
                  <Users className="h-4 w-4 text-[#7a1731]" />
                  {item.members}
                </div>
                <div className="flex flex-wrap gap-2">
                  {item.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-[#eef7f4] text-[#245f51]">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
