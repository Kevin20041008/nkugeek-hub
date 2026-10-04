import { readFile, writeFile, rename } from "node:fs/promises";

const target = new URL("../src/data/community-snapshot.json", import.meta.url);
const previous = JSON.parse(await readFile(target, "utf8"));
const repository = "https://github.com/Kevin20041008/nkugeek-hub";
const api = "https://api.github.com/repos/Kevin20041008/nkugeek-hub";
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "NKUGeek-snapshot",
};
if (process.env.GITHUB_TOKEN)
  headers.Authorization = "Bearer " + process.env.GITHUB_TOKEN;

async function get(path) {
  const response = await fetch(api + path, {
    headers,
    signal: AbortSignal.timeout(30000),
  });
  if (!response.ok) throw new Error("GitHub returned HTTP " + response.status);
  return response.json();
}

try {
  const issues = [];
  for (const known of previous.issues) {
    const item = await get("/issues/" + known.number);
    if (item.pull_request || !["open", "closed"].includes(item.state))
      throw new Error("Unexpected Issue response");
    issues.push({
      number: item.number,
      title: item.title,
      state: item.state,
      url: item.html_url,
      assignees: item.assignees.map((user) => user.login),
    });
  }
  const commits = await get("/commits?per_page=5");
  const activity = commits.map((item) => ({
    id: item.sha,
    title: item.commit.message.split("\n")[0],
    date: item.commit.committer.date,
    url: item.html_url,
    kind: "Commit",
  }));
  if (!activity.length) throw new Error("Empty commit response");
  const next = {
    checkedAt: new Date().toISOString(),
    repository,
    issues,
    activity,
  };
  // Replace only after every request succeeds; a failed sync cannot erase the last snapshot.
  const temporary = new URL(target.href + ".tmp");
  await writeFile(temporary, JSON.stringify(next, null, 2) + "\n");
  await rename(temporary, target);
  console.log(
    "Updated community snapshot: " +
      issues.length +
      " issues, " +
      activity.length +
      " commits.",
  );
} catch (error) {
  console.error(
    "Snapshot unchanged. " +
      (error instanceof Error ? error.message : "Sync failed"),
  );
  process.exitCode = 1;
}
