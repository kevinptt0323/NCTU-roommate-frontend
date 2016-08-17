import { createStore } from 'redux';

import reducer from '../reducers';

const INITIAL_STATE = { };

export default function configureStore(initialState = INITIAL_STATE) {
  const store = createStore(
    reducer,
    initialState
  );
  
  return store;
}
