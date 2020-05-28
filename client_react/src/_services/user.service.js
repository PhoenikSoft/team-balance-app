import config from '../config';
import { serviceHelper, authHelper } from '../_helpers';
import { apiConstants } from '../_constants';

export const userService = {
    login,
    logout,
    register,
    getUser,
    update
};

async function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    const res = await global.fetchWithLoader(`${config.apiUrl}${apiConstants.LOGIN_URL}`, requestOptions)
    const user = await serviceHelper.handleResponse(res)
    authHelper.setCookie('jwt', user.jwt);
    authHelper.setCookie('userId', user.userDetails.id);
    return user;
}

function logout() {
    serviceHelper.logout();
}

// TODO BE must return token
async function register(input) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
    };

    const res = await global.fetchWithLoader(`${config.apiUrl}${apiConstants.REGISTER_URL}`, requestOptions)
    const user = await serviceHelper.handleResponse(res);
    authHelper.setCookie('jwt', user.jwt);
    authHelper.setCookie('userId', user.userDetails.id);
    return user;
}

function getUser(userId) {
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', ...authHelper.authHeader() }
    };

    return global.fetchWithLoader(`${config.apiUrl}${apiConstants.GET_USER}/${userId}`, requestOptions)
        .then(serviceHelper.handleResponse)
}

function update(user) {
    return global.fetchWithLoader(
        `${config.apiUrl}${apiConstants.GET_USER}/${authHelper.getCookie('userId')}`,
        serviceHelper.getRequestOptions('PUT', authHelper.authHeader(), user))
        .then(serviceHelper.handleResponse);
}