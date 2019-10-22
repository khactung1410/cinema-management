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
            items: action.movies
        }
    case movieConstants.GETALL_FAILURE:
        return { 
            error: action.error
        };
    default:
      return state
  }
}