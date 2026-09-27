export const platformStats = [
  { value: "120+", label: "目标成员" },
  { value: "16", label: "种技术方向" },
  { value: "12", label: "首批项目" },
  { value: "8", label: "MVP 核心功能" },
];

export const coreModules = [
  {
    key: "community",
    title: "技术交流 Geek Community",
    href: "/community",
    description:
      "发布技术文章、沉淀学习路线、组织兴趣小组，并用问答机制把踩坑记录变成可复用的社区知识。",
    highlights: ["Markdown 文章", "技术问答", "兴趣小组", "学习路线"],
    metric: "42 篇内容待沉淀",
  },
  {
    key: "projects",
    title: "项目实践 Geek Projects",
    href: "/projects",
    description:
      "创建真实项目、发布招募岗位、跟踪任务进度、同步 GitHub 数据，让成员在开源协作中积累作品。",
    highlights: ["项目广场", "岗位招募", "任务看板", "Demo 展示"],
    metric: "12 个项目候选",
  },
  {
    key: "research",
    title: "科研竞赛 Geek Research",
    href: "/research",
    description:
      "聚合竞赛、论文共读、论文复现和科研合作机会，帮助同学找到方向相近的队友与实验伙伴。",
    highlights: ["竞赛组队", "论文共读", "论文复现", "科研招募"],
    metric: "18 个机会池",
  },
] as const;

export const mvpFeatures = [
  "公开学习路线",
  "开放项目仓库",
  "Issue 任务认领",
  "Pull Request 协作",
  "论文复现流水线",
  "工程资料预览",
  "活动与分享记录",
  "贡献者成长路径",
];

export const projects = [
  {
    slug: "nkugeek-hub",
    title: "NKUGeek Hub",
    category: "Web 平台",
    status: "MVP 开发中",
    phase: "阶段一",
    difficulty: "中等",
    members: 5,
    owner: "NKUGeek Core",
    github: "github.com/NKUGeek/nkugeek-hub",
    description:
      "面向南开大学技术社区的协作平台，覆盖内容发布、项目招募、活动报名和成员成长记录。",
    impact: "作为社区第一个大型开源项目，沉淀产品、前端、内容架构和开放协作经验。",
    skills: ["Next.js", "TypeScript", "GitHub", "Open Source"],
    roles: ["前端开发 2人", "后端开发 1人", "UI 设计 1人", "内容运营 1人"],
    tasks: [
      { title: "完成首页信息架构", owner: "产品负责人", status: "已完成" },
      { title: "梳理静态内容模型", owner: "前端开发", status: "进行中" },
      { title: "设计开放贡献流程", owner: "前端开发", status: "待合并" },
      { title: "准备活动报名原型", owner: "运营", status: "待处理" },
    ],
    updates: ["完成平台定位", "上线学习路线", "改为 GitHub 开放协作模式"],
  },
  {
    slug: "campus-ai-assistant",
    title: "校园信息 AI 助手",
    category: "人工智能",
    status: "招募中",
    phase: "筹备期",
    difficulty: "较高",
    members: 3,
    owner: "AI 与大模型组",
    github: "github.com/NKUGeek/campus-ai-assistant",
    description:
      "基于校园公开信息构建问答、办事入口推荐和课程资源检索服务，探索社区知识库 RAG。",
    impact: "验证校园垂直场景中的 AI 产品设计、数据治理和可解释检索能力。",
    skills: ["Python", "PyTorch", "RAG", "Prompt Engineering"],
    roles: ["RAG 算法 2人", "数据处理 1人", "后端开发 1人"],
    tasks: [
      { title: "收集公开资料目录", owner: "数据处理", status: "进行中" },
      { title: "搭建检索评测集", owner: "算法开发", status: "待处理" },
      { title: "设计问答演示页", owner: "前端开发", status: "待处理" },
    ],
    updates: ["确定公开数据边界", "准备第一版知识库索引"],
  },
  {
    slug: "training-reminder-extension",
    title: "训练任务完成提醒插件",
    category: "开发工具",
    status: "开发中",
    phase: "原型期",
    difficulty: "中等",
    members: 2,
    owner: "开源软件组",
    github: "github.com/NKUGeek/training-reminder",
    description:
      "检测终端训练任务状态，通过桌面通知、声音和远程消息提醒机器学习任务完成或异常退出。",
    impact: "解决科研训练过程中的等待成本，适合作为轻量级开源工具发布。",
    skills: ["TypeScript", "VS Code API", "Python", "Electron"],
    roles: ["VS Code 插件 1人", "桌面端开发 1人", "测试 1人"],
    tasks: [
      { title: "定义任务检测协议", owner: "插件开发", status: "进行中" },
      { title: "实现本地通知", owner: "桌面端", status: "待处理" },
      { title: "补充 README 示例", owner: "测试", status: "待处理" },
    ],
    updates: ["完成需求拆解", "正在验证 VS Code 扩展 API"],
  },
  {
    slug: "paper-reproduction-lab",
    title: "论文复现开放计划",
    category: "科研实践",
    status: "长期开放",
    phase: "规划期",
    difficulty: "较高",
    members: 8,
    owner: "论文共读组",
    github: "github.com/NKUGeek/reproduction-lab",
    description:
      "围绕计算机视觉、强化学习和大模型论文建立可复现实验空间，统一记录环境、指标和实验日志。",
    impact: "把论文阅读、实验复现、代码开源和分享会连接成持续产出的科研训练流程。",
    skills: ["PyTorch", "实验管理", "论文写作", "可复现研究"],
    roles: ["算法复现 2人", "实验分析 2人", "技术写作 1人"],
    tasks: [
      { title: "选择首批复现论文", owner: "论文共读组", status: "进行中" },
      { title: "整理实验模板", owner: "算法复现", status: "待处理" },
      { title: "建立指标对比表", owner: "实验分析", status: "待处理" },
    ],
    updates: ["整理候选论文列表", "确定复现实验模板字段"],
  },
];

