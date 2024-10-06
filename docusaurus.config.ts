import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import { telegramGitNotifierConfig, laravelLikeConfig } from './src/configs/plugin-configs';

const config: Config = {
  title: 'CSlant Documentation',
  tagline: 'Documentation for CSlant projects',
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
    image: 'img/cslant-logo-horizontal.png',
    navbar: {
      hideOnScroll: true,
      title: 'CSlant',
      logo: {
        alt: 'CSlant Logo',
        src: 'img/cslant-logo.svg',
      },
      items: [
        {
          type: 'dropdown',
          label: 'Repositories',
          position: 'right',
          items: [
            {
              label: 'Telegram Git Notifier',
              href: '/telegram-git-notifier/',
            },
          ],
        },
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
      appId: 'QK70TDUAGZ',
      apiKey: 'bdd50828edf89cb3dafcac691af1e64f',
      indexName: 'cslant',
      contextualSearch: true,
      externalUrlRegex: 'external\\.com|domain\\.com',
      searchParameters: {},
      searchPagePath: 'search',
    },

    theme: {
      customCss: require.resolve('./repo/telegram-git-notifier-docs/homepage/styles.scss'),
    }
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      telegramGitNotifierConfig,
      laravelLikeConfig,
    ],
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-28YE6DJZ6X',
        anonymizeIP: true,
      },
    ],
    ['docusaurus-plugin-sass', {}]
  ],
  baseUrlIssueBanner: false
};

export default config;
