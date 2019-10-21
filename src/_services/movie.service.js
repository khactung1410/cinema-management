import config from 'config';

export const movieService = {
    add
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

function handleResponse(response) {
    console.log(response)
    return response.text().then(text => {
        console.log("texttt: ",text)
        const data = text && JSON.parse(text);
        console.log('data: ',data)
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            console.log("AAAA")
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}