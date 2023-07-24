export const endPointAPI = {
    you: `${process.env.BACKEND_APP_URL} + 'user-detail`,
    login : process.env.BACKEND_APP_URL + 'auth/login',
    register : process.env.BACKEND_APP_URL + 'auth/register',
    createStore:process.env.BACKEND_APP_URL + ''
}