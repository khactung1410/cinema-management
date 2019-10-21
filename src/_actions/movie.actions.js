import { movieConstants } from '../_constants';
import { movieService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const movieActions = {
    add
};
function add(movie) {
    console.log('movie before send: ',movie)
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
