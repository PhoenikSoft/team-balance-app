import config from '../config';
import { serviceHelper } from '../_helpers';
import { apiConstants } from '../_constants';

export const ratingService = {
    calculateRating,
};

async function calculateRating(answers) {
    const surveyAnswers = Object.values(answers).map(answer => ({ surveyValue: answer }));
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ surveyEntries: surveyAnswers }),
    };

    const res = await global.fetchWithLoader(`${config.apiUrl}${apiConstants.RATING_URL}`, requestOptions);
    return await serviceHelper.handleResponse(res);
}