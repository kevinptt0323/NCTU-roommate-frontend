import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Routes from './Routes';
import configureStore from './stores/configureStore';

const store = configureStore();

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);

