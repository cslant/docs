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
    title: 'Easy Integration',
    description: (
      <>
        CSlant was built for simplicity, enabling you to integrate our API with ease, minimizing the setup time for your projects
      </>
    ),
  },
  {
    title: 'Comprehensive Guides',
    description: (
      <>
        Access step-by-step guides to help you navigate every feature of the CSlant API with ease.
      </>
    ),
  },
  {
    title: 'Customizable API',
    description: (
      <>
        Tailor the CSlant API to fit your project needs. Our documentation makes it easy to extend, modify, and scale your implementation.
      </>
    ),
  },
  {
    title: 'Powered by Laravel',
    description: (
      <>
        CSlant is built on Laravel, offering robust, scalable, and secure solutions, ensuring a seamless experience for developers.
      </>
    ),
  },
  {
    title: 'Developer-Centric',
    description: (
      <>
        Focused on developers, CSlant provides resources, FAQs, and examples, making your API journey smooth and productive.
      </>
    ),
  },
  {
    title: 'Reliable Support',
    description: (
      <>
        With CSlant, you're never alone. Our active support team and community are always ready to assist you with any issues or questions
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
        <div className={`${styles.main_docs__flex_container}`}>
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
