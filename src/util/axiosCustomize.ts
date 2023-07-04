import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.BACKEND_APP_URL,
});
export default instance;