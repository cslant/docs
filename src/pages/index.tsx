import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import CSlantLogoBanner from '@site/static/img/cslant-logo.svg';
import styles from './home/index.module.css';
import Head from '@docusaurus/core/lib/client/exports/Head';

function HomepageHeader() {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://docs.cslant.com" data-rh="true" />
        <meta
          name="description"
          content="Documentation for CSlant projects. You can find the documentation for Laravel packages, PHP applications, and more. This documentation is easy to use and can be integrated into any project."
          data-rh="true"
        />
        <meta
          name="keywords"
          content="laravel,php,package,documentation,laravel package,php application,laravel documentation,php documentation,cslant,cslant documentation,cslant laravel,cslant php"
          data-rh="true"
        />
        <meta name="author" content="CSlant" data-rh="true" />
        <meta name="robots" content="index, follow" data-rh="true" />
        <meta property="og:site_name" content="CSlant Documentation" data-rh="true" />
        <meta property="og:type" content="website" data-rh="true" />
        <meta property="og:title" content="CSlant Documentation" data-rh="true" />
        <meta
          property="og:description"
          content="Documentation for CSlant projects. You can find the documentation for Laravel packages, PHP applications, and more. This documentation is easy to use and can be integrated into any project."
          data-rh="true"
        />
        <meta property="og:url" content="https://docs.cslant.com" data-rh="true" />

      </Head>

      <header className={styles.heroBanner}>
        <div className="container">
          <div className={styles.main_docs__banner}>
            <div className={styles.main_docs__left_header}>
              <Heading as="h1" className={`hero__title text--left ${styles.main_docs__title_banner}`}>
                Documentation
              </Heading>
              <p className={`hero__subtitle text--left ${styles.main_docs__content_banner}`}>
                The documentation provides comprehensive guidelines and resources to help developers seamlessly integrate
                <span style={{ fontWeight: 'bold' }} className={styles.main_docs__title_banner}> CSlant's </span>
                tools and features into their projects.
              </p>
              <div className={styles.main_docs__get_started_container}>
                <a href={'/laravel-like'} className={styles.main_docs__get_started}>Get Started</a>
              </div>
            </div>
            <div className={styles.main_docs__image_container}>
              <CSlantLogoBanner title="CSlant Logo" />
            </div>
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
