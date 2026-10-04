"use client";

import { useState } from "react";
import { RotateCcw, Search } from "lucide-react";
import {
  communityProjects,
  effectiveProjectState,
  projectStates,
  showcases,
  showcaseCategories,
  tasks,
  taskKinds,
  taskStatus,
} from "@/data/community";
import { ProjectCard, ShowcaseCard, TaskCard } from "./cards";
import { EmptyState } from "./primitives";

function SearchField({
  value,
  onChange,
  label,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
}) {
  return (
    <label className="block min-w-0 text-xs text-zinc-600">
      {label}
      <div className="relative mt-2">
        <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-zinc-400" />
        <input
          type="search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-full min-w-0 rounded-md border border-zinc-300 bg-white pl-9 pr-3 text-sm"
        />
      </div>
    </label>
  );
}
function Reset({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title="重置筛选"
      aria-label="重置筛选"
      className="hub-icon border border-zinc-300"
    >
      <RotateCcw className="h-4 w-4" />
    </button>
  );
}
export function TaskCatalog() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState("全部");
  const [level, setLevel] = useState("全部");
  const [status, setStatus] = useState("全部");
  const visible = tasks.filter(
    (t) =>
      (kind === "全部" || t.kind === kind) &&
      (level === "全部" || t.difficulty === level) &&
      (status === "全部" || taskStatus(t) === status) &&
      [t.title, t.description, ...t.skills]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <div>
      <div className="grid items-end gap-4 border-b border-zinc-200 pb-5 sm:grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr_auto]">
        <SearchField value={query} onChange={setQuery} label="搜索任务或技能" />
        <label className="text-xs text-zinc-600">
          任务类型
          <select
            aria-label="任务类型"
            className="hub-select"
            value={kind}
            onChange={(e) => setKind(e.target.value)}
          >
            {["全部", ...taskKinds].map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </label>
        <label className="text-xs text-zinc-600">
          难度
          <select
            aria-label="难度"
            className="hub-select"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            {["全部", "Beginner", "Intermediate"].map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </label>
        <label className="text-xs text-zinc-600">
          任务状态
          <select
            aria-label="任务状态"
            className="hub-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            {["全部", "待认领", "已认领", "已关闭", "提案"].map((k) => (
              <option key={k}>{k}</option>
            ))}
          </select>
        </label>
        <Reset
          onClick={() => {
            setQuery("");
            setKind("全部");
            setLevel("全部");
            setStatus("全部");
          }}
        />
      </div>
      <p role="status" className="my-5 text-xs text-zinc-500">
        {visible.length} 个匹配任务
      </p>
      {visible.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {visible.map((t) => (
            <TaskCard key={t.id} task={t} />
          ))}
        </div>
      ) : (
        <EmptyState title="暂无匹配任务">试试其他技能或重置筛选。</EmptyState>
      )}
    </div>
  );
}
export function ProjectCatalog() {
  const [state, setState] = useState("Active");
  const [query, setQuery] = useState("");
  const visible = communityProjects.filter(
    (p) =>
      (state === "Active"
        ? !["Ideas", "Archived"].includes(effectiveProjectState(p))
        : effectiveProjectState(p) === state) &&
      [p.title, ...p.skills]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <div>
      <div className="grid items-end gap-4 sm:grid-cols-[1fr_240px_auto]">
        <SearchField value={query} onChange={setQuery} label="搜索项目或技能" />
        <label className="text-xs text-zinc-600">
          孵化阶段
          <select
            className="hub-select"
            value={state}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="Active">主列表</option>
            {projectStates.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </label>
        <Reset
          onClick={() => {
            setState("Active");
            setQuery("");
          }}
        />
      </div>
      <p className="my-5 text-xs leading-6 text-zinc-500" role="status">
        {visible.length} 个项目 ·
        主列表要求负责人、仓库、下一里程碑、开放任务和预计投入齐备。
      </p>
      {visible.length ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      ) : (
        <EmptyState title="这个阶段暂无项目">没有已核实的项目记录。</EmptyState>
      )}
    </div>
  );
}
export function ShowcaseCatalog() {
  const [category, setCategory] = useState("全部");
  const [query, setQuery] = useState("");
  const visible = showcases.filter(
    (s) =>
      (category === "全部" || s.categories.includes(category)) &&
      [s.title, s.description, ...s.stack]
        .join(" ")
        .toLowerCase()
        .includes(query.trim().toLowerCase()),
  );
  return (
    <div>
      <div className="grid items-end gap-4 sm:grid-cols-[1fr_240px_auto]">
        <SearchField
          value={query}
          onChange={setQuery}
          label="搜索作品或技术栈"
        />
        <label className="text-xs text-zinc-600">
          作品分类
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="hub-select"
          >
            {["全部", ...showcaseCategories].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <Reset
          onClick={() => {
            setCategory("全部");
            setQuery("");
          }}
        />
      </div>
      <p role="status" className="my-5 text-xs text-zinc-500">
        {visible.length} 件已收录作品
      </p>
      {visible.length ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((s) => (
            <ShowcaseCard key={s.slug} item={s} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="这个方向还没有收录作品"
          href="/contribute"
          action="提交你的作品"
        >
          欢迎带上源码、演示和创作过程。
        </EmptyState>
      )}
    </div>
  );
}
