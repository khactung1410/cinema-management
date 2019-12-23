import { scheduleConstants } from '../_constants';
import { scheduleService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const scheduleActions = {
    getAll,
    _delete,
    searchByName,
    add,
    updateRemainingTicket,
    getById,
    edit
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

function updateRemainingTicket(schedule) {
    return dispatch => {
        dispatch(request());

        scheduleService.edit(schedule)
            .then(
                data => {
                    dispatch(success(data))
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    setTimeout(() => dispatch(alertActions.clear()),2000); //delete alert
                }
            );
    };

    function request() { return { type: scheduleConstants.EDIT_REQUEST } }
    function success(data) { return { type: scheduleConstants.EDIT_SUCCESS, data } }
    function failure(error) { return { type: scheduleConstants.EDIT_FAILURE, error } }
}

function add(schedule) {
    return dispatch => {
        dispatch(request(schedule))
        scheduleService.add(schedule)
            .then(
                schedule => {
                    dispatch(success(schedule));
                    history.push('/MovieSchedule');
                    dispatch(alertActions.success('Add New Schedule Successful'));
                    setTimeout(() => dispatch(alertActions.clear()),2000); //delete alert
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    setTimeout(() => dispatch(alertActions.clear()),4000); //delete alert
                }
            )
        
    }
    function request(schedule) { return { type: scheduleConstants.ADD_REQUEST, schedule } }
    function success(schedule) { return { type: scheduleConstants.ADD_SUCCESS, schedule } }
    function failure(error) { return { type: scheduleConstants.ADD_FAILURE, error } }
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
                            data => {
                                dispatch(successReload(data))
                                dispatch(alertActions.success('Delete Schedule Successful!'));
                                setTimeout(() => dispatch(alertActions.clear()),2000); //delete alert
                            },
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

function getById(id) {
    return dispatch => {
        dispatch(request());

        scheduleService.getById(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: scheduleConstants.GETBYID_REQUEST } }
    function success(data) { return { type: scheduleConstants.GETBYID_SUCCESS, data } }
    function failure(error) { return { type: scheduleConstants.GETBYID_FAILURE, error } }
}

function edit(schedule) {
    return dispatch => {
        dispatch(request());

        scheduleService.edit(schedule)
            .then(
                data => {
                    dispatch(success(data)),
                    history.push('/MovieSchedule');
                    dispatch(alertActions.success('Update Schedule Successful'));
                    setTimeout(() => dispatch(alertActions.clear()),2000); //delete alert
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    setTimeout(() => dispatch(alertActions.clear()),4000); //delete alert
                }
            );
    };

    function request() { return { type: scheduleConstants.EDIT_REQUEST } }
    function success(data) { return { type: scheduleConstants.EDIT_SUCCESS, data } }
    function failure(error) { return { type: scheduleConstants.EDIT_FAILURE, error } }
}
