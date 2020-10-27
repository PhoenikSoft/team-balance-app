import jwtDecode from 'jwt-decode'
import { history } from './history.helper';

export const authHelper = {
    authHeader,
    getCookie,
    logout,
    isGroupAdmin,
    setUserToken,
    setUserId,
    isAuthenticated,
    getUserId,
}

function isAuthenticated() {
    return getCookie('jwt') && getCookie('userId');
}

function authHeader() {
    // return authorization header with jwt token
    let jwt = getCookie('jwt');

    if (jwt) {
        return { 'Authorization': 'Bearer ' + jwt };
    } else {
        return {};
    }
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function _setCookie(name, value, options = {}) {
    options = {
        path: '/',
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

function deleteCookie(name) {
    _setCookie(name, "", {
        'max-age': -1
    })
}

function logout() {
    deleteCookie('userId');
    deleteCookie('jwt');
    history.push('/login');
}

function isGroupAdmin(groupId) {
    const jwt = getCookie('jwt');
    if (!jwt) {
        return false;
    }
    const decodedJwt = jwtDecode(getCookie('jwt'));
    return decodedJwt.roles.includes(`"ADMIN_ROLE_${groupId}"`)
}

function setUserToken(token) {
    _setCookie('jwt', token);
}

function setUserId(userId) {
    _setCookie('userId', userId);
}

function getUserId() {
    return getCookie('userId');
}