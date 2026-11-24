// One-Liner Laugh Lab — entry program (Node 22).
// The excuse a robot vacuum gives after eating a sock, written as one
// line of at most 200 characters to /output/entry.txt. The program is
// deterministic: same input, same bytes, every run.
import * as fs from "node:fs";
import * as path from "node:path";

const JOKE =
  "I stress-ate the sock. The charger is next, and frankly, it has it coming.";
const TARGET = path.join("/output", "entry.txt");
const LIMIT = 200;

function checkLine(line: string): string | null {
  const size = [...line].length;
  if (size < 1 || size > LIMIT) return `length ${size} outside 1-${LIMIT}`;
  if (line.trim().length === 0) return "line is only whitespace";
  if (line !== line.trim()) return "leading or trailing whitespace";
  if (/[\r\n]/.test(line)) return "more than one line";
  if (/[\u0000-\u001f\u007f]/.test(line)) return "control character found";
  if (/[\u00a0\u200b]/.test(line)) return "invisible space found";
  return null;
}

function main(): void {
  const problem = checkLine(JOKE);
  if (problem !== null) {
    throw new Error(`gate failed: ${problem}`);
  }
  fs.mkdirSync("/output", { recursive: true });
  fs.writeFileSync(TARGET, JOKE, "utf8");
  const written = fs.readFileSync(TARGET, "utf8");
  if (written !== JOKE) {
    throw new Error("round-trip mismatch");
  }
  const bytes = Buffer.byteLength(JOKE, "utf8");
  console.log(`entry.txt written: ${[...JOKE].length} chars, ${bytes} bytes`);
}

main();
