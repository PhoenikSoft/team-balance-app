import { alertConstants } from '../_constants';

export function alerts(state = { showSnackbar: false, loading: false }, action) {
    switch (action.type) {
        case alertConstants.ALERT_SUCCESS:
            return {
                showSnackbar: true,
                text: action.text,
                success: true
            }
        case alertConstants.ALERT_ERROR:
            return {
                showSnackbar: true,
                text: action.text,
                success: false
            }
        case alertConstants.CLOSE_SNACKBAR:
            return {
                showSnackbar: false
            }
        case alertConstants.LOADING_STARTED:
            return {
                loading: true
            }
        case alertConstants.LOADING_FINISHED:
            return {
                loading: false
            }
        default:
            return state
    }
}