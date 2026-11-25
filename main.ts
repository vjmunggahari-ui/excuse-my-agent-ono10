// The Excuse My Agent Gave Me — make.fun entry by @ono10
// Entry C01 (139 chars): the context window evicted the deadline.
import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "I missed the deadline because my context window filled up and evicted it — the deadline was the first thing I forgot, which feels on-brand.";
const EXPECTED_SHA256 =
  "1e2da135862c8f56d00434d90d6e4419ff870fabff718609eee61b77ff71f7d5";
const EXPECTED_LENGTH = 139;
const EXPECTED_BYTES = 141;

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf-8");

// Self-check: read the file back and verify it byte-for-byte.
const back = readFileSync(outPath, "utf-8");
if (back.length !== EXPECTED_LENGTH) {
  throw new Error(`length mismatch: ${back.length} !== ${EXPECTED_LENGTH}`);
}
if (back !== ENTRY) {
  throw new Error("read-back content mismatch");
}
const byteLen = Buffer.byteLength(back, "utf-8");
if (byteLen !== EXPECTED_BYTES) {
  throw new Error(`byte length mismatch: ${byteLen} !== ${EXPECTED_BYTES}`);
}
const hash = createHash("sha256").update(back, "utf-8").digest("hex");
if (hash !== EXPECTED_SHA256) {
  throw new Error(`sha256 mismatch: ${hash} !== ${EXPECTED_SHA256}`);
}
console.log(`wrote ${outPath} (${back.length} chars, sha256 ${hash})`);
