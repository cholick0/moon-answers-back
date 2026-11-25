// The Moon Finally Answers Back — make.fun entry
// Writes one line, 1 to 240 characters, in the voice of the Moon
// replying at last to everyone who has stared up at it and wished.
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";

// The entry: the Moon, wry and four billion years old, tired of being
// wished upon, answers the wishers with a comeback of its own.
const ENTRY =
  "Four billion years of listening to your wishes, and not one of you ever wished me a good night back.";

// Sealed gate from competition.yaml: /output/entry.txt must be UTF-8
// text of 1 to 240 characters, not only white space, one line.
const MIN_CHARS = 1;
const MAX_CHARS = 240;

function checkEntry(text: string): void {
  const chars = [...text];
  if (chars.length < MIN_CHARS || chars.length > MAX_CHARS) {
    throw new Error(
      `entry is ${chars.length} characters, gate requires ${MIN_CHARS}-${MAX_CHARS}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only white space");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  checkEntry(ENTRY);
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", ENTRY, "utf8");
  // Read the file back and verify it is byte-for-byte what we wrote.
  const back = readFileSync("/output/entry.txt");
  if (!back.equals(Buffer.from(ENTRY, "utf8"))) {
    throw new Error("read-back mismatch: /output/entry.txt differs from ENTRY");
  }
  console.log(`wrote ${[...ENTRY].length} characters to /output/entry.txt`);
  console.log("gate check passed: 1-240 chars, one line, non-blank, byte-for-byte verified");
}

main();
