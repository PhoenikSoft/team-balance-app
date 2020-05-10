import { userConstants } from '../_constants';

export function userData(state = {}, action) {
    switch (action.type) {
        case userConstants.USER_FETCHED:
            return {
                fetchedUser: action.fetchedUser
            };
        default:
            return state
    }
}