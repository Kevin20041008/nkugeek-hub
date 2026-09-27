import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CalendarClock,
  FlaskConical,
  Search,
  Trophy,
  Users,
} from "lucide-react";

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
  title: "科研竞赛",
};

const competitions = [
  "Kaggle",
  "天池",
  "DataFountain",
  "数学建模",
  "蓝桥杯",
  "挑战杯",
  "操作系统比赛",
  "网络安全比赛",
  "机器人比赛",
];

const researchIcons = [Trophy, BookOpen, FlaskConical];

export default function ResearchPage() {
  return (
    <main>
      <PageHero
        eyebrow="RESEARCH & CHALLENGES"
        title="科研合作与竞赛组队"
        description="帮助学生寻找论文伙伴、科研方向和比赛队友。第一版先提供机会广场、论文共读入口、组队申请和审核机制原型。"
        actions={
          <>
            <Button className="bg-[#7a1731] text-white hover:bg-[#641228]">
              发布合作机会
            </Button>
            <Button
              variant="outline"
              className="border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50"
              asChild
            >
              <Link href="/papers">进入论文共读</Link>
            </Button>
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            ["18", "开放合作机会"],
            ["6", "活跃竞赛队伍"],
            ["4", "论文共读小组"],
          ].map(([value, label]) => (
            <div key={label} className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
              <p className="text-3xl font-semibold text-zinc-950">{value}</p>
              <p className="mt-2 text-sm text-zinc-600">{label}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-3 rounded-lg border border-zinc-200 bg-white px-4 shadow-sm">
          <Search className="h-4 w-4 text-zinc-500" />
          <input
            type="text"
            placeholder="搜索竞赛、论文方向、科研项目或技能要求"
            className="h-14 w-full bg-transparent text-sm text-zinc-950 outline-none placeholder:text-zinc-400"
          />
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {researchItems.map((item, index) => {
            const Icon = researchIcons[index % researchIcons.length];

            return (
              <Card
                key={item.title}
                className="group border-zinc-200 bg-white text-zinc-950 shadow-sm transition hover:border-[#7a1731]/30"
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#f2efe8] text-[#7a1731]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <Badge variant="secondary" className="bg-[#eef7f4] text-[#245f51]">
                        {item.type}
                      </Badge>
                      <CardTitle className="mt-4 text-xl leading-8">{item.title}</CardTitle>
                    </div>
                  </div>
                  <CardDescription className="pt-2 leading-7 text-zinc-600">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
                    <span className="flex items-center gap-1.5">
                      <CalendarClock className="h-3.5 w-3.5" />
                      {item.deadline}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" />
                      {item.members}
                    </span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {item.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="bg-zinc-100 text-zinc-700">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  <Button
                    variant="ghost"
                    className="mt-6 w-full justify-between text-zinc-700 hover:bg-[#fff6f0] hover:text-[#7a1731]"
                  >
                    查看详情并申请
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-10 rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-zinc-950">竞赛广场收录方向</h2>
          <div className="mt-5 flex flex-wrap gap-2">
            {competitions.map((competition) => (
              <Badge key={competition} variant="outline" className="border-zinc-300 text-zinc-700">
                {competition}
              </Badge>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
