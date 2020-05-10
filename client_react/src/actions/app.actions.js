import { alertConstants } from '../_constants';

export const appActions = {
    closeSnackbar
};

function closeSnackbar() {
    return dispatch => dispatch({ type: alertConstants.CLOSE_SNACKBAR })};
;