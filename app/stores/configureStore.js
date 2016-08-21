import { createStore, applyMiddleware } from 'redux';
import { hashHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'

import reducer from '../reducers';

const INITIAL_STATE = { };

let middlewares = [routerMiddleware(hashHistory), thunkMiddleware];

export default function configureStore(initialState = INITIAL_STATE) {
  const store = createStore(
    reducer,
    initialState,
    applyMiddleware(...middlewares)
  );
  
  return store;
}
