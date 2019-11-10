import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { movies } from './movies.reducer';
import { schedules } from './schedules.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  movies,
  schedules
});

export default rootReducer;