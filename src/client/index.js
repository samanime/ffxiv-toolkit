import './components/app';
import store from './store';
import { navigate } from './actions/app';

store.dispatch(navigate(location.pathname));

document.addEventListener('click', event => {
  if (event.path[0] instanceof HTMLAnchorElement) {
    event.preventDefault();
    store.dispatch(navigate(event.path[0].getAttribute('href')));
  }
});