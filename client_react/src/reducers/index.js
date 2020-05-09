import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import {authentication} from './authentication.reducer';
import {actions} from './actions.reducer';

export default history=> combineReducers({
  router: connectRouter(history),
  authentication,
  actions
});