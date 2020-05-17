import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'

import {authentication} from './authentication.reducer';
import {alerts} from './alerts.reducer';
import {userData} from './userData.reducer';
import {groups} from './group.reducer';
import {game} from './game.reducer';

export default history=> combineReducers({
  router: connectRouter(history),
  authentication,
  alerts,
  userData,
  game,
  groups
});