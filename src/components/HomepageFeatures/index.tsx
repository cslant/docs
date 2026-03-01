import Heading from '@theme/Heading';
import styles from './styles.module.css';
import React, { JSX, useEffect, useRef, useState } from "react";

type FeatureItem = {
  title: string;
  emoji: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    emoji: '🚀',
    description: (
      <>
        CSlant offers a variety of tools and resources to help developers seamlessly utilize its convenient tools and features within their projects.
      </>
    ),
  },
  {
    title: 'Open Source Projects',
    emoji: '💡',
    description: (
      <>
        CSlant is committed to open-source projects, offering a variety of tools and resources for developers.
      </>
    ),
  },
  {
    title: 'Technology Expertise',
    emoji: '⚡',
    description: (
      <>
         Specializes in modern web development frameworks, promoting best practices.
      </>
    ),
  },
  {
    title: 'Innovative Solutions',
    emoji: '🔧',
    description: (
      <>
        Offers integrations to streamline software automation and improve notification systems.
      </>
    ),
  },
  {
    title: 'Flexible Development Tools',
    emoji: '🎯',
    description: (
      <>
        CSlant offers customizable packages with clear docs for seamless integration and efficient use.
      </>
    ),
  },
  {
    title: 'Documentation and Support',
    emoji: '📚',
    description: (
      <>
        Actively maintaining clear and user-friendly documentation for all projects.
      </>
    ),
  },
];

function Feature({title, emoji, description, index}: FeatureItem & { index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return (
    <div
      ref={ref}
      className={styles.main_docs__features}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`,
      }}
    >
      <div className="text--center" style={{ fontSize: '2rem', marginBottom: '8px' }}>
        {emoji}
      </div>
      <div className={`'padding-horiz--md' ${styles.main_docs__content_block}`}>
        <Heading as="h3" className={`m-0 ${styles.main_docs__title_block}`}>{title}</Heading>
        <p className="m-0">{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className={`container`}>
        <div className={styles.main_docs__grid_container}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} index={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
