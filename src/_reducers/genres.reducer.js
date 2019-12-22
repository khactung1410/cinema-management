import { genreConstants } from '../_constants';

export function genres(state = {}, action) {
  switch (action.type) {
    case genreConstants.ADD_REQUEST:
        return { adding: true };
    case genreConstants.ADD_SUCCESS:
        return {};
    case genreConstants.ADD_FAILURE:
        return {};
    case genreConstants.GETALL_REQUEST:
        return {
            loading: true
        };
    case genreConstants.GETALL_SUCCESS:
        return {
            ...state,
            items: action.data
        }
    case genreConstants.GETALL_FAILURE:
        return { 
            error: action.error
        };
    case genreConstants.SEARCHBYNAME_REQUEST:
        return {
            loading: true
        };
    case genreConstants.SEARCHBYNAME_SUCCESS:
        return {
            ...state,
            items: action.data,
        }
    case genreConstants.SEARCHBYNAME_FAILURE:
        return { 
            error: action.error
        };
    case genreConstants.GETBYID_REQUEST:
        return {
            ...state,
            loading: true
        };
    case genreConstants.GETBYID_SUCCESS:
        return {
            ...state,
            genre: action.data
        }
    case genreConstants.GETBYID_FAILURE:
        return { 
            error: action.error
        };
    default:
      return state
  }
}