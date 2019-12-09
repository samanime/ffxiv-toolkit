import { UPDATE_PAGE } from '../actions/app';

const INITIAL_STATE = {};

const reducers = {
  [UPDATE_PAGE]: (state, { page }) => ({
    ...state,
    page
  })
};

export default (state = INITIAL_STATE, { type, ...rest }) =>
  ((reducers[type] || (state => state))(state, rest));