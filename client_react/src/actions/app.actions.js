import { userConstants } from '../_constants';

export const appActions = {
    closeSnackbar
};

function closeSnackbar() {
    return dispatch => dispatch({ type: userConstants.CLOSE_SNACKBAR })};
;