import { userConstants, alertConstants } from '../_constants';
import { history, authHelper, serviceHelper } from '../_helpers';
import { userService, feedBackService } from '../_services';

export const userActions = {
    login,
    logout,
    register,
    leaveFeedback,
    goToProfile,
    update,
    goHome
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/home');
                },
                error => {
                    dispatch(failure(error.toString()));
                    //dispatch(alertActions.error(error.toString()));
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

        userService.register(inputs)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/home');
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
        userService.update(inputs)
            .then(() => dispatch({ type: alertConstants.ALERT_SUCCESS, text: alertConstants.USER_UPDATE_SUCCESS_TEXT }))
            .catch(() => serviceHelper.actionsErrorHandler(dispatch))
    }
}


function logout() {
    authHelper.logout();
}

function leaveFeedback(message) {

    return dispatch => {
        feedBackService.leaveFeedBack(message)
            .then(message => dispatch({ type: alertConstants.ALERT_SUCCESS, text: alertConstants.FEEDBACK_SUCCESS_TEXT }))
            .catch(() => serviceHelper.actionsErrorHandler(dispatch, alertConstants.FEEDBACK_ERROR_TEXT))

    }
}

function goToProfile() {
    const userId = authHelper.getCookie('userId');
    return dispatch => {
        userService.getUser(userId)
            .then(fetchedUser => {
                dispatch({ type: userConstants.USER_FETCHED, fetchedUser });
                history.push('/home/profile');
            })
            .catch(() => serviceHelper.actionsErrorHandler(dispatch))
    }
}

function goHome() {
    history.push('/home');
}


