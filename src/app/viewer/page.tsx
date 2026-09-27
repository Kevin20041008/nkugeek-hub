import type { Metadata } from "next";
import { Box, Code2, Cpu } from "lucide-react";

import { PageHero } from "@/components/layout/page-hero";
import { EngineeringFileViewer } from "@/components/viewer/engineering-file-viewer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "工程文件阅览器",
};

export default function ViewerPage() {
  return (
    <main>
      <PageHero
        eyebrow="ENGINEERING VIEWER"
        title="代码、PCB 与 CAD 文件在线阅览器"
        description="面向项目资源和工程协作的在线阅览器 MVP。代码文件可直接预览，PCB 和 SolidWorks/CAD 文件先做格式识别、摘要和后续渲染扩展入口。"
        actions={
          <>
            <Button className="bg-[#7a1731] text-white hover:bg-[#641228]">
              <Code2 className="mr-2 h-4 w-4" />
              本地预览
            </Button>
            <Button variant="outline" className="border-zinc-300 bg-white text-zinc-900 hover:bg-zinc-50">
              <Cpu className="mr-2 h-4 w-4" />
              PCB 摘要
            </Button>
          </>
        }
      />

      <section className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="mb-6 flex flex-wrap gap-2">
          {["代码/Markdown/SQL", "KiCad/Gerber", "STEP/STL/OBJ", "SolidWorks 需转换"].map((item) => (
            <Badge key={item} variant="secondary" className="bg-[#eef7f4] text-[#245f51]">
              <Box className="mr-1.5 h-3.5 w-3.5" />
              {item}
            </Badge>
          ))}
        </div>

        <EngineeringFileViewer />
      </section>
    </main>
  );
}
