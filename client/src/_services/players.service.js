import { serviceHelper, authHelper } from '../_helpers';
import { apiConstants, constructUrl } from '../_constants';

export const playersService = {
    addPlayersByBatch,
    deletePlayer,
    balanceTeams
}

function deletePlayer(gameId, playerId) {
    return global.fetchWithLoader(
        constructUrl(apiConstants.PLAYER(gameId, playerId)),
        serviceHelper.getRequestOptions('DELETE', authHelper.authHeader()))
        .then(serviceHelper.handleResponse);
}

function addPlayersByBatch(gameId, players) {
    return global.fetchWithLoader(
        constructUrl(apiConstants.ADD_MEMBER_BATCH(gameId)),
        serviceHelper.getRequestOptions('POST', authHelper.authHeader(), { players }))
        .then(serviceHelper.handleResponse);
}

function balanceTeams(gameId, teamsCount = 2, bots = []) {
    return global.fetchWithLoader(
        constructUrl(apiConstants.GENERATE_BALANCED_TEAMS(gameId, teamsCount)),
        serviceHelper.getRequestOptions('PUT', authHelper.authHeader(), { bots }))
        .then(serviceHelper.handleResponse);
}
