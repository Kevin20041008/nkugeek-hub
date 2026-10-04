import snapshot from "./community-snapshot.json";

export const repository = "https://github.com/Kevin20041008/nkugeek-hub";
export const communitySnapshot = snapshot;
export function propose(title: string, body: string) {
  return (
    repository +
    "/issues/new?" +
    new URLSearchParams({ title, body }).toString()
  );
}
export type TaskKind =
  | "Project"
  | "Website"
  | "Paper"
  | "Documentation"
  | "Data"
  | "Design";
export type Task = {
  id: string;
  title: string;
  description: string;
  kind: TaskKind;
  difficulty: "Beginner" | "Intermediate";
  effort: string;
  skills: string[];
  project: string;
  issue?: number;
  outcome: string;
  learn: string;
  paper?: string;
};
export const taskKinds: TaskKind[] = [
  "Project",
  "Website",
  "Paper",
  "Documentation",
  "Data",
  "Design",
];
export const tasks: Task[] = [
  {
    id: "lab-01",
    title: "为输入校验补充边界测试",
    description: "覆盖非法时间与空项目名称，保护分析器的输入边界。",
    kind: "Project",
    difficulty: "Beginner",
    effort: "30–60 min",
    skills: ["Python", "unittest"],
    project: "nkugeek-hub",
    issue: 1,
    outcome: "新测试 + 运行结果，现有测试保持通过",
    learn: "/learn/python-engineering/data-validation",
  },
  {
    id: "lab-02",
    title: "增加按日期汇总函数",
    description: "把学习记录按日期聚合，补齐重复日期和空输入测试。",
    kind: "Project",
    difficulty: "Beginner",
    effort: "1–2 h",
    skills: ["Python", "CSV"],
    project: "nkugeek-hub",
    issue: 2,
    outcome: "独立函数 + 测试 + 示例输出",
    learn: "/learn/python-engineering/csv-pipeline",
  },
  {
    id: "lab-03",
    title: "为命令行增加项目筛选参数",
    description: "让 Study Report 只汇总指定项目的学习记录。",
    kind: "Project",
    difficulty: "Beginner",
    effort: "1–2 h",
    skills: ["Python", "CLI"],
    project: "nkugeek-hub",
    issue: 3,
    outcome: "CLI 参数 + 帮助文案 + 回归测试",
    learn: "/learn/python-engineering/command-line",
  },
  {
    id: "lab-04",
    title: "补充命令行可移植性回归测试",
    description: "验证跨平台路径、退出码和标准流行为。",
    kind: "Project",
    difficulty: "Beginner",
    effort: "1–2 h",
    skills: ["Python", "Testing"],
    project: "nkugeek-hub",
    issue: 4,
    outcome: "Windows / Linux 测试记录",
    learn: "/learn/python-engineering/regression-and-pr",
  },
  {
    id: "web-a11y",
    title: "补充键盘导航自动化检查",
    description: "为任务筛选和移动导航补充焦点顺序与键盘回归测试。",
    kind: "Website",
    difficulty: "Intermediate",
    effort: "2–4 h",
    skills: ["React", "Playwright"],
    project: "nkugeek-hub",
    outcome: "测试用例 + 可访问性检查记录",
    learn: "/learn/foundations#web",
  },
  {
    id: "resnet-baseline",
    title: "提交 ResNet 小规模复现计划",
    description:
      "先约定数据划分、算力预算和评估协议，不将小规模实验冒充原论文指标。",
    kind: "Paper",
    difficulty: "Intermediate",
    effort: "4–8 h（计划）",
    skills: ["PyTorch", "CV"],
    project: "paper-reproduction-lab",
    outcome: "实验方案 + 环境清单 + 预算；通过讨论后再运行",
    learn: "/learn/foundations#pytorch",
    paper: "resnet",
  },
  {
    id: "lab-docs",
    title: "记录 Python 实验的 Linux 环境排错",
    description:
      "在实际 Linux 环境验证 venv 与课程命令，记录可重复的失败和修复。",
    kind: "Documentation",
    difficulty: "Beginner",
    effort: "1–2 h",
    skills: ["Markdown", "Linux"],
    project: "nkugeek-hub",
    outcome: "系统版本 + 命令 + 原始输出 + 修复说明",
    learn: "/learn/python-engineering",
  },
  {
    id: "paper-data",
    title: "核验论文数据集的许可与获取方式",
    description: "从目录中任选三篇，区分代码许可、权重许可与数据使用条款。",
    kind: "Data",
    difficulty: "Beginner",
    effort: "1–2 h",
    skills: ["Data", "Markdown"],
    project: "paper-reproduction-lab",
    outcome: "三份来源链接、访问日期与许可核验记录",
    learn: "/learn/foundations#paper",
  },
  {
    id: "showcase-design",
    title: "制定作品截图的可访问性规范",
    description: "为成果页提出真实截图、替代文本与移动端裁切验收规范。",
    kind: "Design",
    difficulty: "Beginner",
    effort: "1–2 h",
    skills: ["Design", "Accessibility"],
    project: "nkugeek-hub",
    outcome: "规范文档 + 一组有授权来源的对比样例",
    learn: "/contribute",
  },
];
export function taskIssue(task: Task) {
  return snapshot.issues.find((issue) => issue.number === task.issue);
}
export function taskStatus(task: Task) {
  const issue = taskIssue(task);
  if (!issue) return "提案";
  if (issue.state === "closed") return "已关闭";
  return issue.assignees.length ? "已认领" : "待认领";
}
export function taskUrl(task: Task) {
  return (
    taskIssue(task)?.url ??
    propose(
      "[任务提案] " + task.title,
      "## 范围\n" +
        task.description +
        "\n\n## 验收产出\n" +
        task.outcome +
        "\n\n## 我的计划\n请补充预计时间、实现方案与所需帮助。",
    )
  );
}
export const projectStates = [
  "Ideas",
  "Recruiting",
  "Building",
  "Released",
  "Archived",
] as const;
export type ProjectState = (typeof projectStates)[number];
export type CommunityProject = {
  slug: string;
  title: string;
  description: string;
  state: ProjectState;
  owner?: string;
  repo?: string;
  milestone?: string;
  effort?: string;
  skills: string[];
  learn: string;
  papers: string[];
  showcase?: string;
};
export const communityProjects: CommunityProject[] = [
  {
    slug: "nkugeek-hub",
    title: "NKUGeek Hub",
    description: "以课程、公开任务和论文复现连接南开学生的开源社区。",
    state: "Building",
    owner: "Kevin20041008",
    repo: repository,
    milestone: "完成首批 Geek Lab 扩展任务的贡献与验收",
    effort: "每周 2–4 小时（建议）",
    skills: ["Next.js", "TypeScript", "Python"],
    learn: "/learn/foundations#web",
    papers: [],
    showcase: "nkugeek-hub",
  },
  {
    slug: "campus-ai-assistant",
    title: "校园信息 AI 助手",
    description:
      "只使用许可明确的公开资料，探索校园信息检索与问答。尚无已确认的负责人和仓库。",
    state: "Ideas",
    skills: ["Python", "RAG"],
    learn: "/learn/python-engineering",
    papers: ["rag"],
  },
  {
    slug: "training-reminder-extension",
    title: "训练任务完成提醒插件",
    description:
      "探索训练进程结束或异常后的本地提醒。尚无可验证的实现与开发计划。",
    state: "Ideas",
    skills: ["TypeScript", "Python"],
    learn: "/learn/foundations#web",
    papers: [],
  },
  {
    slug: "paper-reproduction-lab",
    title: "论文复现开放计划",
    description:
      "从一篇论文、一份协议和一组可核验的实验日志开始。当前仅有目录与提案，尚未组成团队。",
    state: "Ideas",
    skills: ["PyTorch", "实验管理"],
    learn: "/learn/foundations#pytorch",
    papers: ["resnet", "dino"],
  },
];
export function projectReady(project: CommunityProject) {
  return Boolean(
    project.owner &&
      project.repo &&
      project.milestone &&
      project.effort &&
      tasks.some(
        (task) =>
          task.project === project.slug && taskIssue(task)?.state === "open",
      ),
  );
}
export function effectiveProjectState(project: CommunityProject): ProjectState {
  // Incomplete submissions stay in Ideas; archived work remains explicitly archived.
  return project.state === "Archived"
    ? "Archived"
    : projectReady(project)
      ? project.state
      : "Ideas";
}
export const showcaseCategories = [
  "Open Source",
  "AI",
  "Web",
  "Games",
  "Robotics",
  "Research",
  "Tools",
] as const;
export type Showcase = {
  slug: string;
  title: string;
  description: string;
  categories: string[];
  repo: string;
  demo?: string;
  contributor: string;
  stack: string[];
  story: string;
  source: string;
  external: boolean;
  project?: string;
  image?: string;
  imageAlt?: string;
};
export const showcases: Showcase[] = [
  {
    slug: "nkugeek-hub",
    title: "NKUGeek Hub",
    description: "从可运行的 Python 实验，到一次真实的开源贡献。",
    categories: ["Open Source", "Web"],
    repo: repository,
    demo: "https://kevin20041008.github.io/nkugeek-hub/",
    contributor: "Kevin20041008（仓库维护者）",
    stack: ["Next.js", "TypeScript", "Python"],
    story:
      "已公开 Python 工程实践课程、课程测试与论文目录。课程扩展任务通过 GitHub Issue 协作；尚无已收录的外部复现报告。",
    source: repository + "/commit/abe7c4ccc1840a0c8f05ba50b9b82ec5b71e4e7d",
    external: false,
    project: "nkugeek-hub",
    image: "/geek-lab-preview.png",
    imageAlt: "NKUGeek Hub 的 Python 工程实践课程、示例代码与测试入口",
  },
  {
    slug: "nku-operating-systems",
    title: "南开操作系统课程实验记录",
    description: "公开的课程实验代码、报告与知识笔记。",
    categories: ["Open Source", "Tools"],
    repo: "https://github.com/NKU-yxy/NKU_2025_Autumn_Operating_System_OS",
    contributor: "NKU-yxy（仓库作者）",
    stack: ["操作系统", "实验报告"],
    story:
      "作者整理的 2025 秋季操作系统学习资料。收录其公开仓库入口，供自主学习与实验对照；请遵守课程学术诚信要求，不直接代交作业。",
    source:
      "https://github.com/NKU-yxy/NKU_2025_Autumn_Operating_System_OS#readme",
    external: true,
  },
  {
    slug: "nkuwiki",
    title: "Nkuwiki 微信小程序",
    description: "面向校园知识交流的微信小程序前端。",
    categories: ["Open Source", "Web"],
    repo: "https://github.com/nkuwiki-weapp/Nkuwiki",
    contributor: "nkuwiki-weapp（原仓库团队）",
    stack: ["JavaScript", "微信小程序"],
    story:
      "原仓库介绍了校园问答、资源分享和社区互动。此处仅收录已公开的源码项目，不代表 NKUGeek 参与维护，也不表示线上服务已验证可用。",
    source: "https://github.com/nkuwiki-weapp/Nkuwiki#readme",
    external: true,
  },
];
export const failures = [
  {
    id: "font-cycle",
    title: "Tailwind 字体变量自引用导致字体回退",
    environment: "Next.js 16 / Tailwind CSS 4 / Windows 浏览器",
    problem: "页面英文字体回退，排版宽度与预期不一致。",
    cause: "--font-sans 间接引用自身，无法形成有效字体列表。",
    solution: "在 @theme 中定义明确的系统字体栈；中英文与等宽字体分别配置。",
    verification:
      "检查 computed font-family，并在 320px / 390px / 桌面宽度检查换行。",
    source: repository + "/commit/4690a455f3574a3c1cc0a78fe796ab2c1c46d2cd",
    learn: "/learn/foundations#web",
  },
  {
    id: "python-encoding",
    title: "Python 子进程跨平台文本编码不一致",
    environment: "Python 3.11+ / Windows 与 Linux / unittest",
    problem: "包含非 ASCII 项目名称时，命令行测试可能受系统默认编码影响。",
    cause: "父进程与子进程默认文本编码不一定相同。",
    solution:
      "课程测试显式指定 UTF-8 文本解码，并通过 -X utf8 约定子进程输出编码。",
    verification:
      "运行课程 test_lab03.py，并在 Windows / Linux 的 CI 矩阵复核。",
    source:
      repository +
      "/blob/abe7c4ccc1840a0c8f05ba50b9b82ec5b71e4e7d/public/labs/python-engineering/test_lab03.py",
    learn: "/learn/python-engineering/regression-and-pr",
  },
];
export type ArchivedEvent = {
  id: string;
  title: string;
  date: string;
  source: string;
  slides: string | null;
  video: string | null;
  repo: string | null;
  notes: string | null;
  participants: { label: string; url: string }[];
  outcomes: { label: string; url: string }[];
};
export const archivedEvents: ArchivedEvent[] = [];
