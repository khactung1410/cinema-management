import { seatStatusConstants } from '../_constants';

export function seatStatus(state = {}, action) {
  switch (action.type) {
    case seatStatusConstants.GETBYSCHEDULE_REQUEST:
        return {
            loading: true
        };
    case seatStatusConstants.GETBYSCHEDULE_SUCCESS:
        return {
            ...state,
            items: action.data
        }
    case seatStatusConstants.GETBYSCHEDULE_FAILURE:
        return { 
            error: action.error
        };
    default:
      return state
  }
}