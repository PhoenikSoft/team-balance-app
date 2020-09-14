import { authHelper } from '.';
import { alertConstants } from '../_constants';
import { store } from '../index';


export const serviceHelper = {
    handleResponse,
    actionsErrorHandler,
    getRequestOptions
};

function handleResponse(response) {
    _setNewJwt(response);
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                authHelper.logout();
            };

            const error = (data && data.errors && data.errors.name && data.errors.name.length !== 0
                && data.errors.name.toString()) || data.message || data.msg || response.statusText;
            return Promise.reject(error);
        };
        return data;
    });
};

// call this function in catch or elsewhere to show error snack bar
function actionsErrorHandler(errorText) {
    if (!errorText || typeof errorText !== 'string') {
        errorText = alertConstants.DEFAULT_ERROR_TEXT;
    };
    store.dispatch({ type: alertConstants.ALERT_ERROR, text: errorText });
};

function getRequestOptions(method, headers = {}, body) {
    const requestOptions = {
        method,
        headers: { 'Content-Type': 'application/json', ...headers }
    };
    return body
        ? { ...requestOptions, body: JSON.stringify(body) }
        : requestOptions;
}

function _setNewJwt(response) {
    const newToken = response.headers.get('APP_NEW_JWT');
    if (!newToken) return;
    authHelper.setUserToken(newToken);
}