import { userConstants } from '../_constants';
import { history } from '../_helpers';
import { userService, feedBackService } from '../_services';



export const userActions = {
    login,
    logout,
    register,
    leaveFeedback
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
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function logout() {
    userService.logout();
    history.push('/login');
}

function leaveFeedback(message) {
    const FEEDBACK_SUCCESS_TEXT = 'Feedback sent. Thank you!';
    const FEEDBACK_ERROR_TEXT = 'Feed back was not sent';

    return dispatch => {
        //dispatch({ type: userConstants.LEAVE_FEEDBACK, message });

        feedBackService.leaveFeedBack(message)
            .then(message => dispatch({ type: userConstants.ACTION_SUCCESS, text: FEEDBACK_SUCCESS_TEXT }))
            .catch(error => dispatch({ type: userConstants.ACTION_ERROR, text: FEEDBACK_ERROR_TEXT }))


    }
}
