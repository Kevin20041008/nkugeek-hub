"use client";

import { useState } from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";

const privacyItems = [
  {
    key: "realName",
    label: "公开真实姓名",
    description: "关闭后，成员页优先显示昵称。",
    preview: "真实姓名：李佳明",
  },
  {
    key: "college",
    label: "公开学院与年级",
    description: "关闭后，只展示技术方向和贡献记录。",
    preview: "学院年级：人工智能学院 · 本科生",
  },
  {
    key: "contact",
    label: "公开联系方式",
    description: "建议默认关闭，通过项目申请后再交换联系方式。",
    preview: "联系方式：nkugeek@example.com",
  },
  {
    key: "applications",
    label: "开放项目申请邀请",
    description: "开启后，项目负责人可以邀请你加入候选名单。",
    preview: "项目邀请：开放",
  },
] as const;

type PrivacyKey = (typeof privacyItems)[number]["key"];

export function MemberPrivacySettings() {
  const [settings, setSettings] = useState<Record<PrivacyKey, boolean>>({
    realName: false,
    college: true,
    contact: false,
    applications: true,
  });

  function toggle(key: PrivacyKey) {
    setSettings((current) => ({ ...current, [key]: !current[key] }));
  }

  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-[#7a1731]" />
            <h2 className="text-xl font-semibold text-zinc-950">成员隐私设置</h2>
          </div>
          <p className="mt-2 max-w-2xl text-sm leading-7 text-zinc-600">
            高校社区需要明确展示边界。第一版默认隐藏真实姓名和联系方式，只公开必要的协作信息。
          </p>
        </div>
        <Badge variant="secondary" className="w-fit bg-[#eef7f4] text-[#245f51]">
          本地原型
        </Badge>
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {privacyItems.map((item) => {
          const enabled = settings[item.key];

          return (
            <label
              key={item.key}
              className="flex cursor-pointer items-start justify-between gap-4 rounded-lg border border-zinc-200 bg-[#fbfbfd] p-4"
            >
              <div>
                <p className="font-medium text-zinc-950">{item.label}</p>
                <p className="mt-1 text-sm leading-6 text-zinc-600">{item.description}</p>
              </div>
              <input
                type="checkbox"
                checked={enabled}
                onChange={() => toggle(item.key)}
                className="mt-1 h-4 w-4 accent-[#7a1731]"
                aria-label={item.label}
              />
            </label>
          );
        })}
      </div>

      <div className="mt-5 rounded-lg border border-zinc-200 bg-[#fbfbfd] p-4">
        <p className="mb-3 text-sm font-medium text-zinc-950">公开预览</p>
        <div className="grid gap-2 text-sm text-zinc-600">
          {privacyItems.map((item) => {
            const enabled = settings[item.key];
            const Icon = enabled ? Eye : EyeOff;

            return (
              <div key={item.key} className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-zinc-500" />
                <span>{enabled ? item.preview : `${item.label.replace("公开", "")}：不公开`}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
