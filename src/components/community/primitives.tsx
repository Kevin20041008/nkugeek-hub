import Link from "next/link";
import { ArrowRight, ExternalLink, GitCommitHorizontal } from "lucide-react";
import type { ReactNode } from "react";
import { communitySnapshot } from "@/data/community";

const statusColors: Record<string, string> = {
  待认领: "bg-emerald-50 text-emerald-800 border-emerald-200",
  已认领: "bg-sky-50 text-sky-800 border-sky-200",
  提案: "bg-amber-50 text-amber-800 border-amber-200",
  已关闭: "bg-zinc-100 text-zinc-600 border-zinc-200",
  Ideas: "bg-amber-50 text-amber-800 border-amber-200",
  Recruiting: "bg-emerald-50 text-emerald-800 border-emerald-200",
  Building: "bg-sky-50 text-sky-800 border-sky-200",
  Released: "bg-emerald-50 text-emerald-800 border-emerald-200",
  Archived: "bg-zinc-100 text-zinc-600 border-zinc-200",
};
export function Status({ children }: { children: string }) {
  return (
    <span
      className={
        "inline-flex max-w-full items-center rounded border px-2 py-1 text-xs font-medium " +
        (statusColors[children] ?? "border-zinc-200 bg-zinc-50 text-zinc-600")
      }
    >
      {children}
    </span>
  );
}
export function PageIntro({
  eyebrow,
  title,
  children,
  action,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="hub-container py-9">
        <p className="text-xs font-semibold text-[#28705b]">{eyebrow}</p>
        <h1 className="mt-3 text-3xl font-semibold">{title}</h1>
        <div className="mt-3 max-w-2xl text-sm leading-7 text-zinc-600">
          {children}
        </div>
        {action && <div className="mt-5 flex flex-wrap gap-3">{action}</div>}
      </div>
    </header>
  );
}
export function SectionTitle({
  title,
  href,
  link = "查看全部",
}: {
  title: string;
  href?: string;
  link?: string;
}) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      {href && (
        <Link href={href} className="hub-link text-sm">
          {link}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
export function EmptyState({
  title,
  children,
  href,
  action,
}: {
  title: string;
  children: ReactNode;
  href?: string;
  action?: string;
}) {
  return (
    <div className="border-y border-dashed border-zinc-300 py-9">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-500">
        {children}
      </p>
      {href && (
        <Link href={href} className="hub-link mt-4 text-sm">
          {action}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
export function NextSteps({
  items,
}: {
  items: { label: string; href: string; description: string }[];
}) {
  return (
    <section aria-label="下一步" className="mt-8 border-t border-zinc-200 pt-6">
      <h2 className="text-lg font-semibold">下一步</h2>
      <div className="mt-3 divide-y divide-zinc-100">
        {items.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className="flex items-center justify-between gap-5 py-4 hover:text-[#7a1731]"
          >
            <div>
              <h3 className="text-sm font-medium">{item.label}</h3>
              <p className="mt-1 text-xs leading-6 text-zinc-500">
                {item.description}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
export function ActivityFeed() {
  return (
    <div>
      <ol className="divide-y divide-zinc-200">
        {communitySnapshot.activity.map((event) => (
          <li key={event.id} className="flex gap-3 py-4">
            <GitCommitHorizontal className="mt-1 h-4 w-4 shrink-0 text-[#28705b]" />
            <div className="min-w-0 flex-1">
              <a
                href={event.url}
                target="_blank"
                rel="noreferrer"
                className="hub-link text-sm"
              >
                {event.title}
                <ExternalLink className="h-3.5 w-3.5 shrink-0" />
              </a>
              <p className="mt-1 text-xs text-zinc-500">
                <time dateTime={event.date}>{event.date.slice(0, 10)}</time> ·{" "}
                {event.kind} ·{" "}
                <span className="font-mono">{event.id.slice(0, 7)}</span>
              </p>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-3 text-xs leading-6 text-zinc-500">
        GitHub 快照：
        {communitySnapshot.checkedAt.replace("T", " ").replace("Z", " UTC")} ·
        非实时动态
      </p>
    </div>
  );
}
