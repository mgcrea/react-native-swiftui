import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";

const DOCS_BASE = "https://mgcrea.github.io/react-native-swiftui";

/**
 * A release with breaking changes usually has a migration guide. Found by
 * convention rather than hand-written into the changelog, so regenerating the
 * file does not drop the link.
 */
const migrationGuide = (version) => {
  const [major, minor] = version.split(".");
  const slug = `migrating-to-${major}-${minor}`;
  return existsSync(`docs/src/content/docs/guides/${slug}.md`) ? `${DOCS_BASE}/guides/${slug}/` : null;
};

// The version in package.json has been bumped but not tagged yet, so commits
// after the newest tag belong to it.
const PENDING = JSON.parse(readFileSync("package.json", "utf8")).version;

/**
 * `--release-date` marks the pending version as shipping now rather than
 * "unreleased". release-it passes it from the `after:bump` hook, once
 * package.json carries the new version but before the tag exists — the tag link
 * resolves as soon as the same run pushes it.
 */
const RELEASE_DATE = process.argv.includes("--release-date") ? new Date().toISOString().slice(0, 10) : null;

const REPO = "https://github.com/mgcrea/react-native-swiftui";
const SEP = "";
const REC = "";

const git = (...args) => execFileSync("git", args, { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });

// Tags in creation order, oldest first.
const tags = git("tag", "--sort=creatordate").trim().split("\n").filter(Boolean);

// Section order and headings. Types not listed are omitted (chore, style, ci,
// docs, test) — they are noise in a consumer-facing changelog.
const SECTIONS = [
  ["feat", "Features"],
  ["fix", "Bug Fixes"],
  ["perf", "Performance"],
  ["refactor", "Refactors"],
  ["revert", "Reverts"],
];
const KNOWN = new Set(SECTIONS.map(([t]) => t));

const parse = (range) => {
  const raw = git("log", "--no-merges", `--format=%H${SEP}%h${SEP}%s${SEP}%b${REC}`, range);
  return raw
    .split(REC)
    .map((s) => s.trim())
    .filter(Boolean)
    .map((entry) => {
      const [hash, short, subject, body = ""] = entry.split(SEP);
      const m = /^([a-z]+)(?:\(([^)]*)\))?(!)?:\s*(.+)$/.exec(subject);
      if (!m) return { hash, short, type: null, scope: null, breaking: false, description: subject, body };
      const [, type, scope, bang, description] = m;
      // A breaking change is either `type!:` or a `BREAKING CHANGE:` footer.
      const footer = /^BREAKING[ -]CHANGE:\s*([\s\S]*)$/m.exec(body);
      return {
        hash,
        short,
        type,
        scope: scope ?? null,
        breaking: Boolean(bang) || Boolean(footer),
        breakingNote: footer
          ? footer[1]
              .trim()
              .split(/\n\s*\n/)[0]
              .replace(/\s+/g, " ")
          : null,
        description,
        body,
      };
    });
};

const link = (c) => `([${c.short}](${REPO}/commit/${c.hash}))`;
const line = (c) => `- ${c.scope ? `**${c.scope}:** ` : ""}${c.description} ${link(c)}`;

const renderRelease = (version, date, commits) => {
  const out = [];
  const heading = date
    ? `## [${version}](${REPO}/releases/tag/${version}) — ${date}`
    : `## ${version} — unreleased`;
  out.push(heading, "");

  const breaking = commits.filter((c) => c.breaking);
  if (breaking.length) {
    out.push("### ⚠ BREAKING CHANGES", "");
    for (const c of breaking) {
      out.push(`- ${c.breakingNote ?? c.description} ${link(c)}`);
    }
    out.push("");
    const guide = migrationGuide(version);
    if (guide) out.push(`See the [migration guide](${guide}) for the full before/after.`, "");
  }

  for (const [type, title] of SECTIONS) {
    const group = commits.filter((c) => c.type === type);
    if (!group.length) continue;
    out.push(`### ${title}`, "");
    for (const c of group) out.push(line(c));
    out.push("");
  }

  // Anything that did not parse as a conventional commit still deserves a home
  // rather than being silently dropped.
  const unknown = commits.filter((c) => c.type === null);
  if (unknown.length) {
    out.push("### Other", "");
    for (const c of unknown) out.push(line(c));
    out.push("");
  }

  const shown = commits.filter((c) => KNOWN.has(c.type) || c.type === null).length;
  // Render the release anyway. A tag that only carries a release commit is real
  // and skipping it leaves an unexplained gap in the version sequence.
  if (!shown) out.push("_No user-facing changes._", "");
  return { text: out.join("\n"), shown };
};

const releases = [];

// Unreleased: everything after the newest tag.
const newest = tags[tags.length - 1];
const unreleased = parse(`${newest}..HEAD`);
if (unreleased.length) releases.push({ version: PENDING, date: RELEASE_DATE, commits: unreleased });

for (let i = tags.length - 1; i >= 0; i--) {
  const tag = tags[i];
  const prev = tags[i - 1];
  const range = prev ? `${prev}..${tag}` : tag;
  const date = git("log", "-1", "--format=%ad", "--date=short", tag).trim();
  releases.push({ version: tag, date, commits: parse(range) });
}

const parts = [
  "# Changelog",
  "",
  "All notable changes to this project are documented here.",
  "",
  "Generated from the commit history, which follows",
  "[Conventional Commits](https://www.conventionalcommits.org/). Chore, docs, style,",
  "test and CI commits are omitted; see the full log for those.",
  "",
];

let total = 0;
for (const r of releases) {
  const { text, shown } = renderRelease(r.version, r.date, r.commits);
  total += shown;
  parts.push(text);
}

process.stdout.write(
  parts
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trimEnd() + "\n",
);
process.stderr.write(`releases: ${releases.length}, entries rendered: ${total}\n`);
