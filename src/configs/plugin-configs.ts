export const TelegramGitNotifierConfig = {
  id: 'telegram-git-notifier',
  path: './repo/telegram-git-notifier-docs',
  routeBasePath: 'telegram-git-notifier',
  sidebarPath: require.resolve('./repo/telegram-git-notifier-docs/sidebar.ts'),
  editUrl: ({ docPath }) => `https://github.com/cslant/telegram-git-notifier-docs/edit/main/${docPath}`,
  showLastUpdateAuthor: true,
  showLastUpdateTime: true,
};

export const LaravelLikeConfig = {
  id: 'laravel-like',
  path: './repo/laravel-like-docs',
  routeBasePath: 'laravel-like',
  sidebarPath: require.resolve('./repo/laravel-like-docs/sidebar.ts'),
  editUrl: ({ docPath }) => `https://github.com/cslant/laravel-like-docs/edit/main/${docPath}`,
  showLastUpdateAuthor: true,
  showLastUpdateTime: true,
};
