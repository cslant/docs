import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {Fragment} from "react";
import LaravelLikePackageHome from "@site/repos/laravel-like-docs/homepage";

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
      <Fragment>
          <LaravelLikePackageHome />
      </Fragment>
  );
}
