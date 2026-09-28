# NKUGeek Hub

面向南开大学学生的开放技术学习与实践社区。

NKUGeek Hub 采用“学习路线 -> 运行项目 -> 认领 Issue -> 提交 Pull Request -> 沉淀成果”的协作模式。网站不设置站内注册、项目申请或文章审核门槛，GitHub 仓库是代码、文档、讨论与贡献记录的事实来源。

## 核心内容

- Geek Lab：Python 工程实践，四个可运行实验、完整代码与 24 个测试
- 开放项目：展示仓库、Issue、开发日志、版本和贡献方向
- 开放挑战：按难度、预计投入和交付物拆分可认领任务
- 论文复现：记录数据集、环境、指标、实验、问题和复现报告
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
- `/learn/python-engineering` Python 工程实践
- `/learn/python-engineering/[labId]` 实验讲解、代码、测试与 Issue
- `/challenges` 开放挑战与任务模板
- `/contribute` Issue、分支与 Pull Request 贡献流程
- `/projects` 开放项目
- `/projects/[projectId]` 项目任务、资料和贡献入口
- `/projects/[projectId]/assets` 工程资料库
- `/papers` 论文复现计划
- `/viewer` 工程文件阅览器
- `/articles` 仓库文档与技术文章
- `/events` 社区活动
- `/about` 社区定位、角色与演进路线

旧的 `/login`、`/register`、`/dashboard`、`/admin` 和 `/articles/new` 地址会统一引导到贡献流程。

## 开源协作

- [贡献指南](CONTRIBUTING.md)
- [行为准则](CODE_OF_CONDUCT.md)
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
