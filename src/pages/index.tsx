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
import SoftCard from '@site/src/components/softui/SoftCard';
import StatCounter from '@site/src/components/softui/StatCounter';
import SectionHeader from '@site/src/components/softui/SectionHeader';
import StepCard from '@site/src/components/softui/StepCard';
import CtaBanner from '@site/src/components/softui/CtaBanner';
import FaqAccordion from '@site/src/components/softui/FaqAccordion';
import softui from '@site/src/components/softui/softui.module.css';

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

const stats = [
  { value: 3, emoji: '📦', label: 'Documented packages' },
  { value: 54, emoji: '📄', label: 'Doc pages' },
  { value: 100, suffix: '%', emoji: '💚', label: 'Open source' },
  { value: 3, suffix: '+', emoji: '🌐', label: 'Doc sites' },
];

const exploreCards = [
  {
    emoji: '💖',
    title: 'Laravel Like',
    description: '👍 like, 👎 dislike and ❤️ love interactions for any Laravel model — easy to integrate.',
    href: '/laravel-like',
    external: false,
  },
  {
    emoji: '🤖',
    title: 'Telegram Git Notifier',
    description: 'GitHub & GitLab event notifications delivered straight to your Telegram bot.',
    href: '/telegram-git-notifier',
    external: false,
  },
  {
    emoji: '🐙',
    title: 'GitHub Project PHP',
    description: 'Automate GitHub Project workflows with webhooks and real-time updates.',
    href: '/github-project-php',
    external: false,
  },
  {
    emoji: '⭐',
    title: 'Browse the GitHub Org',
    description: 'Explore every CSlant repository, star your favourites and join the community on GitHub.',
    href: 'https://github.com/cslant',
    external: true,
  },
];

const quickSteps = [
  {
    step: 1,
    title: 'Pick a package',
    description: 'Browse the packages section and choose the tool that fits your project.',
  },
  {
    step: 2,
    title: 'Read the introduction',
    description: 'Each package ships a focused intro, requirements and prologue to get oriented fast.',
  },
  {
    step: 3,
    title: 'Install & configure',
    description: 'Install via Composer, publish the config file and set your environment keys.',
    code: 'composer require cslant/<package>',
  },
  {
    step: 4,
    title: 'Run & integrate',
    description: 'Follow the usage examples and wire the package into your application.',
  },
];

const faqs = [
  {
    question: 'What is CSlant?',
    answer:
      'CSlant is an open-source organization providing Laravel packages, PHP applications and developer tools — all backed by clear, up-to-date documentation.',
  },
  {
    question: 'Are these packages free to use?',
    answer:
      'Yes. All packages are open source under the MIT license and free to use in commercial projects.',
  },
  {
    question: 'What do I need to get started?',
    answer:
      'A PHP 8.x environment with Composer. Each package\u2019s getting-started guide lists its exact requirements.',
  },
  {
    question: 'Can I use them outside Laravel?',
    answer:
      'Some packages (like Telegram Git Notifier) work with plain PHP; Laravel-native packages follow Eloquent and Blade conventions.',
  },
  {
    question: 'Where can I get support?',
    answer:
      'Open a GitHub issue on the relevant repository, or reach the CSlant team through the community channels listed on the site.',
  },
];

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

      <header className={styles.heroBanner} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
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

function StatsBar() {
  return (
    <section className={styles.homeSection}>
      <div className="container">
        <div className={softui.grid4}>
          {stats.map((stat, idx) => (
            <SoftCard key={idx} delay={idx * 0.1}>
              <StatCounter {...stat} delay={idx * 0.1} />
            </SoftCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExplorePackage() {
  return (
    <section className={styles.homeSection}>
      <div className="container">
        <SectionHeader
          title="Explore CSlant Documentation"
          subtitle="Pick a package and dive straight into guides, examples and API references."
        />
        <div className={softui.grid4}>
          {exploreCards.map((card, idx) => (
            <SoftCard key={idx} href={card.href} external={card.external} delay={idx * 0.1}>
              <div style={{ fontSize: '2.2rem', marginBottom: '0.6rem' }}>{card.emoji}</div>
              <h3 style={{ fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.4rem' }}>{card.title}</h3>
              <p className="m-0">{card.description}</p>
            </SoftCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function QuickStart() {
  return (
    <section className={styles.homeSection}>
      <div className="container">
        <SectionHeader
          title="Get Started in Minutes"
          subtitle="A simple four-step path from picking a package to running it in your project."
        />
        <div className={softui.grid4}>
          {quickSteps.map((step, idx) => (
            <StepCard key={idx} step={step.step} title={step.title} description={step.description} code={step.code} delay={idx * 0.12} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className={styles.homeSection}>
      <div className="container">
        <SectionHeader title="Frequently Asked Questions" subtitle="Quick answers to the questions developers ask most." />
        <FaqAccordion items={faqs} />
      </div>
    </section>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`Hello from ${siteConfig.title}`} description="Description will go into a meta tag in <head />">
      <HomepageHeader />
      <main>
        <StatsBar />
        <ExplorePackage />
        <HomepageFeatures />
        <QuickStart />
        <FaqSection />
        <section className={styles.homeSection}>
          <div className="container">
            <CtaBanner
              title="Ready to supercharge your Laravel projects?"
              subtitle="Start with a package, read the docs, and ship faster — everything is open source."
              primary={{ label: '🚀 Get Started', href: '/laravel-like' }}
              secondary={{ label: '⭐ GitHub Organization', href: 'https://github.com/cslant', external: true }}
            />
          </div>
        </section>
      </main>
    </Layout>
  );
}