"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

interface ContributionRedirectProps {
  section?: string;
}

export function ContributionRedirect({ section }: ContributionRedirectProps) {
  const router = useRouter();
  const target = section ? `/contribute#${section}` : "/contribute";

  useEffect(() => {
    router.replace(target);
  }, [router, target]);

  return (
    <main className="mx-auto flex min-h-[55vh] max-w-3xl flex-col justify-center px-5 py-16 lg:px-8">
      <p className="text-sm font-medium text-[#7a1731]">OPEN CONTRIBUTION</p>
      <h1 className="mt-4 text-3xl font-semibold text-zinc-950 sm:text-4xl">此入口已迁移</h1>
      <p className="mt-5 max-w-2xl leading-8 text-zinc-600">
        NKUGeek Hub 无需站内账号、申请或后台审核，正在前往公开贡献流程。
      </p>
      <div className="mt-7">
        <Button asChild className="bg-[#7a1731] text-white hover:bg-[#641228]">
          <Link href={target}>前往参与贡献</Link>
        </Button>
      </div>
    </main>
  );
}
