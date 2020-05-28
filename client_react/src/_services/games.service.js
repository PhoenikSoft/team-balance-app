import { serviceHelper, authHelper } from '../_helpers';
import { apiConstants, constructUrl } from '../_constants';

export const gamesService = {
    deleteGame,
    addGame,
    getGame
}

function deleteGame(gameId, groupId) {
    return global.fetchWithLoader(
        constructUrl(apiConstants.GAME(groupId, gameId)),
        serviceHelper.getRequestOptions('DELETE', authHelper.authHeader()))
        .then(serviceHelper.handleResponse);
};

function addGame(game, groupId) {
    return global.fetchWithLoader(
        constructUrl(apiConstants.GAMES(groupId)),
        serviceHelper.getRequestOptions('POST', authHelper.authHeader(), game))
        .then(serviceHelper.handleResponse);
}

function getGame(gameId, groupId) {
    return global.fetchWithLoader(
        constructUrl(apiConstants.GAME(groupId, gameId)),
        serviceHelper.getRequestOptions('GET', authHelper.authHeader()))
        .then(serviceHelper.handleResponse);
}