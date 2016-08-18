import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import App from './App';
import Index from './pages/Index';
import Login from './pages/Login';

require('react-tap-event-plugin')();
require('normalize-css');

const Routes = (props, context) => {
  const historyStore = syncHistoryWithStore(hashHistory, context.store);
  return (
    <Router history={historyStore}>
      <Route path="/" component={App}>
        <IndexRoute component={Index} />
        <Route path="login" component={Login} />
        <Route path="dorm" component={Login} />
        <Route path="profile" component={Login} />
      </Route>
    </Router>
  );
};

Routes.contextTypes = {
  store: React.PropTypes.object.isRequired
};

export default Routes;


