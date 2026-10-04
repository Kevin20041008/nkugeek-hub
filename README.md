# NKUGeek Hub

面向南开大学学生的开放技术学习与实践社区。

NKUGeek Hub 采用“学习路线 -> 运行项目 -> 认领 Issue -> 提交 Pull Request -> 沉淀成果”的协作模式。网站不设置站内注册、项目申请或文章审核门槛，GitHub 仓库是代码、文档、讨论与贡献记录的事实来源。

## 核心内容

主导航为 Learn / Build / Research / Community / Showcase。
首页不显示未经核验的规模数字，动态附 GitHub 来源与快照时间。
项目、任务、论文、课程与成果互相连接，所有写入通过 Issue / PR 完成。

- Geek Lab：Python 工程实践，四个可运行实验、完整代码与 24 个测试
- 开放项目：展示仓库、Issue、开发日志、版本和贡献方向
- 开放挑战：按难度、预计投入和交付物拆分可认领任务
- 论文复现：60 篇跨领域论文，原始来源、阅读路线、筛选检索与复现建议
- 工程资料：预览代码、PCB、Gerber、CAD 与版本差异
- 贡献成长：以合并的代码、文档、实验和设计记录社区成长

## 技术栈

- Next.js + TypeScript
- Tailwind CSS + shadcn/ui
- 仓库内 TypeScript / Markdown 静态数据
- GitHub Issues / Pull Requests / Actions
- GitHub Pages 静态部署

## 本地开发

```bash
npm install
npm run dev
```

打开 `http://localhost:3000`。

## GitHub Pages 发布

仓库推送到 GitHub 后，在 `Settings -> Pages -> Build and deployment` 中将 Source 设为 `GitHub Actions`。推送到 `main` 或 `master` 分支会自动构建并发布 `out/` 目录。

## 质量检查

```bash
npm run lint
npm run build
npm run test:smoke
```

## 主要页面

- `/` 开源学习社区首页
- `/learn` Geek Lab 课程目录
- `/learn/foundations` Git、Web、PyTorch、ViT 与 Paper 官方资源导学及产出验收
- `/tasks` 六类任务的统一入口，区分真实 Issue 与待讨论提案
- `/showcase` Made at NKU 真实作品与外部公开项目收录
- `/contributors` 无排名的贡献者档案
- `/failures` 带代码依据的排错档案
- `/events/archive` 活动材料、参与者授权署名与成果归档
- `/learn/python-engineering` Python 工程实践
- `/learn/python-engineering/[labId]` 实验讲解、代码、测试与 Issue
- `/challenges` 开放挑战与任务模板
- `/contribute` Issue、分支与 Pull Request 贡献流程
- `/projects` 开放项目
- `/projects/[projectId]` 项目任务、资料和贡献入口
- `/projects/[projectId]/assets` 工程资料库
- `/papers` 论文目录、领域筛选与阅读路线
- `/papers/[paperId]` 论文原文、作者资源、复现计划与 Issue 入口
- `/viewer` 工程文件阅览器
- `/articles` 仓库文档与技术文章
- `/events` 社区活动
- `/about` 社区定位、角色与演进路线

旧的 `/login`、`/register`、`/dashboard`、`/admin` 和 `/articles/new` 地址会统一引导到贡献流程。

## 开源协作

- [贡献指南](CONTRIBUTING.md)
- [行为准则](CODE_OF_CONDUCT.md)
- [社区规范](COMMUNITY_GUIDELINES.md)
- [项目收录规范](docs/product/project-admission.md)
- [社区数据与快照维护](docs/api/community-data.md)
- [安全策略](SECURITY.md)
- [产品路线](docs/product/roadmap.md)
- [页面设计说明](docs/design/README.md)
- [部署说明](docs/deployment/github-vercel.md)

第一次参与建议从 Geek Lab 的 Python 工程实践开始，再认领实验末尾的 Issue。

## Geek Lab

实验源码位于 `public/labs/python-engineering`，需要 Python 3.11+，无需第三方 Python 依赖。
网页在构建时读取实际源码；`npm run dev` 和 `npm run build` 自动生成课程 ZIP。
不要直接修改 ZIP，应修改源文件后重新构建。

```bash
npm run test:lab
```

持续集成会在 Windows / Linux、Python 3.11 / 3.14 上运行课程测试。
课程作者维护 `src/data/geek-lab.ts` 中的教学内容，同时更新真实源码、测试和关联 Issue。

## 论文目录

`src/data/papers.ts` 是论文书目与编辑建议的唯一数据源，目前有 60 篇：
NLP 14、CV 14、多模态 8、具身智能 14、强化学习 10。
年份统一使用首次 arXiv 预印本年份，不混用会议年份。
全部详情页和 sitemap 在构建时生成，不依赖在线数据库或运行时抓取。

收录、原文结果、社区实验结果必须区分。当前目录为待认领的研究候选，
不包含未经验证的分数、负责人、实验记录或报告。
“提交复现计划”打开 GitHub 预填表单，不会自动创建 Issue。
论文补充与校订流程见 [论文目录维护规范](docs/research/paper-catalog.md)。
