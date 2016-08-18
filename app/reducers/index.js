import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './auth';
import myRouting from './route';

export default combineReducers({
  auth,
  myRouting,
  routing,
});
