import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import React, { JSX } from 'react';
import styles from './home/index.module.css';

type Package = {
  name: string;
  tag: string;
  description: string;
  to: string;
  links: { label: string; to: string }[];
};

const PACKAGES: Package[] = [
  {
    name: 'Telegram Git Notifier',
    tag: 'Laravel · PHP',
    description: 'A Telegram bot that sends GitHub and GitLab events to your chats, with messages and buttons you control from Telegram.',
    to: '/telegram-git-notifier',
    links: [
      { label: 'Installation', to: '/telegram-git-notifier/getting-started/installation' },
      { label: 'Configuration', to: '/telegram-git-notifier/getting-started/configuration' },
    ],
  },
  {
    name: 'Laravel Like',
    tag: 'Laravel',
    description: 'Like, dislike and love interactions for your Eloquent models, with counters and scopes, in a few lines of setup.',
    to: '/laravel-like',
    links: [
      { label: 'Installation', to: '/laravel-like/getting-started/installation' },
      { label: 'Configuration', to: '/laravel-like/getting-started/configuration' },
    ],
  },
  {
    name: 'Github Project PHP',
    tag: 'Laravel · PHP',
    description: 'Track GitHub Projects (v2) activity and send notifications through webhooks, with a full log of every change.',
    to: '/github-project-php',
    links: [
      { label: 'Installation', to: '/github-project-php/getting-started/installation' },
      { label: 'Webhook setup', to: '/github-project-php/getting-started/webhook-setup' },
    ],
  },
];

const RESOURCES = [
  { title: 'Golemi Proxy', description: 'Residential and datacenter proxies: product documentation.', href: 'https://golemi.io/docs' },
  { title: 'GitHub', description: 'Source code, issues and releases of every CSlant package.', href: 'https://github.com/cslant' },
  { title: 'CSlant', description: 'Who we are, our products and how to reach us.', href: 'https://cslant.com' },
];

const DESCRIPTION =
  'Documentation for CSlant projects: Laravel packages, PHP applications and developer tools, with installation, configuration and usage guides.';

function Arrow(): JSX.Element {
  return (
    <svg className={styles.arrow} viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <path d="M6 3l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout title="Documentation" description={DESCRIPTION}>
      <Head>
        <link rel="canonical" href="https://docs.cslant.com" />
        <meta name="keywords" content="laravel,php,package,documentation,laravel package,php application,cslant,cslant documentation" />
        <meta name="author" content="CSlant" />
        <meta property="og:site_name" content="CSlant Documentation" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://docs.cslant.com" />
      </Head>

      <header className={styles.hero}>
        <div className={`container ${styles.heroInner}`}>
          <p className={styles.eyebrow}>CSlant Documentation</p>
          <Heading as="h1" className={styles.title}>
            Build with CSlant packages and tools
          </Heading>
          <p className={styles.subtitle}>
            Guides and references for our open-source Laravel packages and PHP applications: install, configure and ship.
          </p>
          <div className={styles.actions}>
            <Link className={styles.primary} to="/telegram-git-notifier">
              Get started
            </Link>
            <Link className={styles.secondary} href="https://github.com/cslant">
              View on GitHub
            </Link>
          </div>
        </div>
      </header>

      <main className={`container ${styles.main}`}>
        <section>
          <div className={styles.sectionHead}>
            <Heading as="h2" className={styles.sectionTitle}>
              Packages
            </Heading>
            <p className={styles.sectionText}>Pick a package to read its guides.</p>
          </div>
          <div className={styles.packages}>
            {PACKAGES.map((pkg) => (
              <article key={pkg.name} className={styles.card}>
                <Link to={pkg.to} className={styles.cardMain}>
                  <span className={styles.tag}>{pkg.tag}</span>
                  <Heading as="h3" className={styles.cardTitle}>
                    {pkg.name}
                    <Arrow />
                  </Heading>
                  <p className={styles.cardText}>{pkg.description}</p>
                </Link>
                <div className={styles.cardLinks}>
                  {pkg.links.map((link) => (
                    <Link key={link.to} to={link.to}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section>
          <div className={styles.sectionHead}>
            <Heading as="h2" className={styles.sectionTitle}>
              More from CSlant
            </Heading>
          </div>
          <div className={styles.resources}>
            {RESOURCES.map((item) => (
              <Link key={item.title} href={item.href} className={styles.resource}>
                <span className={styles.resourceTitle}>
                  {item.title}
                  <Arrow />
                </span>
                <span className={styles.resourceText}>{item.description}</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </Layout>
  );
}
