"use client";

import { useState } from "react";
import { CodeBlock } from "@/components/lab/code-block";

export function EnvironmentSetup({ run, test }: { run: string; test: string }) {
  const [platform, setPlatform] = useState("windows");
  const windows = platform === "windows";
  const python = windows ? ".\\.venv\\Scripts\\python.exe" : "./.venv/bin/python";
  const systemPython = windows ? "py -3" : "python3";
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm leading-6 text-zinc-600">Python 3.11+ · 仅标准库 · 在本机终端运行</p>
        <label className="flex flex-wrap items-center gap-2 text-sm text-zinc-700">
          操作系统
          <select value={platform} onChange={(event) => setPlatform(event.target.value)} className="h-9 max-w-full rounded-md border border-zinc-300 bg-white px-3">
            <option value="windows">Windows / PowerShell</option>
            <option value="mac">macOS / Terminal</option>
            <option value="linux">Linux / Bash</option>
          </select>
        </label>
      </div>
      <p className="text-sm leading-7 text-zinc-600">下载并解压课程包，打开其中的 python-engineering 目录。以下命令均在包含 lab01.py 的目录执行。首次学习时创建环境，后续实验复用同一个 .venv。</p>
      <CodeBlock label="首次配置" code={systemPython + " --version\n" + systemPython + " -m venv .venv\n" + python + " --version"} />
      <CodeBlock label="运行实验" code={python + " -X utf8 " + run} />
      <CodeBlock label="运行测试" code={python + " -X utf8 " + test} />
      {platform === "linux" ? <p className="text-sm leading-6 text-zinc-600">若创建虚拟环境提示缺少 ensurepip / venv，请安装发行版提供的 Python venv 包后重试。</p> : null}
    </div>
  );
}
