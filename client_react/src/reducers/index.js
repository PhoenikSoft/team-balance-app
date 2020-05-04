import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import todos from './todos';
import visibilityFilter from './visibilityFilter';
import {authentication} from './authentication.reducer';

export default history=> combineReducers({
  router: connectRouter(history),
  todos,
  visibilityFilter,
  authentication
});