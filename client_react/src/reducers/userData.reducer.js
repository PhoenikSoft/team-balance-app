import { userConstants } from '../_constants';

export function userData(state = {}, action) {
    switch (action.type) {
        case userConstants.USER_FETCHED:
            return {
                fetchedUser: action.fetchedUser
            };
        case userConstants.SAVE_REF_LINK:
            return { ...state, refLink: action.refLink };
        case userConstants.DELETE_REF_LINK:
            return { ...state, refLink: null };
        default:
            return state
    }
}