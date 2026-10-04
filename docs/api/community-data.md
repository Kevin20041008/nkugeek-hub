# Static Community Data

网站不提供写入 API，不需要数据库或浏览器密钥。

- src/data/community.ts：项目、任务、作品、失败记录、活动档案。
- src/data/community-snapshot.json：GitHub Issue 状态与提交动态快照。
- src/data/papers.ts：论文书目与复现编辑建议。
- src/data/geek-lab.ts：完整课程定义。

## 更新快照

运行 npm run sync:community。可通过 GITHUB*TOKEN 提供仅公开仓库读取权限的令牌，
不得使用 NEXT_PUBLIC* 前缀，不得提交令牌。请求失败时保留旧快照并退出失败；
构建不会调用 GitHub API。受限网络可在 GitHub 可访问的环境运行后提交 JSON。

快照包含核验时间、来源 URL、Issue 是否关闭与 assignees、提交 SHA。
这里只同步本仓库，前端分类由任务数据维护。历史快照不会自动变成实时数据。
认领动作始终打开 GitHub，由维护者确认；不在本地模拟认领成功。

## 关系约束

任务 project 必须指向已收录项目；关联 paper 必须存在。
来源采用 HTTPS。没有负责人或仓库的项目只能进入 Ideas。
Showcase 的外部收录必须标记 external，未知 Demo 不生成链接。
修改数据时运行 lint、build、test:smoke。
