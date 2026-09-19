import type {
  PageData,
  BreadcrumbItem,
  CodeBlockData,
  FaqItem,
} from './extract';
import type { RouteType } from './routes';

export interface SiteInfo {
  siteUrl: string;
  baseUrl: string;
  siteName: string;
  orgName: string;
  orgUrl: string;
  orgLogo: string;
  sameAs: string[];
}

export type JsonLdNode = Record<string, unknown>;

export function buildSiteInfo(options: {
  siteUrl: string;
  baseUrl: string;
  siteName: string;
}): SiteInfo {
  const siteUrl = options.siteUrl.replace(/\/+$/, '');
  const baseUrl = options.baseUrl;
  return {
    siteUrl,
    baseUrl,
    siteName: options.siteName,
    orgName: 'CSlant',
    orgUrl: 'https://cslant.com',
    orgLogo: `${siteUrl}${baseUrl}img/cslant-logo-horizontal.png`,
    sameAs: ['https://github.com/cslant'],
  };
}

export function buildOrganization(site: SiteInfo): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${site.orgUrl}/#organization`,
    name: site.orgName,
    url: site.orgUrl,
    logo: site.orgLogo,
    sameAs: site.sameAs,
  };
}

export function buildWebSite(site: SiteInfo): JsonLdNode {
  const websiteUrl = `${site.siteUrl}${site.baseUrl}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${websiteUrl}#website`,
    name: site.siteName,
    url: websiteUrl,
    publisher: { '@id': `${site.orgUrl}/#organization` },
  };
}

function absoluteUrl(href: string | null, site: SiteInfo): string | null {
  if (!href) {
    return null;
  }
  try {
    return new URL(href, `${site.siteUrl}${site.baseUrl}`).toString();
  } catch {
    return href;
  }
}

export function buildWebPage(
  page: PageData,
  site: SiteInfo,
  includeBreadcrumb: boolean,
): JsonLdNode {
  const id = `${page.canonical}#webpage`;
  const node: JsonLdNode = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': id,
    url: page.canonical ?? undefined,
    name: page.title,
    headline: page.headline ?? page.title,
    description: page.description ?? undefined,
    inLanguage: 'en',
    dateModified: page.dateModified ?? undefined,
    isPartOf: { '@id': `${site.siteUrl}${site.baseUrl}#website` },
    publisher: { '@id': `${site.orgUrl}/#organization` },
  };
  if (includeBreadcrumb && page.canonical) {
    node.breadcrumb = { '@id': `${page.canonical}#breadcrumb` };
  }
  return node;
}

export function buildBreadcrumbList(page: PageData, site: SiteInfo): JsonLdNode {
  const items: BreadcrumbItem[] = [{ name: 'Home', href: `${site.siteUrl}${site.baseUrl}` }];
  const seen = new Set<string>();

  for (const crumb of page.breadcrumbs) {
    const key = crumb.name.toLowerCase();
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    items.push(crumb);
  }

  const last = items[items.length - 1];
  if (last && last.name.toLowerCase() !== page.title.toLowerCase()) {
    items.push({ name: page.title, href: null });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    '@id': `${page.canonical}#breadcrumb`,
    itemListElement: items.map((item, index) => {
      const entry: JsonLdNode = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
      };
      const url = absoluteUrl(item.href, site);
      if (url && index !== items.length - 1) {
        entry.item = url;
      }
      return entry;
    }),
  };
}

export function buildCodeSource(
  code: CodeBlockData,
  canonical: string,
  index: number,
): JsonLdNode {
  const node: JsonLdNode = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    '@id': `${canonical}#code-${index + 1}`,
    name: code.title ?? 'Code example',
    codeSampleType: 'full example',
    isAccessibleForFree: true,
    about: { '@id': `${canonical}#webpage` },
  };
  if (code.language) {
    node.programmingLanguage = code.language;
  }
  return node;
}

export function buildFaqPage(items: FaqItem[], canonical: string): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${canonical}#faq`,
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export function buildSoftwareApplication(
  page: PageData,
  site: SiteInfo,
): JsonLdNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${page.canonical}#software`,
    name: page.title,
    url: page.canonical ?? undefined,
    description: page.description ?? undefined,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Any',
    publisher: { '@id': `${site.orgUrl}/#organization` },
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
  };
}

export function buildBlogPosting(page: PageData, site: SiteInfo): JsonLdNode {
  const id = `${page.canonical}#article`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': id,
    headline: page.title,
    url: page.canonical ?? undefined,
    description: page.description ?? undefined,
    datePublished: page.dateModified ?? undefined,
    dateModified: page.dateModified ?? undefined,
    author: { '@type': 'Organization', name: site.orgName },
    publisher: { '@id': `${site.orgUrl}/#organization` },
    mainEntityOfPage: { '@id': id },
  };
}

export function buildPageSchemas(
  page: PageData,
  type: RouteType,
  site: SiteInfo,
  includeBreadcrumb: boolean,
): JsonLdNode[] {
  const schemas: JsonLdNode[] = [
    buildOrganization(site),
    buildWebSite(site),
  ];

  const needsWebPage = type !== 'blogPost';
  if (needsWebPage) {
    schemas.push(buildWebPage(page, site, includeBreadcrumb));
  }

  if (type === 'blogPost') {
    schemas.push(buildBlogPosting(page, site));
  } else if (type === 'landing') {
    schemas.push(buildSoftwareApplication(page, site));
  }

  if (includeBreadcrumb && (page.breadcrumbs.length > 0 || type === 'home' || type === 'landing')) {
    schemas.push(buildBreadcrumbList(page, site));
  }

  for (const [index, code] of page.codeBlocks.entries()) {
    schemas.push(buildCodeSource(code, page.canonical ?? '', index));
  }

  if (page.faqItems.length > 0) {
    schemas.push(buildFaqPage(page.faqItems, page.canonical ?? ''));
  }

  return schemas;
}