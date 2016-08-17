import { combineReducers } from 'redux';
import auth from './auth';
import { routeReducer as routing } from 'react-router-redux';

export default combineReducers({
  auth,
  routing,
});
