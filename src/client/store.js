import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import app from './reducers/app';

const devCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const lazyReducerEnhancer = (next) => (reducer, state) => {
  let lazyReducer = {};
  const nextStore = next(reducer, state);

  return {
    ...nextStore,
    addReducer(newReducer) {
      lazyReducer = { ...lazyReducer, ...newReducer };

      this.replaceReducer(combineReducers(lazyReducer));
    }
  };
};

const store = createStore(
  state => state,
  devCompose(
    lazyReducerEnhancer,
    applyMiddleware(thunk)
  )
);

store.addReducer({ app });

export default store;