import { roomConstants } from '../_constants';

export function rooms(state = {}, action) {
  switch (action.type) {
    case roomConstants.ADD_REQUEST:
        return { adding: true };
    case roomConstants.ADD_SUCCESS:
        return {};
    case roomConstants.ADD_FAILURE:
        return {};
    case roomConstants.GETALL_REQUEST:
        return {
            loading: true
        };
    case roomConstants.GETALL_SUCCESS:
        return {
            ...state,
            items: action.data
        }
    case roomConstants.GETALL_FAILURE:
        return { 
            error: action.error
        };
    case roomConstants.SEARCHBYNAME_REQUEST:
        return {
            loading: true
        };
    case roomConstants.SEARCHBYNAME_SUCCESS:
        return {
            ...state,
            items: action.data,
        }
    case roomConstants.SEARCHBYNAME_FAILURE:
        return { 
            error: action.error
        };
    case roomConstants.GETBYID_REQUEST:
        return {
            ...state,
            loading: true
        };
    case roomConstants.GETBYID_SUCCESS:
        return {
            ...state,
            room: action.data
        }
    case roomConstants.GETBYID_FAILURE:
        return { 
            error: action.error
        };
    default:
      return state
  }
}