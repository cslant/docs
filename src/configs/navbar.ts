// Docs-style navbar: product sections on the left as tabs (active one highlighted),
// search, external links and the call to action on the right.
const Navbar = {
  hideOnScroll: false,
  title: 'CSlant',
  logo: {
    alt: 'CSlant Logo',
    src: 'img/cslant-logo.svg',
  },
  items: [
    {
      to: '/telegram-git-notifier',
      label: 'Telegram Git Notifier',
      position: 'left',
      activeBaseRegex: '^/telegram-git-notifier',
    },
    {
      to: '/laravel-like',
      label: 'Laravel Like',
      position: 'left',
      activeBaseRegex: '^/laravel-like',
    },
    {
      to: '/github-project-php',
      label: 'Github Project PHP',
      position: 'left',
      activeBaseRegex: '^/github-project-php',
    },
    {
      type: 'search',
      position: 'right',
    },
    {
      type: 'dropdown',
      label: 'Products',
      position: 'right',
      items: [
        {
          label: 'Golemi Proxy',
          href: 'https://golemi.io/docs',
        },
      ],
    },
    {
      type: 'dropdown',
      label: 'CSlant',
      position: 'right',
      items: [
        {
          label: 'Our Website',
          href: 'https://cslant.com',
        },
      ],
    },
    {
      href: 'https://github.com/cslant',
      position: 'right',
      className: 'header-github-link',
      'aria-label': 'GitHub organization',
    },
    {
      href: 'https://cslant.com',
      label: 'Visit CSlant',
      position: 'right',
      className: 'navbar__cta',
    },
  ],
};

export default Navbar;
