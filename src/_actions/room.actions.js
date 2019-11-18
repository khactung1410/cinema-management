import { roomConstants } from '../_constants';
import { roomService } from '../_services';
import { history } from '../_helpers';

export const roomActions = {
    getAll
};

function getAll() {
    return dispatch => {
        dispatch(request());

        roomService.getAll()
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: roomConstants.GETALL_REQUEST } }
    function success(data) { return { type: roomConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: roomConstants.GETALL_FAILURE, error } }
}