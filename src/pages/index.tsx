import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';

import styles from './home/index.module.css';
import Head from "@docusaurus/core/lib/client/exports/Head";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <>
      <Head>
        <link rel="canonical" href="https://docs.cslant.com" data-rh="true" />
        <meta name="description"
              content="Documentation for CSlant projects. You can find the documentation for Laravel packages, PHP applications, and more. This documentation is easy to use and can be integrated into any project."
              data-rh="true" />
        <meta name="keywords"
              content="laravel,php,package,documentation,laravel package,php application,laravel documentation,php documentation,cslant,cslant documentation,cslant laravel,cslant php"
              data-rh="true" />
      </Head>

      <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container">
          <Heading as="h1" className="hero__title">
            {siteConfig.title}
          </Heading>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link className="button button--secondary button--lg" to="/telegram-git-notifier/introduction"> Docusaurus
              Tutorial - 5min ⏱️ </Link>
          </div>
        </div>
      </header>
    </>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
