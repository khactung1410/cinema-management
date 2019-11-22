import { seatConstants } from '../_constants';
import { seatService } from '../_services';
import { history } from '../_helpers';

export const seatActions = {
    getByRoom
};

function getByRoom(idRoom) {
    return dispatch => {
        dispatch(request());

        seatService.getByRoom(idRoom)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: seatConstants.GETBYROOM_REQUEST } }
    function success(data) { return { type: seatConstants.GETBYROOM_SUCCESS, data } }
    function failure(error) { return { type: seatConstants.GETBYROOM_FAILURE, error } }
}