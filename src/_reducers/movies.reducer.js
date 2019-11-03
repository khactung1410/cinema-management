import { movieConstants } from '../_constants';

export function movies(state = {}, action) {
  switch (action.type) {
    case movieConstants.ADD_REQUEST:
        return { adding: true };
    case movieConstants.ADD_SUCCESS:
        return {};
    case movieConstants.ADD_FAILURE:
        return {};
    case movieConstants.GETALL_REQUEST:
        return {
            loading: true
        };
    case movieConstants.GETALL_SUCCESS:
        return {
            ...state,
            items: action.data
        }
    case movieConstants.GETALL_FAILURE:
        return { 
            error: action.error
        };

    case movieConstants.SEARCHBYNAME_REQUEST:
        return {
            loading: true
        };
    case movieConstants.SEARCHBYNAME_SUCCESS:
        return {
            ...state,
            items: action.data,
        }
    case movieConstants.SEARCHBYNAME_FAILURE:
        return { 
            error: action.error
        };
    case movieConstants.GETBYID_REQUEST:
        return {
            ...state,
            loading: true
        };
    case movieConstants.GETBYID_SUCCESS:
        return {
            ...state,
            movie: action.data
        }
    case movieConstants.GETBYID_FAILURE:
        return { 
            error: action.error
        };
    case movieConstants.ADD_REQUEST:
        return { updating: true };
    case movieConstants.ADD_SUCCESS:
        return {};
    case movieConstants.ADD_FAILURE:
        return {};
    default:
      return state
  }
}