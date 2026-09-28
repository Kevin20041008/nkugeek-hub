import { readFile } from "node:fs/promises";
import path from "node:path";

import { courseSlug } from "@/data/geek-lab";

export async function readLabFiles(names: string[]) {
  return Promise.all(names.map(async (name) => ({
    name,
    content: await readFile(path.join(process.cwd(), "public", "labs", courseSlug, name), "utf8"),
  })));
}
