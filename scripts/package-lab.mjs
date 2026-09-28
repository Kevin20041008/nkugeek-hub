import { readdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { zipSync } from "fflate";

const root = fileURLToPath(new URL("../public/labs/", import.meta.url));
const course = "python-engineering";
const directory = path.join(root, course);
const files = (await readdir(directory, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && /\.(py|csv|json|md)$/.test(entry.name) && entry.name !== "report.json")
  .map((entry) => entry.name)
  .sort();
const entries = Object.fromEntries(
  await Promise.all(files.map(async (name) => [
    course + "/" + name,
    [new Uint8Array(await readFile(path.join(directory, name))), { mtime: new Date(2026, 8, 28) }],
  ])),
);
await writeFile(path.join(root, course + ".zip"), zipSync(entries, { level: 9 }));
console.log("Geek Lab: packaged " + files.length + " course files.");
