# NKUGeek Hub

面向南开大学学生的开放技术学习与实践社区。

NKUGeek Hub 采用“学习路线 -> 运行项目 -> 认领 Issue -> 提交 Pull Request -> 沉淀成果”的协作模式。网站不设置站内注册、项目申请或文章审核门槛，GitHub 仓库是代码、文档、讨论与贡献记录的事实来源。

## 核心内容

- 学习路线：章节化组织环境、代码、任务、验证与最终产出
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
- `/learn` 学习路线与章节任务
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

第一次参与建议从 `/learn` 的 PATH 00 开始，然后选择一个 `good first issue`。
