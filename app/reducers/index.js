import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './auth';
import profile from './profile';
import classes from './classes';
import buildings from './buildings';
import search from './search';
import myRouting from './route';

export default combineReducers({
  auth,
  profile,
  classes,
  buildings,
  search,
  myRouting,
  routing,
});
