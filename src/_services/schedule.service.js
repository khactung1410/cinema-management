import config from 'config';
import { authHeader } from '../_helpers';

export const scheduleService = {
    getAll,
    _delete,
    searchByName,
    add,
    edit,
    getById
};

function getAll(page) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/schedule?page=${page}`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/schedule/${id}`, requestOptions).then(handleResponse);
}

function searchByName(name, page) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };

    return fetch(`${config.apiUrl}/schedule/search?page=${page}&name=${name}`, requestOptions).then(handleResponse);
}

function add(schedule) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schedule)
    };
    return fetch(`${config.apiUrl}/schedule/add`, requestOptions).then(handleResponse);
}

function edit(schedule) {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(schedule)
    };
    return fetch(`${config.apiUrl}/schedule`, requestOptions).then(handleResponse);
}

function _delete(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/schedule/delete/${id}`, requestOptions).then(handleResponse);
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
