import { serviceHelper, authHelper } from '../_helpers';
import { apiConstants, constructUrl } from '../_constants';

export const playersService = {
    addPlayersByBatch,
    deletePlayer
}

function deletePlayer(groupId, gameId, playerId) {
    return global.fetchWithLoader(
        constructUrl(apiConstants.PLAYER(groupId, gameId, playerId)),
        serviceHelper.getRequestOptions('DELETE', authHelper.authHeader()))
        .then(serviceHelper.handleResponse);
}

function addPlayersByBatch(groupId, gameId, players) {
    return global.fetchWithLoader(
        constructUrl(apiConstants.ADD_MEMBER_BATCH(groupId, gameId)),
        serviceHelper.getRequestOptions('POST', authHelper.authHeader(), { players }))
        .then(serviceHelper.handleResponse);
}