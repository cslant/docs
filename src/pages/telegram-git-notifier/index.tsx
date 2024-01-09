import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import TelegramGitNotifierHome from "@site/repo/telegram-git-notifier-docs/homepage";
import {Fragment} from "react";

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
      <Fragment>
          <TelegramGitNotifierHome />
      </Fragment>
  );
}
