import config from '../config';
//import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register
};

const LOGIN_URL = '/api/auth/login';
const REGISTER_URL = '/api/auth/register';

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        //headers: config.headersDev,
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.apiUrl}${LOGIN_URL}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(input) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
    };

    return fetch(`${config.apiUrl}${REGISTER_URL}`, requestOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                //TODO go to login page
                //location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}