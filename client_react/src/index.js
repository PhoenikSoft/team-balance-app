import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'connected-react-router';
import * as History from 'history';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import createRootReducer from './reducers';
import App from './components/App';
import { alertConstants } from './_constants';
import ErrorBoundary from './components/ErrorBoundary';

export const history = History.createBrowserHistory();

const enhancers = []
const middleware = [thunk, routerMiddleware(history)];

const composedEnhancers = compose(
    applyMiddleware(...middleware),
    ...enhancers
);

global.fetchWithLoader = (...args) => {
    store.dispatch({ type: alertConstants.LOADING_STARTED })
    return fetch(...args).then(response => {
        store.dispatch({ type: alertConstants.LOADING_FINISHED });
        return response;
    });
}

export const store = createStore(
    createRootReducer(history),
    {},
    composedEnhancers
);

render(
    <Provider store={store}>
        <ErrorBoundary>
            <App />
        </ErrorBoundary>
    </Provider>,
    document.getElementById('root')
);
