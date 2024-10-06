const navbar = {
  hideOnScroll: true,
  title: 'CSlant',
  logo: {
    alt: 'CSlant Logo',
    src: 'img/cslant-logo.svg',
  },
  items: [
    {
      type: 'dropdown',
      label: 'Repositories',
      position: 'right',
      items: [
        {
          label: 'Telegram Git Notifier',
          href: '/telegram-git-notifier/',
        },
      ],
    },
    {
      href: 'https://github.com/cslant',
      position: 'right',
      className: 'header-github-link',
      'aria-label': 'GitHub organization',
    },
  ],
};

export default navbar;
