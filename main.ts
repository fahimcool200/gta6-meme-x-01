// Entry program for make.fun bounty "Post a GTA 6 meme on X" (gta6-meme-x-01).
// Node 22, standard library only. It copies POST.json from the repository
// root to /output/POST.json, where the gate reads it. That is all it does:
// the post itself is the entry, and the house reads the post from X
// (its first picture and its text) and hands that to the judge.
// The meme picture (meme.png) lives in this repository too, so anyone
// can see the exact picture that was posted.
//
// Run locally:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(join(BOT_DIR, 'POST.json'), join(OUTPUT_DIR, 'POST.json'));
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
