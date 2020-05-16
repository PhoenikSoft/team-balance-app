import config from '../config';
import { serviceHelper, authHelper } from '../_helpers';
import { apiConstants } from '../_constants';

export const groupService = {
    getGroups,
    getGroup,
    saveGroup,
    updateGroup,
    deleteGroup,
    checkAccess
}

function getGroups() {
    const userId = authHelper.getCookie('userId');
    const getUrl = () => `${config.apiUrl}${apiConstants.GROUPS(userId)}`;
    return global.fetchWithLoader(
        getUrl(),
        serviceHelper.getRequestOptions('GET', authHelper.authHeader()))
        .then(serviceHelper.handleResponse);
};

function getGroup(groupId) {
    return global.fetchWithLoader(
        `${config.apiUrl}${apiConstants.GROUP_ACTION(groupId)}`,
        serviceHelper.getRequestOptions('GET', authHelper.authHeader()))
        .then(serviceHelper.handleResponse);
};

function saveGroup(name) {
    const userId = authHelper.getCookie('userId');
    return global.fetchWithLoader(
        `${config.apiUrl}${apiConstants.GROUPS(userId)}`,
        serviceHelper.getRequestOptions('POST', authHelper.authHeader(), {name}))
        .then(serviceHelper.handleResponse);
};

function updateGroup(groupId, name) {
    return global.fetchWithLoader(
        `${config.apiUrl}${apiConstants.GROUP_ACTION(groupId)}`,
        serviceHelper.getRequestOptions('PUT', authHelper.authHeader(), name))
        .then(serviceHelper.handleResponse);
};

function deleteGroup(groupId) {
    return global.fetchWithLoader(
        `${config.apiUrl}${apiConstants.GROUP_ACTION(groupId)}`,
        serviceHelper.getRequestOptions('DELETE', authHelper.authHeader()))
        .then(serviceHelper.handleResponse);
};

function checkAccess(groupId) {
    return global.fetchWithLoader(
        `${config.apiUrl}${apiConstants.ACCESS_CHECK(groupId)}`,
        serviceHelper.getRequestOptions('GET', authHelper.authHeader()))
        .then(serviceHelper.handleResponse)
        .then(res=>res.canAccess);
};