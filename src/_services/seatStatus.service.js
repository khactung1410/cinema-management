import config from 'config';
import { authHeader } from '../_helpers';

export const seatStatusService = {
    getBySchedule,
    changeStatus
};

function getBySchedule(schedule) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${config.apiUrl}/seatstatus?idSchedule=${schedule.id}`, requestOptions).then(handleResponse);
}

function changeStatus(arrIds) {
    console.log(arrIds.toString())
    var obj = {
        ids: arrIds.toString()
    }
    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
    };
    return fetch(`${config.apiUrl}/seatstatus`, requestOptions).then(handleResponse);
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
