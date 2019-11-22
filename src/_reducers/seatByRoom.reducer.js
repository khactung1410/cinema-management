import { seatConstants } from '../_constants';

export function seatByRoom(state = {}, action) {
  switch (action.type) {
    case seatConstants.GETBYROOM_REQUEST:
        return {
            loading: true
        };
    case seatConstants.GETBYROOM_SUCCESS:
        return {
            ...state,
            items: action.data
        }
    case seatConstants.GETBYROOM_FAILURE:
        return { 
            error: action.error
        };
    default:
      return state
  }
}