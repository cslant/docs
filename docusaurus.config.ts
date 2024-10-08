import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import navbar from "./src/configs/navbar";
import { LaravelLikePackageConfig, TelegramGitNotifierPackageConfig } from "./pluginConfigs";
import { RepoDocsStatic } from "./src/configs/staticDirectories";
require('dotenv').config();

const config: Config = {
  title: process.env.BASE_NAME || 'CSlant Docs',
  tagline: 'Documentation for CSlant projects',
  favicon: 'img/favicon.ico',

  url: process.env.DOCS_URL || 'https://docs.cslant.com',

  baseUrl: process.env.BASE_URL || '/',
  organizationName: process.env.ORGANIZATION_NAME,
  projectName: process.env.PROJECT_NAME,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  
  staticDirectories: [
    ...RepoDocsStatic,
    'static',
  ] as Config['staticDirectories'],

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './src/configs/sidebars.ts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/cslant-logo-horizontal.png',
    navbar: navbar as Preset.ThemeConfig['navbar'],

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
      appId: process.env.ALGOLIA_APP_ID,
      apiKey: process.env.ALGOLIA_API_KEY,
      indexName: process.env.ALGOLIA_INDEX_NAME,
      contextualSearch: true,
      externalUrlRegex: 'external\\.com|domain\\.com',
      searchParameters: {},
      searchPagePath: process.env.ALGOLIA_SEARCH_PAGE_PATH,
    },

    theme: {
      customCss: require.resolve('./repos/telegram-git-notifier-docs/homepage/styles.scss'),
    }
  } satisfies Preset.ThemeConfig,

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      TelegramGitNotifierPackageConfig,
    ],
    [
      '@docusaurus/plugin-content-docs',
      LaravelLikePackageConfig,
    ],
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: process.env.GOOGLE_ANALYTICS_ID,
        anonymizeIP: true,
      },
    ],
    ['docusaurus-plugin-sass', {}]
  ],
  baseUrlIssueBanner: false
};

export default config;
