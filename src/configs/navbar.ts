const Navbar = {
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
          label: 'Telegram Git Notifier Package',
          href: '/telegram-git-notifier/',
        }, {
          label: 'Laravel Like Package',
          href: '/laravel-like/',
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

export default Navbar;
