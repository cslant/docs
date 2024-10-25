import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import MainDocsIcon from '@site/static/img/main-docs.svg';
import styles from './home/index.module.css';
import Head from '@docusaurus/core/lib/client/exports/Head';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
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
          <div className={`row ${styles.main_docs__banner}`}>
            <div className="col col--5 main_docs__left_header">
              <Heading as="h1" className="hero__title text--left">
                {siteConfig.title}
              </Heading>
              <p className="hero__subtitle text--left">{siteConfig.tagline}</p>
            </div>
            <div className="col col--3">
              <div className={styles.main_docs__image_container}>
                <MainDocsIcon />
                {/*<img src="img/main-docs.svg" alt="CSlant Laravel Like Package" />*/}
              </div>
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
