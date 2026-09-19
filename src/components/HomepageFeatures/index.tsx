import React, { JSX } from 'react';
import styles from './styles.module.css';
import SoftCard from '@site/src/components/softui/SoftCard';
import SectionHeader from '@site/src/components/softui/SectionHeader';

type FeatureItem = {
  title: string;
  emoji: string;
  description: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    emoji: '🚀',
    description:
      'CSlant offers a variety of tools and resources to help developers seamlessly utilize its convenient tools and features within their projects.',
  },
  {
    title: 'Open Source Projects',
    emoji: '💡',
    description:
      'CSlant is committed to open-source projects, offering a variety of tools and resources for developers.',
  },
  {
    title: 'Technology Expertise',
    emoji: '⚡',
    description: 'Specializes in modern web development frameworks, promoting best practices.',
  },
  {
    title: 'Innovative Solutions',
    emoji: '🔧',
    description:
      'Offers integrations to streamline software automation and improve notification systems.',
  },
  {
    title: 'Flexible Development Tools',
    emoji: '🎯',
    description:
      'CSlant offers customizable packages with clear docs for seamless integration and efficient use.',
  },
  {
    title: 'Documentation and Support',
    emoji: '📚',
    description: 'Actively maintaining clear and user-friendly documentation for all projects.',
  },
];

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <SectionHeader
          title="Why CSlant?"
          subtitle="Powerful tools and resources designed to make your development experience seamless and enjoyable."
        />
        <div className={styles.main_docs__grid_container}>
          {FeatureList.map((feature, idx) => (
            <SoftCard key={idx} delay={idx * 0.1}>
              <div className={styles.main_docs__icon}>{feature.emoji}</div>
              <h3 className={styles.main_docs__title_block}>{feature.title}</h3>
              <p className="m-0">{feature.description}</p>
            </SoftCard>
          ))}
        </div>
      </div>
    </section>
  );
}