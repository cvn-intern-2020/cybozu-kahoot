import Config from '../config';
import { redirect } from './utils';

const apiUrl = `${Config.backendURL}/api`;

const headers = {
    'Content-Type': 'application/json',
};

const fetchAPI = (endpoint, method = 'GET', data = undefined) => {
    const request = {
        method,
        headers,
        credentials: 'include',
    };
    if (data) request.body = JSON.stringify(data);
    return fetch(`${apiUrl}/${endpoint}`, request).then((res) => {
        if (res.status === 401) return redirect('/register_login');
        if (res.status === 500) return redirect('/');
        return res.json();
    });
};

export default fetchAPI;
