import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Fragment, JSX } from 'react';
import GithubProjectPHPHome from '@site/repos/github-project-php-docs/homepage';

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
      <Fragment>
        <GithubProjectPHPHome/>
      </Fragment>
  );
}
