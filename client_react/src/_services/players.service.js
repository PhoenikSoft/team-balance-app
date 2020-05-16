


function addPlayersByBatch(groupId, gameId, players) {
    return global.fetchWithLoader(
        constructUrl(apiConstants.ADD_MEMBER_BATCH(groupId, gameId)),
        serviceHelper.getRequestOptions('POST', authHelper.authHeader(), players))
        .then(serviceHelper.handleResponse);
}