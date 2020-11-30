import { userConstants, alertConstants } from '../_constants';
import { navigation, authHelper, serviceHelper } from '../_helpers';
import { userService, feedBackService } from '../_services';
import { store } from '../index';

export const userActions = {
    login,
    logout,
    register,
    leaveFeedback,
    update,
    getCurrentUser,
    requestForgotPassword,
    resetPassword
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        return userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    const refLink = store.getState().userData.refLink;
                    if (refLink) {
                        navigation.goToRefLink(refLink);
                    } else {
                        navigation.goHome();
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function register(inputs) {
    return dispatch => {
        dispatch(request({ username: inputs.email }));

        return userService.register(_formatInputs(inputs))
            .then(
                user => {
                    dispatch(success(user));
                    const refLink = store.getState().userData.refLink;
                    if (refLink) {
                        navigation.goToRefLink(refLink);
                    } else {
                        navigation.goHome();
                    }
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function update(inputs) {
    return dispatch => {
        userService.update(_formatInputs(inputs))
            .then(() => dispatch({ type: alertConstants.ALERT_SUCCESS, text: alertConstants.USER_UPDATE_SUCCESS_TEXT }))
            .catch(() => serviceHelper.actionsErrorHandler())
    }
}

function logout() {
    authHelper.logout();
}

function requestForgotPassword(email) {
    return dispatch => {
        dispatch(request({ email }));

        return userService.requestForgotPassword(email)
            .then(
                () => dispatch(success(email)),
                error => dispatch(failure(error.toString()))
            );
    }

    function request(email) { return { type: userConstants.FORGOT_PASSWORD_REQUEST, email } }
    function success(email) { return { type: userConstants.FORGOT_PASSWORD_SUCCESS, email } }
    function failure(error) { return { type: userConstants.FORGOT_PASSWORD_FAILURE, error } }
}

function resetPassword(password, token) {
    return dispatch => {
        dispatch(request());

        return userService.resetPassword(password, token)
            .then(
                () => {
                    dispatch(success());
                    navigation.goToLogin();
                },
                error => dispatch(failure(error.toString()))
            );
    }

    function request() { return { type: userConstants.RESET_PASSWORD_REQUEST } }
    function success() { return { type: userConstants.RESET_PASSWORD_SUCCESS } }
    function failure(error) { return { type: userConstants.RESET_PASSWORD_FAILURE, error } }
}

function leaveFeedback(message) {
    return dispatch => {
        feedBackService.leaveFeedBack(message)
            .then(message => dispatch({ type: alertConstants.ALERT_SUCCESS, text: alertConstants.FEEDBACK_SUCCESS_TEXT }))
            .catch(() => serviceHelper.actionsErrorHandler(alertConstants.FEEDBACK_ERROR_TEXT))

    }
}

function getCurrentUser() {
    const userId = authHelper.getCookie('userId');
    return dispatch => {
        return userService.getUser(userId)
            .then(fetchedUser => {
                dispatch({ type: userConstants.USER_FETCHED, fetchedUser });
                return {
                    ...fetchedUser,
                    phone: fetchedUser.phone.replace('38', '')
                };
            })
            .catch(() => serviceHelper.actionsErrorHandler())
    }
}

function _formatInputs(inputs) {
    return {
        ...inputs, phone: inputs.phone.replace(/\D/g, '')
    }
}