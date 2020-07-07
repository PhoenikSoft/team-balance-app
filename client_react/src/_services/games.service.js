import { serviceHelper, authHelper } from '../_helpers';
import { apiConstants, constructUrl } from '../_constants';

export const gamesService = {
    deleteGame,
    addGame,
    getGame,
    getVotes,
    sendVotes,
    startVoting
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

function getVotes(gameId) {
    return global.fetchWithLoader(
        constructUrl(apiConstants.MY_VOTES(gameId)),
        serviceHelper.getRequestOptions('GET', authHelper.authHeader()))
        .then(serviceHelper.handleResponse);
}

function sendVotes(gameId, votes) {
    return global.fetchWithLoader(
        constructUrl(apiConstants.POST_MY_VOTES_BATCH(gameId)),
        serviceHelper.getRequestOptions('PUT', authHelper.authHeader(), {votes}))
        .then(serviceHelper.handleResponse);
}

function startVoting(groupId, gameId) {
    return global.fetchWithLoader(
        constructUrl(apiConstants.START_VOTING(groupId, gameId)),
        serviceHelper.getRequestOptions('POST', authHelper.authHeader()))
        .then(serviceHelper.handleResponse);
}