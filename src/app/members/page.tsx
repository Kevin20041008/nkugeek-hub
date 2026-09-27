import type { Metadata } from "next";
import { Users } from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";
import { MemberDirectory } from "@/components/members/member-directory";
import { MemberPrivacySettings } from "@/components/member-privacy-settings";
import { Button } from "@/components/ui/button";
import { members } from "@/data/platform";

export const metadata: Metadata = {
  title: "成员中心",
};

export default function MembersPage() {
  return (
    <main>
      <PageHero
        eyebrow="MEMBER CENTER"
        title="成员展示与隐私边界"
        description="每个成员拥有类似技术简历的个人主页，同时可以控制真实姓名、学院、联系方式和项目邀请是否公开。"
        actions={
          <Button className="bg-[#7a1731] text-white hover:bg-[#641228]">
            <Users className="mr-2 h-4 w-4" />
            完善我的主页
          </Button>
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <MemberPrivacySettings />
        <MemberDirectory members={members} />
      </section>
    </main>
  );
}
