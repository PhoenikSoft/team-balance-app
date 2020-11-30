import { userConstants } from '../_constants';

let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
    switch (action.type) {
        case userConstants.LOGIN_REQUEST:
            return {
                loggingIn: true,
                user: action.user
            };
        case userConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.user
            };
        case userConstants.LOGIN_FAILURE:
            return { error: action.error };
        case userConstants.LOGOUT:
            return {};

        case userConstants.FORGOT_PASSWORD_REQUEST:
            return {};
        case userConstants.FORGOT_PASSWORD_SUCCESS:
            return { message: 'FORGOT_PASSWORD_SUCCESS_MSG', email: action.email };
        case userConstants.FORGOT_PASSWORD_FAILURE:
            return { error: action.error };

        case userConstants.RESET_PASSWORD_REQUEST:
            return {};
        case userConstants.RESET_PASSWORD_SUCCESS:
            return { message: 'RESET_PASSWORD_SUCCESS_MSG' };
        case userConstants.RESET_PASSWORD_FAILURE:
            return { error: action.error };

        case userConstants.REGISTER_FAILURE:
            return { error: action.error };
        default:
            return state
    }
}