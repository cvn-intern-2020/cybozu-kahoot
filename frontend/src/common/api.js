import Config from '../config';

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
    return fetch(`${apiUrl}/${endpoint}`, request).then((res) => res.json());
};

export default fetchAPI;
