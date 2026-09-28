"use client";

import Link from "next/link";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { useState, useSyncExternalStore } from "react";
import { coursePath, labLessons } from "@/data/geek-lab";

const storageKey = "geek-lab:python-engineering:v1";
const eventName = "geek-lab-progress";
function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(eventName, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(eventName, onChange);
  };
}
function getSnapshot() {
  try { return localStorage.getItem(storageKey); } catch { return null; }
}
function useProgress() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => null);
  let parsed: unknown;
  try { parsed = JSON.parse(raw ?? "{}"); } catch { parsed = {}; }
  const progress: Record<string, number[]> = {};
  for (const lesson of labLessons) {
    const values = parsed && typeof parsed === "object" && lesson.slug in parsed
      ? (parsed as Record<string, unknown>)[lesson.slug] : [];
    progress[lesson.slug] = Array.isArray(values)
      ? [...new Set(values.filter((value): value is number => Number.isInteger(value) && value >= 0 && value < lesson.checks.length))]
      : [];
  }
  return progress;
}
export function CourseProgress() {
  const progress = useProgress();
  const completed = labLessons.filter((lesson) => progress[lesson.slug].length === lesson.checks.length).length;
  const next = labLessons.find((lesson) => progress[lesson.slug].length < lesson.checks.length) ?? labLessons[0];
  return (
    <div className="space-y-3">
      <div className="flex justify-between gap-3 text-sm"><span className="text-zinc-600">本机学习记录 · 自评</span><span className="font-medium">{completed} / {labLessons.length}</span></div>
      <progress aria-label="已完成实验" value={completed} max={labLessons.length} className="h-2 w-full overflow-hidden rounded bg-zinc-200 accent-[#28705b]" />
      <Link href={coursePath + "/" + next.slug} className="inline-flex items-center gap-2 text-sm font-medium text-[#7a1731]">
        {completed === labLessons.length ? "复习实验" : completed ? "继续实验" : "开始实验 01"}<ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  );
}
export function LessonNavigation({ active }: { active?: string }) {
  const progress = useProgress();
  return (
    <nav aria-label="实验目录" className="grid gap-1">
      {labLessons.map((lesson) => {
        const done = progress[lesson.slug].length === lesson.checks.length;
        return (
          <Link key={lesson.slug} href={coursePath + "/" + lesson.slug} aria-current={active === lesson.slug ? "page" : undefined}
            className={"flex items-start gap-3 rounded-md px-3 py-3 text-sm " + (active === lesson.slug ? "bg-[#7a1731]/[0.07] font-medium text-[#7a1731]" : "text-zinc-600 hover:bg-zinc-100")}>
            {done ? <CheckCircle2 aria-label="已自评完成" className="mt-0.5 h-4 w-4 shrink-0 text-[#28705b]" /> : <Circle aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" />}
            <span><span className="mr-2 font-mono text-xs">{lesson.number}</span>{lesson.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}
export function LessonChecklist({ slug }: { slug: string }) {
  const progress = useProgress();
  const [error, setError] = useState("");
  const lesson = labLessons.find((item) => item.slug === slug)!;
  function toggle(index: number) {
    const checked = progress[slug];
    const next = checked.includes(index) ? checked.filter((value) => value !== index) : [...checked, index];
    try {
      localStorage.setItem(storageKey, JSON.stringify({ ...progress, [slug]: next }));
      window.dispatchEvent(new Event(eventName));
      setError("");
    } catch { setError("浏览器未允许保存进度，勾选未保存。"); }
  }
  return (
    <div className="space-y-4">
      <p className="text-sm leading-6 text-zinc-500">自评记录仅保存在当前浏览器，不代表自动测试结果或 Issue 认领状态。</p>
      {lesson.checks.map((check, index) => (
        <label key={check} className="flex cursor-pointer items-start gap-3 text-sm leading-7 text-zinc-700">
          <input type="checkbox" checked={progress[slug].includes(index)} onChange={() => toggle(index)} className="mt-1.5 h-4 w-4 shrink-0 accent-[#28705b]" /><span>{check}</span>
        </label>
      ))}
      <p role="status" className="text-sm text-red-700">{error}</p>
    </div>
  );
}
