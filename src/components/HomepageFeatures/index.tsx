import Heading from '@theme/Heading';
import styles from './styles.module.css';
import React from "react";

type FeatureItem = {
  title: string;
  // Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Easy to Use',
    description: (
      <>
        CSlant offers a variety of tools and resources to help developers seamlessly utilize its convenient tools and features within their projects.
      </>
    ),
  },
  {
    title: 'Open Source Projects',
    description: (
      <>
        CSlant is committed to open-source projects, offering a variety of tools and resources for developers.
      </>
    ),
  },
  {
    title: 'Technology Expertise',
    description: (
      <>
         Specializes in modern web development frameworks, promoting best practices.
      </>
    ),
  },
  {
    title: 'Innovative Solutions',
    description: (
      <>
        Offers integrations to streamline software automation and improve notification systems.
      </>
    ),
  },
  {
    title: 'Flexible Development Tools',
    description: (
      <>
        CSlant offers customizable packages with clear docs for seamless integration and efficient use.
      </>
    ),
  },
  {
    title: 'Documentation and Support',
    description: (
      <>
        Actively maintaining clear and user-friendly documentation for all projects.
      </>
    ),
  },
];

function Feature({...props}: FeatureItem) {
  const {title, description} = props;
  return (
    <div className={styles.main_docs__features}>
      <div className="text--center">
        {/*<Svg className={styles.feature_svg} role="img" />*/}
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
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
