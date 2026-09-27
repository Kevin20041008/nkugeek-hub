# Contributing to NKUGeek Hub

感谢你参与 NKUGeek Hub。社区不设置站内注册与申请流程：先选择学习路线、运行仓库，再从一个边界清晰的 Issue 开始贡献。

## 从哪里开始

1. 阅读网站 `/learn` 中的 PATH 00。
2. 在本地运行项目并通过基础检查。
3. 在带有 `good first issue` 或 `help wanted` 标签的任务下留言认领。
4. 与维护者确认范围后开始实现。
5. 提交 Pull Request，并附上验证结果。

## 分支命名

- `feature/<short-name>`：新功能
- `fix/<short-name>`：缺陷修复
- `docs/<short-name>`：文档更新
- `chore/<short-name>`：工程配置、依赖、脚本
- `design/<short-name>`：视觉和交互调整

示例：

```bash
git checkout -b feature/project-application-flow
```

## 任务规范

每个任务尽量包含：

- 背景：为什么需要做
- 范围：这次做什么，不做什么
- 验收：如何判断完成
- 风险：是否影响公开数据、构建流程或核心页面

优先选择小而完整的任务。一个 PR 最好只解决一个明确问题。

## 提交前检查

```bash
npm run lint
npm run build
npm run test:smoke
```

如果改动涉及产品流程，请同步更新 `docs/product/roadmap.md` 或对应说明。

## PR 描述建议

PR 描述建议包含：

- 做了什么
- 如何验证
- 截图或录屏
- 是否有后续任务

## 代码风格

- 优先遵循现有 Next.js App Router 结构
- 组件保持小而清晰，避免过早抽象
- 用户可见文案使用简洁中文
- 涉及隐私、权限或公开数据的改动必须说明边界
