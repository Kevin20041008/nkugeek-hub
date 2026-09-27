export const learningPaths = [
  {
    slug: "open-source-foundation",
    code: "PATH 00",
    title: "开源协作入门",
    level: "零基础",
    duration: "1-2 周",
    description:
      "从本地运行项目开始，完成一次 Issue 认领、分支开发、测试和 Pull Request。",
    outcome: "向 NKUGeek Hub 提交第一个可合并的 PR",
    skills: ["Git", "GitHub", "Issue", "Pull Request"],
    stages: [
      { id: "00", title: "运行项目", task: "完成环境配置并启动开发服务器", output: "运行截图与环境记录" },
      { id: "01", title: "阅读代码", task: "沿页面路由定位组件与数据来源", output: "一份源码导航笔记" },
      { id: "02", title: "认领任务", task: "选择 good first issue 并说明实现思路", output: "已认领的 GitHub Issue" },
      { id: "03", title: "提交贡献", task: "完成修改、测试和 PR 描述", output: "一个通过检查的 Pull Request" },
    ],
  },
  {
    slug: "ai-reproduction",
    code: "PATH 01",
    title: "AI 论文复现",
    level: "进阶",
    duration: "4-6 周",
    description:
      "围绕公开论文走完数据、环境、基线、指标、实验记录和复现报告的完整流程。",
    outcome: "发布一个可重复运行的论文复现仓库",
    skills: ["Python", "PyTorch", "实验管理", "技术写作"],
    stages: [
      { id: "00", title: "选择论文", task: "明确论文、代码与数据许可", output: "复现任务卡" },
      { id: "01", title: "建立基线", task: "固定环境、数据划分与随机种子", output: "可运行基线" },
      { id: "02", title: "追踪实验", task: "记录参数、日志、异常与指标", output: "结构化实验日志" },
      { id: "03", title: "发布报告", task: "对比原文指标并解释差异", output: "复现报告与 Demo" },
    ],
  },
  {
    slug: "hardware-prototyping",
    code: "PATH 02",
    title: "智能硬件原型",
    level: "进阶",
    duration: "4-8 周",
    description:
      "把原理图、PCB、固件、结构件和调试记录组织成能够复刻的工程项目。",
    outcome: "发布一套包含代码、板卡和结构文件的开放原型",
    skills: ["嵌入式", "KiCad", "CAD", "工程文档"],
    stages: [
      { id: "00", title: "定义接口", task: "确定功能边界、器件与接口", output: "需求与接口文档" },
      { id: "01", title: "设计硬件", task: "完成原理图、PCB 与设计检查", output: "Gerber 与 BOM" },
      { id: "02", title: "联调固件", task: "实现最小固件并记录调试过程", output: "固件与测试日志" },
      { id: "03", title: "开放复刻", task: "整理结构文件、装配和验证步骤", output: "可复刻版本发布" },
    ],
  },
] as const;

export const openChallenges = [
  {
    id: "#01",
    title: "为学习路线补充 Windows 环境检查脚本",
    project: "NKUGeek Hub",
    level: "good first issue",
    type: "工程工具",
    estimate: "2-4 小时",
    output: "脚本 + 使用说明",
    status: "待认领",
  },
  {
    id: "#02",
    title: "实现项目资产的代码 Diff 双栏视图",
    project: "NKUGeek Hub",
    level: "help wanted",
    type: "前端",
    estimate: "1-2 天",
    output: "组件 + Smoke 测试",
    status: "待认领",
  },
  {
    id: "#03",
    title: "建立论文复现实验目录模板",
    project: "论文复现开放计划",
    level: "good first issue",
    type: "科研工程",
    estimate: "4-6 小时",
    output: "模板仓库 + 示例实验",
    status: "讨论中",
  },
  {
    id: "#04",
    title: "调研 KiCad PCB Web 预览方案",
    project: "工程资料库",
    level: "research",
    type: "智能硬件",
    estimate: "1 周",
    output: "技术调研 + 最小原型",
    status: "待认领",
  },
] as const;

export const contributionSteps = [
  {
    step: "01",
    title: "选一条路线",
    description: "根据基础和兴趣选择学习路线，先完成能够独立验证的最小章节。",
  },
  {
    step: "02",
    title: "运行真实项目",
    description: "阅读仓库文档，在本地或 Web IDE 跑通代码、测试和示例。",
  },
  {
    step: "03",
    title: "认领开放任务",
    description: "在 Issue 中说明方案和预计时间，与维护者确认边界后开始实现。",
  },
  {
    step: "04",
    title: "提交并沉淀",
    description: "通过 Pull Request 合并代码，同时留下文档、实验日志或工程资料。",
  },
] as const;

export const communityRoles = [
  { role: "Learner", description: "按路线学习并完成章节任务" },
  { role: "Contributor", description: "至少有一个贡献被项目合并" },
  { role: "Maintainer", description: "维护仓库、路线、Issue 与版本发布" },
  { role: "Mentor", description: "设计任务并帮助贡献者完成实践" },
] as const;
