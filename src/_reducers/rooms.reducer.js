import { roomConstants } from '../_constants';

export function rooms(state = {}, action) {
  switch (action.type) {
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
    default:
      return state
  }
}