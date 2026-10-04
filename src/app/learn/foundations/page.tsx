import type { Metadata } from "next";
import Link from "next/link";
import {
  PageIntro,
  NextSteps,
  Status,
} from "@/components/community/primitives";
export const metadata: Metadata = { title: "前置学习与产出 · Learn" };
const tracks = [
  {
    id: "git",
    title: "Git Track",
    prerequisite: "能在本地编辑文件与运行终端命令。",
    goal: "提交自己的第一个 PR",
    url: "https://docs.github.com/en/get-started/using-github/hello-world",
    source: "GitHub 官方 Hello World",
    steps: [
      "完成仓库、分支、提交与 Pull Request 的官方练习。",
      "运行 NKUGeek Hub 或 Python 课程测试，选择一个开放 Issue。",
      "与维护者确认范围，提交带测试结果的 PR。",
    ],
    checks: [
      "PR 链接、关联 Issue、测试输出齐备。",
      "区分已提交与已合并，不自行标记贡献已完成。",
    ],
    next: "/tasks",
    nextLabel: "选择真实任务",
  },
  {
    id: "web",
    title: "Web Track",
    prerequisite: "JavaScript 基础；了解 HTML 与 CSS。",
    goal: "发布一个可访问的网页",
    url: "https://nextjs.org/learn",
    source: "Next.js 官方 Learn",
    steps: [
      "按官方课程完成 React 基础和 Next.js 路由练习。",
      "在 NKUGeek Hub 本地运行 lint、build 与 smoke 测试。",
      "选择一处有明确验收的修改，记录桌面与移动端结果。",
    ],
    checks: [
      "附页面链接或本地运行说明、源码与截图。",
      "静态部署不使用需要服务端的功能，核对 basePath。",
    ],
    next: "/projects/nkugeek-hub",
    nextLabel: "参与 NKUGeek Hub",
  },
  {
    id: "pytorch",
    title: "PyTorch Track",
    prerequisite:
      "Python 函数、类与数组运算；不熟悉工程化可先完成 Python 课程。",
    goal: "训练并保存一个小模型",
    url: "https://docs.pytorch.org/tutorials/beginner/basics/intro.html",
    source: "PyTorch 官方 Learn the Basics",
    steps: [
      "使用官方入门教程的小数据任务，先在 CPU 上跑通数据与模型。",
      "完成一次训练与评估，记录依赖版本、种子和损失变化。",
      "保存并重新加载权重，验证同一测试输入的输出。",
    ],
    checks: [
      "提供训练脚本、环境与实际日志，不编造准确率。",
      "入门分类模型不是 ResNet 原论文复现；迁移时另立评估协议。",
    ],
    next: "/papers/resnet",
    nextLabel: "下一步：参加 ResNet 复现计划",
  },
  {
    id: "vit",
    title: "ViT Track",
    prerequisite: "先完成 PyTorch Track；理解张量维度与分类评估。",
    goal: "交付一个 ViT 推理脚本与结构笔记",
    url: "https://huggingface.co/docs/transformers/model_doc/vit",
    source: "Hugging Face 官方 ViT 文档",
    steps: [
      "阅读 ViT 结构与图像预处理说明，标出 patch、token 与分类头。",
      "使用文档中的权重推理示例；记录模型版本、输入与预处理参数。",
      "解释监督 ViT 与 DINO 自监督训练的区别，提出最小评估范围。",
    ],
    checks: [
      "脚本可重复运行，说明权重来源和许可。",
      "不把预训练推理等同于从头训练或 DINO 复现。",
    ],
    next: "/papers/dino",
    nextLabel: "下一步：阅读 DINO 与复现边界",
  },
  {
    id: "paper",
    title: "Paper Track",
    prerequisite: "能运行作者代码，理解选定论文的任务与评价指标。",
    goal: "完成一份 reproduction report",
    url: "https://github.com/Kevin20041008/nkugeek-hub/blob/main/docs/research/paper-catalog.md",
    source: "社区论文收录与复现规范",
    steps: [
      "选论文与具体表格，确认数据、代码和权重许可。",
      "冻结代码 commit、依赖、种子与评估划分，先做最小检查。",
      "实际运行后记录日志、指标和偏差；失败同样保留环境与修复。",
    ],
    checks: [
      "报告附源码、命令、日志、硬件与原文表格定位。",
      "尚未运行的实验只标计划，结果经过核验后才进入 Showcase。",
    ],
    next: "/projects/paper-reproduction-lab",
    nextLabel: "提出一个科研里程碑",
  },
];
export default function FoundationsPage() {
  return (
    <main className="bg-white">
      <PageIntro eyebrow="LEARN / FOUNDATIONS" title="带着产出去学习">
        这些是官方资源导学与验收清单，不是已完成的站内实验课程。完整可运行课程目前为
        Python 工程实践。
      </PageIntro>
      <div className="hub-container py-8">
        <nav
          aria-label="基础学习路径"
          className="mb-6 flex flex-wrap gap-5 text-sm"
        >
          {tracks.map((t) => (
            <a href={"#" + t.id} key={t.id} className="hub-link">
              {t.title}
            </a>
          ))}
        </nav>
        {tracks.map((t) => (
          <section
            id={t.id}
            key={t.id}
            className="scroll-mt-24 border-t border-zinc-200 py-8"
          >
            <Status>官方资源导学</Status>
            <h2 className="mt-3 text-2xl font-semibold">{t.title}</h2>
            <p className="mt-3 font-medium text-[#28705b]">
              最终产出：{t.goal}
            </p>
            <p className="mt-3 text-sm leading-7 text-zinc-500">
              前置：{t.prerequisite}
            </p>
            <div className="mt-6 grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold">实践顺序</h3>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-7 text-zinc-600">
                  {t.steps.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ol>
                <a
                  href={t.url}
                  target="_blank"
                  rel="noreferrer"
                  className="hub-link mt-4 text-sm"
                >
                  {t.source}
                </a>
              </div>
              <div>
                <h3 className="text-sm font-semibold">产出验收</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-600">
                  {t.checks.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
                <Link href={t.next} className="hub-link mt-4 text-sm">
                  {t.nextLabel}
                </Link>
              </div>
            </div>
          </section>
        ))}
        <NextSteps
          items={[
            {
              label: "先完成 Python 工程实践",
              href: "/learn/python-engineering",
              description: "完整代码、环境、测试与贡献任务。",
            },
            {
              label: "把失败记入档案",
              href: "/failures",
              description: "问题、环境、原因、修复与验证。",
            },
            {
              label: "形成作品后提交 Showcase",
              href: "/showcase",
              description: "留下真实的 Demo、仓库和故事。",
            },
          ]}
        />
      </div>
    </main>
  );
}
