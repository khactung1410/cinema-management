export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.text.token) {
        return { 'Authorization': 'Bearer ' + user.text.token };
    } else {
        return {};
    }
}