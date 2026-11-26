import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";

// Roomnesia: forgetting why you walked into a room the instant you
// cross its doorway. A fresh coinage for the doorway effect — the
// everyday blank that English has no single word for.
const ENTRY =
  "Roomnesia: forgetting why you walked into a room the instant you cross its doorway.";

// Self-check against the sealed gate: UTF-8 text, 1 to 140
// characters, not only whitespace. Fail loudly rather than write
// an entry the judge would never see.
if (ENTRY.length < 1 || ENTRY.length > 140 || ENTRY.trim().length === 0) {
  console.error(
    `Entry fails the gate: ${ENTRY.length} characters, must be 1-140 and non-blank.`,
  );
  process.exit(1);
}

// The grader mounts /output root-owned: create it if missing, but
// never remove the directory itself — clear only its contents.
mkdirSync("/output", { recursive: true });
for (const name of readdirSync("/output")) {
  rmSync(`/output/${name}`, { recursive: true, force: true });
}

writeFileSync("/output/entry.txt", ENTRY, "utf8");
console.log(`Wrote ${ENTRY.length} characters to /output/entry.txt`);
