import { seatStatusConstants } from '../_constants';
import { seatStatusService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const seatStatusActions = {
    getBySchedule,
    changeStatus
};

function getBySchedule(schedule) {
    return dispatch => {
        dispatch(request());

        seatStatusService.getBySchedule(schedule)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: seatStatusConstants.GETBYSCHEDULE_REQUEST } }
    function success(data) { return { type: seatStatusConstants.GETBYSCHEDULE_SUCCESS, data } }
    function failure(error) { return { type: seatStatusConstants.GETBYSCHEDULE_FAILURE, error } }
}
function changeStatus(arrIds) {
    return dispatch => {
        dispatch(request());

        seatStatusService.changeStatus(arrIds)
            .then(
                data => {
                    dispatch(success(data)),
                    history.push('/SellTicket');
                    dispatch(alertActions.success('Reservation is successfully!'));
                    setTimeout(() => dispatch(alertActions.clear()),2000); //delete alert
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    setTimeout(() => dispatch(alertActions.clear()),2000); //delete alert
                }
            );
    };

    function request() { return { type: seatStatusConstants.CHANGESTATUS_REQUEST } }
    function success(data) { return { type: seatStatusConstants.CHANGESTATUS_SUCCESS, data } }
    function failure(error) { return { type: seatStatusConstants.CHANGESTATUS_FAILURE, error } }
}