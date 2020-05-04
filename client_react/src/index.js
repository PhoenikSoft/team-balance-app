import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {  routerMiddleware } from 'connected-react-router';
import * as History from 'history'
import thunk from 'redux-thunk'
import { createStore, applyMiddleware, compose } from 'redux';
import createRootReducer from './reducers';
import App from './components/App';

export const history = History.createBrowserHistory()

const enhancers = []
const middleware = [thunk, routerMiddleware(history)];

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

const store = createStore(
  createRootReducer(history),
  {},
  composedEnhancers
);

render(
  <Provider store={store}>
    {/* <ConnectedRouter history={history}> */}
      <App />
    {/* </ConnectedRouter> */}
  </Provider>,
  document.getElementById('root')
);
