import config from '../config';
import { serviceHelper, authHelper } from '../_helpers';
//import { authHeader } from '../_helpers';

const LOGIN_URL = '/api/auth/login';
const REGISTER_URL = '/api/auth/register';

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

    return fetch(`${config.apiUrl}${LOGIN_URL}`, requestOptions)
        .then(serviceHelper.handleResponse)
        .then(user => {
            authHelper.setCookie('jwt', user.jwt);
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    serviceHelper.logout();

}

function register(input) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
    };

    return fetch(`${config.apiUrl}${REGISTER_URL}`, requestOptions)
        .then(serviceHelper.handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}