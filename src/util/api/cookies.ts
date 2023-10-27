import Cookies from 'js-cookie';

// Set a cookie
export const setCookie = (key:string, value:any, options = {}) => {
    Cookies.set(key, value, options);
};

// Get a cookie
export const getCookie = (key:any) => {
    return Cookies.get(key);
};

// Remove a cookie
export const removeCookie = (key:any) => {
    Cookies.remove(key);
};