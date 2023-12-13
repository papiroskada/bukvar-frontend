import axios from 'axios';
import { API_BASE_URL } from '@/config';

const loginConfig = {
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
}
export const LoginAPIInstance = axios.create(loginConfig);

const defaultConfig = {
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'authorization': ''
    }
}

const token = localStorage.getItem('token');
if (token) {
    defaultConfig.headers['authorization'] = `Bearer ${token}`;
}

export const DefaultAPIInstance = axios.create(defaultConfig);
