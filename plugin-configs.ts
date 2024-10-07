export const TelegramGitNotifierPackageConfig = {
  id: 'telegram-git-notifier',
  path: './repos/telegram-git-notifier-docs',
  routeBasePath: 'telegram-git-notifier',
  sidebarPath: require.resolve(`./repos/telegram-git-notifier-docs/sidebar.ts`),
  editUrl: ({ docPath }) => `https://github.com/cslant/telegram-git-notifier-docs/edit/main/${docPath}`,
  showLastUpdateAuthor: true,
  showLastUpdateTime: true,
};

export const LaravelLikePackageConfig = {
  id: 'laravel-like',
  path: './repos/laravel-like-docs',
  routeBasePath: 'laravel-like',
  sidebarPath: require.resolve('./repos/laravel-like-docs/sidebar.ts'),
  editUrl: ({ docPath }) => `https://github.com/cslant/laravel-like-docs/edit/main/${docPath}`,
  showLastUpdateAuthor: true,
  showLastUpdateTime: true,
};
