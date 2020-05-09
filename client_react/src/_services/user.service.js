import config from '../config';
import { serviceHelper, authHelper } from '../_helpers';
import { apiConstants } from '../_constants';

export const userService = {
    login,
    logout,
    register
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //headers: config.headersDev,
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.apiUrl}${apiConstants.LOGIN_URL}`, requestOptions)
        .then(serviceHelper.handleResponse)
        .then(user => {
            authHelper.setCookie('jwt', user.jwt);
            return user;
        });
}

function logout() {
    serviceHelper.logout();
}

function register(input) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
    };

    return fetch(`${config.apiUrl}${apiConstants.REGISTER_URL}`, requestOptions)
        .then(serviceHelper.handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}