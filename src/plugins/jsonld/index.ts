import * as fs from 'fs';
import * as path from 'path';
import type { Plugin } from '@docusaurus/types';
import { extractPage } from './extract';
import { classifyRoute } from './routes';
import { buildPageSchemas, buildSiteInfo, type JsonLdNode } from './schemas';

function collectHtmlFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectHtmlFiles(full));
    } else if (entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

function safeScriptJson(node: JsonLdNode): string {
  return JSON.stringify(node).replace(/</g, '\\u003c');
}

function existingTypes(html: string): Set<string> {
  const types = new Set<string>();
  const re = /"@type"\s*:\s*"([A-Za-z]+)"/g;
  let match: RegExpExecArray | null;
  while ((match = re.exec(html)) !== null) {
    types.add(match[1]);
  }
  return types;
}

export default function jsonLdPlugin(): Plugin {
  return {
    name: 'jsonld-structured-data',
    async postBuild({ outDir, siteConfig }) {
      const site = buildSiteInfo({
        siteUrl: siteConfig.url,
        baseUrl: siteConfig.baseUrl,
        siteName: siteConfig.title,
      });

      const files = collectHtmlFiles(outDir);
      for (const file of files) {
        try {
          if (path.basename(file) === '404.html') {
            continue;
          }
          const html = fs.readFileSync(file, 'utf8');
          const page = extractPage(html);
          if (!page.canonical) {
            console.warn(`[jsonld] warn: skip ${file} (no canonical)`);
            continue;
          }
          const type = classifyRoute(page, page.canonical);
          const existing = existingTypes(html);
          const includeBreadcrumb = !existing.has('BreadcrumbList');
          const schemas = buildPageSchemas(page, type, site, includeBreadcrumb).filter(
            (node) => !existing.has(String(node['@type'])),
          );
          if (schemas.length === 0) {
            console.warn(`[jsonld] warn: skip ${file} (no schemas)`);
            continue;
          }
          const tag = schemas
            .map((node) => `<script type="application/ld+json">${safeScriptJson(node)}</script>`)
            .join('\n');

          const headClose = html.lastIndexOf('</head>');
          if (headClose === -1) {
            console.warn(`[jsonld] warn: skip ${file} (no </head>)`);
            continue;
          }
          const next = `${html.slice(0, headClose)}\n${tag}\n${html.slice(headClose)}`;
          fs.writeFileSync(file, next);
        } catch (error) {
          console.warn(`[jsonld] warn: ${file}`, error);
        }
      }
    },
  };
}