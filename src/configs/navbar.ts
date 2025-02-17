const Navbar = {
  hideOnScroll: true,
  title: 'CSlant',
  logo: {
    alt: 'CSlant Logo',
    src: 'img/cslant-logo.svg',
  },
  items: [
    {
      type: 'doc',
      docId: 'index',
      label: 'Our Website',
      href: 'https://cslant.com',
      position: 'left',
    },
    {
      type: 'doc',
      docId: 'index',
      href: '/',
      label: 'Home',
      position: 'right',
    },
    {
      type: 'dropdown',
      label: 'Repositories',
      position: 'right',
      items: [
        {
          label: 'Telegram Git Notifier Package',
          href: '/telegram-git-notifier',
          id: 'telegram-git-notifier',
        }, {
          label: 'Laravel Like Package',
          href: '/laravel-like',
          id: 'laravel-like',
        },
        {
          label: 'Github Project PHP',
          href: '/github-project-php',
          id: 'github-project-php',
        }
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

export default Navbar;
