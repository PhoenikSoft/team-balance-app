import { authHelper } from '../_helpers';
import { alertConstants } from '../_constants';


export const serviceHelper = {
    handleResponse,
    actionsErrorHandler,
    getRequestOptions
};

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                authHelper.logout();
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
};

function actionsErrorHandler(dispatch, errorText = alertConstants.DEFAULT_ERROR_TEXT) {
    dispatch({ type: alertConstants.ALERT_ERROR, text: errorText });
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