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
        return groupService.getGroups()
            .then(res => dispatch({ type: groupConstants.GET_ALL_GROUPS, groups: res.groups }))
            .catch(() => serviceHelper.actionsErrorHandler(dispatch));
    };
};

function updateGroup(groupId, name) {
    return dispatch => {
        groupService.updateGroup(groupId, { name })
            .then(group => dispatch({ type: groupConstants.UPDATE_GROUP, group }))
            .catch(e => serviceHelper.actionsErrorHandler(dispatch, e));
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
            .then((group) => dispatch({ type: groupConstants.ADD_GROUP, ...group }))
            .catch(e => {
                serviceHelper.actionsErrorHandler(dispatch,e)});
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
