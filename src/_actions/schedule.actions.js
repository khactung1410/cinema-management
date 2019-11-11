import { scheduleConstants } from '../_constants';
import { scheduleService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const scheduleActions = {
    getAll,
    _delete,
    searchByName
};

function getAll(page) {
    return dispatch => {
        dispatch(request());

        scheduleService.getAll(page)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: scheduleConstants.GETALL_REQUEST } }
    function success(data) { return { type: scheduleConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: scheduleConstants.GETALL_FAILURE, error } }
}

function searchByName(name, page) {
    return dispatch => {
        dispatch(request());

        scheduleService.searchByName(name, page)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: scheduleConstants.SEARCHBYNAME_REQUEST } }
    function success(data) { return { type: scheduleConstants.SEARCHBYNAME_SUCCESS, data } }
    function failure(error) { return { type: scheduleConstants.SEARCHBYNAME_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id))
        scheduleService._delete(id)
            .then(
                data => {
                    dispatch(success(id))
                    dispatch(requestReload())
                    scheduleService.getAll(1)
                        .then(
                            data => dispatch(successReload(data)),
                            error => dispatch(failureReload(error.toString()))
                        );
                },
                error => dispatch(failure(id, error.toString()))
            )
    }
    
    function request(id) { return { type: scheduleConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: scheduleConstants.DELETE_SUCCESS, id } }
    function failure(id,error) { return { type: scheduleConstants.DELETE_FAILURE, id, error } }

    function requestReload() { return { type: scheduleConstants.GETALL_REQUEST } }
    function successReload(data) { return { type: scheduleConstants.GETALL_SUCCESS, data } }
    function failureReload(error) { return { type: scheduleConstants.GETALL_FAILURE, error } }
}