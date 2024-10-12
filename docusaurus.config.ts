import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import Navbar from "./src/configs/navbar";
import { LaravelLikePackageConfig, TelegramGitNotifierPackageConfig } from "./pluginConfigs";
import { RepoDocsStatic } from "./src/configs/staticDirectories";
import PrismConfig from "./src/configs/prism";
import AlgoliaConfig from "./src/configs/algolia";
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
  
  markdown: {
    mermaid: true,
  },
  
  staticDirectories: [...RepoDocsStatic, 'static'] as Config['staticDirectories'],

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
    navbar: Navbar as Preset.ThemeConfig['navbar'],

    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: false,
      },
    },

    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} CSlant`,
    },

    theme: {
      customCss: require.resolve('./repos/telegram-git-notifier-docs/assets/styles/styles.scss'),
    },
    
    colorMode: {
      defaultMode: 'light',
      disableSwitch: false,
      respectPrefersColorScheme: true,
    },
    liveCodeBlock: {
      playgroundPosition: 'bottom',
    },
    prism: PrismConfig,
    algolia: AlgoliaConfig,
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
