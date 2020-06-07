export const userConstants = {
    REGISTER_REQUEST: 'USERS_REGISTER_REQUEST',
    REGISTER_SUCCESS: 'USERS_REGISTER_SUCCESS',
    REGISTER_FAILURE: 'USERS_REGISTER_FAILURE',

    LOGIN_REQUEST: 'USERS_LOGIN_REQUEST',
    LOGIN_SUCCESS: 'USERS_LOGIN_SUCCESS',
    LOGIN_FAILURE: 'USERS_LOGIN_FAILURE',

    LOGOUT: 'USERS_LOGOUT',

    LEAVE_FEEDBACK: 'LEAVE_FEEDBACK',

    USER_FETCHED: 'USER_FETCHED',

    SAVE_REF_LINK: 'SAVE_REF_LINK',
    DELETE_REF_LINK: 'DELETE_REF_LINK',

    // register validation error
    EMAIL_ERROR: 'Provide a valid email',
    PHONE_ERROR: 'Provide a valid phone',
    FIRST_NAME_ERROR: 'First name should not be empty',
    LAST_NAME_ERROR: 'Last name should not be empty',
    PASSWORD_ERROR: 'Provide passwords containing minimum 8 characters and make sure passwords match'

};
