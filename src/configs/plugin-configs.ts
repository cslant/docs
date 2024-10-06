export const TelegramGitNotifierConfig = (path: string) => ({
  id: 'telegram-git-notifier',
  path,
  routeBasePath: 'telegram-git-notifier',
  sidebarPath: require.resolve(`${path}/sidebar.ts`),
  editUrl: ({ docPath }) => `https://github.com/cslant/telegram-git-notifier-docs/edit/main/${docPath}`,
  showLastUpdateAuthor: true,
  showLastUpdateTime: true,
});

export const LaravelLikeConfig = {
  id: 'laravel-like',
  path: '../../repos/laravel-like-docs',
  routeBasePath: 'laravel-like',
  sidebarPath: require.resolve('../../repos/laravel-like-docs/sidebar.ts'),
  editUrl: ({ docPath }) => `https://github.com/cslant/laravel-like-docs/edit/main/${docPath}`,
  showLastUpdateAuthor: true,
  showLastUpdateTime: true,
};
