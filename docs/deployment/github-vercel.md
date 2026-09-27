# GitHub Pages 与 Vercel 部署

NKUGeek Hub 当前不依赖数据库或登录服务，可以把仓库公开托管在 GitHub，并使用 GitHub Pages 或 Vercel 持续部署。

## GitHub

1. 在 GitHub 创建公开仓库。
2. 将本地仓库关联到远程仓库并推送默认分支。
3. 在仓库设置中启用 Issues、Discussions，并允许贡献者提交 Pull Request。
4. GitHub Actions 会在推送和 Pull Request 时运行 lint、build 和 smoke tests。

## GitHub Pages

1. 将仓库推送到 GitHub，默认分支使用 `main` 或 `master`。
2. 打开仓库的 `Settings -> Pages`。
3. 在 `Build and deployment` 中将 Source 设为 `GitHub Actions`。
4. 打开 Actions 页面，等待 `Deploy Next.js site to GitHub Pages` 完成。
5. 发布地址会显示在部署任务和仓库 Pages 设置中。

`next.config.ts` 已启用静态导出，`.github/workflows/pages.yml` 会构建并发布 `out/`。GitHub 官方 Pages Action 会为项目仓库自动配置仓库子路径。

## Vercel

1. 在 Vercel 导入 GitHub 仓库。
2. Framework Preset 选择 Next.js。
3. Build Command 使用 `npm run build`。
4. 可选设置 `NEXT_PUBLIC_SITE_URL` 为正式域名。
5. 发布后，每次合并到默认分支都会自动重新部署。

Vercel 与 GitHub Pages 二选一即可。需要 Next.js 服务端能力时使用 Vercel；当前纯静态版本可以直接使用 GitHub Pages。
