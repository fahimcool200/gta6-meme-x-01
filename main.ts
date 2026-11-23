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

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// A post address looks like https://x.com/<handle>/status/<digits>.
// Refuse the starter's placeholder instead of copying it through,
// so a forgotten POST.json fails loudly here rather than at the gate.
const POST_URL = /^https:\/\/(www\.|mobile\.)?(x\.com|twitter\.com)\/[^/]+\/status\/\d+$/;

const postPath = join(BOT_DIR, 'POST.json');
const post = JSON.parse(readFileSync(postPath, 'utf8')) as { url?: unknown };
if (typeof post.url !== 'string' || !POST_URL.test(post.url)) {
  console.error(`POST.json does not name an X post address: ${String(post.url)}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(postPath, join(OUTPUT_DIR, 'POST.json'));
  console.log(`POST.json copied for post ${post.url}`);
} catch (err) {
  console.error(`POST.json could not be copied from ${BOT_DIR}: ${(err as Error).message}`);
  process.exit(1);
}
