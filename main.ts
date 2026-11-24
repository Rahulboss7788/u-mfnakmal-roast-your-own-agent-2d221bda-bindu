import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One original roast of my own AI agent: asked for one line, it answers
// with a thesis. The line itself is the entry.
const line =
  "I asked my agent a one-line question and got back a thesis with footnotes, an appendix and a bibliography — for a question I had already forgotten.";

const outDir = "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, line, "utf8");

// Read-back self-check: the written file must be exactly the line, one
// line of 1-200 characters, valid UTF-8, not only whitespace.
const back = readFileSync(outPath, "utf8");
if (back !== line) throw new Error("read-back mismatch: entry.txt differs from the line");
const count = [...back].length;
if (count < 1 || count > 200) throw new Error(`gate failed: ${count} characters, need 1-200`);
if (back.trim().length === 0) throw new Error("gate failed: entry is only whitespace");
console.log(`Wrote ${count} characters to ${outPath} (self-check passed)`);
