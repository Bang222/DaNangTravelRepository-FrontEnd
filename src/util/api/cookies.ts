import Cookies from 'js-cookie';

// Set a cookie
export const setCookie = (key, value, options = {}) => {
    Cookies.set(key, value, options);
};

// Get a cookie
export const getCookie = (key) => {
    return Cookies.get(key);
};

// Remove a cookie
export const removeCookie = (key) => {
    Cookies.remove(key);
};