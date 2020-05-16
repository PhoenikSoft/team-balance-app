import { groupConstants, memberConstants, gameConstants } from '../_constants';

export function groups(state = [], action) {
    switch (action.type) {
        case groupConstants.ADD_GROUP:
            return [...state, { ...action.group, isCreatedByCurrentUser: true }];
        case groupConstants.GROUP_FETCHED:
            return action.groups;
        case groupConstants.DELETE_GROUP:
            return state.filter(group => group.id !== action.groupId);
        case groupConstants.UPDATE_GROUP:
            return state.map(group => {
                if (group.id !== action.group.id) {
                    return group;
                } else {
                    return { ...action.group, isCreatedByCurrentUser: true };
                };
            });


        case memberConstants.DELETE_MEMBER:
            const newMembersList = state[0].members.filter(member => member.id !== action.memberId);
            return [{ ...state[0], members: newMembersList }];
        case gameConstants.GAME_DELETED:
            const newGamesList = state[0].games.filter(game => game.id !== action.gameId);
            return [{ ...state[0], games: newGamesList }];
        default:
            return state
    };
};