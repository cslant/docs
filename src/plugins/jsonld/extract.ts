import * as cheerio from 'cheerio';

type CheerioAPI = ReturnType<typeof cheerio.load>;

export interface BreadcrumbItem {
  name: string;
  href: string | null;
}

export interface CodeBlockData {
  title: string | null;
  language: string | null;
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface PageData {
  canonical: string | null;
  title: string;
  headline: string | null;
  description: string | null;
  breadcrumbs: BreadcrumbItem[];
  dateModified: string | null;
  author: string | null;
  htmlClass: string | null;
  codeBlocks: CodeBlockData[];
  faqItems: FaqItem[];
}

const SITE_TITLE_SUFFIX = /(?:\s*[|·–-]+\s*)?CSlant Documentation\s*$/i;

function collapse(text: string): string {
  return text.replace(/[\u200b\u200c\u200d\u2060\ufeff]+/g, '').replace(/\s+/g, ' ').trim();
}

function titleWithoutSiteSuffix(title: string): string {
  return title.replace(SITE_TITLE_SUFFIX, '').trim();
}

function languageFromClass(className: string | undefined): string | null {
  if (!className) {
    return null;
  }
  const match = className.match(/\blanguage-([a-zA-Z0-9+#-]+)/);
  return match ? match[1] : null;
}

function extractCodeBlocks($: CheerioAPI): CodeBlockData[] {
  const blocks: CodeBlockData[] = [];

  $('.theme-code-block').each((_, el) => {
    const container = $(el);
    const pre = container.find('pre.prism-code').first();
    if (pre.length) {
      const title = collapse(container.find('[class*="codeBlockTitle"]').first().text()) || null;
      const language = languageFromClass(pre.attr('class'));
      blocks.push({ title, language, text: pre.text() });
    }
  });

  $('pre.prism-code').each((_, el) => {
    const pre = $(el);
    if (pre.closest('.theme-code-block').length) {
      return;
    }
    blocks.push({
      title: null,
      language: languageFromClass(pre.attr('class')),
      text: pre.text(),
    });
  });

  return blocks;
}

function extractDetailsFaq($: CheerioAPI): FaqItem[] {
  const items: FaqItem[] = [];
  $('details').each((_, el) => {
    const details = $(el);
    const summary = details.find('summary').first();
    summary.find('[aria-hidden="true"], [class*="faqToggle"]').remove();
    const question = collapse(summary.text());
    if (!question) {
      return;
    }
    summary.remove();
    const answer = collapse(details.text());
    if (answer) {
      items.push({ question, answer });
    }
  });
  return items;
}

interface HeadingCandidate {
  tagName?: string;
}

function headingLevel(el: HeadingCandidate): number {
  const tag = el.tagName ? el.tagName.toLowerCase() : '';
  return /^h[1-6]$/.test(tag) ? parseInt(tag.slice(1), 10) : 0;
}

function extractHeadingFaq($: CheerioAPI): FaqItem[] {
  const scope = $('.theme-doc-markdown').first();
  if (!scope.length) {
    return [];
  }

  const children = scope.children().toArray();
  const faqRegex = /frequently asked questions|^faq$/i;

  let faqIdx = -1;
  for (let i = 0; i < children.length; i++) {
    const level = headingLevel(children[i]);
    if (level > 0 && faqRegex.test(collapse($(children[i]).text()))) {
      faqIdx = i;
      break;
    }
  }
  if (faqIdx < 0) {
    return [];
  }

  const faqLevel = headingLevel(children[faqIdx]);
  const questionLevel = faqLevel + 1;
  const items: FaqItem[] = [];
  let current: FaqItem | null = null;

  for (let i = faqIdx + 1; i < children.length; i++) {
    const el = children[i];
    const level = headingLevel(el);
    if (level > 0 && level <= faqLevel) {
      break;
    }
    if (level === questionLevel) {
      if (current && current.answer) {
        items.push(current);
      }
      current = { question: collapse($(el).text()), answer: '' };
    } else if (current && level === 0) {
      const text = collapse($(el).text());
      if (text) {
        current.answer = current.answer ? `${current.answer} ${text}` : text;
      }
    }
  }
  if (current && current.answer) {
    items.push(current);
  }

  return items;
}

export function extractPage(html: string): PageData {
  const $ = cheerio.load(html);

  const canonical = $('link[rel="canonical"]').attr('href') ?? null;
  const title = titleWithoutSiteSuffix(collapse($('title').text())) || '';

  const headline = collapse(
    $('.theme-doc-markdown h1').first().text() ||
      $('article h1').first().text() ||
      $('main h1').first().text(),
  ) || null;

  const description = $('meta[name="description"]').first().attr('content') ?? null;

  const breadcrumbs: BreadcrumbItem[] = [];
  $('a.breadcrumbs__link').each((_, el) => {
    const name = collapse($(el).text());
    if (name) {
      breadcrumbs.push({ name, href: $(el).attr('href') ?? null });
    }
  });

  const dateModified = $('time[itemprop="dateModified"]').attr('datetime') ?? null;
  const author = collapse($('span.theme-last-updated b').last().text()) || null;
  const htmlClass = $('html').attr('class') ?? null;

  const codeBlocks = extractCodeBlocks($);
  const faqItems = [...extractDetailsFaq($), ...extractHeadingFaq($)].slice(0, 20);

  return {
    canonical,
    title,
    headline,
    description,
    breadcrumbs,
    dateModified,
    author,
    htmlClass,
    codeBlocks,
    faqItems,
  };
}