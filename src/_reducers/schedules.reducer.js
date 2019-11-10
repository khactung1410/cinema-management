import { scheduleConstants } from '../_constants';

export function schedules(state = {}, action) {
  switch (action.type) {
    case scheduleConstants.ADD_REQUEST:
        return { adding: true };
    case scheduleConstants.ADD_SUCCESS:
        return {};
    case scheduleConstants.ADD_FAILURE:
        return {};
    case scheduleConstants.GETALL_REQUEST:
        return {
            loading: true
        };
    case scheduleConstants.GETALL_SUCCESS:
        return {
            ...state,
            items: action.data
        }
    case scheduleConstants.GETALL_FAILURE:
        return { 
            error: action.error
        };

    case scheduleConstants.SEARCHBYNAME_REQUEST:
        return {
            loading: true
        };
    case scheduleConstants.SEARCHBYNAME_SUCCESS:
        return {
            ...state,
            items: action.data,
        }
    case scheduleConstants.SEARCHBYNAME_FAILURE:
        return { 
            error: action.error
        };
    case scheduleConstants.GETBYID_REQUEST:
        return {
            ...state,
            loading: true
        };
    case scheduleConstants.GETBYID_SUCCESS:
        return {
            ...state,
            schedule: action.data
        }
    case scheduleConstants.GETBYID_FAILURE:
        return { 
            error: action.error
        };
    case scheduleConstants.ADD_REQUEST:
        return { updating: true };
    case scheduleConstants.ADD_SUCCESS:
        return {};
    case scheduleConstants.ADD_FAILURE:
        return {};
    default:
      return state
  }
}