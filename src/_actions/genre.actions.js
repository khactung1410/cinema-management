import { genreConstants } from '../_constants';
import { genreService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const genreActions = {
    add,
    getAll,
    searchByName,
    _delete,
    getById,
    edit
};

function add(genre) {
    return dispatch => {
        dispatch(request(genre))
        genreService.add(genre)
            .then(
                genre => {
                    dispatch(success(genre));
                    history.push('/GenreManagement');
                    dispatch(alertActions.success('Add new genre successful'));
                    setTimeout(() => dispatch(alertActions.clear()),4000); //delete alert
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    setTimeout(() => dispatch(alertActions.clear()),2000); //delete alert
                }
            )
    }
    function request(genre) { return { type: genreConstants.ADD_REQUEST, genre } }
    function success(genre) { return { type: genreConstants.ADD_SUCCESS, genre } }
    function failure(error) { return { type: genreConstants.ADD_FAILURE, error } }
}

function getAll(page) {
    return dispatch => {
        dispatch(request());

        genreService.getAll(page)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: genreConstants.GETALL_REQUEST } }
    function success(data) { return { type: genreConstants.GETALL_SUCCESS, data } }
    function failure(error) { return { type: genreConstants.GETALL_FAILURE, error } }
}

function searchByName(name, page) {
    return dispatch => {
        dispatch(request());

        genreService.searchByName(name, page)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: genreConstants.SEARCHBYNAME_REQUEST } }
    function success(data) { return { type: genreConstants.SEARCHBYNAME_SUCCESS, data } }
    function failure(error) { return { type: genreConstants.SEARCHBYNAME_FAILURE, error } }
}

function _delete(id) {
    return dispatch => {
        dispatch(request(id))
        genreService._delete(id)
            .then(
                data => {
                    dispatch(success(id))
                    dispatch(requestReload())
                    genreService.getAll(1)
                        .then(
                            data => {
                                dispatch(successReload(data))
                                dispatch(alertActions.success('Delete Genre Successful!'));
                                setTimeout(() => dispatch(alertActions.clear()),2000); //delete alert
                            },
                            error => dispatch(failureReload(error.toString()))
                        );
                },
                error => dispatch(failure(id, error.toString()))
            )
    }
    
    function request(id) { return { type: genreConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: genreConstants.DELETE_SUCCESS, id } }
    function failure(id,error) { return { type: genreConstants.DELETE_FAILURE, id, error } }

    function requestReload() { return { type: genreConstants.GETALL_REQUEST } }
    function successReload(data) { return { type: genreConstants.GETALL_SUCCESS, data } }
    function failureReload(error) { return { type: genreConstants.GETALL_FAILURE, error } }
}

function getById(id) {
    return dispatch => {
        dispatch(request());

        genreService.getById(id)
            .then(
                data => dispatch(success(data)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: genreConstants.GETBYID_REQUEST } }
    function success(data) { return { type: genreConstants.GETBYID_SUCCESS, data } }
    function failure(error) { return { type: genreConstants.GETBYID_FAILURE, error } }
}

function edit(genre) {
    return dispatch => {
        dispatch(request());

        genreService.edit(genre)
            .then(
                data => {
                    dispatch(success(data)),
                    history.push('/GenreManagement');
                    dispatch(alertActions.success('Update genre successful'));
                    setTimeout(() => dispatch(alertActions.clear()),3000); //delete alert
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                    setTimeout(() => dispatch(alertActions.clear()),3000); //delete alert
                }
            );
    };

    function request() { return { type: genreConstants.EDIT_REQUEST } }
    function success(data) { return { type: genreConstants.EDIT_SUCCESS, data } }
    function failure(error) { return { type: genreConstants.EDIT_FAILURE, error } }
}