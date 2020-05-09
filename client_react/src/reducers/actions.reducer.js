import { userConstants } from '../_constants';

export function actions(state = {}, action) {
    switch (action.type) {
        case userConstants.ACTION_SUCCESS:
            return {
                showSnackbar: true,
                text: action.text,
                success: true
            }
        case userConstants.ACTION_ERROR:
            return {
                showSnackbar: true,
                text: action.text,
                success: false
            }
        case userConstants.CLOSE_SNACKBAR:
            return {
                showSnackbar: false
            }
        default:
            return state
    }
}