import config from '../config';
import {serviceHelper, authHelper} from '../_helpers';
import {apiConstants} from '../_constants';

export const userService = {
    login,
    logout,
    register,
    getUser,
    update,
    requestForgotPassword,
    resetPassword
};

async function login(email, password) {
    const requestOptions = serviceHelper.getRequestOptions('POST', {}, {email, password});
    const res = await global.fetchWithLoader(`${config.apiUrl}${apiConstants.LOGIN_URL}`, requestOptions)
    const user = await serviceHelper.handleResponse(res)
    authHelper.setUserToken(user.jwt);
    authHelper.setUserId(user.userDetails.id);
    return user;
}

function logout() {
    serviceHelper.logout();
}

async function requestForgotPassword(email) {
    const requestOptions = serviceHelper.getRequestOptions('POST', {}, {email});
    const res = await global.fetchWithLoader(`${config.apiUrl}${apiConstants.FORGOT_PASSWORD_URL}`, requestOptions)
    return await serviceHelper.handleResponse(res);
}

async function resetPassword(newPassword, token) {
    const requestOptions = serviceHelper.getRequestOptions('POST', {}, {newPassword, securityToken: token});
    const res = await global.fetchWithLoader(`${config.apiUrl}${apiConstants.RESET_PASSWORD_URL}`, requestOptions)
    return await serviceHelper.handleResponse(res);
}

async function register(input) {
    const requestOptions = serviceHelper.getRequestOptions('POST', {}, input);
    const res = await global.fetchWithLoader(`${config.apiUrl}${apiConstants.REGISTER_URL}`, requestOptions)
    const user = await serviceHelper.handleResponse(res);
    authHelper.setUserToken(user.jwt);
    authHelper.setUserId(user.userDetails.id);
    return user;
}

function getUser(userId) {
    const requestOptions = serviceHelper.getRequestOptions('GET', authHelper.authHeader());
    return global.fetchWithLoader(`${config.apiUrl}${apiConstants.GET_USER}/${userId}`, requestOptions)
        .then(serviceHelper.handleResponse)
}

function update(user) {
    return global.fetchWithLoader(
        `${config.apiUrl}${apiConstants.GET_USER}/${authHelper.getCookie('userId')}`,
        serviceHelper.getRequestOptions('PUT', authHelper.authHeader(), user))
        .then(serviceHelper.handleResponse);
}