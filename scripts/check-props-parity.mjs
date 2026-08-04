/**
 * Every props class states each field four times:
 *
 *   @Published public var isOn: Bool = false                 // 1. declaration
 *   case isOn                                                // 2. CodingKeys
 *   isOn = try container.decodeIfPresent(...) ?? false       // 3. init(from:)
 *   assign(\.isOn, from: other, key: "isOn", ...)            // 4. merge
 *
 * Nothing in Swift ties those together. Dropping one is silent: the prop simply
 * stops arriving, or stops updating, with no compile error. That is how
 * `ButtonProps.disabled` came to be declared, rendered and exposed in the TS
 * types while missing from both `CodingKeys` and `merge`.
 *
 * The `key:` string in `assign` is the sharpest edge — it is matched against the
 * JSON payload at runtime, so a typo makes the prop permanently un-updatable
 * with nothing to notice it. Check 4 below is the only thing that can catch it.
 *
 * Exemptions live next to the code they exempt: put `props-parity:internal` on
 * the declaration line or the line above it for a prop that is owned natively
 * rather than driven from JS.
 */
import { globSync, readFileSync } from "node:fs";

/**
 * Props classes that deliberately sit outside the decode/merge contract.
 */
const EXCLUDED = new Set([
  // Not Decodable and has no `merge`: the root owns the view tree itself and is
  // fed through `update(with:)` rather than `updateChildProps`.
  "ios/SwiftUIRootProps.swift",
  // Standalone hybrid view. Its props cross the bridge as nitro props and never
  // pass through `updateChildProps`, so it has no `merge` to be in parity with.
  "ios/components/SFSymbol/SFSymbolProps.swift",
]);

const MARKER = "props-parity:internal";

/**
 * Replaces comments and string literals with spaces of equal length. Offsets
 * stay aligned with the original, so brace depth can be computed here while
 * names are still read from the real source.
 */
const mask = (src) => {
  const out = src.split("");
  let i = 0;
  const blank = (from, to) => {
    for (let j = from; j < to && j < out.length; j++) {
      if (out[j] !== "\n") out[j] = " ";
    }
  };
  while (i < src.length) {
    const two = src.slice(i, i + 2);
    if (two === "//") {
      const end = src.indexOf("\n", i);
      const stop = end === -1 ? src.length : end;
      blank(i, stop);
      i = stop;
    } else if (two === "/*") {
      const end = src.indexOf("*/", i + 2);
      const stop = end === -1 ? src.length : end + 2;
      blank(i, stop);
      i = stop;
    } else if (src.slice(i, i + 3) === '"""') {
      const end = src.indexOf('"""', i + 3);
      const stop = end === -1 ? src.length : end + 3;
      blank(i, stop);
      i = stop;
    } else if (src[i] === '"') {
      let j = i + 1;
      while (j < src.length && src[j] !== '"') {
        if (src[j] === "\\") j++;
        j++;
      }
      blank(i, Math.min(j + 1, src.length));
      i = j + 1;
    } else {
      i++;
    }
  }
  return out.join("");
};

/** Brace depth at every offset, computed from the masked source. */
const depthMap = (masked) => {
  const depths = new Int32Array(masked.length);
  let depth = 0;
  for (let i = 0; i < masked.length; i++) {
    if (masked[i] === "}") depth--;
    depths[i] = depth;
    if (masked[i] === "{") depth++;
  }
  return depths;
};

/**
 * End of the block whose `{` sits just before `open`. A matching `{`/`}` pair
 * share a depth, and `open` is one level deeper — so scanning for a `}` at
 * `depths[open]` would stop at the first *nested* block instead of the real end.
 */
const matchingClose = (masked, depths, open) => {
  let close = open;
  while (close < masked.length && !(masked[close] === "}" && depths[close] === depths[open] - 1)) close++;
  return close;
};

/**
 * The body of the outer props class. Everything the contract cares about lives
 * at depth 1 inside it; nested `PickerOption` / `PickerConfig` types and their
 * own `CodingKeys` live deeper and must not be mistaken for the class's.
 */
