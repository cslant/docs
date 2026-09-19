#!/usr/bin/env node
// Post-build verifier for JSON-LD structured data injection.
// Run after `yarn build`:  node scripts/check-jsonld.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outDir = process.argv[2] || path.join(root, 'build');

let pass = 0;
let skip = 0;
const failures = [];

function fail(rel, message) {
  failures.push(`${rel}: ${message}`);
}

function walk(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

function parseScripts(html) {
  const scripts = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      scripts.push(JSON.parse(m[1]));
    } catch (e) {
      scripts.push({ __parseError: String(e) });
    }
  }
  return scripts;
}

const landingBases = ['laravel-like', 'github-project-php', 'telegram-git-notifier'];

for (const file of walk(outDir)) {
  const rel = path.relative(outDir, file).replace(/\\/g, '/');
  if (rel === '404.html') {
    skip++;
    continue;
  }

  const html = fs.readFileSync(file, 'utf8');

  if (!html.includes('application/ld+json')) {
    fail(rel, 'no application/ld+json script found');
    continue;
  }

  const scripts = parseScripts(html);
  let broken = false;
  const types = new Set();
  for (const s of scripts) {
    if (s.__parseError) {
      fail(rel, `invalid JSON-LD JSON: ${s.__parseError}`);
      broken = true;
      continue;
    }
    for (const t of Array.isArray(s['@type']) ? s['@type'] : [s['@type']]) {
      if (t) types.add(t);
    }
    if (!s['@context'] || !s['@type']) {
      fail(rel, 'script missing @context or @type');
      broken = true;
    }
  }
  if (broken) continue;

  if (!types.has('Organization')) fail(rel, 'missing Organization');
  if (!types.has('WebSite')) fail(rel, 'missing WebSite');
  if (!types.has('WebPage') && !types.has('BlogPosting')) fail(rel, 'missing WebPage/BlogPosting');

  if (types.has('BreadcrumbList')) {
    const bc = scripts.find((s) => s['@type'] === 'BreadcrumbList');
    const items = (bc && bc.itemListElement) || [];
    if (items.length === 0) {
      fail(rel, 'BreadcrumbList empty');
    } else {
      items.forEach((it, i) => {
        if (it.position !== i + 1) fail(rel, `BreadcrumbList position mismatch at ${i}`);
      });
    }
  }

  if (landingBases.includes(rel.replace(/\.html$/, ''))) {
    if (!types.has('SoftwareApplication')) fail(rel, 'landing page missing SoftwareApplication');
  }

  if (/^blog\/[^/]+\.html$/.test(rel) || /^blog\/.+\/index\.html$/.test(rel)) {
    if (!types.has('BlogPosting')) fail(rel, 'blog post missing BlogPosting');
  }

  if (/prism-code/.test(html) && !types.has('SoftwareSourceCode')) {
    fail(rel, 'page with code block missing SoftwareSourceCode');
  }

  const hasFaq =
    /<details[\s>]/.test(html) ||
    /<h[1-6][^>]*>[^<]{0,80}?Frequently Asked Questions/i.test(html);
  if (hasFaq && !types.has('FAQPage')) {
    fail(rel, 'page with FAQ missing FAQPage');
  }

  const codeTexts = [...html.matchAll(/<pre[^>]*>([\s\S]*?)<\/pre>/g)]
    .map((m) => m[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim())
    .filter((t) => t.length >= 30);
  const scriptBlob = scripts.map((s) => JSON.stringify(s)).join('\n');
  const leak = codeTexts.find((text) => scriptBlob.includes(text));
  if (leak) fail(rel, `code body leaked into JSON-LD (${leak.slice(0, 40)}…)`);

  pass++;
}

console.log(`\nJSON-LD check: ${pass} pages OK, ${skip} skipped, ${failures.length} failures.`);
if (failures.length > 0) {
  for (const f of failures) console.error(`  ✗ ${f}`);
  process.exit(1);
}
process.exit(0);