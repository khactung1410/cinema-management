import { billConstants } from '../_constants';

export function bills(state = {}, action) {
  switch (action.type) {
    case billConstants.ADD_REQUEST:
        return { adding: true };
    case billConstants.ADD_SUCCESS:
        return {};
    case billConstants.ADD_FAILURE:
        return {};
    case billConstants.GETALL_REQUEST:
        return {
            loading: true
        };
    case billConstants.GETALL_SUCCESS:
        return {
            ...state,
            items: action.data
        }
    case billConstants.GETALL_FAILURE:
        return { 
            error: action.error
        };
    default:
      return state
  }
}