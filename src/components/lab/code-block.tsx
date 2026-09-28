"use client";

import { Check, Copy, Download } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function CodeBlock({ code, label, download }: { code: string; label: string; download?: string }) {
  const [message, setMessage] = useState("");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setMessage("已复制");
    } catch { setMessage("复制失败，请选中代码复制"); }
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMessage(""), 2500);
  }
  return (
    <div className="min-w-0 overflow-hidden rounded-lg border border-zinc-200">
      <div className="flex min-h-11 flex-wrap items-center justify-between gap-2 border-b border-zinc-200 bg-zinc-50 px-3 py-1">
        <span className="break-all font-mono text-xs text-zinc-600">{label}</span>
        <div className="flex shrink-0 items-center gap-1">
          <span aria-live="polite" className="text-xs text-zinc-600">{message}</span>
          {download ? <a href={download} download title="下载文件" aria-label={"下载 " + label} className="rounded p-2 text-zinc-600 hover:bg-zinc-200"><Download className="h-4 w-4" /></a> : null}
          <button type="button" onClick={copy} title="复制代码" aria-label={"复制 " + label} className="rounded p-2 text-zinc-600 hover:bg-zinc-200">
            {message === "已复制" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>
      <pre tabIndex={0} aria-label={label} className="max-h-[34rem] overflow-auto bg-white p-4 font-mono text-[13px] leading-6 text-zinc-800"><code>{code}</code></pre>
    </div>
  );
}
