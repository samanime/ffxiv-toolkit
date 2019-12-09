export const defaultRoute = 'home';
export const error404Route = '404';

const SITE_TITLE = "Xazure's FFXIV Toolkit";

export default {
  home: {
    source: './components/views/home.js',
    element: 'home-view',
    meta: {
      title: SITE_TITLE
    }
  },
  gear: {
    source: './components/views/gear.js',
    element: 'gear-view',
    navLabel: 'Gear Planning and Tracking',
    meta: {
      title: `Gear Planning and Tracking | ${SITE_TITLE}`
    }
  },
  cactpot: {
    source: './components/views/cactpot.js',
    element: 'cactpot-view',
    navLabel: 'Cactpot Solver',
    meta: {
      title: `Cactpot Solver | ${SITE_TITLE}`
    }
  },
  404: {
    source: './components/views/404.js',
    element: 'error404-view',
    meta: {
      title: `404 - Page Not Found | ${SITE_TITLE}`
    }
  }
};