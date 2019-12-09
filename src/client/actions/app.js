import routes, { defaultRoute, error404Route } from '../routes';

export const UPDATE_PAGE = 'update-page';

export const pageSelector = state => state.app.page;

export const navigate = path => dispatch => {
  const page = path === '/' ? defaultRoute : path.slice(1);

  dispatch(loadPage(routes[page] ? page : error404Route));
};

const loadPage = page => async dispatch => {
  const route = routes[page];

  const url = '/' + (page === defaultRoute ? '' : page);

  history.pushState('', route.title, url);

  /* global ga */
  ga && ga('set', 'page', url); // google analytics
  ga && ga('send', 'pageview');

  import(`.${route.source}`).then(route.then || (() => {}));

  dispatch(updatePage(page));
};

const updatePage = page => dispatch => {
  dispatch({
    type: UPDATE_PAGE,
    page
  });
};