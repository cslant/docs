import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { Fragment, JSX } from 'react';
import GithubProjectHome from '@site/repos/github-project-php-docs/homepage';

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
      <Fragment>
        <GithubProjectHome/>
      </Fragment>
  );
}
