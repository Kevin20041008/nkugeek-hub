"use client";

import { useMemo, useState } from "react";
import {
  AlertCircle,
  Box,
  Cpu,
  FileCode2,
  FileText,
  UploadCloud,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ViewerKind = "代码" | "PCB" | "CAD" | "文本" | "暂不支持";

interface LoadedFile {
  name: string;
  size: number;
  extension: string;
  kind: ViewerKind;
  text: string;
  isTextPreview: boolean;
}

const codeExtensions = new Set([
  "ts",
  "tsx",
  "js",
  "jsx",
  "py",
  "cpp",
  "c",
  "h",
  "hpp",
  "java",
  "rs",
  "go",
  "sql",
  "md",
  "json",
  "yaml",
  "yml",
  "html",
  "css",
]);

const pcbExtensions = new Set([
  "kicad_pcb",
  "kicad_sch",
  "sch",
  "brd",
  "gbr",
  "gtl",
  "gbl",
  "gts",
  "gbs",
  "drl",
]);

const cadExtensions = new Set([
  "sldprt",
  "sldasm",
  "slddrw",
  "step",
  "stp",
  "stl",
  "obj",
  "gltf",
  "glb",
]);

export function EngineeringFileViewer() {
  const [loadedFile, setLoadedFile] = useState<LoadedFile | null>(null);
  const [error, setError] = useState("");

  async function handleFile(file: File) {
    setError("");
    const extension = getExtension(file.name);
    const kind = classifyFile(extension);

    try {
      const buffer = await file.arrayBuffer();
      const bytes = new Uint8Array(buffer.slice(0, 2 * 1024 * 1024));
      const text = new TextDecoder("utf-8", { fatal: false }).decode(bytes);
      const isTextPreview = isProbablyText(text, extension);

      setLoadedFile({
        name: file.name,
        size: file.size,
        extension,
        kind,
        text: isTextPreview ? text : "",
        isTextPreview,
      });
    } catch {
      setError("文件读取失败，请换一个文件再试。");
    }
  }

  const summary = useMemo(() => {
    if (!loadedFile) {
      return null;
    }

    return buildSummary(loadedFile);
  }, [loadedFile]);

  return (
    <div className="grid gap-6 lg:grid-cols-[360px_1fr]">
      <Card className="h-fit border-zinc-200 bg-white text-zinc-950 shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UploadCloud className="h-5 w-5 text-[#7a1731]" />
            选择文件
          </CardTitle>
          <CardDescription className="leading-7 text-zinc-600">
            第一版在浏览器本地解析，不会上传文件。适合快速查看代码、KiCad/Gerber
            文件摘要和 CAD 文件类型。
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <label className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-[#fbfbfd] p-8 text-center transition hover:border-[#7a1731]/40 hover:bg-[#fffaf6]">
            <UploadCloud className="h-8 w-8 text-[#7a1731]" />
            <span className="mt-3 text-sm font-medium text-zinc-950">选择工程文件</span>
            <span className="mt-1 text-xs leading-5 text-zinc-500">
              支持代码、Markdown、SQL、KiCad、Gerber、STEP、STL、OBJ、SolidWorks 文件识别
            </span>
            <input
              type="file"
              className="sr-only"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  void handleFile(file);
                }
              }}
            />
          </label>

          {error ? (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
              {error}
            </div>
          ) : null}

          <div className="grid gap-3 text-sm">
            <SupportRow icon={FileCode2} title="代码文件" description="直接文本预览、行号和基础语言识别" />
            <SupportRow icon={Cpu} title="PCB 文件" description="KiCad/Gerber 摘要、层和元件信息识别" />
            <SupportRow icon={Box} title="CAD 文件" description="STEP/STL/OBJ 可扩展到 3D；SolidWorks 原生需转换" />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6">
        <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle>文件概览</CardTitle>
                <CardDescription className="mt-2 text-zinc-600">
                  {loadedFile ? loadedFile.name : "选择一个文件后显示类型、大小和解析摘要。"}
                </CardDescription>
              </div>
              {loadedFile ? (
                <Badge variant="secondary" className="bg-[#eef7f4] text-[#245f51]">
                  {loadedFile.kind}
                </Badge>
              ) : null}
            </div>
          </CardHeader>
          <CardContent>
            {loadedFile && summary ? (
              <div className="grid gap-4 md:grid-cols-3">
                {summary.metrics.map((metric) => (
                  <div key={metric.label} className="rounded-lg border border-zinc-200 bg-[#fbfbfd] p-4">
                    <p className="text-xs text-zinc-500">{metric.label}</p>
                    <p className="mt-2 text-2xl font-semibold text-zinc-950">{metric.value}</p>
                  </div>
                ))}
                <div className="rounded-lg border border-zinc-200 bg-[#fbfbfd] p-4 md:col-span-3">
                  <div className="flex items-start gap-3">
                    <summary.icon className="mt-0.5 h-5 w-5 shrink-0 text-[#7a1731]" />
                    <div>
                      <p className="font-medium text-zinc-950">{summary.title}</p>
                      <p className="mt-1 text-sm leading-6 text-zinc-600">{summary.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-zinc-300 bg-[#fbfbfd] p-8 text-center">
                <FileText className="mx-auto h-8 w-8 text-zinc-500" />
                <p className="mt-3 text-sm text-zinc-600">还没有选择文件。</p>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-zinc-200 bg-white text-zinc-950 shadow-sm">
          <CardHeader>
            <CardTitle>内容预览</CardTitle>
            <CardDescription className="text-zinc-600">
              文本类文件显示前 2MB 内容；二进制 CAD 文件先显示识别结果。
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loadedFile?.isTextPreview ? (
              <CodePreview text={loadedFile.text} />
            ) : loadedFile ? (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="mt-0.5 h-5 w-5 text-amber-700" />
                  <div>
                    <p className="font-medium text-amber-950">当前文件需要专用解析器</p>
                    <p className="mt-1 text-sm leading-6 text-amber-800">
                      SolidWorks 原生文件通常需要在服务端转换成 STEP/STL/GLB
                      后再在线预览。这个页面已经预留了接入 3D 渲染器和转换服务的位置。
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-zinc-300 bg-[#fbfbfd] p-8 text-center text-sm text-zinc-600">
                选择文件后显示内容。
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function getExtension(fileName: string) {
  const lower = fileName.toLowerCase();

  if (lower.endsWith(".kicad_pcb")) {
    return "kicad_pcb";
  }

  if (lower.endsWith(".kicad_sch")) {
    return "kicad_sch";
  }

  return lower.split(".").pop() ?? "";
}

function classifyFile(extension: string): ViewerKind {
  if (codeExtensions.has(extension)) {
    return "代码";
  }
  if (pcbExtensions.has(extension)) {
    return "PCB";
  }
  if (cadExtensions.has(extension)) {
    return "CAD";
  }
  if (["txt", "log", "csv"].includes(extension)) {
    return "文本";
  }
  return "暂不支持";
}

function isProbablyText(text: string, extension: string) {
  if (["sldprt", "sldasm", "slddrw", "glb"].includes(extension)) {
    return false;
  }

  const suspicious = text.match(/\u0000/g)?.length ?? 0;
  return suspicious < 8;
}

function buildSummary(file: LoadedFile) {
  const lineCount = file.text ? file.text.split(/\r?\n/).length : 0;
  const size = formatFileSize(file.size);

  if (file.kind === "代码" || file.kind === "文本") {
    return {
      icon: FileCode2,
      title: "代码/文本预览已就绪",
      description: "当前支持本地读取、行号展示和基础格式识别。下一步可以接语法高亮和仓库文件树。",
      metrics: [
        { label: "文件大小", value: size },
        { label: "行数", value: lineCount.toString() },
        { label: "扩展名", value: file.extension || "未知" },
      ],
    };
  }

  if (file.kind === "PCB") {
    const footprints = countMatches(file.text, /\(footprint\b/g);
    const nets = countMatches(file.text, /\(net\b/g);
    const apertures = countMatches(file.text, /%ADD/g);

    return {
      icon: Cpu,
      title: "PCB 文件已识别",
      description:
        "KiCad 文件可继续解析元件、网络和边框；Gerber 文件可继续解析层、光圈和钻孔。第一版先给出摘要。",
      metrics: [
        { label: "文件大小", value: size },
        { label: "元件/光圈", value: String(footprints || apertures || 0) },
        { label: "网络", value: String(nets || 0) },
      ],
    };
  }

  if (file.kind === "CAD") {
    const facets = countMatches(file.text, /facet normal/g);
    const vertices = countMatches(file.text, /^v\s+/gm);
    const stepEntities = countMatches(file.text, /^#\d+=/gm);
    const isSolidWorksNative = ["sldprt", "sldasm", "slddrw"].includes(file.extension);

    return {
      icon: isSolidWorksNative ? AlertCircle : Box,
      title: isSolidWorksNative ? "SolidWorks 原生文件已识别" : "CAD 中间格式已识别",
      description: isSolidWorksNative
        ? "浏览器不能直接可靠渲染 .SLDPRT/.SLDASM。建议服务端转换为 STEP、STL 或 GLB，再用 3D 查看器在线预览。"
        : "STEP/STL/OBJ/GLTF 可以继续接 Three.js 渲染器，实现旋转、缩放、剖面和测量。",
      metrics: [
        { label: "文件大小", value: size },
        { label: "几何记录", value: String(facets || vertices || stepEntities || 0) },
        { label: "格式", value: file.extension.toUpperCase() || "CAD" },
      ],
    };
  }

  return {
    icon: FileText,
    title: "暂不支持该格式",
    description: "可以先作为项目资源归档，后续按社区常用格式补解析器。",
    metrics: [
      { label: "文件大小", value: size },
      { label: "扩展名", value: file.extension || "未知" },
      { label: "预览状态", value: "待接入" },
    ],
  };
}

function countMatches(text: string, pattern: RegExp) {
  if (!text) {
    return 0;
  }

  return text.match(pattern)?.length ?? 0;
}

function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }
  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }
  return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

function SupportRow({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof FileCode2;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3 rounded-lg border border-zinc-200 bg-[#fbfbfd] p-3">
      <Icon className="mt-0.5 h-4 w-4 shrink-0 text-[#7a1731]" />
      <div>
        <p className="font-medium text-zinc-950">{title}</p>
        <p className="mt-1 text-xs leading-5 text-zinc-500">{description}</p>
      </div>
    </div>
  );
}

function CodePreview({ text }: { text: string }) {
  const lines = text.split(/\r?\n/).slice(0, 800);

  return (
    <div className="max-h-[560px] overflow-auto rounded-lg border border-zinc-200 bg-zinc-950 text-sm text-zinc-100">
      <pre className="min-w-full">
        {lines.map((line, index) => (
          <div key={`${index}-${line.slice(0, 12)}`} className="grid grid-cols-[64px_1fr]">
            <span className="select-none border-r border-zinc-800 px-3 py-0.5 text-right text-zinc-500">
              {index + 1}
            </span>
            <code className="whitespace-pre px-3 py-0.5">{line || " "}</code>
          </div>
        ))}
      </pre>
    </div>
  );
}
