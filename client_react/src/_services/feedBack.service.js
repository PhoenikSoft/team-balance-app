import config from '../config';
import { serviceHelper, authHelper } from '../_helpers';
import { apiConstants } from '../_constants';

export const feedBackService = {
    leaveFeedBack
};

function leaveFeedBack(message) {
    const requestOptions = serviceHelper.getRequestOptions('POST', authHelper.authHeader(), message);
    return global.fetchWithLoader(`${config.apiUrl}${apiConstants.FEEDBACK_URL}`, requestOptions)
        .then(serviceHelper.handleResponse);
}