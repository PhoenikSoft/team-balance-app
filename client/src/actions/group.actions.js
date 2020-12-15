import { groupConstants } from '../_constants';
import { history, serviceHelper } from '../_helpers';
import { groupService } from '../_services';

export const groupActions = {
    getGroups,
    getGroup,
    updateGroup,
    deleteGroup,
    saveGroup,
    goToGroup
};

function getGroups() {
    return async dispatch => {
        try {
            const res = await groupService.getGroups();
            return dispatch({ type: groupConstants.GROUP_FETCHED, groups: res.groups });
        } catch (e) {
            serviceHelper.actionsErrorHandler()
        }
    };
}

// TODO add permission denied snackbar when BE is ready
function getGroup(groupId) {
    return async dispatch => {
        try {
            const group = await groupService.getGroup(groupId);
            return dispatch({ type: groupConstants.GROUP_FETCHED, groups: [group] });
        } catch (e) {
            serviceHelper.actionsErrorHandler()
        }
    };
}

function updateGroup(groupId, name) {
    return dispatch => {
        groupService.updateGroup(groupId, { name })
            .then(group => dispatch({ type: groupConstants.UPDATE_GROUP, group }))
            .catch(serviceHelper.actionsErrorHandler);
    };
}

function deleteGroup(groupId) {
    return dispatch => {
        groupService.deleteGroup(groupId)
            .then(() => dispatch({ type: groupConstants.DELETE_GROUP, groupId }))
            .catch(serviceHelper.actionsErrorHandler);
    };
}

function saveGroup(group) {
    return dispatch => {
        groupService.saveGroup(group)
            .then((group) => dispatch({ type: groupConstants.ADD_GROUP, ...group }))
            .catch(serviceHelper.actionsErrorHandler);
    };
}

async function goToGroup(groupId) {
    return async dispatch => {
        try {
            const group = await groupService.getGroups(groupId);
            dispatch({ type: groupConstants.GROUP_FETCHED }, group);
        } catch (e) {
            serviceHelper.actionsErrorHandler()
        }
    };
}
