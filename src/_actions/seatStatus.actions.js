import { seatStatusConstants } from '../_constants';
import { seatStatusService } from '../_services';
import { history } from '../_helpers';

export const seatStatusActions = {
    getBySchedule
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