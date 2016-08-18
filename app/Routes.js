import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import App from './App';
import Index from './pages/Index';
import Login from './pages/Login';
import Dorm from './pages/Dorm';

require('react-tap-event-plugin')();
require('normalize-css');


const Routes = (props, context) => {
  const { store } = context;
  const historyStore = syncHistoryWithStore(hashHistory, store);
  const auth = {
    loginRequired: (nextState, replace) => {
      if (!store.getState().auth.token) {
        replace('/login');
      }
    }
  };
  console.log("GG");
  return (
    <Router history={historyStore}>
      <Route path="/" component={App}>
        <IndexRoute component={Index} onEnter={auth.loginRequired} />
        <Route path="login" component={Login} />
        <Route path="dorms" component={Dorm} onEnter={auth.loginRequired} />
        <Route path="profile" component={Login} />
      </Route>
    </Router>
  );
};

Routes.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default Routes;


