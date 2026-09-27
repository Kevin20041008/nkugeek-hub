# 数据与内容接口

NKUGeek Hub 当前是无需登录、无需数据库的公开站点，不提供后端 API 或 Server Actions。

## 数据来源

- `src/data/platform.ts`：学习路线、项目、成员、活动等基础展示数据
- `src/services/articles.ts`：文章与技术内容
- `src/services/projects.ts`：项目列表与详情
- `src/services/events.ts`：活动列表
- `src/services/project-assets.ts`：工程资料示例
- `src/services/reproductions.ts`：论文复现数据

页面只读取仓库中的 TypeScript 或 Markdown 内容。内容修改通过 GitHub Issue 和 Pull Request 完成，合并后由部署平台自动发布。

## 后续扩展

若未来需要独立服务，可在不改变公开浏览体验的前提下增加只读内容 API。新增接口时应同时补充请求格式、响应结构、错误码和权限说明。
