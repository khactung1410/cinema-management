import { roomConstants } from '../_constants';
import { roomService } from '../_services';
import { history } from '../_helpers';

export const roomActions = {
    add,
    getAll,
    searchByName,
    _delete,
};

function add(room) {
    return dispatch => {
        dispatch(request(room))
        roomService.add(room)
            .then(
                room => {
                    dispatch(success(room));
                    history.push('/RoomManagement');
                    dispatch(alertActions.success('add new room successful'));
                    setTimeout(() => dispatch(alertActions.clear()),2000); //delete alert
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    setTimeout(() => dispatch(alertActions.clear()),2000); //delete alert
                }
            )
    }
    function request(room) { return { type: roomConstants.ADD_REQUEST, room } }
    function success(room) { return { type: roomConstants.ADD_SUCCESS, room } }
    function failure(error) { return { type: roomConstants.ADD_FAILURE, error } }
}

function getAll(page) {
    return dispatch => {
        dispatch(request());

        roomService.getAll(page)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: roomConstants.GETALL_REQUEST } }
    function success(data) { return { type: roomConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: roomConstants.GETALL_FAILURE, error } }
}

function searchByName(name, page) {
    return dispatch => {
        dispatch(request());

        roomService.searchByName(name, page)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: roomConstants.SEARCHBYNAME_REQUEST } }
    function success(data) { return { type: roomConstants.SEARCHBYNAME_SUCCESS, data } }
    function failure(error) { return { type: roomConstants.SEARCHBYNAME_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id))
        roomService._delete(id)
            .then(
                data => {
                    dispatch(success(id))
                    dispatch(requestReload())
                    roomService.getAll(1)
                        .then(
                            data => {
                                dispatch(successReload(data))
                                dispatch(alertActions.success('Delete Room Successful!'));
                                setTimeout(() => dispatch(alertActions.clear()),2000); //delete alert
                            },
                            error => dispatch(failureReload(error.toString()))
                        );
                },
                error => dispatch(failure(id, error.toString()))
            )
    }
    
    function request(id) { return { type: roomConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: roomConstants.DELETE_SUCCESS, id } }
    function failure(id,error) { return { type: roomConstants.DELETE_FAILURE, id, error } }

    function requestReload() { return { type: roomConstants.GETALL_REQUEST } }
    function successReload(data) { return { type: roomConstants.GETALL_SUCCESS, data } }
    function failureReload(error) { return { type: roomConstants.GETALL_FAILURE, error } }
}