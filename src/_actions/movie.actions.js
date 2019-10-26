import { movieConstants } from '../_constants';
import { movieService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const movieActions = {
    add,
    getAll,
    _delete
};
function add(movie) {
    return dispatch => {
        dispatch(request(movie))
        movieService.add(movie)
            .then(
                movie => {
                    dispatch(success(movie));
                    history.push('/MovieManagement');
                    dispatch(alertActions.success('add new movie successful'));
                    setTimeout(() => dispatch(alertActions.clear()),2000); //delete alert
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    setTimeout(() => dispatch(alertActions.clear()),2000); //delete alert
                }
            )
        
    }
    function request(movie) { return { type: movieConstants.ADD_REQUEST, movie } }
    function success(movie) { return { type: movieConstants.ADD_SUCCESS, movie } }
    function failure(error) { return { type: movieConstants.ADD_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id))
        movieService._delete(id)
            .then(
                movie => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            )
    }
    
    function request(id) { return { type: movieConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: movieConstants.DELETE_SUCCESS, id } }
    function failure(id,error) { return { type: movieConstants.DELETE_FAILURE, id, error } }
}

function getAll(page) {
    return dispatch => {
        dispatch(request());

        movieService.getAll(page)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: movieConstants.GETALL_REQUEST } }
    function success(data) { return { type: movieConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: movieConstants.GETALL_FAILURE, error } }
}
