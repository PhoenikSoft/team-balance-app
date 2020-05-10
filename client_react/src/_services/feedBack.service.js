import config from '../config';
import { serviceHelper,authHelper } from '../_helpers';
import { apiConstants } from '../_constants';

export const feedBackService = {
    leaveFeedBack
};

function leaveFeedBack(message) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHelper.authHeader() },
        body: JSON.stringify({ message })
    };

    return fetch(`${config.apiUrl}${apiConstants.FEEDBACK_URL}`, requestOptions)
        .then(serviceHelper.handleResponse)
};