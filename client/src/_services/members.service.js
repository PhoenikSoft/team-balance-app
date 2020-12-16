import { serviceHelper, authHelper } from '../_helpers';
import { apiConstants, constructUrl } from '../_constants';

export const membersService = {
    addMemberByRef,
    addMember,
    getMembers,
    deleteMember
}

// NOTE: not used
function addMember(memberId, groupId) {
    return global.fetchWithLoader(
        constructUrl(apiConstants.MEMBER(groupId, memberId)),
        serviceHelper.getRequestOptions('POST', authHelper.authHeader()))
        .then(serviceHelper.handleResponse);
}

function deleteMember(memberId, groupId) {
    return global.fetchWithLoader(
        constructUrl(apiConstants.MEMBER(groupId, memberId)),
        serviceHelper.getRequestOptions('DELETE', authHelper.authHeader()))
        .then(serviceHelper.handleResponse);
}

function getMembers(groupId) {
    return global.fetchWithLoader(
        constructUrl(apiConstants.GET_MEMBERS(groupId)),
        serviceHelper.getRequestOptions('GET', authHelper.authHeader()))
        .then(serviceHelper.handleResponse);
}

function addMemberByRef(ref) {
    return global.fetchWithLoader(
        constructUrl(apiConstants.ADD_MEMBER_BY_REF(ref)),
        serviceHelper.getRequestOptions('POST', authHelper.authHeader()))
        .then(serviceHelper.handleResponse);
}