import { groupConstants } from '../_constants';
import { history, serviceHelper } from '../_helpers';
import { groupService } from '../_services';

export const groupActions = {
    getGroups,
    updateGroup,
    deleteGroup,
    saveGroup,
    goToGroup
};

function getGroups() {
    return dispatch => {
        groupService.getGroups()
            .then(groups => dispatch({ type: groupConstants.GET_ALL_GROUPS }, groups))
            .catch(() => serviceHelper.actionsErrorHandler(dispatch));
    };
};

function updateGroup(groupId) {
    return dispatch => {
        groupService.updateGroup(groupId)
            .then(group => dispatch({ type: groupConstants.UPDATE_GROUP }, group))
            .catch(() => serviceHelper.actionsErrorHandler(dispatch));
    };
};

function deleteGroup(groupId) {
    return dispatch => {
        groupService.deleteGroup(groupId)
            .then(() => dispatch({ type: groupConstants.DELETE_GROUP, groupId }))
            .catch(() => serviceHelper.actionsErrorHandler(dispatch));
    };
};

function saveGroup(group) {
    return dispatch => {
        groupService.saveGroup(group)
            .then(() => dispatch({ type: groupConstants.ADD_GROUP, group }))
            .catch(() => serviceHelper.actionsErrorHandler(dispatch));
    };
};

async function goToGroup(groupId) {
    return async dispatch => {
        try {
            const access = await groupService.checkAccess(groupId);
            if (access) {
                const group = await groupService.getGroups(groupId);
                dispatch({ type: groupConstants.GROUP_FETCHED }, group);
            } else {
                dispatch({ type: groupConstants.ACCESS_DENIED });
                history.push('/home');
                serviceHelper.actionsErrorHandler(dispatch, groupConstants.ACCESS_DENIED_TEXT);
            };
        } catch (e) {
            serviceHelper.actionsErrorHandler(dispatch)
        };
    };
};
