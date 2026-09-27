import type { Metadata } from "next";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Mic2,
  Presentation,
  Users,
  Wrench,
} from "lucide-react";

import { EventRegistrationForm } from "@/components/events/event-registration-form";
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
import {
  getEventCards,
  getEventRegistrationSummaries,
} from "@/services/events";

export const metadata: Metadata = {
  title: "活动中心",
};

const eventIcons = [Mic2, Presentation, Wrench, Presentation];

export default async function EventsPage() {
  const events = await getEventCards();
  const registrationSummaries = await getEventRegistrationSummaries();

  return (
    <main>
      <PageHero
        eyebrow="COMMUNITY EVENTS"
        title="活动发布与报名"
        description="活动中心承担社区运营功能，支持技术分享、论文共读、Workshop、项目路演、Hackathon、Demo Day、竞赛宣讲和校友分享。"
        actions={
          <Button className="bg-[#7a1731] text-white hover:bg-[#641228]">
            <CalendarDays className="mr-2 h-4 w-4" />
            发起活动
          </Button>
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-2">
          {events.map((event, index) => {
            const Icon = eventIcons[index % eventIcons.length];
            const summary = registrationSummaries.find(
              (item) => item.title === event.title
            );
            const fallbackCapacity = Number.parseInt(event.capacity, 10);
            const registered = summary?.registered ?? 0;
            const capacity =
              summary?.capacity ??
              (Number.isNaN(fallbackCapacity) ? 0 : fallbackCapacity);
            const remaining =
              summary?.remaining ?? Math.max(capacity - registered, 0);
            const isFull = capacity > 0 && remaining <= 0;

            return (
              <Card
                key={event.title}
                className="group border-zinc-200 bg-white text-zinc-950 shadow-sm transition hover:border-[#7a1731]/30"
              >
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#f2efe8] text-[#7a1731]">
                      <Icon className="h-5 w-5" />
                    </div>

                    <Badge variant="secondary" className="bg-[#eef7f4] text-[#245f51]">
                      {event.status}
                    </Badge>
                  </div>

                  <div className="pt-4">
                    <p className="text-sm font-medium text-[#7a1731]">{event.type}</p>
                    <CardTitle className="mt-3 text-xl">{event.title}</CardTitle>
                    <CardDescription className="mt-3 leading-7 text-zinc-600">
                      {event.description}
                    </CardDescription>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="grid gap-3 rounded-lg border border-zinc-200 bg-[#fbfbfd] p-4 text-sm text-zinc-600 sm:grid-cols-2">
                    <span className="flex items-center gap-2">
                      <CalendarDays className="h-4 w-4 text-[#7a1731]" />
                      {event.date}
                    </span>

                    <span className="flex items-center gap-2">
                      <Clock3 className="h-4 w-4 text-[#7a1731]" />
                      {event.time}
                    </span>

                    <span className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-[#7a1731]" />
                      {event.location}
                    </span>

                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#7a1731]" />
                      {registered}/{capacity || "不限"} 人
                    </span>
                  </div>

                  <div className="mt-4 rounded-lg border border-zinc-200 bg-[#fbfbfd] p-3 text-sm text-zinc-600">
                    {isFull
                      ? "名额已满，后续可加入候补队列。"
                      : `剩余名额：${capacity ? remaining : "不限"}`}
                  </div>

                  <EventRegistrationForm eventTitle={event.title} disabled={isFull} />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
