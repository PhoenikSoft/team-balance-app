import config from '../config';
import { serviceHelper } from '../_helpers';
import { authHeader } from '../_helpers';

const FEEDBACK_URL = '/api/feedbacks';

export const feedBackService = {
    leaveFeedBack
};


function leaveFeedBack(message) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', ...authHeader() },
        body: JSON.stringify({ message })
    };

    return fetch(`${config.apiUrl}${FEEDBACK_URL}`, requestOptions)
        .then(serviceHelper.handleResponse)
};