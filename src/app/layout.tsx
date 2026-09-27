import type { Metadata } from "next";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const ogImageUrl = new URL("og.png", `${siteUrl.replace(/\/$/, "")}/`);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "NKUGeek Hub",
    template: "%s | NKUGeek Hub",
  },
  description:
    "南开大学开放技术学习与实践社区，通过学习路线、真实项目、GitHub Issue 和 Pull Request 沉淀可验证的技术贡献。",
  keywords: [
    "NKUGeek",
    "南开大学",
    "技术社区",
    "开源项目",
    "科研合作",
    "竞赛组队",
  ],
  authors: [{ name: "NKUGeek Community" }],
  creator: "NKUGeek Community",
  icons: {
    icon: `${basePath}/favicon.ico`,
  },
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteUrl,
    siteName: "NKUGeek Hub",
    title: "NKUGeek Hub",
    description: "从学习路线到第一个合并的 Pull Request。",
    images: [
      {
        url: ogImageUrl,
        width: 1200,
        height: 630,
        alt: "NKUGeek Hub 平台预览",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NKUGeek Hub",
    description: "从学习路线到第一个合并的 Pull Request。",
    images: [ogImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-[#f6f7fb] text-zinc-950 antialiased">
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
