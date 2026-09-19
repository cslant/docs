import type { PageData } from './extract';

export type RouteType =
  | 'home'
  | 'docs'
  | 'blogList'
  | 'blogPost'
  | 'landing'
  | 'generic';

export const LANDING_BASES = ['laravel-like', 'github-project-php', 'telegram-git-notifier'];

export function classifyRoute(page: PageData, canonicalUrl: string): RouteType {
  let pathname = '/';
  try {
    pathname = new URL(canonicalUrl).pathname;
  } catch {
    pathname = canonicalUrl;
  }
  pathname = pathname.replace(/\.html$/, '');
  if (pathname.length > 1 && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  const htmlClass = page.htmlClass ?? '';
  const isBlog = htmlClass.includes('blog-wrapper');

  if (isBlog) {
    if (pathname === '/blog' || /^\/blog\/(tags|archive)(\/|$)/.test(pathname)) {
      return 'blogList';
    }
    if (pathname.startsWith('/blog/')) {
      return 'blogPost';
    }
  }

  if (pathname === '/') {
    return 'home';
  }

  const segments = pathname.split('/').filter(Boolean);
  if (segments.length === 1 && LANDING_BASES.includes(segments[0])) {
    return 'landing';
  }

  if (htmlClass.includes('plugin-docs')) {
    return 'docs';
  }

  return 'generic';
}