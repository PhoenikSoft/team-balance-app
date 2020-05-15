import { groupConstants } from '../_constants';

export function groups(state = [], action) {
    switch (action.type) {
        case groupConstants.ADD_GROUP:
            return [...state, { ...action.group, isCreatedByCurrentUser: true }];
        case groupConstants.GET_ALL_GROUPS:
            return action.groups;
        case groupConstants.DELETE_GROUP:
            return state.filter(group => group.id !== action.groupId);
        case groupConstants.GROUP_FETCHED:
            return state.filter(group => group.id !== action.group.id);
        case groupConstants.UPDATE_GROUP:
            return state.map(group => {
                if (group.id !== action.group.id) {
                    return group;
                } else {
                    return { ...action.group, isCreatedByCurrentUser: true };
                };
            });
        default:
            return state
    };
};