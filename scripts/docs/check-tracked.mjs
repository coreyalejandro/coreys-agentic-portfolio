import { execFileSync } from "node:child_process"

function runGit(args) {
  return execFileSync("git", args, { encoding: "utf8" }).trim()
}

function fail(message) {
  console.error(`\n[docs:check-tracked] ${message}\n`)
  process.exit(1)
}

function isRootDoc(path) {
  return /^[^/]+\\.md$/i.test(path)
}

function isDocsFolder(path) {
  return path.startsWith("docs/")
}

try {
  runGit(["rev-parse", "--is-inside-work-tree"])
} catch {
  fail("Not a git repository. Initialize git first.")
}

// List untracked, non-ignored files.
const untracked = runGit(["ls-files", "--others", "--exclude-standard"])
  .split("\n")
  .map((s) => s.trim())
  .filter(Boolean)

const offenders = untracked.filter((p) => isDocsFolder(p) || isRootDoc(p))

if (offenders.length > 0) {
  fail(
    [
      "Found untracked documentation files. Requirement: all docs under `docs/` and root `*.md` must be tracked.",
      "",
      ...offenders.map((p) => `- ${p}`),
      "",
      "Fix: git add <files> && git commit",
    ].join("\n"),
  )
}

console.log("[docs:check-tracked] OK")


