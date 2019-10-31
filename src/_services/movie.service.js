import config from 'config';
import { authHeader } from '../_helpers';

export const movieService = {
    add,
    getAll,
    getById,
    _delete
};

function add(movie) {
    console.log('movie: ',movie)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(movie)
    };
    return fetch(`${config.apiUrl}/movie/add`, requestOptions).then(handleResponse);
}

function getAll(page) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/movie?page=${page}`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/movie/${id}`, requestOptions).then(handleResponse);
}

function _delete(id) {
    console.log("gggggg: ",id)
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/movie/delete/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        console.log('data: ',data)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}