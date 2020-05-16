import { serviceHelper, authHelper } from '../_helpers';
import { apiConstants,constructUrl } from '../_constants';

export const gamesService = {
    deleteGame
}

function deleteGame(gameId, groupId) {
    return global.fetchWithLoader(
        constructUrl(apiConstants.GAME(groupId, gameId)),
        serviceHelper.getRequestOptions('DELETE', authHelper.authHeader()))
        .then(serviceHelper.handleResponse);
};