const classBody = (src, masked, depths) => {
  const m = /(?:public\s+)?final\s+class\s+(\w+Props)\s*:[^{]*\{/.exec(masked);
  if (!m) return null;
  const start = m.index + m[0].length;
  const baseDepth = depths[m.index + m[0].length - 1];
  let end = start;
  while (end < masked.length && !(masked[end] === "}" && depths[end] === baseDepth)) end++;
  return { name: m[1], start, end, innerDepth: baseDepth + 1 };
};

const lineOf = (src, offset) => src.slice(0, offset).split("\n").length;

/** True when `props-parity:internal` sits on this line or the one above it. */
const isExempt = (src, offset) => {
  const lines = src.slice(0, offset).split("\n");
  const lineIndex = lines.length - 1;
  const all = src.split("\n");
  return (all[lineIndex] ?? "").includes(MARKER) || (all[lineIndex - 1] ?? "").includes(MARKER);
};

const check = (file) => {
  const src = readFileSync(file, "utf8");
  const masked = mask(src);
  const depths = depthMap(masked);
  const body = classBody(src, masked, depths);
  if (!body)
    return [{ file, message: `${file} has no \`final class …Props\` — is it still a node props class?` }];

  const inClass = (offset) => offset >= body.start && offset < body.end;
  const atClassLevel = (offset) => inClass(offset) && depths[offset] === body.innerDepth;

  // 1. Declarations: `@Published … var name: Type`, at class level only.
  const published = [];
  for (const m of masked.matchAll(
    /@Published\s+(?:public\s+|internal\s+|private\s+)?(?:private\(set\)\s+)?var\s+(\w+)/g,
  )) {
    if (!atClassLevel(m.index)) continue;
    const name = /var\s+(\w+)/.exec(src.slice(m.index, m.index + m[0].length + 8))?.[1] ?? m[1];
    published.push({ name, offset: m.index, exempt: isExempt(src, m.index) });
  }

  // 2. The class's own CodingKeys, not a nested type's.
  let codingKeys = null;
  for (const m of masked.matchAll(/enum\s+CodingKeys\s*:[^{]*\{/g)) {
    if (!atClassLevel(m.index)) continue;
    const open = m.index + m[0].length;
    const close = matchingClose(masked, depths, open);
    const raw = src.slice(open, close);
    codingKeys = [...raw.matchAll(/case\s+([^\n]+)/g)].flatMap((c) =>
      c[1]
        .split(",")
        .map((s) => s.trim().split("=")[0].trim())
        .filter((s) => /^\w+$/.test(s)),
    );
  }

  // 3. Fields assigned by `init(from decoder:)`.
  let initBody = "";
  for (const m of masked.matchAll(/init\s*\(\s*from\s+decoder\s*:[^{]*\{/g)) {
    if (depths[m.index] !== body.innerDepth) continue;
    const open = m.index + m[0].length;
    initBody += src.slice(open, matchingClose(masked, depths, open));
  }

  // 4. Fields written by `merge(from:presentKeys:)`, plus keyPath/key agreement.
  const merged = new Set();
  const keyMismatches = [];
  let hasMerge = false;
  let mergeBody = "";
  for (const m of masked.matchAll(/func\s+merge\s*\(\s*from[^{]*\{/g)) {
    if (depths[m.index] !== body.innerDepth) continue;
    hasMerge = true;
    const open = m.index + m[0].length;
    const raw = src.slice(open, matchingClose(masked, depths, open));
    mergeBody += raw;
    // `assign(\.name, from: other, key: "name", …)`
    for (const a of raw.matchAll(/assign\(\\\.(\w+)[\s\S]{0,160}?key:\s*"([^"]*)"/g)) {
      merged.add(a[1]);
      if (a[1] !== a[2]) keyMismatches.push(`\\.${a[1]} passes key: "${a[2]}"`);
    }
  }

  /**
   * Assignment to `name` as a property, not a local shadow or a comparison.
   * Anchoring to line start would miss the single-line `case "top": alignment =
   * .top` form used by every raw-value enum decoder in this codebase.
   */
  const assigns = (haystack, name) =>
    new RegExp(String.raw`(?<![.\w])(?<!\blet\s+)(?<!\bvar\s+)${name}\s*=(?!=)`).test(haystack);

  const problems = [];
  const at = (o) => `${file}:${lineOf(src, o)}`;

  if (!codingKeys) {
    problems.push({
      file,
      message: `${file} \`${body.name}\` has no class-level CodingKeys — nothing can decode`,
    });
    codingKeys = [];
  }
  if (!hasMerge) {
    problems.push({
      file,
      message: `${file} \`${body.name}\` has no merge(from:presentKeys:) — prop updates cannot land`,
    });
  }

  for (const p of published) {
    if (p.exempt) continue;
    if (!codingKeys.includes(p.name)) {
      problems.push({
        file,
        message: `${at(p.offset)} \`${p.name}\` is @Published but has no CodingKey, so it never decodes`,
      });
    }
    if (!assigns(initBody, p.name)) {
      problems.push({
        file,
        message: `${at(p.offset)} \`${p.name}\` is never assigned in init(from:), so it keeps its default`,
      });
    }
    // Hand-written merges (e.g. `TextFieldProps.submitLabel`, whose type cannot
    // be Equatable and so cannot go through `assign`) still count as merged.
    if (hasMerge && !merged.has(p.name) && !assigns(mergeBody, p.name)) {
      problems.push({
        file,
        message: `${at(p.offset)} \`${p.name}\` is never written by merge(), so updates to it are dropped`,
      });
    }
  }

  const names = new Set(published.map((p) => p.name));
  for (const k of codingKeys) {
    if (!names.has(k)) {
      problems.push({ file, message: `${file} CodingKey \`${k}\` has no matching @Published property` });
    }
  }
  for (const mm of keyMismatches) {
    problems.push({ file, message: `${file} merge key does not match its keyPath: ${mm}` });
  }

  return problems;
};

// One directory deep on purpose: `ios/components/StyleProps.swift` is a shared
// value type, not a node props class, and has no decode/merge contract.
const files = globSync("ios/components/*/*Props.swift")
  .filter((f) => !EXCLUDED.has(f))
  .sort();

if (files.length === 0) {
  console.error("check-props-parity: matched no props files — run from the repo root");
  process.exit(2);
}

const problems = files.flatMap(check);

for (const p of problems) {
  console.error(`  ${p.message}`);
}

if (problems.length > 0) {
  console.error(`\ncheck-props-parity: ${problems.length} problem(s) across ${files.length} props classes`);
  process.exit(1);
}

console.log(`check-props-parity: ${files.length} props classes in parity`);
