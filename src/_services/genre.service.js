import config from 'config';
import { authHeader } from '../_helpers';

export const genreService = {
    add,
    getAll,
    searchByName,
    _delete,
    getById,
    edit
};

function add(genre) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(genre)
    };
    return fetch(`${config.apiUrl}/genre/add`, requestOptions).then(handleResponse);
}

function getAll(page) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/genre?page=${page}`, requestOptions).then(handleResponse);
}

function edit(genre) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(genre)
    };
    return fetch(`${config.apiUrl}/genre/edit`, requestOptions).then(handleResponse);
}

function searchByName(name, page) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/genre/search?page=${page}&name=${name}`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/genre/${id}`, requestOptions).then(handleResponse);
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

function _delete(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/genre/delete/${id}`, requestOptions).then(handleResponse);
}