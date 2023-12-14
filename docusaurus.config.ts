import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'CSlant Documentation',
  tagline: 'CSlant Documentation',
  favicon: 'img/favicon.ico',

  url: 'https://docs.cslant.com',

  baseUrl: '/',
  organizationName: 'cslant',
  projectName: 'docusaurus-docs',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      hideOnScroll: true,
      title: 'CSlant',
      logo: {
        alt: 'CSlant Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          href: 'https://github.com/cslant',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub organization',
        },
      ],
    },

    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    liveCodeBlock: {
      playgroundPosition: 'bottom',
    },

    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} CSlant`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: [
        'java',
        'latex',
        'haskell',
        'matlab',
        'php',
        'bash',
        'diff',
        'json',
        'scss',
      ],
    },
    algolia: {
      appId: 'OC7DGVG52Q',
      apiKey: '2b3a0faf8ee2668b91552fa37281f124',
      indexName: 'cslant_docs',

      contextualSearch: true,
      externalUrlRegex: 'external\\.com|domain\\.com',
      searchParameters: {},
      searchPagePath: 'search',
    },
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'telegram-git-notifier',
        path: './repo/telegram-git-notifier-docs',
        routeBasePath: 'telegram-git-notifier',
        sidebarPath: require.resolve('./repo/telegram-git-notifier-docs/sidebar.ts'),
        editUrl: ({docPath}) => `https://github.com/cslant/telegram-git-notifier-docs/edit/main/${docPath}`,
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
      },
    ],
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-28YE6DJZ6X',
        anonymizeIP: true,
      },
    ],
    [
      '@docusaurus/plugin-sitemap',
      {
        changefreq: 'weekly',
        priority: 0.5,
        ignorePatterns: ['/tags/**'],
        filename: 'sitemap.xml',
      },
    ],
  ],
  baseUrlIssueBanner: false
};

export default config;
