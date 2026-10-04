import type { Metadata } from "next";
import { PageIntro } from "@/components/community/primitives";
import { ShowcaseCatalog } from "@/components/community/catalogs";
import { propose } from "@/data/community";
export const metadata: Metadata = { title: "Made at NKU · Showcase" };
export default function ShowcasePage() {
  return (
    <main className="bg-white">
      <PageIntro
        eyebrow="SHOWCASE"
        title="Made at NKU"
        action={
          <a
            className="hub-button"
            href={propose(
              "[作品收录] ",
              "Project：\nRepo：\nDemo（可选）：\nContributors（公开署名）：\nTech stack：\nStory：\n授权与来源：",
            )}
            target="_blank"
            rel="noreferrer"
          >
            提交作品
          </a>
        }
      >
        南开学生公开做出来的东西。社区项目与外部收录分开标注，收录不代表合作、背书或维护关系。
      </PageIntro>
      <section className="hub-container py-8">
        <ShowcaseCatalog />
      </section>
    </main>
  );
}
