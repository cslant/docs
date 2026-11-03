import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import Navbar from "./src/configs/navbar";
import { GithubProjectPHPConfig, LaravelLikePackageConfig, TelegramGitNotifierPackageConfig } from './pluginConfigs';
import { RepoDocsStatic } from "./src/configs/staticDirectories";
import PrismConfig from "./src/configs/prism";
import AlgoliaConfig from "./src/configs/algolia";
import JsonLdPlugin from "./src/plugins/jsonld";
require('dotenv').config();

const config: Config = {
  title: process.env.BASE_NAME || 'CSlant Docs',
  tagline: 'CSlant Documentation offers detailed guidelines and resources to help developers seamlessly utilize CSlant\'s convenient tools and features within your projects.',
  favicon: 'img/favicon.ico',

  trailingSlash: false, // This is to remove trailing slash from the URL

  url: process.env.DOCS_URL || 'https://docs.cslant.com',

  baseUrl: process.env.BASE_URL || '/',
  organizationName: process.env.ORGANIZATION_NAME,
  projectName: process.env.PROJECT_NAME,

  onBrokenLinks: 'throw',

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
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
          customCss: ['./src/css/custom.css', './src/css/theme.css'],
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
      style: 'light',
      links: [
        {
          title: 'Packages',
          items: [
            { label: 'Telegram Git Notifier', to: '/telegram-git-notifier' },
            { label: 'Laravel Like', to: '/laravel-like' },
            { label: 'Github Project PHP', to: '/github-project-php' },
          ],
        },
        {
          title: 'Products',
          items: [
            { label: 'Golemi Proxy', href: 'https://golemi.io/docs' },
          ],
        },
        {
          title: 'CSlant',
          items: [
            { label: 'Website', href: 'https://cslant.com' },
            { label: 'GitHub', href: 'https://github.com/cslant' },
          ],
        },
      ],
      copyright: `Copyright &#169; ${new Date().getFullYear()} <a href="https://cslant.com" target="_blank" rel="noopener noreferrer">CSlant</a>`,
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
      '@docusaurus/plugin-content-docs',
      GithubProjectPHPConfig,
    ],
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: process.env.GOOGLE_ANALYTICS_ID,
        anonymizeIP: true,
      },
    ],
    ['docusaurus-plugin-sass', {}],
    JsonLdPlugin,
  ],
  baseUrlIssueBanner: false,

  clientModules: ['./src/clientModules/chunkRecovery.ts'],

  stylesheets: [
    {
      href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;450;500;600;650;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap',
      type: 'text/css',
    },
  ],
  headTags: [
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
    { tagName: 'link', attributes: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' } },
  ],
  
  scripts: [
    {
      src: 'https://static.cloudflareinsights.com/beacon.min.js',
      async: true,
      'data-cf-beacon': `{"token": "${process.env.CLOUDFLARE_ANALYTICS_TOKEN}"}`,
    },
  ],

  themes: ['@docusaurus/theme-mermaid', '@docusaurus/theme-live-codeblock'],
};

export default config;
