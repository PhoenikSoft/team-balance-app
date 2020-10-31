import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { routerMiddleware } from 'connected-react-router';
import * as History from 'history';
import thunk from 'redux-thunk';
import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";
import { createStore, applyMiddleware, compose } from 'redux';
import createRootReducer from './reducers';
import App from './components/App';
import { alertConstants, resources } from './_constants';
import ErrorBoundary from './components/ErrorBoundary';

i18next.use(initReactI18next)
    .use(detector)
    .init({
        resources,
        fallbackLng: 'ru',
        whitelist: ['uk', 'en', 'ru']
    });

const history = History.createBrowserHistory();

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

const store = createStore(
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

export { store, history, i18next };