export const articles = [
  {
    title: "从零开始构建一个可复现的人工智能科研项目",
    category: "科研经验",
    author: "李佳明",
    date: "2026-07-25",
    readingTime: "8 分钟",
    views: 128,
    description:
      "从选题、数据准备、基线模型、实验设计和结果整理五个环节拆解科研项目的基础流程。",
    tags: ["科研入门", "实验记录", "AI"],
  },
  {
    title: "使用 Next.js 与 GitHub 构建高校开源学习社区",
    category: "系统开发",
    author: "NKUGeek Team",
    date: "2026-07-24",
    readingTime: "12 分钟",
    views: 96,
    description:
      "记录 NKUGeek Hub 的技术选型、页面规划、仓库结构与开放协作方案。",
    tags: ["Next.js", "GitHub", "产品设计"],
  },
  {
    title: "Kaggle 竞赛从基线模型到奖牌方案",
    category: "竞赛经验",
    author: "竞赛小组",
    date: "2026-07-22",
    readingTime: "10 分钟",
    views: 176,
    description:
      "梳理数据审计、交叉验证、特征工程、模型集成和提交管理的完整竞赛流程。",
    tags: ["Kaggle", "PyTorch", "数据分析"],
  },
  {
    title: "论文复现过程中最容易被忽略的五个问题",
    category: "论文复现",
    author: "论文共读组",
    date: "2026-07-20",
    readingTime: "7 分钟",
    views: 84,
    description:
      "从随机种子、数据划分、环境版本、评价指标和实验日志五个方面提升复现可信度。",
    tags: ["论文", "复现", "实验"],
  },
];

export const questions = [
  {
    title: "如何设计适合新贡献者的 good first issue？",
    tags: ["GitHub", "Issue", "开源协作"],
    answers: 4,
    votes: 18,
    status: "已解决",
  },
  {
    title: "论文复现实验中随机种子固定后结果仍然波动怎么办？",
    tags: ["PyTorch", "论文复现", "实验"],
    answers: 6,
    votes: 25,
    status: "待采纳",
  },
  {
    title: "Next.js App Router 下如何组织版本化 Markdown 文档？",
    tags: ["Next.js", "Markdown", "开源文档"],
    answers: 3,
    votes: 12,
    status: "讨论中",
  },
];

export const researchItems = [
  {
    type: "竞赛组队",
    title: "Kaggle 生物图像追踪竞赛",
    deadline: "长期招募",
    members: "已有 2 人",
    description:
      "围绕细胞追踪、时序建模与实例分割开展协作，目标完成高质量竞赛方案。",
    skills: ["PyTorch", "计算机视觉", "数据分析"],
  },
  {
    type: "论文共读",
    title: "多模态鲁棒感知论文共读小组",
    deadline: "每周六",
    members: "计划 8 人",
    description:
      "阅读视觉惯性融合、多模态缺失与传感器退化方向的前沿论文，形成读书笔记和分享会。",
    skills: ["多模态", "视觉惯性", "论文阅读"],
  },
  {
    type: "科研合作",
    title: "高校技术社区智能匹配研究",
    deadline: "项目后期开放",
    members: "计划 4 人",
    description:
      "研究基于技能图谱、项目经历和兴趣方向的队友与项目推荐方法。",
    skills: ["推荐系统", "知识图谱", "Web 数据"],
  },
];

