import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { movies } from './movies.reducer';
import { schedules } from './schedules.reducer';
import { rooms } from './rooms.reducer';
import { seatStatus } from './seatStatus.reducer';
import { seatByRoom } from './seatByRoom.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  users,
  alert,
  movies,
  schedules,
  rooms,
  seatStatus,
  seatByRoom
});

export default rootReducer;