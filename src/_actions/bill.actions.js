import { billConstants } from '../_constants';
import { billService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const billActions = {
    add,
    getAll,
    _delete
};

function add(bill) {
    return dispatch => {
        dispatch(request(bill))
        billService.add(bill)
            .then(
                bill => {
                    dispatch(success(bill));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    setTimeout(() => dispatch(alertActions.clear()),3000); //delete alert
                }
            )
    }
    function request(bill) { return { type: billConstants.ADD_REQUEST, bill } }
    function success(bill) { return { type: billConstants.ADD_SUCCESS, bill } }
    function failure(error) { return { type: billConstants.ADD_FAILURE, error } }
}

function getAll(page) {
    return dispatch => {
        dispatch(request());

        billService.getAll(page)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: billConstants.GETALL_REQUEST } }
    function success(data) { return { type: billConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: billConstants.GETALL_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id))
        billService._delete(id)
            .then(
                data => {
                    dispatch(success(id))
                    dispatch(requestReload())
                    billService.getAll(1)
                        .then(
                            data => {
                                dispatch(successReload(data))
                            },
                            error => dispatch(failureReload(error.toString()))
                        );
                },
                error => dispatch(failure(id, error.toString()))
            )
    }
    
    function request(id) { return { type: billConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: billConstants.DELETE_SUCCESS, id } }
    function failure(id,error) { return { type: billConstants.DELETE_FAILURE, id, error } }

    function requestReload() { return { type: billConstants.GETALL_REQUEST } }
    function successReload(data) { return { type: billConstants.GETALL_SUCCESS, data } }
    function failureReload(error) { return { type: billConstants.GETALL_FAILURE, error } }
}