export const papers = [
  {
    title: "Segment Anything",
    venue: "ICCV 2023",
    status: "准备共读",
    focus: "视觉基础模型与数据引擎",
    owner: "CV 与多模态组",
  },
  {
    title: "Attention Is All You Need",
    venue: "NeurIPS 2017",
    status: "复现模板",
    focus: "Transformer 基础结构",
    owner: "AI 与大模型组",
  },
  {
    title: "DQN",
    venue: "Nature 2015",
    status: "实验记录中",
    focus: "强化学习基线复现",
    owner: "强化学习小组",
  },
];

export const events = [
  {
    type: "启动活动",
    title: "NKUGeek 社区启动会",
    date: "2026-09-12",
    time: "19:00 - 20:30",
    location: "待确定",
    capacity: "50 人",
    status: "即将开放",
    description:
      "介绍社区定位、技术方向、首批项目和成员协作机制，并现场完成项目组队。",
  },
  {
    type: "技术分享",
    title: "从想法到开源 AI 项目",
    date: "2026-09-19",
    time: "19:00 - 20:30",
    location: "待确定",
    capacity: "60 人",
    status: "筹备中",
    description:
      "讲解项目选题、技术设计、实验验证、文档编写和 GitHub 开源的完整流程。",
  },
  {
    type: "项目实践",
    title: "首期 Project Sprint",
    date: "2026-09-26",
    time: "09:00 - 18:00",
    location: "创新实践空间",
    capacity: "30 人",
    status: "规划中",
    description:
      "围绕 NKUGeek Hub 与校园信息 AI 助手进行集中设计、开发和 Demo 展示。",
  },
  {
    type: "论文共读",
    title: "多模态鲁棒感知论文讨论",
    date: "2026-10-10",
    time: "19:00 - 21:00",
    location: "线上会议",
    capacity: "20 人",
    status: "规划中",
    description:
      "围绕视觉惯性融合、多模态缺失和不确定性建模开展论文阅读与讨论。",
  },
];

export const members = [
  {
    name: "李佳明",
    initials: "LJ",
    college: "人工智能学院",
    grade: "本科生",
    level: "核心成员",
    projects: 6,
    contributions: 38,
    direction: "AI、强化学习、开源平台",
    skills: ["Python", "PyTorch", "Next.js", "科研实验"],
  },
  {
    name: "张同学",
    initials: "ZT",
    college: "计算机学院",
    grade: "本科生",
    level: "项目负责人",
    projects: 3,
    contributions: 22,
    direction: "后端、数据库、工程化",
    skills: ["Java", "Spring Boot", "PostgreSQL"],
  },
  {
    name: "王同学",
    initials: "WT",
    college: "软件学院",
    grade: "本科生",
    level: "活跃成员",
    projects: 4,
    contributions: 19,
    direction: "前端交互、产品体验",
    skills: ["TypeScript", "React", "UI 设计"],
  },
  {
    name: "陈同学",
    initials: "CT",
    college: "人工智能学院",
    grade: "研究生",
    level: "科研协作",
    projects: 5,
    contributions: 27,
    direction: "计算机视觉、多模态学习",
    skills: ["CV", "多模态", "论文复现"],
  },
  {
    name: "刘同学",
    initials: "LT",
    college: "电子信息与光学工程学院",
    grade: "本科生",
    level: "硬件方向",
    projects: 2,
    contributions: 11,
    direction: "嵌入式、机器人、智能硬件",
    skills: ["C++", "嵌入式", "机器人"],
  },
  {
    name: "周同学",
    initials: "ZT",
    college: "网络空间安全学院",
    grade: "本科生",
    level: "安全方向",
    projects: 3,
    contributions: 16,
    direction: "操作系统、网络安全、Rust",
    skills: ["Rust", "操作系统", "网络安全"],
  },
];

export const rolePermissions = [
  { role: "Learner", permission: "阅读路线并完成章节实践" },
  { role: "Contributor", permission: "认领 Issue 并提交 Pull Request" },
  { role: "Maintainer", permission: "维护仓库、任务与版本发布" },
  { role: "Mentor", permission: "设计路线、任务并提供指导" },
];

export const roadmap = [
  { phase: "阶段一", title: "开放入口", items: ["学习路线", "开放项目", "贡献指南", "任务模板"] },
  { phase: "阶段二", title: "实践闭环", items: ["章节实验", "Issue 认领", "自动测试", "Pull Request"] },
  { phase: "阶段三", title: "项目资产", items: ["代码 Diff", "PCB 预览", "CAD 预览", "版本发布"] },
  { phase: "阶段四", title: "科研复现", items: ["论文条目", "实验日志", "指标对比", "复现报告"] },
  { phase: "阶段五", title: "社区治理", items: ["Maintainer", "Mentor", "项目孵化", "版本路线"] },
  { phase: "阶段六", title: "智能工具", items: ["源码导航", "实验摘要", "任务拆分", "知识检索"] },
];

export function getProjectBySlug(slug: string) {
  return projects.find((project) => project.slug === slug) ?? projects[0];
}
