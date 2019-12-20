import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getById,
    getAll,
    _delete,
    searchByName
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    console.log(user)
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    setTimeout(() => dispatch(alertActions.clear()),2000); //delete alert
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));
        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    if(history.location.pathname === '/register') {
                        history.push('/login');
                        dispatch(alertActions.success('Registration successful'));
                    }
                    else {
                        dispatch(alertActions.success('Add user successful'));
                    }
                    setTimeout(() => dispatch(alertActions.clear()),2000); //delete alert
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    setTimeout(() => dispatch(alertActions.clear()),2000); //delete alert
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}

function getAll(page) {
    return dispatch => {
        dispatch(request());

        userService.getAll(page)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(data) { return { type: userConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        userService.getById(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETBYID_REQUEST } }
    function success(data) { return { type: userConstants.GETBYID_SUCCESS, data } }
    function failure(error) { return { type: userConstants.GETBYID_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id))
        userService._delete(id)
            .then(
                data => {
                    dispatch(success(id))
                    dispatch(requestReload())
                    userService.getAll(1)
                        .then(
                            data => {
                                dispatch(successReload(data))
                                dispatch(alertActions.success('Delete User Successful!'));
                                setTimeout(() => dispatch(alertActions.clear()),2000); //delete alert
                            },
                            error => dispatch(failureReload(error.toString()))
                        );
                },
                error => dispatch(failure(id, error.toString()))
            )
    }
    
    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id,error) { return { type: userConstants.DELETE_FAILURE, id, error } }

    function requestReload() { return { type: userConstants.GETALL_REQUEST } }
    function successReload(data) { return { type: userConstants.GETALL_SUCCESS, data } }
    function failureReload(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function searchByName(name, page) {
    return dispatch => {
        dispatch(request());

        userService.searchByName(name, page)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.SEARCHBYNAME_REQUEST } }
    function success(data) { return { type: userConstants.SEARCHBYNAME_SUCCESS, data } }
    function failure(error) { return { type: userConstants.SEARCHBYNAME_FAILURE, error } }
}