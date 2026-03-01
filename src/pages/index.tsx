import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
import CSlantLogoBanner from '@site/static/img/cslant-logo.svg';
import styles from './home/index.module.css';
import Head from '@docusaurus/core/lib/client/exports/Head';
import React, { JSX, useEffect, useState } from 'react';
import { useMouseGlow } from '@site/src/components/useMouseGlow';
import MouseGlowOverlay from '@site/src/components/MouseGlowOverlay';

const typingTexts = ['Laravel Packages', 'PHP Applications', 'Open Source Tools', 'Developer Resources'];

function useTypingEffect(texts: string[], speed = 80, pause = 2000) {
  const [display, setDisplay] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplay(current.slice(0, charIndex + 1));
        setCharIndex(c => c + 1);
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setDisplay(current.slice(0, charIndex - 1));
        setCharIndex(c => c - 1);
        if (charIndex <= 1) {
          setIsDeleting(false);
          setTextIndex((textIndex + 1) % texts.length);
        }
      }
    }, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex, texts, speed, pause]);

  return display;
}

function HomepageHeader() {
  const typedText = useTypingEffect(typingTexts);
  const { glow, onMouseMove, onMouseLeave } = useMouseGlow();

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

      <header
        className={styles.heroBanner}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <MouseGlowOverlay glow={glow} color="rgba(46, 133, 85, 0.15)" />
        <div className="container">
          <div className={styles.main_docs__banner}>
            <div className={styles.main_docs__left_header}>
              <div className={styles.main_docs__badge}>📖 Open Source Documentation</div>
              <Heading as="h1" className={`hero__title text--left ${styles.main_docs__title_banner}`}>
                Documentation
              </Heading>
              <p className={`hero__subtitle text--left ${styles.main_docs__content_banner}`}>
                The documentation provides comprehensive guidelines and resources to help developers seamlessly integrate
                <span style={{ fontWeight: 'bold' }} className={styles.main_docs__title_banner}> CSlant's </span>
                tools and features into their projects.
              </p>
              <p className={`text--left ${styles.main_docs__typed_text}`}>
                Explore: <span className={styles.main_docs__typed_value}>{typedText}</span>
                <span className={styles.main_docs__cursor}>|</span>
              </p>
              <div className={styles.main_docs__get_started_container}>
                <a href={'/laravel-like'} className={styles.main_docs__get_started}>
                  🚀 Get Started
                </a>
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
